{{ config(
  materialized = 'table',
  unique_key = 'id',
) }}

SELECT
  id,
  question,
  answer,
  1 AS owner_id
FROM
  {{ ref('raw_faqs') }}
