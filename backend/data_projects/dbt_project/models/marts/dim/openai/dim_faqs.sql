{{ config(
  materialized = 'table',
  unique_key = 'id',
  schema = "qa"
) }}

WITH raw_user AS (

  SELECT
    id AS user_id
  FROM
    {{ ref('raw_users') }}
)
SELECT
  CAST(faq_id AS VARCHAR(64)) AS faq_id,
  question,
  answer,
  1 AS user_id
FROM
  {{ ref('stg_faqs') }}
  dim_faq
  LEFT JOIN raw_user
  ON dim_faq.faq_id = raw_user.user_id
