import json
from textwrap import dedent
from typing import List
from ..slack.message import Message
from .sale import get_last_reply_msg
from core.slack.constants import AT_CHARGE_PERSON_MSG
from controllers.slack import slack_client
from .utils import build_summary_prompt
from core.openai import OpenAIResponder
from controllers.chat.utils import get_final_completion


def get_reply_from_assistant(query) -> str:
    qa_prompt = dedent(
        """\
        Here are the steps for you to perform the task:\
        1. Record the user’s question user_text = {query} \
        2. Initialize the answer array answer_arr[].\
        3. Traverse the qa_summary.json file, which contains a series of data objects in the format {Q: ‘’, A: ‘’, “metadata”: {}}. Compare the Q in each data object to the user question user_text. If it is very similar, the data object is added to the answer array answer_arr[].\
        4. After completing the traversal, check the answer array answer_arr[]. If the array is empty, it means that no matching questions and answers are found, then no answers are provided and the operation ends.\
        5. If the answer array answer_arr[] contains data objects, the format is [{Q: ‘’, A: ‘’, “metadata”: {}}, {Q: ‘’, A: ‘’, “metadata”: { }}], then traverse answer_arr[], extract A from each data object, and splice all A in order to form the final answer, final_answer, in the format: 1. A 2. A 3. A."""
    )
    reply_content = get_last_reply_msg(query, qa_prompt) or AT_CHARGE_PERSON_MSG
    return reply_content


def summary_assistant_msg(message: Message, history: List[Message]) -> str:
    responder = OpenAIResponder()
    query = "Please help to summarize the conversation of the current thread's history messages."
    summary_prompt = build_summary_prompt(responder=responder, history=history)
    print(f"row: 28 - col: 5 summary_prompt -> {summary_prompt}")

    completion = responder.get_completion(summary_prompt)
    answer = get_final_completion(completion)

    return answer


def reply_asst_msg_now(query: str, channel_id: str, reply_ts: str) -> None:
    asst_reply_msg = get_reply_from_assistant(query)
    blocks = [
        {
            "type": "section",
            "text": {
                "type": "plain_text",
                "text": ":robot_face: Assistant:",
                "emoji": True,
            },
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": f"*Question:*\n{query}\n*Answer:*\n{asst_reply_msg}",
            },
        },
    ]
    slack_client.chat_postMessage(channel=channel_id, thread_ts=reply_ts, blocks=blocks, text="")
