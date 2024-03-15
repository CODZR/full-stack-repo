{{ config(
  materialized = 'view',
  unique_key = 'id',
  schema = 'logistic'
) }}

WITH raw_order_attachments AS (

  SELECT
    order_id,
    business_verified,
    finance_verified,
    cs_verified
  FROM
    {{ source(
      'log2_dev',
      'log2_raw_order_attachment'
    ) }}
)
SELECT
  id AS raw_order_id,
  created_at,
  latest_ship_date,
  latest_delivery_date,
  shopify_id,
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
  raw_order_attachments.cs_verified,
  raw_order_attachments.business_verified,
  raw_order_attachments.finance_verified
FROM
  {{ source(
    'log2_dev',
    'log2_raw_order'
  ) }}
  raw_orders
  LEFT JOIN raw_order_attachments
  ON raw_orders.id = raw_order_attachments.order_id
