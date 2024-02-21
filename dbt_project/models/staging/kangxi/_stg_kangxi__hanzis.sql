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
    id :: INT AS hanzi_id,
    zi :: VARCHAR(250),
    pinyin :: VARCHAR(250),
    bushou :: VARCHAR(250),
    bushoubh :: INT,
    zbh :: INT,
    kxzdbh :: VARCHAR(250),
    wb86 :: VARCHAR(250),
    wb96 :: VARCHAR(250),
    UNICODE :: VARCHAR(250),
    hzwx :: VARCHAR(250),
    jxyy :: VARCHAR(250),
    cyz :: VARCHAR(250),
    xmx :: VARCHAR(250),
    bsdx :: VARCHAR(250),
    jbjs :: text,
    xhzdxxjs :: text,
    hydzdjs :: text,
    kxzdjs :: text,
    swjzxj :: text,
    swjzxjpic :: VARCHAR(250),
    zyybpic :: text,
    xgsf :: text,
    xgcy :: text,
    xgchengyu :: text,
    xgsc :: text,
    kxzdpic :: VARCHAR(250)
  FROM
    source
)
SELECT
  *
FROM
  renamed
