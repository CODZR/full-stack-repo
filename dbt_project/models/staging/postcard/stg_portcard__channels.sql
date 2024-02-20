{{ config(
  schema = 'staging'
) }}

WITH stg_channels AS (

  SELECT
    channel_id,
    channel_name
  FROM
    {{ ref('raw_channels') }}
)
SELECT
  channel_id AS channel_key,
  channel_id AS original_channel_id,
  channel_name
FROM
  stg_channels
