import os
import boto3

from slack_sdk import WebClient

# SLACK_BOT_TOKEN = boto3.client("ssm").get_parameter(Name="/vira/slack_bot_token", WithDecryption=True)["Parameter"][
#     "Value"
# ]

# SLACK_SIGN_SECRET = boto3.client("ssm").get_parameter(Name="/vira/slack_sign_secret", WithDecryption=True)["Parameter"][
#     "Value"
# ]

SLACK_BOT_TOKEN = os.getenv("SLACK_BOT_TOKEN")
SLACK_SIGN_SECRET = os.getenv("SLACK_SIGNING_SECRET")


slack_client = WebClient(token=SLACK_BOT_TOKEN)
