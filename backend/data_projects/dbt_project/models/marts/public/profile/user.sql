{{ config(
  materialized = 'table',
  unique_key = 'id',
) }}

SELECT
  id,
  email,
  is_active,
  is_superuser,
  full_name,
  hashed_password
FROM
  {{ ref('raw_users') }}
