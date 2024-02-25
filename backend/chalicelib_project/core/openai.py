import os
import boto3
import json
import numpy as np
from openai import OpenAI
import re

from typing import Optional, Generator

from chalicelib import logger
from controllers.chat import Prompt, Completion, Responder

# OPENAI_API_KEY = boto3.client("ssm").get_parameter(Name="/vira/openai_api_key", WithDecryption=True)["Parameter"][
#     "Value"
# ]
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

client = OpenAI(api_key=OPENAI_API_KEY)


class OpenAIChatCompletion(Completion):
    def __init__(self, raw: Completion):
        self.__raw = raw

        choices = self.__raw.choices or []
        if len(choices) == 0:
            self.__content = None
        else:
            choice = choices[0]
            if hasattr(choice, "delta") and choice.delta:
                self.__content = choice.delta.content
            elif hasattr(choice, "message") and choice.message:
                self.__content = choice.message.content
            else:
                self.__content = None

    def __str__(self) -> str:
        return self.__raw.model_dump_json(indent=2)

    @property
    def content(self) -> Optional[str]:
        return self.__content


class OpenAIResponder(Responder):
    def __init__(
        self,
        *,
        model: str = "gpt-3.5-turbo",
        stream: bool = False,
        temperature: float = 0.0,
    ):
        self.model = model
        self.stream = stream
        self.temperature = temperature

    def get_completion(self, prompt: Prompt) -> Generator[Completion, None, None]:
        messages = [x.__dict__ for x in prompt.entries]

        logger.info(f"Sending prompt to OpenAI: {prompt}")

        result = client.chat.completions.create(
            model=self.model,
            stream=self.stream,
            temperature=self.temperature,
            messages=messages,
        )

        if self.stream:
            counter = 0
            for c in result:
                counter += 1
                cc = OpenAIChatCompletion(c)
                if cc.content is not None:
                    yield cc

            logger.info(f"Received {counter} streaming responses from OpenAI.")
        else:
            logger.info(f"Received response from OpenAI: {result}")
            yield OpenAIChatCompletion(result)

    def exceeds_token_limit(self, prompt: Prompt) -> bool:
        # TODO(jiulongw): use real tokenizer
        estimated_tokens = 0
        for e in prompt.entries:
            content = e.role + ": " + e.content
            words = re.findall(r"\b\w+\b", content)
            estimated_tokens += len(words) * 4 / 3

        return estimated_tokens > 2048


class OpenAICompareSimilarityEmbedding:
    def __init__(self, model="text-similarity-davinci-001"):
        self._model = model

    def compare_sentence_similarity(self, sentence1: str, sentence2: str) -> float:
        resp = client.embeddings.create(input=[sentence1, sentence2], model=self._model)
        embedding_a = resp.data[0].embedding
        embedding_b = resp.data[1].embedding

        similarity_score = np.dot(embedding_a, embedding_b)

        return similarity_score
