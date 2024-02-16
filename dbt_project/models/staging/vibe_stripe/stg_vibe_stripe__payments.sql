-- stg_vibe_stripe__payments.sql

with

source as (

    select * from {{ source('vibe_stripe', 'raw_payments') }}

),

renamed as (

    select
        -- ids
        id as payment_id,
        order_id,

        -- strings
        payment_method,
        case
            when payment_method in ('stripe', 'paypal', 'credit_card', 'gift_card') then 'credit'
            else 'cash'
        end as payment_type,
        status,

        -- numerics
        amount as amount_cents,
        amount / 100.0 as amount,

        -- booleans
        case
            when status = 'successful' then true
            else false
        end as is_completed_payment,


    from source

)

select * from renamed