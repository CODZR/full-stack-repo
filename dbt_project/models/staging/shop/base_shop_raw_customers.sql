WITH source AS (
    SELECT
        *
    FROM
        {{ ref('raw_shop_customers') }}
),
renamed AS (
    SELECT
        {{ adapter.quote("id") }},
        {{ adapter.quote("first_name") }},
        {{ adapter.quote("last_name") }}
    FROM
        source
)
SELECT
    *
FROM
    renamed
