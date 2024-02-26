{% macro create_if_not_exists(
    database,
    schema,
    table,
    columns
  ) %}
  {%- set source_relation = adapter.get_relation(
    database = database,
    schema = schema,
    identifier = table
  ) -%}
  {% set table_exists = source_relation is not none %}
  {% if not table_exists %}
    CREATE TABLE {{ database }}.{{ schema }}.{{ table }}
    ({% for column in columns %}
      {% set col_constraints = column.constraints | default([]) %}
      {{ column.name }}
      {{ column.type }}

      {% if col_constraints %}
        {{ ', '.join(col_constraints) }}
      {% endif %}

      {% if not loop.last %},
      {% endif %}

      COMMENT {{ column.comment }}
    {% endfor %})
  {% endif %}
{% endmacro %}
