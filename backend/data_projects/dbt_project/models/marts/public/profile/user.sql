{{ config(
  materialized = 'table',
  unique_key = 'id',
  indexes = [ {'columns': ['email'],
  'unique': True },]
) }}

SELECT
  id,
  email,
  username,
  password,
  role,
  COALESCE(created_at, now()) AS created_at,
  COALESCE(updated_at, now()) AS updated_at
FROM
  {{ ref('raw_users') }}
