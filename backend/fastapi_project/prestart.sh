#! /usr/bin/env bash

# Let the DB start
python ./app/pre-start/backend_pre_start.py

# Run migrations
alembic upgrade head

# Create initial data in DB
python ./app/pre-start/initial_data.py
