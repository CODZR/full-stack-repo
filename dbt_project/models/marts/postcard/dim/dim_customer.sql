{{ config(
  materialized = 'table',
  unique_key = 'customer_key',
  schema = 'core'
) }}

SELECT
  customer_key,
  customer_first_name,
  customer_last_name,
  customer_email,
  sales_agent_key
FROM
  {{ ref('stg_postcard__customers') }}
