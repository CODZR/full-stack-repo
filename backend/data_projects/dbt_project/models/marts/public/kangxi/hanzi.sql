{{ config(
  materialized = 'table',
  sort = 'id',
) }}

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
