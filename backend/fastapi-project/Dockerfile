FROM python:3.10

ENV POSTGRES_SERVER=host.docker.internal

WORKDIR /fastapi-project

# Install Poetry using pip
RUN pip install poetry

COPY ./ /fastapi-project

# Allow installing dev dependencies to run tests
RUN poetry install --only main

CMD ["poetry", "run", "supervisord", "-n", "-c", "./config/supervisord.prod.conf"]
