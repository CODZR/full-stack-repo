from typing import List

from controllers.slack.message import Message
from controllers.chat.prompt_builder import USER_MESSAGE_CONTEXT
from controllers.chat import Prompt, Responder

import json
import os


def jsonl_to_json(jsonl_file_path, json_file_path):
    if not os.path.exists(jsonl_file_path):
        print(f"JSONL file '{jsonl_file_path}' does not exist.")
        return

    json_list = []
    with open(jsonl_file_path, "r") as f:
        for line in f:
            json_obj = json.loads(line)
            json_list.append(json_obj)

    with open(json_file_path, "w") as f:
        json.dump(json_list, f)

    print(f"JSON file '{json_file_path}' created successfully.")


def json_to_jsonl(json_file_path, jsonl_file_path):
    if not os.path.exists(json_file_path):
        print(f"JSON file '{json_file_path}' does not exist.")
        return

    with open(json_file_path, "r") as f:
        json_list = json.load(f)

    with open(jsonl_file_path, "w") as f:
        for json_obj in json_list:
            json_line = json.dumps(json_obj)
            f.write(json_line + "\n")

    print(f"JSONL file '{jsonl_file_path}' created successfully.")


def build_summary_prompt(
    *,
    responder: Responder,
    history: List[Message] = [],
    system_message: str = "Your name is Vira, an expert with senior generalization skills.",
) -> Prompt:
    history_begin = 0
    history_end = len(history)

    formatted_history = [m.format_for_chat for m in history]

    def make_prompt(begin: int, end: int) -> Prompt:
        context = ""
        if begin < end:
            context = USER_MESSAGE_CONTEXT.format(context="\n---\n".join(formatted_history[begin:end]))

        prompt = Prompt()
        prompt.append("system", system_message)
        prompt.append("user", context)
        return prompt

    prompt = make_prompt(history_begin, history_end)

    while history_begin < history_end and responder.exceeds_token_limit(prompt):
        history_begin = (history_begin + history_end + 1) // 2
        prompt = make_prompt(history_begin, history_end)

    return prompt
