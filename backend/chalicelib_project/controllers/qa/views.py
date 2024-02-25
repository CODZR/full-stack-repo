import asyncio
from chalicelib import app, logger, local_cors_config
from controllers.qa.utils import init_qa_system

from services.faq_service import FaqService

# from services.text_service import TextService


@app.lambda_function()
async def my_async_function(event, context):
    # 在这里编写您的异步代码
    await asyncio.sleep(1)


@app.route("/qa/test", methods=["GET"], cors=local_cors_config)
def test():
    my_async_function()
    response = client.lambda_.invoke("my_async_function", {})
    result = asyncio.get_event_loop().run_until_complete(response)
    return {"message": "Hello, Chalice with asyncio!"}


@app.route("/qa/faqs", methods=["POST", "GET"], cors=local_cors_config)
def path_faqs():
    logger.info("Received request at /faq ...")
    request = app.current_request
    if request.method == "POST":
        return FaqService.create_faq(request.json_body)
    elif request.method == "GET":
        return FaqService.get_faqs(request.query_params)


@app.route("/qa/faqs/{id}", methods=["GET", "PUT", "DELETE"], cors=local_cors_config)
def path_faqs_id(id: str):
    logger.info("Received request at /faq/{id} ...")
    request = app.current_request
    if request.method == "GET":
        return FaqService.get_faq(id)
    elif request.method == "PUT":
        return FaqService.update_faq(id, request.json_body)
    elif request.method == "DELETE":
        return FaqService.delete_faq(id)


@app.route("/qa/load-faqs", methods=["GET"], cors=local_cors_config)
def load_faqs_from_jsonl():
    init_qa_system(True)
    return "loaded"
