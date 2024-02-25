import os
from typing import List, Literal
from langchain_core.pydantic_v1 import Field
from langchain_core.load.serializable import Serializable

from langchain.embeddings.base import Embeddings

from core.index.vector_index.base import BaseVectorIndex
from langchain.vectorstores.pgvector import PGVector
from extensions.ext_database import PGVECTOR_CONNECTION_STRING


cur_path = os.getcwd()


class Document(Serializable):
    """Class for storing a piece of text and associated metadata."""

    page_content: str
    """String text."""
    metadata: dict = Field(default_factory=dict)
    """Arbitrary metadata about the page content (e.g., source, relationships to other
        documents, etc.).
    """
    type: Literal["Document"] = "Document"

    @classmethod
    def is_lc_serializable(cls) -> bool:
        """Return whether this class is serializable."""
        return True

    @classmethod
    def get_lc_namespace(cls) -> List[str]:
        """Get the namespace of the langchain object."""
        return ["langchain", "schema", "document"]


# TODO: only support pgvector now
class VectorIndex:
    def __init__(self, collection_name: str, embeddings: Embeddings):
        self._embeddings = embeddings
        self._collection_name = collection_name
        self._vector_index = self._init_vector_index()

    def _init_vector_index(self) -> BaseVectorIndex:
        return PGVector(
            embedding_function=self._embeddings,
            collection_name=self._collection_name,
            connection_string=PGVECTOR_CONNECTION_STRING,
        )

    def reset_texts(self, splitted_documents: List[Document]) -> BaseVectorIndex:
        self._vector_index = PGVector.from_documents(
            documents=splitted_documents,
            pre_delete_collection=True,
            embedding=self._embeddings,
            collection_name=self._collection_name,
            connection_string=PGVECTOR_CONNECTION_STRING,
        )

        return self._vector_index

    def get_index(self) -> PGVector:
        return self._vector_index

    def add_texts(self):
        pass
