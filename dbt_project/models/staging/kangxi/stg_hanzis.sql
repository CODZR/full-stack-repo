{{ config(
  materialized = 'table',
  schema = 'kangxi',
  sort = 'hanzi_id',
) }}
{# {{ config(
materialized = 'incremental',
unique_key = 'hanzi_id',
schema = 'kangxi',
sort = 'hanzi_id',
on_schema_change = "fail"
) }}
#}

SELECT
  id AS hanzi_id,
  zi,
  pinyin,
  bushou,
  bushoubh,
  zbh,
  kxzdbh,
  wb86,
  wb98,
  UNICODE,
  hzwx,
  jxyy,
  cyz,
  xmx,
  bsdx,
  jbjs,
  xhzdxxjs,
  hydzdjs,
  kxzdjs,
  swjzxj,
  swjzxjpic,
  zyybpic,
  xgsf,
  xgcy,
  xgchengyu,
  xgsc,
  kxzdpic
FROM
  {{ ref('raw_hanzis') }}
