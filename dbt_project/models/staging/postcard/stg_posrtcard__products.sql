{{ config(
    schema = 'staging'
) }}

WITH products AS (

    SELECT
        id AS product_id,
        NAME AS product_name,
        g.id AS geography_key,
        REPLACE(
            price,
            '$',
            ''
        ) :: numeric AS product_price,
        ROW_NUMBER() over (
            PARTITION BY product_id
            ORDER BY
                e.loaded_timestamp DESC
        ) AS rn
    FROM
        {{ ref('raw_products') }}
        e
        JOIN {{ ref('geography') }}
        g
        ON g.cityname = e.city
)
SELECT
    product_id,
    product_name,
    geography_key,
    product_price
FROM
    products
WHERE
    rn = 1
