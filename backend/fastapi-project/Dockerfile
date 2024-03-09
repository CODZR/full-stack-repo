FROM python:3.10

ENV POSTGRES_SERVER=host.docker.internal

WORKDIR /fastapi-project

# Install Poetry
RUN curl -sSL https://install.python-poetry.org | POETRY_HOME=/opt/poetry python && \
    cd /usr/local/bin && \
    ln -s /opt/poetry/bin/poetry && \
    poetry config virtualenvs.create true


COPY ./ /fastapi-project

# Allow installing dev dependencies to run tests
RUN poetry install --only main 

# RUN poetry run gunicorn -c ./config/gunicorn.conf app.main:app
# CMD ["poetry", "run", "gunicorn", "-c", "./config/gunicorn.conf", "app.main:app"]
RUN poetry run supervisord -c ./config/supervisord_prod.conf

