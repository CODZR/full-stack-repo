from cachetools import TTLCache


ttl_cache = TTLCache(maxsize=100, ttl=30)
