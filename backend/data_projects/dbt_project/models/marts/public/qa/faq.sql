{{ config(
  materialized = 'table',
  unique_key = 'id',
) }}

SELECT
  id,
  question,
  answer
FROM
  {{ ref('raw_faqs') }}
