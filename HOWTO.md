# How to scrape G2 reviews (the easy way)

Scraping G2 directly is painful: anti‑bot defenses, login walls, rotating proxies, and CAPTCHAs. This guide skips all of that by using the [G2 Reviews Scraper](https://apify.com/factden/g2-reviews-scraper?fpr=factden) actor on Apify — no login, no proxy setup, no anti‑bot tuning.

## 1. Get an Apify token

Create a free [Apify](https://console.apify.com/sign-up?fpr=factden) account and copy your API token from **Settings → Integrations**. New accounts include $5 of free credit (~1,250 rows).

## 2. Run it from the Console (no code)

1. Open the [actor page](https://apify.com/factden/g2-reviews-scraper?fpr=factden) and click **Try for free**.
2. The input is pre‑filled with two examples — a full G2 URL and a bare slug. Leave them or replace with your own products.
3. Click **Start**. A small run finishes in ~15 seconds.
4. Download results from the **Output** tab as JSON, CSV, or Excel.

## 3. Or run it from code

### Python

```python
from apify_client import ApifyClient

client = ApifyClient("<YOUR_APIFY_TOKEN>")
run = client.actor("factden/g2-reviews-scraper").call(run_input={
    "mode": "reviews",
    "startUrls": ["https://www.g2.com/products/slack/reviews"],
    "maxReviewsPerProduct": 200,
})
items = list(client.dataset(run["defaultDatasetId"]).iterate_items())
print(f"Got {len(items)} reviews")
```

See [`snippets/`](./snippets) for Node and curl versions.

## 4. Pick the right mode

- **Reviews mode** — you know the products. Pass G2 URLs or slugs in `startUrls`.
- **Products mode** — you want to discover products in a category. Set `mode: "products"` and a `searchQuery` like `"CRM"`.

## 5. Useful input options

| Option | What it does |
|---|---|
| `maxReviewsPerProduct` | Cap reviews per product (controls cost). |
| `fromDate` / `toDate` | Only reviews in a date window. |
| `minRating` / `maxRating` | Filter by star rating. |
| `sortReviews` | `newest`, `oldest`, `most_helpful`. |
| `verifiedReviewer` | Only verified reviewers. |

Full field reference: [`FIELDS.md`](./FIELDS.md). Full input format: [`examples/input.json`](./examples/input.json).

## 6. Feed it to an LLM

Each review includes a ready‑to‑use `markdownContent` field — no formatting needed:

```python
docs = [row["markdownContent"] for row in items]
# embed `docs` into your vector DB / RAG pipeline
```

---

**▶ [Run the G2 Reviews Scraper on Apify →](https://apify.com/factden/g2-reviews-scraper?fpr=factden)**
