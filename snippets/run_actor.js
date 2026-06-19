// Run the G2 Reviews Scraper on Apify and print the results.
//
// Install:  npm install apify-client
// Docs:     https://apify.com/factden/g2-reviews-scraper

import { ApifyClient } from 'apify-client';

// Get your token from https://console.apify.com/settings/integrations
const client = new ApifyClient({ token: '<YOUR_APIFY_TOKEN>' });

const input = {
    mode: 'reviews',
    startUrls: [
        'https://www.g2.com/products/slack/reviews',
        'notion', // bare slugs work too
    ],
    maxReviewsPerProduct: 100,
    sortReviews: 'newest',
};

// Start the actor and wait for it to finish
const run = await client.actor('factden/g2-reviews-scraper').call(input);

// Fetch the resulting dataset
const { items } = await client.dataset(run.defaultDatasetId).listItems();
for (const row of items) {
    console.log(`${row.overallRating}★  ${row.reviewTitle}`);
    if (row.previousCompetitors?.length) {
        console.log(`   switched from: ${row.previousCompetitors.join(', ')}`);
    }
}
