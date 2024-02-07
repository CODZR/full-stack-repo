## Refer to Using dbt with Dagster, part two for info about this file:
## https://docs.dagster.io/integrations/dbt/using-dbt-with-dagster/part-two

# /tutorial_template/dbt_jaffle_shop/__init__.py

import os

from dagster_dbt import DbtCliClientResource
from dagster_tutorial import assets
from dagster_tutorial.assets import DBT_PROFILES, DBT_PROJECT_PATH

from dagster_tutorial import Definitions, load_assets_from_modules


resources = {
    "dbt": DbtCliClientResource(
        project_dir=DBT_PROJECT_PATH,
        profiles_dir=DBT_PROFILES,
    ),
    "io_manager": duckdb_pandas_io_manager.configured(
        {"database": os.path.join(DBT_PROJECT_PATH, "tutorial.duckdb")}
    ),
}

# 这里有两个好处
# 1. 把 asset 和 resource 连接起来
# 2. 使用 load_assets_from_modules，可以自动地将我们创建的任何新 asset 引入项目，无需手动逐个添加
defs = Definitions(assets=load_assets_from_modules([assets]), resources=resources)
