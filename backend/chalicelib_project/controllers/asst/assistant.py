from enum import Enum
from typing import List, Dict, Union, Any, Optional
from pydantic import BaseModel, Field


class Function(BaseModel):
    name: str
    description: str
    parameters: Dict[Any, Any]


class ToolType(str, Enum):
    function = "function"
    code_interpreter = "code_interpreter"
    retrieval = "retrieval"


class Tool(BaseModel):
    type: ToolType
    function: Optional[Dict] = None


class AssistantParams(BaseModel):
    model: str = Field(..., description="ID of the model to use.")
    name: Optional[str] = Field(
        None, max_length=256, description="The name of the assistant."
    )
    description: Optional[str] = Field(
        None, max_length=512, description="The description of the assistant."
    )
    instructions: Optional[str] = Field(
        None,
        max_length=32768,
        description="The system instructions that the assistant uses.",
    )
    tools: Optional[List[Tool]] = Field(
        None, description="A list of tool enabled on the assistant."
    )
    file_ids: Optional[List[str]] = Field(
        None, description="A list of File IDs attached to this assistant."
    )
    metadata: Optional[dict] = Field(
        None, description="Set of 16 key-value pairs that can be attached to an object."
    )


class Assistant:
    def __init__(self, client):
        self.client = client

    def create_assistant(self, params: AssistantParams):
        assistant = self.client.beta.assistants.create(
            name=params.name or "",
            description=params.description or "",
            instructions=params.instructions or "",
            tools=[
                {"type": tool.type.value, "function": tool.function}
                for tool in params.tools
            ]
            or [],
            model=params.model or "gpt-4-1106-preview",
            file_ids=params.file_ids or [],
            metadata=params.metadata or {},
        )
        return assistant

    def get_assistant(self, assistant_id):
        assistant = self.client.beta.assistants.retrieve(assistant_id)
        return assistant
