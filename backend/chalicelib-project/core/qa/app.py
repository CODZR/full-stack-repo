import os
from dotenv import load_dotenv
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.document_loaders import UnstructuredCSVLoader, TextLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores.pgvector import PGVector
from langchain.chains import RetrievalQA
from langchain import OpenAI


load_dotenv()

openai_api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=openai_api_key)

cur_path = os.getcwd()


def process_data():
    print("Getting data...")
    data_path = os.path.join(cur_path, "static/asst/files/qa.csv")
    loader = UnstructuredCSVLoader(data_path)
    documents = loader.load()

    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
    print("Text splitted.")

    texts = text_splitter.split_documents(documents)

    return texts


def create_retriever(initialize=False):
    COLLECTION_NAME = "supabase_test"

    # Supabase PGVector store
    CONNECTION_STRING = PGVector.connection_string_from_db_params(
        driver=os.environ.get("DB_DRIVER", "psycopg2"),
        host=os.environ.get("DB_HOST", "localhost"),
        port=int(os.environ.get("DB_PORT", "5432")),
        database=os.environ.get("DB_DATABASE", "vira"),  # create yourself
        user=os.environ.get("DB_USERNAME", "postgres"),
        password=os.environ.get("DB_PASSWORD", "postgres"),
    )

    print("Getting base embeddings from HuggingFace...")
    embeddings = OpenAIEmbeddings()
    print("Embeddings loaded.")

    if initialize:
        texts = process_data()

        print("Creating vector store...")
        vector_store = PGVector.from_documents(
            documents=texts,
            embedding=embeddings,
            collection_name=COLLECTION_NAME,
            connection_string=CONNECTION_STRING,
        )
        print("Vector store created.")
    else:
        print("Fetching vector store...")
        vector_store = PGVector(
            connection_string=CONNECTION_STRING,
            collection_name=COLLECTION_NAME,
            embedding_function=embeddings,
        )

    qna_retriever = RetrievalQA.from_chain_type(
        llm=client,
        chain_type="stuff",
        retriever=vector_store.as_retriever(),
    )

    return qna_retriever


def query(prompt, qna_retriever):
    print(f"Answer: {qna_retriever.run(prompt)}")


if __name__ == "__main__":
    INITIALIZE = False  # Change to `True` if Supabase PGVector is already initialized.

    qna_retriever = create_retriever(initialize=INITIALIZE)

    while True:
        prompt = input("Prompt: ")

        if prompt == "":
            break

        query(prompt, qna_retriever)
        cont = input("Press 'Enter' to prompt again.\n")

        if cont != "":
            break
