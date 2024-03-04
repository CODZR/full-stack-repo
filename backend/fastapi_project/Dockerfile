FROM python:3.10

WORKDIR /fastapi_project/


RUN apt-get update && \
    apt-get install -y gcc libpq-dev && \
    apt clean && \
    rm -rf /var/cache/apt/*

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONIOENCODING=utf-8

COPY requirements/ /tmp/requirements

RUN pip install -U pip && \
    pip install --no-cache-dir -r /tmp/requirements/base.txt


COPY . /fastapi_project

RUN chmod +x /fastapi_project/scripts/*

CMD ["./scripts/start-prod.sh"]