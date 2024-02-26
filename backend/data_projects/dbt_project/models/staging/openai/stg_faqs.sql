{{ config(
  materialized = 'view',
  unique_key = 'faq_id',
  schema = 'qa'
) }}

SELECT
  id AS faq_id,
  question,
  answer
FROM
  {{ ref('raw_faqs') }}
