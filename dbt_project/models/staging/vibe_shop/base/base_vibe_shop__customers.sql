-- base_vibe_shop__customers.sql

with

source as (

    select * from {{ source('vibe_shop', 'raw_customers') }}

),

customers as (

    select
        id as customer_id,
        first_name,
        last_name

    from source

)

select * from customers