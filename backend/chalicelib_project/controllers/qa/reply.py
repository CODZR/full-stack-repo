from services.faq_service import FaqService
from controllers.asst.reply import get_reply_from_assistant
from controllers.slack import slack_client


def reply_faq_msg_now(query: str, channel_id: str, reply_ts: str) -> None:
    faq_reply_msg = FaqService.search_faqs(query)
    blocks = [
        {
            "type": "section",
            "text": {
                "type": "plain_text",
                "text": ":cubimal_chick: FAQ:",
                "emoji": True,
            },
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": f"*Question:*\n{query}\n*Answer:*\n{faq_reply_msg}",
            },
        },
    ]
    slack_client.chat_postMessage(channel=channel_id, thread_ts=reply_ts, blocks=blocks, text="")
