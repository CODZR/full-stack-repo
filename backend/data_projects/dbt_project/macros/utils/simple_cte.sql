{% macro simple_cte(tuple_list, general_cutoff=None) %}

{# For each list in tuple list:
        list[0](required): The alias of the table to be referenced
        list[1](required): The original name of the table to be referenced
        list[2](optional, but required for incremental): The column name of the table to be referenced to filter the timestamp,
                            Only need this value for incremental
        list[3](optional even if incremental): The custom cutoff timestamp for this referenced table. Need this field
                            when incremental and this talbe doesn't use general cutoff.
    general_cutoff(optional, but required for incremental): The global calculated cutoff timestamp for incremental
  #}

with {% for cte_ref in tuple_list %} {{ cte_ref[0] }} as (

    select
        *
    from
        {{ ref(cte_ref[1]) }}
    {% if is_incremental() and cte_ref|length == 3 and general_cutoff is not none%}
    where
        {{ cte_ref[2] }} > {{ general_cutoff }}
    {% elif is_incremental() and cte_ref|length == 4 %}
    where
        {{ cte_ref[2] }} > {{ cte_ref[3] }}
    {% endif %}

)
    {%- if not loop.last -%}
    ,
    {% endif %}

    {% endfor %}

{% endmacro %}
