# Output fields

The G2 Reviews Scraper produces two row types. **Reviews mode** emits review rows (32 fields). **Products mode** emits product rows (16 fields). In Reviews mode you also get a per‑product summary row with the product fields populated.

## Review fields (Reviews mode — 32)

| Field | Type | Description |
|---|---|---|
| `mode` | string | Always `"reviews"` for review rows. |
| `submittedAt` | string (ISO date) | When the reviewer submitted the review on G2. |
| `reviewerName` | string | Reviewer display name (or "G2 User" when anonymized). |
| `reviewerIndustry` | string | Reviewer's industry (e.g. "Computer Software"). |
| `reviewerRole` | string \| null | Reviewer's job role. Null on ~half of reviews — G2's form makes it optional. |
| `companySize` | string | Company size bucket (e.g. "Mid‑Market", "Enterprise", "Small‑Business"). |
| `reviewerCountry` | string \| null | Reviewer country. |
| `overallRating` | number | Overall star rating, 1–5. |
| `easeOfUse` | number \| null | Sub‑rating, 1–5 (reviewers may skip). |
| `easeOfSetup` | number \| null | Sub‑rating, 1–5. |
| `easeOfAdmin` | number \| null | Sub‑rating, 1–5. |
| `easeOfDoingBusinessWith` | number \| null | Sub‑rating, 1–5. |
| `meetsRequirements` | number \| null | Sub‑rating, 1–5. |
| `qualityOfSupport` | number \| null | Sub‑rating, 1–5. |
| `reviewTitle` | string | The review headline. |
| `pros` | string | What the reviewer liked (structured answer). |
| `cons` | string | What the reviewer disliked. |
| `problemsSolved` | string | Problems the product solved for them. |
| `recommendations` | string \| null | Recommendations to others considering the product. |
| `didSwitchFromCompetitor` | boolean | Whether the reviewer switched from a competing product. |
| `previousCompetitors` | array<string> | Named products they switched from (resolved to real names). |
| `whySwitched` | string \| null | Why they switched. |
| `isIncentivized` | boolean | Whether G2 gave the reviewer an incentive (e.g. gift card). |
| `helpfulVotes` | number | How many users marked the review helpful. |
| `reviewFormat` | string | `"text"` or `"video"`. |
| `productSlug` | string | G2 product slug (e.g. `slack`). |
| `productName` | string | Product display name. |
| `reviewUrl` | string | Direct URL to the review on G2. |
| `reviewId` | string | Stable review identifier. |
| `reviewText` | string | Full review body (fallback / combined text). |
| `extractedAt` | string (ISO datetime) | When this row was extracted. |
| `markdownContent` | string | **LLM‑ready** self‑contained markdown block for the review — drop straight into a RAG pipeline. |

## Product fields (Products mode — 16)

| Field | Type | Description |
|---|---|---|
| `slug` | string | G2 product slug. |
| `name` | string | Product display name. |
| `id` | string | G2 product identifier. |
| `url` | string | G2 product page URL. |
| `vendorName` | string | Vendor / company name. |
| `type` | string | Product type. |
| `categoryNames` | array<string> | All G2 categories the product appears in. |
| `categoryPrimary` | string | Primary category. |
| `averageRating` | number | Average star rating across all G2 reviews. |
| `starRating` | number | Rounded star rating shown on G2. |
| `reviewCount` | number | Total public reviews on G2. |
| `matchingFilterTotal` | number | Reviews matching the run's filters. |
| `reviewsExtracted` | number | Reviews actually extracted in this run (Reviews mode). |
| `completenessPct` | number | % of matching reviews extracted (Reviews mode). |
| `topCompetitors` | array<string> | **Ranked top‑10 competitors**, mined from reviewer switching data. |
| `extractedAt` | string (ISO datetime) | When this row was extracted. |

> In Products mode, the three Reviews‑mode‑only fields (`reviewsExtracted`, `completenessPct`, `topCompetitors`) are `0` / empty.
