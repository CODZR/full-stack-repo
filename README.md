# dbt + dagster + postgres + poetry


## sqlfluff + pre-commit
This repo also uses [sqlfluff](https://docs.sqlfluff.com/en/stable/index.html) and
[pre-commit](https://pre-commit.com/) to lint and fix .sql files.

*more head taps*

It even has a [basic sqlfuff lint setup](https://github.com/sqlfluff/sqlfluff-github-actions/tree/main/menu_of_workflows/sunrise_movement)
in a GitHub Actions CI pipeline.

## Instructions
If you want to run the code, it's quite simple:

```bash
# clone this repo
cd dbt-duckdb-poetry
poetry install --no-root && poetry shell
dbt build && dbt docs generate && dbt docs serve
```

## Requirements
The only requirements are:
- python (v3.10 or higher)
- poetry (I'm currently using v1.6.1)
