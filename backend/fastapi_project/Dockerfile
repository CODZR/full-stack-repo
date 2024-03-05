FROM python:3.10

RUN mkdir /fastapi_project
WORKDIR /fastapi_project


# Install Poetry
RUN curl -sSL https://install.python-poetry.org | POETRY_HOME=/opt/poetry python && \
    cd /usr/local/bin && \
    ln -s /opt/poetry/bin/poetry && \
    poetry config virtualenvs.create true

COPY ./pyproject.toml ./poetry.lock* /fastapi_project/
# Allow installing dev dependencies to run tests
RUN poetry install --only main 

COPY ./app /fastapi_project/app
COPY ./scripts /fastapi_project/scripts
COPY ./gunicorn /fastapi_project/gunicorn


RUN poetry run uvicorn app.main:app --port=7001 --reload
# 启动Gunicorn
# RUN chmod +x /fastapi_project/scripts/*
# CMD ["./scripts/start-local.sh"]
