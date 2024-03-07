from abc import abstractmethod
from typing import List, Any, cast

from langchain.embeddings.base import Embeddings
from langchain.schema import Document, BaseRetriever
from langchain.vectorstores import VectorStore

from core.index.base import BaseIndex


class BaseVectorIndex(BaseIndex):
    def __init__(self, embeddings: Embeddings):
        super().__init__()
        self._embeddings = embeddings
        self._vector_store = None

    def get_type(self) -> str:
        raise NotImplementedError

    @abstractmethod
    def get_index_name(self) -> str:
        raise NotImplementedError

    @abstractmethod
    def to_index_struct(self) -> dict:
        raise NotImplementedError

    @abstractmethod
    def _get_vector_store(self) -> VectorStore:
        raise NotImplementedError

    @abstractmethod
    def _get_vector_store_class(self) -> type:
        raise NotImplementedError

    @abstractmethod
    def search_by_full_text_index(self, query: str, **kwargs: Any) -> List[Document]:
        raise NotImplementedError

    def search(self, query: str, **kwargs: Any) -> List[Document]:
        vector_store = self._get_vector_store()
        vector_store = cast(self._get_vector_store_class(), vector_store)

        search_type = (
            kwargs.get("search_type") if kwargs.get("search_type") else "similarity"
        )
        search_kwargs = (
            kwargs.get("search_kwargs") if kwargs.get("search_kwargs") else {}
        )

        if search_type == "similarity_score_threshold":
            score_threshold = search_kwargs.get("score_threshold")
            if (score_threshold is None) or (not isinstance(score_threshold, float)):
                search_kwargs["score_threshold"] = 0.0

            docs_with_similarity = vector_store.similarity_search_with_relevance_scores(
                query, **search_kwargs
            )

            docs = []
            for doc, similarity in docs_with_similarity:
                doc.metadata["score"] = similarity
                docs.append(doc)

            return docs

        # similarity k
        # mmr k, fetch_k, lambda_mult
        # similarity_score_threshold k
        return vector_store.as_retriever(
            search_type=search_type, search_kwargs=search_kwargs
        ).get_relevant_documents(query)

    def get_retriever(self, **kwargs: Any) -> BaseRetriever:
        vector_store = self._get_vector_store()
        vector_store = cast(self._get_vector_store_class(), vector_store)

        return vector_store.as_retriever(**kwargs)

    def add_texts(self, texts: list[Document], **kwargs):
        if self._is_origin():
            self.recreate_dataset(self.dataset)

        vector_store = self._get_vector_store()
        vector_store = cast(self._get_vector_store_class(), vector_store)

        if kwargs.get("duplicate_check", False):
            texts = self._filter_duplicate_texts(texts)

        uuids = self._get_uuids(texts)
        vector_store.add_documents(texts, uuids=uuids)

    def text_exists(self, id: str) -> bool:
        vector_store = self._get_vector_store()
        vector_store = cast(self._get_vector_store_class(), vector_store)

        return vector_store.text_exists(id)

    def delete_by_ids(self, ids: list[str]) -> None:
        if self._is_origin():
            self.recreate_dataset(self.dataset)
            return

        vector_store = self._get_vector_store()
        vector_store = cast(self._get_vector_store_class(), vector_store)

        for node_id in ids:
            vector_store.del_text(node_id)

    def delete_by_group_id(self, group_id: str) -> None:
        vector_store = self._get_vector_store()
        vector_store = cast(self._get_vector_store_class(), vector_store)
        if self.dataset.collection_binding_id:
            vector_store.delete_by_group_id(group_id)
        else:
            vector_store.delete()

    def delete(self) -> None:
        vector_store = self._get_vector_store()
        vector_store = cast(self._get_vector_store_class(), vector_store)

        vector_store.delete()

    def _is_origin(self):
        return False
