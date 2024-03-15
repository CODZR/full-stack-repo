{{ config(
  materialized = 'view',
  unique_key = 'id',
  schema = 'logistic'
) }}

SELECT
  raw_order_id,
  created_at,
  shopify_id,
  note,
  order_from,
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
WHERE
  (
    (
      business_verification_required = TRUE
      AND business_verified = NULL
    )
    OR (
      finance_verification_required = TRUE
      AND finance_verified = NULL
    )
    OR (
      cs_review_required = TRUE
      AND cs_verified = NULL
    )
  )
  OR(
    (
      cs_verified != FALSE
      AND business_verified != FALSE
      AND finance_verified != FALSE
    )
    AND (
      (
        business_verification_required = TRUE
        AND business_verified != TRUE
      )
      OR (
        finance_verification_required = TRUE
        AND finance_verified != TRUE
      )
      OR (
        cs_review_required = TRUE
        AND cs_verified != TRUE
      )
    )
  )
