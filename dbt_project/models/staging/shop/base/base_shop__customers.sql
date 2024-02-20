-- base_shop__customers.sql
WITH source AS (
    SELECT
        *
    FROM
        {{ ref('raw_shop_customers') }}
),
customers AS (
    SELECT
        id AS customer_id,
        first_name,
        last_name
    FROM
        source
)
SELECT
    *
FROM
    customers
