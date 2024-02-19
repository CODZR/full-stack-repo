with source as (
      select * from {{ ref('raw_customers') }}
),
renamed as (
    select
        {{ adapter.quote("id") }},
        {{ adapter.quote("first_name") }},
        {{ adapter.quote("last_name") }}

    from source
)
select * from renamed
  