from langchain.embeddings.base import Embeddings
from langchain.embeddings.openai import OpenAIEmbeddings
from typing import List
from core.openai import OPENAI_API_KEY


# TODO: only support openai embeddings now
class CacheEmbedding(Embeddings):
    def __init__(self):
        self._embeddings = OpenAIEmbeddings(api_key=OPENAI_API_KEY)

    def get_embeddings(self):
        return self._embeddings

    def embed_documents(self, texts: List[str]) -> List[List[float]]:
        return self._embeddings.embed_documents(texts)

    def embed_query(self, text: str) -> List[float]:
        return self._embeddings.embed_query

    # def embed_documents(self, texts: List[str]) -> List[List[float]]
    #     """Embed search docs."""
    #     # use doc embedding cache or store if not exists
    #     text_embeddings = [None for _ in range(len(texts))]
    #     embedding_queue_indices = []
    #     for i, text in enumerate(texts):
    #         hash = helper.generate_text_hash(text)
    #         embedding = db.session.query(Embedding).filter_by(model_name=self._embeddings.name, hash=hash).first()
    #         if embedding:
    #             text_embeddings[i] = embedding.get_embedding()
    #         else:
    #             embedding_queue_indices.append(i)

    #     if embedding_queue_indices:
    #         try:
    #             embedding_results = self._embeddings.client.embed_documents([texts[i] for i in embedding_queue_indices])
    #         except Exception as ex:
    #             raise self._embeddings.handle_exceptions(ex)

    #         for i, indice in enumerate(embedding_queue_indices):
    #             hash = helper.generate_text_hash(texts[indice])

    #             try:
    #                 embedding = Embedding(model_name=self._embeddings.name, hash=hash)
    #                 vector = embedding_results[i]
    #                 normalized_embedding = (vector / np.linalg.norm(vector)).tolist()
    #                 text_embeddings[indice] = normalized_embedding
    #                 embedding.set_embedding(normalized_embedding)
    #                 db.session.add(embedding)
    #                 db.session.commit()
    #             except IntegrityError:
    #                 db.session.rollback()
    #                 continue
    #             except:
    #                 logging.exception('Failed to add embedding to db')
    #                 continue

    #     return text_embeddings

    # def embed_query(self, text: str) -> List[float]:
    #     """Embed query text."""
    #     # use doc embedding cache or store if not exists
    #     hash = helper.generate_text_hash(text)
    #     embedding = db.session.query(Embedding).filter_by(model_name=self._embeddings.name, hash=hash).first()
    #     if embedding:
    #         return embedding.get_embedding()

    #     try:
    #         embedding_results = self._embeddings.client.embed_query(text)
    #         embedding_results = (embedding_results / np.linalg.norm(embedding_results)).tolist()
    #     except Exception as ex:
    #         raise self._embeddings.handle_exceptions(ex)

    #     try:
    #         embedding = Embedding(model_name=self._embeddings.name, hash=hash)
    #         embedding.set_embedding(embedding_results)
    #         db.session.add(embedding)
    #         db.session.commit()
    #     except IntegrityError:
    #         db.session.rollback()
    #     except:
    #         logging.exception('Failed to add embedding to db')

    #     return embedding_results
