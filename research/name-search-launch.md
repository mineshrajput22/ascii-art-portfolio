# Name-search SEO — 26 October 2026

Target identity: **Minesh Rajput**, full-stack developer in Kolhapur, India.
Canonical production origin: `https://minesh.site` (confirm before publishing).

## Implemented and retained

The static HTML includes unique name-led titles, descriptions, full name in visible About/footer content, canonical links, social preview images, English language metadata, descriptive images, and crawlable navigation. The existing hero copy and appearance are preserved.

The homepage now uses WebPage and ProfilePage types with Minesh as its main Person entity. The person links back to the homepage and includes the existing public username, description, location and social profiles. Photography retains its collection, images and breadcrumbs. This markup describes identity; it does not promise a rich result or higher rankings.

Generated robots.txt allows crawling and points to the sitemap, which contains the two canonical HTML pages. No invented dates, reviews, keywords, or credentials are included.

Optional build-time Google and Bing verification meta tags read `GOOGLE_SITE_VERIFICATION` and `BING_SITE_VERIFICATION`. Copy `.env.example` to `.env` locally, or set the values in the hosting build environment. Use the actual content values issued by the services. Blank values emit no tag. Domain-property verification in Google uses DNS instead of these tags.

## Live audit limitation

On 26 October, the web fetch could not access `https://minesh.site/`; a local HTTP request failed with “No such host is known.” This environment has restricted networking, so this is an unresolved reachability observation, not proof of a global domain outage. Live HTTP status, redirects, headers, index coverage and performance have not been verified. Check the actual public domain and DNS before expecting indexing. The local implementation is not a deployment.

## Required launch and indexing steps

1. Confirm the domain is owned, resolves publicly and points to the existing host. If the real URL differs, update `site` in `astro.config.mjs` before building. Deploy the generated `dist/` through the existing hosting workflow.
2. Check that `/`, `/photography/`, `/robots.txt`, `/sitemap.xml` and `/social-card.png` are publicly accessible over HTTPS. HTML pages must return 200 with no login, bot challenge, `noindex`, or `X-Robots-Tag: noindex`. Redirect HTTP and alternate hostname variants to the configured canonical host; avoid redirect loops and soft 404s.
3. Add the property at https://search.google.com/search-console and complete its real DNS or HTML-tag verification. For HTML tags, set the provided content value and rebuild/redeploy. Submit `https://minesh.site/sitemap.xml`.
4. Use URL Inspection for both canonical pages, run the live test and request indexing. Check Page indexing for the actual exclusion reason if Google does not index them. Validate profile markup with Google's Rich Results Test.
5. Add the site to Bing Webmaster Tools at https://www.bing.com/webmasters/ and submit the same sitemap; use the optional Bing token if HTML verification is chosen.
6. Set the website field on your existing GitHub and LinkedIn profiles to `https://minesh.site/`. Keep the name “Minesh Rajput” consistent. These account edits have not been performed.
7. After publication, check Search Console impressions and clicks for “Minesh Rajput” and relevant name-plus-developer searches. Measure live mobile Core Web Vitals before making performance claims. Avoid purchased links or duplicate pages made only for keyword variations.

Google controls crawling, indexing and ranking. No SEO implementation can guarantee inclusion or a first-place result; changes can take days to months to appear.

## Primary references

- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- https://developers.google.com/search/docs/appearance/structured-data/profile-page
- https://support.google.com/webmasters/answer/9008080

