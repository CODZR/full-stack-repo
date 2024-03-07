# import csv
# import json
# import logging
# from uuid import UUID

# from chalice import (
#     Response,
#     BadRequestError,
#     ConflictError,
#     ChaliceViewError,
#     NotFoundError,
# )
# from marshmallow.exceptions import ValidationError
# from sqlalchemy import asc, desc
# from sqlalchemy.dialects.postgresql import insert
# from sqlalchemy.exc import IntegrityError

# from schemas.text import TextSchema
# from models.text import TextModel
# from models.text import TextModel
# from extensions.ext_database import db_session

# from libs.helper import UUIDEncoder

# from langchain.llms import OpenAI
# from core.openai import OPENAI_API_KEY

# client = OpenAI(api_key=OPENAI_API_KEY)

# logger = logging.getLogger(__name__)
# logger.setLevel(logging.INFO)


# class TextService:
#     @staticmethod
#     def get_texts(query_params):
#         """
#         Retrieves data for all text's who have an attribute that matches the
#         searchText
#         Args:
#             query_params (dict): a dictionary containing all of the query params
#         Returns:
#             list: list of dicts containing texts information
#         Raises:
#             None
#         """
#         query_params = query_params if query_params else dict()
#         logger.info(
#             "Retrieving text information with query params of {}...".format(
#                 query_params
#             )
#         )

#         page_size = int(query_params.get("page_size", 10))
#         page = int(query_params.get("page", 1))
#         order = query_params.get("order", "desc")
#         search_field = query_params.get("searchField")

#         with db_session() as session:
#             logger.info("Retrieving texts info from database...")
#             text_query = session.query(TextModel)
#             order_fn = desc if order == "desc" else asc
#             total = text_query.count()
#             texts = (
#                 text_query.order_by(order_fn(TextModel.idx))
#                 .limit(page_size)
#                 .offset((page - 1) * page_size)
#                 .all()
#             )

#             texts_json = [text.to_json() for text in texts]

#             return dict(
#                 meta=dict(
#                     page_size=page_size,
#                     page=page,
#                     total=total,
#                 ),
#                 items=texts_json,
#             )

#     @staticmethod
#     def create_text(json_body):
#         """
#         Inserts text into the texts table and insert's the text's meta data
#         into the meta_data table.
#         Args:
#             json_body (dict): a dict representing the json body
#         Returns:
#             chalice.Response: response object with status code and headers
#         Raises:
#             BadRequestError: if the provided data is malformed or invalid
#             ConflictError: if the text already exists or if the text data is malformed
#             ChaliceViewError: if something goes wrong when inserting the texts
#         """
#         with db_session() as session:
#             try:
#                 textCount = session.query(TextModel).count()
#                 json_body["idx"] = textCount + 1
#                 validated_data = TextSchema(
#                     **json_body
#                 ).model_dump()  # Validate the data against the TextSchema
#             except ValidationError as e:
#                 # Handle validation errors
#                 print(f"Validation error: {e.messages}")
#             else:
#                 try:
#                     session.add(TextModel(**validated_data))
#                     session.commit()

#                 except IntegrityError as e:
#                     logger.warning(
#                         "Text or text data already exists, received error: {}".format(e)
#                     )
#                     raise ConflictError
#                 except Exception as e:
#                     logger.critical(
#                         "Something went wrong when retrieving text data, "
#                         "received error: {}".format(e)
#                     )
#                     raise ChaliceViewError

#             logger.info("Data successfully inserted")

#         json_resp = json.loads(json.dumps(validated_data, cls=UUIDEncoder))
#         print(f"row: 108 - col: 9 json_resp -> {json_resp}")
#         return Response(
#             body=json_resp,
#             status_code=201,
#             headers=dict(Location="/texts/{}".format(str(json_resp["id"]))),
#         )

#     @staticmethod
#     def get_text(id):
#         """
#         Retrieves all of a given texts data
#         Args:
#             id (str): a texts uuid
#         Returns:
#             dict: a dictionary containing all of a texts information
#         Raises:
#             BadRequestError: if the id isn't a valid uuid
#             NotFoundError: if no text can be found for the given text id
#         """
#         try:
#             UUID(id)
#         except ValueError as e:
#             logger.warning("Invalid uuid, received error: {}".format(e))
#             raise BadRequestError

#         with db_session() as session:
#             logger.info("Retrieving text information...")
#             result = session.query(TextSchema).filter_by(id=id)

#             if not result.count():
#                 logger.warning("Text {} was not found in the database".format(id))
#                 raise NotFoundError

#             text_data = result

#             return dict(meta=dict(limit=1, offset=0, count=1), data=text_data)

#     @staticmethod
#     def delete_text(id):
#         """
#         Deletes text's texts from the database
#         Args:
#             id (str): a texts uuid
#         Returns:
#             None
#         Raises:
#             BadRequestError: if the id isn't a valid uuid
#             NotFoundError: if no text can be found for the given text id
#         """
#         try:
#             UUID(id)
#         except ValueError as e:
#             logger.warning("Invalid uuid, received error: {}".format(e))
#             raise BadRequestError

#         with db_session() as session:
#             logger.info("Deleting text data from texts and text_data tables...")
#             count = session.query(TextModel).filter_by(id=id).delete()

#             if not count:
#                 logger.warning("Text {} was not found in the database".format(id))
#                 raise NotFoundError

#             logger.info("Text successfully deleted from database")

#         return Response(body=None, status_code=204, headers=dict())
