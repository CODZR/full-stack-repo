import os

from dagster import Definitions, load_assets_from_modules, FilesystemIOManager
from dagster_dbt import DbtCliClientResource
from dagster_duckdb_pandas import DuckDBPandasIOManager

from dagster_project import assets
from dagster_project.assets import DBT_PROFILES, DBT_PROJECT_PATH

resources = {
    "dbt": DbtCliClientResource(
        project_dir=DBT_PROJECT_PATH,
        profiles_dir=DBT_PROFILES,
    ),
    "io_manager": FilesystemIOManager(
        base_dir="data"  # 相对路径，在 dagster dev 运行的文件夹下
    ),
}

defs = Definitions(assets=load_assets_from_modules([assets]), resources=resources)
