#!/usr/bin/env bash

set -e

DEFAULT_MODULE_NAME=app.main
DEFAULT_VARIABLE_NAME=app
DEFAULT_GUNICORN_CONF=/fastapi_project/gunicorn/gunicorn_conf.py
DEFAULT_WORKER_CLASS=uvicorn.workers.UvicornWorker

export APP_MODULE=${APP_MODULE:-"$DEFAULT_MODULE_NAME:$DEFAULT_VARIABLE_NAME"}
export GUNICORN_CONF=${GUNICORN_CONF:-$DEFAULT_GUNICORN_CONF}
export WORKER_CLASS=${WORKER_CLASS:-DEFAULT_WORKER_CLASS}

echo "Prod Server started"
# Start Gunicorn
exec poetry run gunicorn --forwarded-allow-ips "*" -k "$WORKER_CLASS" -c "$GUNICORN_CONF" "$APP_MODULE"

