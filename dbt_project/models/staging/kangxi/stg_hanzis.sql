{# 
{% set schema='kangxi' %}
{% set table_name = 'hanzis' %}

{{
  config(
    materialized='table',
    schema='kangxi'
  )
}}


{% set table_exists=source(schema, table_name) is not none %}

{% set columns = [
    {"name": "id", "type": "INT(11)", "constraints": "NOT NULL auto_increment", "comment": "字"},
    {"name": "zi", "type": "VARCHAR(250)", "constraints": "NOT NULL", "comment": "字"},
    {"name": "pinyin", "type": "VARCHAR(250)", "constraints": "NOT NULL", "comment": "拼音"},
    {"name": "bushou", "type": "VARCHAR(250)", "constraints": "NOT NULL", "comment": "部首"},
    {"name": "bushoubh", "type": "INT(11)", "constraints": "NOT NULL", "comment": "部首笔画"},
    {"name": "zbh", "type": "INT(11)", "constraints": "NOT NULL", "comment": "总笔画"},
    {"name": "kxzdbh", "type": "VARCHAR(250)", "constraints": "NOT NULL", "comment": "康熙字典笔画"},
    {"name": "wb86", "type": "VARCHAR(250)", "constraints": "NOT NULL", "comment": "五笔86"},
    {"name": "wb96", "type": "VARCHAR(250)", "constraints": "NOT NULL", "comment": "五笔98"},
    {"name": "unicode", "type": "VARCHAR(250)", "constraints": "NOT NULL", "comment": "UniCode"},
    {"name": "hzwx", "type": "VARCHAR(250)", "constraints": "NOT NULL", "comment": "汉子五行"},
    {"name": "jxyy", "type": "VARCHAR(250)", "constraints": "NOT NULL", "comment": "吉凶寓意"},
    {"name": "cyz", "type": "VARCHAR(250)", "constraints": "NOT NULL", "comment": "是否为常用字"},
    {"name": "xmx", "type": "VARCHAR(250)", "constraints": "NOT NULL", "comment": "姓名学"},
    {"name": "bsdx", "type": "VARCHAR(250)", "constraints": "NOT NULL", "comment": "笔顺读写"},
    {"name": "jbjs", "type": "mediumtext", "constraints": "NOT NULL", "comment": "基本解释"},
    {"name": "xhzdxxjs", "type": "longtext", "constraints": "NOT NULL", "comment": "新华字典详细解释"},
    {"name": "hydzdjs", "type": "longtext", "constraints": "NOT NULL", "comment": "汉语大字典解释"},
    {"name": "kxzdjs", "type": "longtext", "constraints": "NOT NULL", "comment": "康熙字典解释"},
    {"name": "swjzxj", "type": "longtext", "constraints": "NOT NULL", "comment": "说文解字详解"},
    {"name": "swjzxjpic", "type": "VARCHAR(250)", "constraints": "NOT NULL", "comment": "说文解字详解图片"},
    {"name": "zyybpic", "type": "mediumtext", "constraints": "NOT NULL", "comment": "字源演变图片"},
    {"name": "xgsf", "type": "mediumtext", "constraints": "NOT NULL", "comment": "相关书法"},
    {"name": "xgcy", "type": "mediumtext", "constraints": "NOT NULL", "comment": "相关词语"},
    {"name": "xgchengyu", "type": "mediumtext", "constraints": "NOT NULL", "comment": "相关成语"},
    {"name": "xgsc", "type": "mediumtext", "constraints": "NOT NULL", "comment": "相关诗词"},
    {"name": "kxzdpic", "type": "VARCHAR(250)", "constraints": "NOT NULL", "comment": "康熙字典原图"}
] %}

{% if table_exists %}

CREATE TABLE `{{ table_name }}` (
      {%- for column in columns %}
      `{{ column.name }}` {{ column.type }} {{ column.constraints }} COMMENT '{{ column.comment }}'{{ "," if not loop.last }}
      {%- endfor %}
  );
{{ log("Table does exist", info=True) }}
  
{% else %}

{{ log("Table does not exist", info=True) }}

{% endif %}
 #}
