{{ config(
  materialized = 'table',
  sort = 'id',
) }}
{# {{ config(
materialized = 'incremental',
unique_key = 'id',
schema = 'kangxi',
sort = 'id',
on_schema_change = "fail"
) }}
#}

SELECT
  id,
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
