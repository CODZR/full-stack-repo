# import logging
# import marshal

# from werkzeug.exceptions import InternalServerError, NotFound, Forbidden

# import services

# from .error import HighQualityDatasetOnlyError, DatasetNotInitializedError

# from services.hit_testing_service import HitTestingService


# class HitTestingApi:
#     def post(self, dataset_id):
#         parser = reqparse.RequestParser()
#         parser.add_argument("query", type=str, location="json")
#         parser.add_argument("retrieval_model", type=dict, required=False, location="json")
#         args = parser.parse_args()

#         HitTestingService.hit_testing_args_check(args)

#         try:
#             response = HitTestingService.retrieve(
#                 dataset=dataset,
#                 query=args["query"],
#                 retrieval_model=args["retrieval_model"],
#                 limit=10,
#             )

#             return {"query": response["query"], "records": marshal(response["records"], hit_testing_record_fields)}
#         except services.errors.index.IndexNotInitializedError:
#             raise DatasetNotInitializedError()
#         except ValueError as e:
#             raise ValueError(str(e))
#         except Exception as e:
#             logging.exception("Hit testing failed.")
#             raise InternalServerError(str(e))


# api.add_resource(HitTestingApi, "/datasets/<uuid:dataset_id>/hit-testing")
