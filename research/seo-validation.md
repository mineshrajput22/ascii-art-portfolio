# SEO and cleanup — 20 October 2026

## Implementation

- Unique, server-rendered titles and descriptions for the developer portfolio and photography collection.
- Homepage metadata identifies Minesh Rajput as a full-stack developer in Kolhapur, India. The résumé was not changed.
- One canonical URL per page, consistent trailing slashes, and crawl files derived from the configured `https://minesh.site` production URL.
- Complete Open Graph and Twitter preview metadata, including image dimensions/type/alt text and the existing 1200 × 630 PNG.
- JSON-LD for Person, WebSite, and WebPage on the homepage. Photography uses CollectionPage, the actual 38-photo inventory, ImageObject metadata, and breadcrumbs. Social identities are the profiles already linked on the site. No business address, current employer, ratings, or unsupported credentials were invented.
- Existing meaningful headings, image descriptions/dimensions, and crawlable internal links are preserved. No keyword stuffing or hidden content was added.
- Sitemap includes only the two canonical HTML pages; it does not fabricate modification dates. Robots permits the resources needed to render the pages.

## Cleanup

- Removed three superseded project image files, an unused ocean barrel export and grid function, an unused font dependency, and outdated implementation-validation notes.
- Removed 1,460 scratch files totaling 175,807,939 bytes (approximately 176 MB), including temporary screenshots and video tooling. Temporary targets were resolved and checked to be within this workspace before recursive deletion.
- Replaced the static sitemap/robots copies with generated endpoints, avoiding duplicate sources of truth.
- Retained all active images, local font/license, résumé, audio, SVG social-card authoring source, tests, source code, useful audit records, and third-party notices. Running/build dependencies and the current production preview output remain available.

## Verification

Production build and all **20 tests pass**. Astro/TypeScript reports **0 errors, 0 warnings, and 0 hints**. The final build no longer includes the removed image variants.

Build-output checks cover unique title/description, one H1/canonical, complete social previews, parseable JSON-LD, correct production references and location, gallery image inventory, breadcrumbs, sitemap parity, and robots discovery. Existing asset/link, gallery, motion, audio, and lifecycle tests also run.

This is local implementation and build validation, not a Google index inspection or a claimed Lighthouse score. After deployment, verify the live domain's redirects, HTTP status codes, canonical HTML, crawl files, social previews, and image loading. Use the site's actual Google Search Console property to submit the sitemap and inspect both pages; no submission or ownership verification was performed here.

## References

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide): descriptive titles, useful content, image descriptions, internal links, and canonicalization.
- [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap): canonical URL inventory and accurate modification dates.
