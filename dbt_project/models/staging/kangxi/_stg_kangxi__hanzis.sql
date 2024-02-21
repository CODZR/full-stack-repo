-- _stg_kangxi__hanzi.sql
WITH source AS (
  SELECT
    *
  FROM
    {{ ref('hanzi') }}
),
renamed AS (
  SELECT
    -- ids
    id AS hanzi_id,
    zi,
    pinyin,
    bushou,
    bushoubh,
    zbh,
    kxzdbh,
    wb86,
    wb96,
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
    source
)
SELECT
  *
FROM
  renamed
