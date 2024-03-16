{{ config(
  materialized = 'view',
  unique_key = 'id',
  schema = 'logistic'
) }}

WITH raw_order_attachments AS (

  SELECT
    *
  FROM
    {{ source(
      'log2_dev',
      'log2_raw_order_attachment'
    ) }}
)
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
  cs_review_required
FROM
  {{ ref(
    'stg_raw_orders'
  ) }}
  stg_raw_orders
  JOIN raw_order_attachments
  ON stg_raw_orders.id = raw_order_attachments.order_id
WHERE
  (
    raw_order_attachments.business_verified IS FALSE
    OR raw_order_attachments.finance_verified IS FALSE
    OR raw_order_attachments.cs_verified IS FALSE
  )
