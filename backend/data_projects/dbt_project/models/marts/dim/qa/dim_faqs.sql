{{ config(
  materialized = 'view',
  unique_key = 'id',
  schema = "qa"
) }}

SELECT
  CAST(faq_id AS VARCHAR(64)) AS faq_id,
  question,
  answer
FROM
  {{ ref('stg_faqs') }}
