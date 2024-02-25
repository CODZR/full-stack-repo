import csv
import json
import logging
from typing import List
from uuid import UUID
from langchain_core.documents import Document
from libs.response import (
    make_created_response,
    make_query_response,
    make_success_response,
    make_no_content_response,
)

from chalice import (
    Response,
    BadRequestError,
    ConflictError,
    ChaliceViewError,
    NotFoundError,
)
from marshmallow.exceptions import ValidationError
from sqlalchemy import asc, desc
from libs.helper import compare_seqs_similarity

from sqlalchemy.exc import IntegrityError

from schemas.faq import FaqSchema
from models.faq import FaqModel

from extensions.ext_database import db_session

from core.index.vector_index.vector_index import VectorIndex
from core.embedding.cache import CacheEmbedding


from langchain.chains import RetrievalQA
from langchain.document_loaders import UnstructuredCSVLoader, TextLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain.llms import OpenAI
from core.openai import OPENAI_API_KEY
from core.slack.constants import AT_CHARGE_PERSON_MSG


client = OpenAI(api_key=OPENAI_API_KEY)

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)


class FaqService:
    @staticmethod
    def get_faqs(query_params):
        """
        Retrieves data for all faq's who have an attribute that matches the
        searchText
        Args:
            query_params (dict): a dictionary containing all of the query params
        Returns:
            list: list of dicts containing faqs information
        Raises:
            None
        """
        query_params = query_params if query_params else dict()
        logger.info("Retrieving faq information with query params of {}...".format(query_params))

        page_size = int(query_params.get("page_size", 10))
        page = int(query_params.get("page", 1))
        order = query_params.get("order", "desc")
        search_field = query_params.get("searchField")

        with db_session() as session:
            logger.info("Retrieving faqs info from database...")
            faq_query = session.query(FaqModel)
            order_fn = desc if order == "desc" else asc
            total = faq_query.count()
            faqs = faq_query.order_by(order_fn(FaqModel.idx)).limit(page_size).offset((page - 1) * page_size).all()

            faqs_json = [faq.to_json() for faq in faqs]

            meta_data = dict(
                page_size=page_size,
                page=page,
                total=total,
            )
            return make_query_response(
                meta_data,
                faqs_json,
            )

    @staticmethod
    def create_faq(json_body: FaqSchema):
        """
        Inserts faq into the faqs table and insert's the faq's meta data
        into the meta_data table.
        Args:
            json_body (dict): a dict representing the json body
        Returns:
            chalice.Response: response object with status code and headers
        Raises:
            BadRequestError: if the provided data is malformed or invalid
            ConflictError: if the faq already exists or if the faq data is malformed
            ChaliceViewError: if something goes wrong when inserting the faqs
        """
        with db_session() as session:
            try:
                first_faq = session.query(FaqModel).order_by(desc(FaqModel.idx)).first()
                max_idx = first_faq.idx if first_faq else 0
                data = dict(**json_body, idx=max_idx + 1)
                FaqSchema.model_validate(data)
            except ValidationError as e:
                # Handle validation errors
                print(f"Validation error: {e.messages}")
                return Response(body={"code": 400, "message": e.messages}, status_code=400)
            else:
                try:
                    session.add(FaqModel(**data))
                    session.commit()
                    new_faq = session.query(FaqModel).order_by(desc(FaqModel.idx)).first()
                    validated_json_data = new_faq.to_json()

                    FaqService.reload_faq_text()

                except IntegrityError as e:
                    logger.warning("Faq or faq data already exists, received error: {}".format(e))
                    raise ConflictError
                except Exception as e:
                    logger.critical("Something went wrong when retrieving faq data, " "received error: {}".format(e))
                    raise ChaliceViewError

            logger.info("Data successfully inserted")

        return make_created_response(validated_json_data)

    @staticmethod
    def get_faq(id):
        """
        Retrieves all of a given faqs data
        Args:
            id (str): a faqs uuid
        Returns:
            dict: a dictionary containing all of a faqs information
        Raises:
            BadRequestError: if the id isn't a valid uuid
            NotFoundError: if no faq can be found for the given faq id
        """
        try:
            UUID(id)
        except ValueError as e:
            logger.warning("Invalid uuid, received error: {}".format(e))
            raise BadRequestError

        with db_session() as session:
            logger.info("Retrieving faq information...")
            result = session.query(FaqSchema).filter_by(id=id)

            if not result.count():
                logger.warning("Faq {} was not found in the database".format(id))
                raise NotFoundError

            faq_data = result

            return make_success_response(faq_data)

    @staticmethod
    def update_faq(id, updates):
        try:
            updated_faq = FaqModel(**updates)
            validated_json_data = updated_faq.to_json()
        except ValidationError as e:
            # Handle validation errors
            print(f"Validation error: {e.messages}")
            return Response(body={"code": 400, "message": e.messages}, status_code=400)
        else:
            with db_session() as session:
                try:
                    session.query(FaqModel).filter(FaqModel.id == id).update(validated_json_data)
                    session.commit()

                    FaqService.reload_faq_text()

                except IntegrityError as e:
                    logger.warning("Faq or faq data already exists, received error: {}".format(e))
                    raise ConflictError
                except Exception as e:
                    logger.critical("Something went wrong when retrieving faq data, " "received error: {}".format(e))
                    raise ChaliceViewError

            logger.info("Data successfully updated")

        return make_success_response(validated_json_data)

    @staticmethod
    def delete_faq(id):
        """
        Deletes faq's faqs from the database
        Args:
            id (str): a faqs uuid
        Returns:
            None
        Raises:
            BadRequestError: if the id isn't a valid uuid
            NotFoundError: if no faq can be found for the given faq id
        """
        try:
            UUID(id)
        except ValueError as e:
            logger.warning("Invalid uuid, received error: {}".format(e))
            raise BadRequestError

        with db_session() as session:
            logger.info("Deleting faq data from faqs and faq_data tables...")
            count = session.query(FaqModel).filter_by(id=id).delete()

            FaqService.reload_faq_text()

            if not count:
                logger.warning("Faq {} was not found in the database".format(id))
                raise NotFoundError

            logger.info("Faq successfully deleted from database")

        return make_no_content_response()

    @staticmethod
    def create_temp_qa_csv(temp_csv_path):
        with db_session() as (session):
            table = FaqModel.__table__

            result = session.query(table).all()
            columns = ["question", "answer"]
            rows = [(row[0], row[1]) for row in result]

            with open(temp_csv_path, "w", newline="") as csvfile:
                writer = csv.writer(csvfile)
                writer.writerow(columns)
                writer.writerows(rows)

    @staticmethod
    def reload_faq_text():
        try:
            temp_csv_path = "../temp_qa.csv"
            FaqService.create_temp_qa_csv(temp_csv_path)

            loader = UnstructuredCSVLoader(temp_csv_path)
            documents = loader.load()
            print("Documents loaded.")
            text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
            print("Text splitted.")
            splitted_documents = text_splitter.split_documents(documents)

            FaqService.reset_index_texts(splitted_documents)
        except Exception as e:
            print(f"reload_faq_text Exception -> {e}")

    @staticmethod
    def reset_index_texts(splitted_documents: List[Document]):
        COLLECTION_NAME = "qa_test"

        embeddings = CacheEmbedding().get_embeddings()
        vector_index = VectorIndex(COLLECTION_NAME, embeddings)
        vector_index.reset_texts(splitted_documents)

    @staticmethod
    def search_faqs(query: str, is_slack_msg=False):
        COLLECTION_NAME = "qa_test"

        embeddings = CacheEmbedding().get_embeddings()
        vector_store = VectorIndex(COLLECTION_NAME, embeddings).get_index()

        # TODO: prompt, 只能从答案集里回答问题，否则回答不知道
        qna_retriever = RetrievalQA.from_chain_type(
            llm=client,
            chain_type="stuff",
            retriever=vector_store.as_retriever(),
        )

        try:
            answer = qna_retriever.run(query)
        except Exception as e:
            print(f"row: 54 - col: 12 Exception -> {Exception}")
            answer = None
        print(f"row: 53 - col: 5 answer -> {answer}")

        # similarity_completion = OpenAICompareSimilarityEmbedding() # 0.2$/1k words, less effective, just for research
        # not_know_similarity = similarity_completion.compare_sentence_similarity("I don't know", answer)

        not_know_similarity = compare_seqs_similarity("I don't know", answer)
        print(f"row: 58 - col: 5 not_know_similarity -> {not_know_similarity}")
        if is_slack_msg and (not_know_similarity > 0.3):
            answer = AT_CHARGE_PERSON_MSG

        return answer
