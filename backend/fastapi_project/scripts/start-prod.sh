#!/usr/bin/env bash

set -e

# Gunicorn配置变量
MODULE_NAME=${MODULE_NAME:-"app.main"}
VARIABLE_NAME=${VARIABLE_NAME:-"app"}
export APP_MODULE=${APP_MODULE:-"$MODULE_NAME:$VARIABLE_NAME"}
HOST=${HOST:-"0.0.0.0"}
export PORT=${PORT:-"7001"}
BIND=${BIND:-"$HOST:$PORT"}
LOG_LEVEL=${LOG_LEVEL:-"info"}
LOG_CONFIG=${LOG_CONFIG:-"./logging_prod.ini"}
WEB_CONCURRENCY=${WEB_CONCURRENCY:-"2"}
WORKER_CLASS=${WORKER_CLASS:-"uvicorn.workers.UvicornWorker"}


# Start Gunicorn
echo gunicorn --forwarded-allow-ips "*" -k "$WORKER_CLASS" -w $WEB_CONCURRENCY --bind $BIND --log-level $LOG_LEVEL --log-config $LOG_CONFIG "$APP_MODULE"
exec gunicorn --forwarded-allow-ips "*" -k "$WORKER_CLASS" -w $WEB_CONCURRENCY --bind $BIND --log-level $LOG_LEVEL --log-config $LOG_CONFIG "$APP_MODULE"

