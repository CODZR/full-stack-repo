FROM python:3.10

ENV POSTGRES_SERVER=120.55.86.100
# ENV POSTGRES_SERVER=host.docker.internal

WORKDIR /fastapi-project

# Install Poetry using pip
RUN pip config set global.index-url https://mirrors.aliyun.com/pypi/simple/ \
    && pip install poetry

COPY ./ /fastapi-project
RUN mkdir /fastapi-project/run

# Allow installing dev dependencies to run tests
RUN poetry install --only main

# CMD ["poetry", "run", "gunicorn", "-c", "./config/gunicorn.conf", "app.main:app"]
CMD ["poetry", "run", "supervisord", "-n", "-c", "./config/supervisord.prod.conf"]
