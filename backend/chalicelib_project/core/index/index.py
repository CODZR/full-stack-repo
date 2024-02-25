from langchain.embeddings import OpenAIEmbeddings

from core.index.vector_index.vector_index import VectorIndex
from models.dataset import Dataset
from config import app_config


class IndexBuilder:
    @classmethod
    def get_index(
        cls,
        dataset: Dataset,
        indexing_technique: str,
        ignore_high_quality_check: bool = False,
    ):
        embeddings = OpenAIEmbeddings()

        return VectorIndex(dataset=dataset, config=app_config, embeddings=embeddings)

    @classmethod
    def get_default_high_quality_index(cls, dataset: Dataset):
        embeddings = OpenAIEmbeddings(openai_api_key=" ")
        return VectorIndex(
            dataset=dataset, config=app_config.config, embeddings=embeddings
        )
