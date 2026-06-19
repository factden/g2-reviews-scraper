"""Run the G2 Reviews Scraper on Apify and print the results.

Install:  pip install apify-client
Docs:     https://apify.com/factden/g2-reviews-scraper
"""

from apify_client import ApifyClient

# Get your token from https://console.apify.com/settings/integrations
client = ApifyClient("<YOUR_APIFY_TOKEN>")

run_input = {
    "mode": "reviews",
    "startUrls": [
        "https://www.g2.com/products/slack/reviews",
        "notion",  # bare slugs work too
    ],
    "maxReviewsPerProduct": 100,
    "sortReviews": "newest",
}

# Start the actor and wait for it to finish
run = client.actor("factden/g2-reviews-scraper").call(run_input=run_input)

# Iterate the resulting dataset
for row in client.dataset(run["defaultDatasetId"]).iterate_items():
    print(f"{row.get('overallRating')}★  {row.get('reviewTitle')}")
    if row.get("previousCompetitors"):
        print(f"   switched from: {', '.join(row['previousCompetitors'])}")
