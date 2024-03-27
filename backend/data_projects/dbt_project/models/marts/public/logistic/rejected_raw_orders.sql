{{ config(
  materialized = 'view',
  unique_key = 'id',
  schema = 'logistic',
  on_delete: cascade
) }}

SELECT
  id,
  shopify_id,
  created_at,
  latest_ship_date,
  latest_delivery_date,
  email,
  note,
  shipping_phone,
  shipping_name,
  shipping_address1,
  shipping_address2,
  shipping_company,
  shipping_city,
  shipping_state,
  shipping_zip,
  shipping_country,
  order_from,
  marketplace,
  business_verification_required,
  finance_verification_required,
  cs_review_required,
  cs_verified,
  business_verified,
  finance_verified
FROM
  {{ ref(
    'stg_raw_orders'
  ) }}
  stg_raw_orders
WHERE
  (
    business_verified IS FALSE
    OR finance_verified IS FALSE
    OR cs_verified IS FALSE
  )
