# from typing import Optional
# from langchain.embeddings.base import Embeddings
# from core.index.vector_index.vector_index import VectorIndex
# from extensions.ext_database import db
# from models.dataset import Dataset
# from config import app_config

# default_retrieval_model = {
#     "search_method": "semantic_search",
#     "reranking_enable": False,
#     "reranking_model": {"reranking_provider_name": "", "reranking_model_name": ""},
#     "top_k": 2,
#     "score_threshold_enabled": False,
# }


# class RetrievalService:
#     @classmethod
#     def embedding_search(
#         cls,
#         dataset_id: str,
#         query: str,
#         top_k: int,
#         score_threshold: Optional[float],
#         all_documents: list,
#         embeddings: Embeddings,
#     ):
#         dataset = db.session.query(Dataset).filter(Dataset.id == dataset_id).first()

#         vector_index = VectorIndex(dataset=dataset, config=app_config, embeddings=embeddings)

#         documents = vector_index.search(
#             query,
#             search_type="similarity_score_threshold",
#             search_kwargs={"k": top_k, "score_threshold": score_threshold, "filter": {"group_id": [dataset.id]}},
#         )

#         if documents:
#             all_documents.extend(documents)

#     @classmethod
#     def full_text_index_search(
#         cls,
#         dataset_id: str,
#         query: str,
#         top_k: int,
#         score_threshold: Optional[float],
#         reranking_model: Optional[dict],
#         all_documents: list,
#         search_method: str,
#         embeddings: Embeddings,
#     ):
#         dataset = db.session.query(Dataset).filter(Dataset.id == dataset_id).first()

#         vector_index = VectorIndex(dataset=dataset, config=app_config, embeddings=embeddings)

#         documents = vector_index.search_by_full_text_index(query, search_type="similarity_score_threshold", top_k=top_k)
#         if documents:
#             all_documents.extend(documents)
