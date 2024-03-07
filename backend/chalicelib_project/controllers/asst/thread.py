import json
import time
from openai import OpenAI


class Thread:
    def __init__(self, client: OpenAI, assistant_id, functions={}):
        self.assistant_id = assistant_id
        self.functions = functions
        self.client = client
        self.thread = None
        self.run = None

    def create_thread(self):
        try:
            thread = self.client.beta.threads.create()
            self.thread = thread
            return thread
        except Exception as error:
            print("Error creating thread:", error)
            raise

    def create_user_message(self, content):
        try:
            message = self.client.beta.threads.messages.create(
                self.thread.id, role="user", content=content
            )
            return message
        except Exception as error:
            print("Error creating user message:", error)
            raise

    def create_system_message(self, content):
        try:
            message = self.client.beta.threads.messages.create(
                self.thread.id, role="user", content=content
            )
            return message
        except Exception as error:
            print("Error creating user message:", error)
            raise

    def run_thread(self, instructions=""):
        try:
            run = self.client.beta.threads.runs.create(
                self.thread.id,
                assistant_id=self.assistant_id,
                instructions=instructions,
            )
            self.run = run
            self.poll_run()
        except Exception as error:
            print("Error running thread:", error)
            raise

    def get_messages(self):
        try:
            messages = self.client.beta.threads.messages.list(
                self.thread.id, order="asc"
            )
            messages = messages.data

            # Now, iterate over the messages and extract the content.
            extracted_messages = []
            for message in messages:
                extracted_text = ""
                for content in message.content:
                    if content.type == "text":
                        extracted_text += content.text.value
                extracted_messages.append(
                    {"role": message.role, "text": extracted_text}
                )
            return extracted_messages
        except Exception as error:
            print("Error getting messages:", error)
            raise

    def poll_run(self):
        try:
            self.run = self.client.beta.threads.runs.retrieve(
                self.run.id, thread_id=self.thread.id
            )
            while self.run.status not in [
                "expired",
                "completed",
                "failed",
                "cancelled",
            ]:
                print(f"Current status: {self.run.status}")
                # check for function call
                if self.run.status == "requires_action":
                    tool_outputs = []
                    for (
                        tool_call
                    ) in self.run.required_action.submit_tool_outputs.tool_calls:
                        function = tool_call.function
                        args = json.loads(function.arguments)
                        tool_outputs.append(
                            {
                                "tool_call_id": tool_call.id,
                                "output": self.functions[function.name](**args),
                            }
                        )
                    self.run = self.client.beta.threads.runs.submit_tool_outputs(
                        thread_id=self.thread.id,
                        run_id=self.run.id,
                        tool_outputs=tool_outputs,
                    )
                self.run = self.client.beta.threads.runs.retrieve(
                    self.run.id, thread_id=self.thread.id
                )
                time.sleep(2)
            print(f"Final status: {self.run.status}")
            if self.run.status == "failed":
                print("Run failed", self.run.last_error)
        except Exception as error:
            print("Error polling run status:", error)
            raise
