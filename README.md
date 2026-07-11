# G2 Reviews Scraper

> Extract public **G2 reviews** and **product data** at scale — with **ranked top‑10 competitors per product** and an **LLM‑ready markdown field** for direct RAG ingestion. Runs on [Apify](https://apify.com/factden/g2-reviews-scraper?fpr=factden).

[![Run on Apify](https://img.shields.io/badge/Run%20on-Apify-00b04f?logo=apify&logoColor=white)](https://apify.com/factden/g2-reviews-scraper?fpr=factden)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

This repo is the **developer entry point** for the G2 Reviews Scraper actor: the output shape, copy‑paste API snippets, a full [field dictionary](./FIELDS.md), and a short [how‑to](./HOWTO.md). The actor itself runs on Apify — no login, proxy, or anti‑bot setup required.

**▶ [Run it on Apify →](https://apify.com/factden/g2-reviews-scraper?fpr=factden)**

<p align="center">
  <a href="https://apify.com/factden/g2-reviews-scraper?fpr=factden" rel="sponsored noopener">
    <img src="https://raw.githubusercontent.com/factden/apify-actor-assets/main/g2-reviews-scraper/social-preview.png" alt="G2 Reviews Scraper — sample review row with 27 structured fields" width="900">
  </a>
</p>

---

## What it extracts

Two modes, one actor:

- **Reviews mode** — give it G2 product URLs (or bare slugs like `slack`) and get every public review as a clean, structured row: **27 fields** including a nested `subRatings` dict (the sub‑ratings the reviewer gave), structured `pros` / `cons` / `problemsSolved`, switching history with **named competitors**, reviewer industry / role / company size / country, and an LLM‑ready `markdownContent` field.
- **Products mode** — give it a keyword (e.g. `CRM`, `communication`, `project management`) and get the top matching products with metadata — competitor discovery before you pull reviews.

### Two things you won't find in other G2 scrapers

🏆 **Ranked top‑10 competitors per product** — mined from each reviewer's switching‑from data and resolved to real product names (not opaque IDs). Battlecard‑ready, no aggregation code.

🤖 **LLM‑ready `markdownContent` per review** — a self‑contained markdown block, ready for direct vector‑DB / RAG ingestion with zero formatting work.

|  |  |
|---|---|
| ![Ranked top-10 competitors per product](https://raw.githubusercontent.com/factden/apify-actor-assets/main/g2-reviews-scraper/04-products-top-competitors.png) | ![LLM-ready markdown field](https://raw.githubusercontent.com/factden/apify-actor-assets/main/g2-reviews-scraper/05-ai-ingest-markdown.png) |
| Ranked top‑10 competitors per product | LLM‑ready `markdownContent` field |

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

Real sample output lives in **[`examples/`](./examples)**:

- [`examples/reviews-sample-100.csv`](./examples/reviews-sample-100.csv) — **100 real review rows** (Slack, Microsoft Teams, Zoom, Google Workspace, Trello) — browse it right in GitHub's table view
- [`examples/reviews-output.sample.json`](./examples/reviews-output.sample.json) — 2 review rows showing the full field shape (incl. `markdownContent`)
- [`examples/products-output.sample.json`](./examples/products-output.sample.json) — product rows with ranked `topCompetitors`
- [`examples/input.json`](./examples/input.json) — Reviews‑mode input · [`examples/input-products.json`](./examples/input-products.json) — Products‑mode input

📊 **Full 500-review sample dataset** (5 products, download-ready CSV / JSON / JSONL): **[HuggingFace](https://huggingface.co/datasets/fact-den/g2-team-collaboration-reviews-sample)** · **[Kaggle](https://www.kaggle.com/datasets/factden/g2-team-collaboration-reviews-sample)**.

Every field is documented in **[`FIELDS.md`](./FIELDS.md)**. From Apify you can download results as **JSON, CSV, Excel, or HTML**.

---

## Use cases

- **Competitive battlecards** — who switched away from a rival, and why (`previousCompetitors`, `whySwitched`).
- **Voice‑of‑customer / product research** — structured `pros`, `cons`, `problemsSolved` across hundreds of reviews.
- **AI / RAG pipelines** — drop `markdownContent` straight into a vector DB.
- **Market mapping** — Products mode for category discovery and competitor sets.

---

## How much does it cost?

Pay‑per‑event on Apify: **$0.01 per run + $0.004 per row**. New Apify accounts get **$5 in free credit** (~1,250 rows). See the [actor page](https://apify.com/factden/g2-reviews-scraper?fpr=factden) for current pricing.

---

## FAQ

**Is scraping G2 reviews legal?** The actor collects only **publicly available** review data. As with any scraping, review G2's Terms of Service and your local regulations, and use the data responsibly.

**Do I need a G2 account or proxies?** No. Everything runs inside the actor on Apify's infrastructure.

**Found a bug or want a field added?** Open an issue here, or use the **Issues** tab on the [Apify actor page](https://apify.com/factden/g2-reviews-scraper?fpr=factden).

---

## Other scrapers by FactDen

- [Ctrip / Trip.com Reviews Scraper](https://apify.com/factden/ctrip-trip-reviews-scraper?fpr=factden)
  ([docs](https://github.com/factden/ctrip-trip-reviews-scraper))
- [Indeed Jobs Scraper](https://apify.com/factden/indeed-jobs-scraper?fpr=factden)
  ([docs](https://github.com/factden/indeed-jobs-scraper))
- [Expedia Hotel Reviews Scraper](https://apify.com/factden/expedia-hotel-reviews-scraper?fpr=factden)
  ([docs](https://github.com/factden/expedia-hotel-reviews-scraper))
- [All FactDen actors →](https://apify.com/factden?fpr=factden)

**Docs & guides:**

- [How to scrape G2 reviews](https://factden.com/blog/how-to-scrape-g2-reviews)
- [Best G2 review scraper compared](https://factden.com/blog/best-g2-review-scraper-compared)
- [factden.com](https://factden.com)

---

_The sample data in this repo is real public G2 review data, collected with the actor and provided for documentation/evaluation. Run the actor on Apify to pull data for any product, at any scale._
