#!/usr/bin/env bash

set -e

DEFAULT_MODULE_NAME="app.main"
DEFAULT_VARIABLE_NAME="app"
DEFAULT_HOST="127.0.0.1"
DEFAULT_PORT=7001
DEFAULT_LOG_LEVEL="info"
DEFAULT_LOG_CONFIG="./config/logging.ini"

APP_MODULE=${APP_MODULE:-"$DEFAULT_MODULE_NAME:$DEFAULT_VARIABLE_NAME"}

HOST=${HOST:-$DEFAULT_HOST}
export PORT=${PORT:-$DEFAULT_PORT}
LOG_LEVEL=${LOG_LEVEL:-$DEFAULT_LOG_LEVEL}
LOG_CONFIG=${LOG_CONFIG:-$DEFAULT_LOG_CONFIG}

# Start Uvicorn with live reload
echo poetry run uvicorn --reload --proxy-headers --host $HOST --port $PORT --log-config $LOG_CONFIG "$APP_MODULE" --log-level $LOG_LEVEL
exec poetry run uvicorn --reload --proxy-headers --host $HOST --port $PORT --log-config $LOG_CONFIG "$APP_MODULE" --log-level $LOG_LEVEL
