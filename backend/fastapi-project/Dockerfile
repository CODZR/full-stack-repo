FROM python:3.10

WORKDIR /fastapi-project

# Install Poetry
RUN curl -sSL https://install.python-poetry.org | POETRY_HOME=/opt/poetry python && \
    cd /usr/local/bin && \
    ln -s /opt/poetry/bin/poetry && \
    poetry config virtualenvs.create true

COPY ./ /fastapi-project

# Allow installing dev dependencies to run tests
RUN poetry install --only main 

RUN poetry run gunicorn --forwarded-allow-ips "*" -k uvicorn.workers.UvicornWorker -w 2 --bind 0.0.0.0:7001 --log-level info --log-config ./logging_prod.ini app.main:app 
# 启动Gunicorn
# RUN chmod +x /fastapi-project/scripts/*
# CMD ["./scripts/start-local.sh"]
