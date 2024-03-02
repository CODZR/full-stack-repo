{{ config(
  materialized = 'table',
  unique_key = 'id',
) }}

WITH public_user AS (

  SELECT
    id AS user_pk
  FROM
    {{ ref('user') }}
)
SELECT
  id,
  title,
  content,
  user_id,
  COALESCE(created_at, now()) AS created_at,
  COALESCE(updated_at, now()) AS updated_at
FROM
  {{ ref('raw_blogs') }}
  public_blog
  LEFT JOIN public_user
  ON public_blog.user_id = public_user.user_pk
