{{ config(
  materialized = 'table',
  unique_key = 'id',
) }}

WITH public_user AS (

  SELECT
    id AS user_id
  FROM
    {{ ref('user') }}
)
SELECT
  id,
  question,
  answer
FROM
  {{ ref('raw_faqs') }}
  public_faq
  LEFT JOIN public_user
  ON public_faq.id = public_user.user_id
