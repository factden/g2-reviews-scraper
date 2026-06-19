# G2 Reviews Scraper

> Extract public **G2 reviews** and **product data** at scale — with **ranked top‑10 competitors per product** and an **LLM‑ready markdown field** for direct RAG ingestion. Runs on [Apify](https://apify.com/factden/g2-reviews-scraper).

[![Run on Apify](https://img.shields.io/badge/Run%20on-Apify-00b04f?logo=apify&logoColor=white)](https://apify.com/factden/g2-reviews-scraper)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

This repo is the **developer entry point** for the G2 Reviews Scraper actor: the output shape, copy‑paste API snippets, a full [field dictionary](./FIELDS.md), and a short [how‑to](./HOWTO.md). The actor itself runs on Apify — no login, proxy, or anti‑bot setup required.

**▶ [Run it on Apify →](https://apify.com/factden/g2-reviews-scraper)**

---

## What it extracts

Two modes, one actor:

- **Reviews mode** — give it G2 product URLs (or bare slugs like `slack`) and get every public review as a clean, structured row: **32 fields** including 6 sub‑ratings, structured `pros` / `cons` / `problemsSolved`, switching history with **named competitors**, reviewer industry / role / company size / country, and an LLM‑ready `markdownContent` field.
- **Products mode** — give it a keyword (e.g. `CRM`, `communication`, `project management`) and get the top matching products with metadata — competitor discovery before you pull reviews.

### Two things you won't find in other G2 scrapers

🏆 **Ranked top‑10 competitors per product** — mined from each reviewer's switching‑from data and resolved to real product names (not opaque IDs). Battlecard‑ready, no aggregation code.

🤖 **LLM‑ready `markdownContent` per review** — a self‑contained markdown block, ready for direct vector‑DB / RAG ingestion with zero formatting work.

---

## Quick start (API)

```python
from apify_client import ApifyClient

client = ApifyClient("<YOUR_APIFY_TOKEN>")
run = client.actor("factden/g2-reviews-scraper").call(run_input={
    "mode": "reviews",
    "startUrls": ["https://www.g2.com/products/slack/reviews", "notion"],
    "maxReviewsPerProduct": 100,
})
for row in client.dataset(run["defaultDatasetId"]).iterate_items():
    print(row["reviewTitle"], row["overallRating"])
```

More: **[Python](./snippets/run_actor.py)** · **[Node](./snippets/run_actor.js)** · **[curl](./snippets/run_actor.sh)**

---

## Output

A few illustrative rows live in **[`examples/`](./examples)**:

- [`examples/reviews-output.sample.json`](./examples/reviews-output.sample.json) — review rows (Reviews mode)
- [`examples/products-output.sample.json`](./examples/products-output.sample.json) — product rows (Products mode)
- [`examples/input.json`](./examples/input.json) — input format

Every field is documented in **[`FIELDS.md`](./FIELDS.md)**. From Apify you can download results as **JSON, CSV, Excel, or HTML**.

---

## Use cases

- **Competitive battlecards** — who switched away from a rival, and why (`previousCompetitors`, `whySwitched`).
- **Voice‑of‑customer / product research** — structured `pros`, `cons`, `problemsSolved` across hundreds of reviews.
- **AI / RAG pipelines** — drop `markdownContent` straight into a vector DB.
- **Market mapping** — Products mode for category discovery and competitor sets.

---

## How much does it cost?

Pay‑per‑event on Apify: **$0.01 per run + $0.004 per row**. New Apify accounts get **$5 in free credit** (~1,250 rows). See the [actor page](https://apify.com/factden/g2-reviews-scraper) for current pricing.

---

## FAQ

**Is scraping G2 reviews legal?** The actor collects only **publicly available** review data. As with any scraping, review G2's Terms of Service and your local regulations, and use the data responsibly.

**Do I need a G2 account or proxies?** No. Everything runs inside the actor on Apify's infrastructure.

**Found a bug or want a field added?** Open an issue here, or use the **Issues** tab on the [Apify actor page](https://apify.com/factden/g2-reviews-scraper).

---

## Other scrapers by FactDen

- [Ctrip / Trip.com Reviews Scraper](https://apify.com/factden/ctrip-trip-reviews-scraper)
- [Indeed Jobs Scraper](https://apify.com/factden/indeed-jobs-scraper)
- [All FactDen actors →](https://apify.com/factden)

---

_The example data in this repo is illustrative, for documenting the output shape. Run the actor on Apify for live G2 data._
