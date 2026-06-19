#!/usr/bin/env bash
# Run the G2 Reviews Scraper on Apify with curl, then fetch the dataset.
# Docs: https://apify.com/factden/g2-reviews-scraper

TOKEN="<YOUR_APIFY_TOKEN>"   # https://console.apify.com/settings/integrations

# Run the actor synchronously and get dataset items back in one call
curl -s -X POST \
  "https://api.apify.com/v2/acts/factden~g2-reviews-scraper/run-sync-get-dataset-items?token=${TOKEN}" \
  -H 'Content-Type: application/json' \
  -d '{
    "mode": "reviews",
    "startUrls": ["https://www.g2.com/products/slack/reviews", "notion"],
    "maxReviewsPerProduct": 100,
    "sortReviews": "newest"
  }'
