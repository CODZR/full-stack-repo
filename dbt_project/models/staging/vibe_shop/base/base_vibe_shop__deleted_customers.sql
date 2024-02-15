-- base_vibe_shop__deleted_customers.sql

with

source as (

    select * from {{ source('vibe_shop','delete_customers') }}

),

deleted_customers as (

    select
        id as customer_id,
        deleted as deleted_at

    from source

)

select * from deleted_customers