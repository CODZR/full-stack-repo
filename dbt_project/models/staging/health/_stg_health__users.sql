-- _stg_kangxi__hanzi.sql
WITH source AS (
  SELECT
    *
  FROM
    {{ ref('user') }}
),
renamed AS (
  SELECT
    id :: bigint AS user_id,
    username :: VARCHAR(50),
    password :: VARCHAR(32),
    phone :: VARCHAR(32),
    role :: VARCHAR(50),
)
SELECT
  *
FROM
  renamed
