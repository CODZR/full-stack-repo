-- base_shop__deleted_customers.sql

with source as (

    select * from {{ ref('raw_delete_customers') }}

),

deleted_customers as (

    select
        id as customer_id

    from source

)

select * from deleted_customers