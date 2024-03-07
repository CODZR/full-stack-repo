from . import slack_client


class RateAction:
    APPROVE = "approve"
    RETRY = "retry"
    DENY = "deny"


rate_block_msg = [
    {"type": "divider"},
    {"type": "section", "text": {"type": "mrkdwn", "text": "*Please rate this matter:*"}},
    {
        "type": "actions",
        "elements": [
            {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": ":smiling_face_with_3_hearts:Approve",
                    "emoji": True,
                },
                "value": RateAction.APPROVE,
                "action_id": "rating-" + RateAction.APPROVE,
                "confirm": {
                    "title": {"type": "plain_text", "text": "Confirmation"},
                    "text": {
                        "type": "mrkdwn",
                        "text": "Are you sure you want to approve?",
                    },
                    "confirm": {"type": "plain_text", "text": "Yes"},
                    "deny": {"type": "plain_text", "text": "No"},
                },
            },
            {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": ":neutral_face:Nothing",
                    "emoji": True,
                },
                "value": RateAction.RETRY,
                "action_id": "rating-" + RateAction.RETRY,
                "confirm": {
                    "title": {"type": "plain_text", "text": "Confirmation"},
                    "text": {
                        "type": "mrkdwn",
                        "text": "Are you sure you want to retry?",
                    },
                    "confirm": {"type": "plain_text", "text": "Yes"},
                    "deny": {"type": "plain_text", "text": "No"},
                },
            },
            {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": ":dizzy_face:Forbidden",
                    "emoji": True,
                },
                "value": RateAction.DENY,
                "action_id": "rating-" + RateAction.DENY,
                "confirm": {
                    "title": {"type": "plain_text", "text": "Confirmation"},
                    "text": {
                        "type": "mrkdwn",
                        "text": "Are you sure you want to deny?",
                    },
                    "confirm": {"type": "plain_text", "text": "Yes"},
                    "deny": {"type": "plain_text", "text": "No"},
                },
            },
        ],
    },
]


def handle_rating_event(action_value: str, json_event):
    channel_id = json_event["channel"]["id"]
    thread_ts = json_event["message"]["ts"]
    trigger_id = json_event["trigger_id"]
    if action_value == RateAction.APPROVE:
        slack_client.views_open(trigger_id=trigger_id, view=create_qa_view_payload)
    elif action_value == RateAction.RETRY:
        response_text = "Should retry to summary again."
        slack_client.chat_postMessage(channel=channel_id, thread_ts=thread_ts, text=response_text)
    elif action_value == RateAction.DENY:
        response_text = "Should delete bad summaries in the qa_summary.json file."
        slack_client.chat_postMessage(channel=channel_id, thread_ts=thread_ts, text=response_text)


create_qa_view_payload = {
    "type": "modal",
    "title": {"type": "plain_text", "text": "Create FAQ"},
    "submit": {"type": "plain_text", "text": "Submit"},
    "blocks": [
        {
            "type": "input",
            "element": {
                "type": "plain_text_input",
                "action_id": "question_input",
                "placeholder": {"type": "plain_text", "text": "FAQ question here"},
                "initial_value": "possible question(test)",  # TODO: possible question
            },
            "label": {"type": "plain_text", "text": "Question"},
        },
        {
            "type": "input",
            "element": {
                "type": "plain_text_input",
                "action_id": "answer_input",
                "multiline": True,
                "placeholder": {"type": "plain_text", "text": "FAQ answer here"},
                # "initial_value": "possible answer(test)", # TODO: possible answer
            },
            "label": {"type": "plain_text", "text": "Answer"},
        },
    ],
}


# def handle_create_qa_event(action_value: str, json_event):
#     channel_id = json_event["channel"]["id"]
#     thread_ts = json_event["message"]["ts"]
#     if action_value == RateAction.APPROVE:
#         response_text = "Should import thread's summary and regerate a better qa_summary.json file."
#         slack_client.chat_postMessage(channel=channel_id, thread_ts=thread_ts, text=response_text)
#     elif action_value == RateAction.RETRY:
#         response_text = "Should retry to summary again."
#         slack_client.chat_postMessage(channel=channel_id, thread_ts=thread_ts, text=response_text)
#     elif action_value == RateAction.DENY:
#         response_text = "Should delete bad summaries in the qa_summary.json file."
#         slack_client.chat_postMessage(channel=channel_id, thread_ts=thread_ts, text=response_text)
