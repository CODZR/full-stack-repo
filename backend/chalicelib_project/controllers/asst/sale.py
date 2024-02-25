import os

from ..slack.message import Message
from core.openai import client
import json

from .assistant import Assistant, AssistantParams, Tool, ToolType
from .functions.sale import qaSummary

from .thread import Thread
from .utils import jsonl_to_json, json_to_jsonl

from .instructions import sale_qa_instruction
from core.slack.constants import AT_CHARGE_PERSON_MSG


def create_sale_assistant(assistant: Assistant) -> Assistant:
    cur_path = os.getcwd()
    json_file_path = os.path.join(cur_path, "static/asst/files/qa_summary.json")
    with open(json_file_path, "rb") as f:
        file = client.files.create(file=f, purpose="assistants")

    function_path = os.path.join(cur_path, "static/asst/functions/qa_summary_function.json")
    with open(function_path, "r") as f:
        assistant_function = json.load(f)

    params = AssistantParams(
        model="gpt-4-1106-preview",
        name="Test Product QA Organization Assistant",
        description="A helpful assistant to anwser product questions according to QA file.",
        instructions=sale_qa_instruction,
        tools=[
            Tool(type=ToolType.function, function=assistant_function),
            Tool(type=ToolType.code_interpreter),
            Tool(type=ToolType.retrieval),
        ],
        metadata={"assistant_type": "product_qa"},
        file_ids=[file.id],
    )

    return assistant.create_assistant(params)


def get_sale_assistant():
    # fetch available assistants to see if we already have an product qa Assistant.
    my_assistants = client.beta.assistants.list(
        order="desc",
        limit="20",
    )

    sale_assistants = [a for a in my_assistants.data if a.metadata.get("assistant_type") == "product_qa"]
    if len(sale_assistants) > 0:
        assistant = sale_assistants[0]
        print("fetched sale assistant:", assistant.id)
    else:
        print("creating new sale assistant")
        assistant = Assistant(client)
        assistant = create_sale_assistant(assistant)

    return assistant


def get_sale_thread_msgs(text, system_prompt=""):
    assistant = get_sale_assistant()
    asst_id = assistant.id
    # create a new thread
    functions = {"qaSummary": qaSummary}
    thread = Thread(client, asst_id, functions=functions)
    thread.create_thread()

    if system_prompt:
        thread.create_system_message(system_prompt)

    thread.create_user_message(text)
    thread.run_thread()
    messages = thread.get_messages()
    return messages


def get_last_reply_msg(query: str, system_prompt=""):
    messages = get_sale_thread_msgs(query, system_prompt)
    last_message = messages[len(messages) - 1] if messages else None
    # reply last ai message or @chargePerson once
    if last_message["role"] == "user":
        if AT_CHARGE_PERSON_MSG not in last_message["text"]:
            return AT_CHARGE_PERSON_MSG
        return ""
    else:
        return last_message["text"]
