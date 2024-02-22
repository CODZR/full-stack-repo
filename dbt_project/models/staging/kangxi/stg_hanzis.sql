{{ config(
  materialized = 'table',
  unique_key = 'hanzi_id',
  schema = 'kangxi'
) }}

SELECT
  id AS hanzi_id,
  zi,
  pinyin
FROM
  {{ ref('raw_hanzis') }}
