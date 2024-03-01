{{ config(
  materialized = 'table',
  unique_key = 'id',
) }}

{% set time_now = modules.datetime.datetime.utcnow() %}
WITH public_user AS (

  SELECT
    id AS user_id
  FROM
    {{ ref('user') }}
)
SELECT
  id,
  title,
  BODY,
  1 AS user_id,
  COALESCE(created_at, now()) AS created_at,
  COALESCE(updated_at, now()) AS updated_at
FROM
  {{ ref('raw_blogs') }}
  public_blog
  LEFT JOIN public_user
  ON public_blog.id = public_user.user_id
