import csv
import json

import os


from langchain.document_loaders import UnstructuredCSVLoader, TextLoader
from langchain.text_splitter import CharacterTextSplitter
from sqlalchemy import create_engine, inspect


from extensions.ext_database import db_session, engines, PSQL_DATABASE_URL
from models.faq import FaqModel

# from models.text import TextModel
from services.faq_service import FaqService


def init_qa_table(override):
    try:
        engine = engines[PSQL_DATABASE_URL]
    except KeyError:
        engine = create_engine(PSQL_DATABASE_URL, pool_recycle=1, pool_size=1, max_overflow=50)
        engines[PSQL_DATABASE_URL] = engine

    inspector = inspect(engine)

    table_existed = inspector.has_table(FaqModel.__tablename__)
    if table_existed:
        if not override:
            print("Table already exist, if you want to continue, please use override pattern")
            return
        else:
            # TextModel.__table__.drop(engine, checkfirst=True)
            FaqModel.__table__.drop(engine, checkfirst=True)
            print("Override pattern, existing tables dropped.")

    FaqModel.__table__.create(engine, checkfirst=True)
    # TextModel.__table__.create(engine, checkfirst=True)


def load_faq_data_from_jsonl(jsonl_path="static/asst/files/qa_summary.jsonl"):
    with db_session() as (session):
        cur_path = os.getcwd()
        jsonl_file_path = os.path.join(cur_path, jsonl_path)
        with open(jsonl_file_path, "r") as file:
            for idx, line in enumerate(file):
                data = json.loads(line)

                # 解析数据
                question = data["Q"]
                answer = data["A"]

                # 创建Faq对象并添加到会话
                faq = FaqModel(question=question, answer=answer, idx=idx + 1)
                session.add(faq)
                session.flush()  # 刷新会话以获取faq_id
        session.commit()


def init_qa_system(override=False):
    init_qa_table(override)

    load_faq_data_from_jsonl()

    temp_csv_path = "../temp_qa.csv"
    FaqService.create_temp_qa_csv(temp_csv_path)
    loader = UnstructuredCSVLoader(temp_csv_path)
    documents = loader.load()
    print("Documents loaded.")
    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
    print("Text splitted.")
    splitted_documents = text_splitter.split_documents(documents)

    FaqService.reset_index_texts(splitted_documents)
