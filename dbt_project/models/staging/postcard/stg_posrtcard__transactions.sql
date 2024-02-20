{{ config(
    materialized = 'table',
    schema = 'staging'
) }}

SELECT
    *
FROM
    {{ ref('stg_transactions_main') }}
UNION ALL
SELECT
    *
FROM
    {{ ref('stg_transactions_resellers_csv') }}
UNION ALL
SELECT
    *
FROM
    {{ ref('stg_transactions_resellers_json') }}
