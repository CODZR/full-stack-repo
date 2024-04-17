FROM python:3.10

# ENV POSTGRES_SERVER=120.55.86.100
ENV POSTGRES_SERVER=host.docker.internal

WORKDIR /data_projects

# Install Poetry using pip
RUN pip config set global.index-url https://mirrors.aliyun.com/pypi/simple/ \
    && pip install poetry

COPY ./ /data_projects

# Allow installing dev dependencies to run tests
RUN poetry install

# CMD ["poetry", "run", "--only", "main" ]
# CMD ["poetry", "run", "gunicorn", "-c", "./config/gunicorn.conf", "app.main:app"]
