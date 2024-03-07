from chalice.app import Response

HTTP_STATUS_OK = 200
HTTP_STATUS_CREATED = 201
HTTP_STATUS_NO_CONTENT = 204
HTTP_STATUS_BAD_REQUEST = 400
HTTP_STATUS_UNAUTHORIZED = 401
HTTP_STATUS_FORBIDDEN = 403
HTTP_STATUS_NOT_FOUND = 404
HTTP_STATUS_INTERNAL_SERVER_ERROR = 500

# TODO: 拆分更具体的status code


def make_success_response(json_data):
    return Response(body={"code": HTTP_STATUS_OK, "message": "success", "item": json_data}, status_code=HTTP_STATUS_OK)


def make_query_response(meta, json_data):
    return Response(
        body={"code": HTTP_STATUS_OK, "message": "success", "meta": meta, "items": json_data},
        status_code=HTTP_STATUS_OK,
    )


def make_created_response(json_data):
    return Response(
        body={
            "code": HTTP_STATUS_CREATED,
            "message": "created",
            "item": json_data,
        },
        status_code=HTTP_STATUS_CREATED,
    )


def make_no_content_response():
    return Response(body="", status_code=HTTP_STATUS_NO_CONTENT)


def make_bad_request_response():
    return Response(
        body={"code": HTTP_STATUS_BAD_REQUEST, "message": "bad request"}, status_code=HTTP_STATUS_BAD_REQUEST
    )


def make_unauthorized_response():
    return Response(
        body={"code": HTTP_STATUS_UNAUTHORIZED, "message": "unauthorized"}, status_code=HTTP_STATUS_UNAUTHORIZED
    )


def make_forbidden_response():
    return Response(body={"code": HTTP_STATUS_FORBIDDEN, "message": "forbidden"}, status_code=HTTP_STATUS_FORBIDDEN)


def make_not_found_response():
    return Response(body={"code": HTTP_STATUS_NOT_FOUND, "message": "not found"}, status_code=HTTP_STATUS_NOT_FOUND)


def make_internal_server_error_response():
    return Response(
        body={"code": HTTP_STATUS_INTERNAL_SERVER_ERROR, "message": "internal server error"},
        status_code=HTTP_STATUS_INTERNAL_SERVER_ERROR,
    )
