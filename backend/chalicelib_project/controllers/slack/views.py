import json
from cachetools import TTLCache
from chalicelib import EMPTY_RESPONSE, SLACK_RESPOND_MESSAGE_QUEUE_NAME, app, is_dev
from extensions.ext_ttlcache import ttl_cache
from urllib.parse import unquote, parse_qs


@app.route("/slack/event", methods=["POST"], content_types=["application/json"])
def slack_event_handler():
    request = app.current_request
    assert request is not None

    body = request.json_body
    event = body.get("event") or {}

    client_msg_id = event.get("client_msg_id")
    print(f"row: 17 - col: 5 client_msg_id -> {client_msg_id}")
    if client_msg_id and client_msg_id in ttl_cache:
        return EMPTY_RESPONSE

    print("!!!request type | text: ", body.get("type"), event.get("text"))

    ttl_cache[client_msg_id] = True

    return slack_handlers.handle_webhook_event(request, is_dev=is_dev)


@app.route(
    "/slack/interactive",
    methods=["POST"],
    content_types=["application/x-www-form-urlencoded"],
)
def slack_event_handler():
    request = app.current_request
    assert request is not None

    if isinstance(request.raw_body, bytes):
        parsed_body = parse_qs(unquote(request.raw_body))
        payload_data = parsed_body.get("payload", [""])[0]
        print(f"row: 40 - col: 9 payload_data -> {payload_data}")
        json_event = json.loads(payload_data)

        if json_event["type"] == "block_actions":
            return slack_handlers.handle_interactive_block_action_event(request, json_event=json_event, is_dev=is_dev)
        elif json_event["type"] == "view_submission":
            return slack_handlers.handle_interactive_view_submission_event(
                request, json_event=json_event, is_dev=is_dev
            )

    return EMPTY_RESPONSE


@app.on_sqs_message(queue=SLACK_RESPOND_MESSAGE_QUEUE_NAME)
def slack_respond_message(sqs_event):
    return
    for record in sqs_event:
        body = record.body

        app.log.info(f"received event in {SLACK_RESPOND_MESSAGE_QUEUE_NAME} queue.")
        app.log.info(body)

        event = json.loads(body)
        slack_handlers.handle_queued_event(event, is_dev=is_dev)
