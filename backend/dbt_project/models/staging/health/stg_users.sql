{{ config(
  materialized = 'table',
  unique_key = 'user_id',
  schema = 'health'
) }}

SELECT
  id AS user_id,
  username,
  password,
  phone,
  role
FROM
  {{ ref('raw_users') }}
