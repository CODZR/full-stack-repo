{{ config(
    materialized = 'table',
    schema = 'staging'
) }}

SELECT
    *
FROM
    {{ ref('stg_postcard__transactions_main') }}
UNION ALL
SELECT
    *
FROM
    {{ ref('stg_postcard__transactions_resellers_csv') }}
UNION ALL
SELECT
    *
FROM
    {{ ref('stg_postcard__transactions_resellers_json') }}
