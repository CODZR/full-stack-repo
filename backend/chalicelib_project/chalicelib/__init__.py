import os

from chalice.app import Response, Chalice
from chalice import CORSConfig

CHALICE_APP_NAME = os.environ.get("CHALICE_APP_NAME", "vira-dev")

SLACK_RESPOND_MESSAGE_QUEUE_NAME = f"{CHALICE_APP_NAME}-slack-respond-message"

EMPTY_RESPONSE = Response(body="", status_code=204)

is_dev = CHALICE_APP_NAME == "vira-dev"


app = Chalice(app_name=CHALICE_APP_NAME)
logger = app.log

local_cors_config = CORSConfig(
    allow_origin="http://localhost:8001",
    max_age=600,
    expose_headers=["X-Amzn-Trace-Id"],
    allow_credentials=True,
)
