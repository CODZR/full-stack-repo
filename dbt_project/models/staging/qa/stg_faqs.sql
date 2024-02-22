08:59:16  Registered adapter: postgres=1.7.7
08:59:16  Unable to do partial parsing because config vars, config profile, or config target have changed
{{ config(
  materialized = 'table',
  unique_key = 'faq_id',
  schema = 'qa'
) }}

with source as (
  select * from {{ ref('raw_faqs') }}
),

select
  id as faq_id,
  question,
  answer
from
  source
