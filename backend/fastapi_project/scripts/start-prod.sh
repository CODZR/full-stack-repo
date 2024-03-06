#!/usr/bin/env bash

set -e

HOST=${HOST:-"0.0.0.0"}
PORT=${PORT:-"7001"}
BIND=${BIND:-"$HOST:$PORT"}
WORKERS_PER_CORE=${WORKERS_PER_CORE:-"1"}
MAX_WORKERS=${MAX_WORKERS}
WEB_CONCURRENCY=${WEB_CONCURRENCY}
GRACEFUL_TIMEOUT=${GRACEFUL_TIMEOUT:-"120"}
TIMEOUT=${TIMEOUT:-"120"}
KEEP_ALIVE=${KEEP_ALIVE:-"5"}
LOG_LEVEL=${LOG_LEVEL:-"info"}

# Calculate web concurrency
CORES=$(nproc)
DEFAULT_WEB_CONCURRENCY=$((WORKERS_PER_CORE * CORES + 1))
WEB_CONCURRENCY=${WEB_CONCURRENCY:-$DEFAULT_WEB_CONCURRENCY}
if [ -n "$MAX_WORKERS" ]; then
    WEB_CONCURRENCY=$(($WEB_CONCURRENCY < $MAX_WORKERS ? $WEB_CONCURRENCY : $MAX_WORKERS))
fi

# Gunicorn配置变量
loglevel=$LOG_LEVEL
workers=$WEB_CONCURRENCY
bind=$BIND
# worker_tmp_dir="/dev/shm"
worker_tmp_dir="./shm"
graceful_timeout=$GRACEFUL_TIMEOUT
timeout=$TIMEOUT
keepalive=$KEEP_ALIVE
logconfig=${LOG_CONFIG:-"./logging_prod.ini"}

echo "Local Server started"
# Start Gunicorn
exec gunicorn -w $workers --bind $bind --worker-tmp-dir $worker_tmp_dir --graceful-timeout $graceful_timeout --timeout $timeout --keep-alive $keepalive --log-level $loglevel --log-config $logconfig
