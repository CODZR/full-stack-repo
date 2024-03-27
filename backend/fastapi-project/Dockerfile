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

CMD ["poetry", "run", "supervisord", "-n", "-c", "./config/supervisord.prod.conf"]
