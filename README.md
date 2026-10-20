# Minesh Rajput — portfolio

Astro + TypeScript portfolio for `minesh.site`. Content comes from the supplied résumé, the existing local portfolio, and project details confirmed by Minesh.

## Local development

Requires Node.js 22.12 or later.

```sh
npm ci
npm run dev
```

If Astro reports an existing server, run `npm run dev -- --force`. The default address is http://127.0.0.1:4321.

```sh
npm run check
npm run build
npm test
npm run preview
```

The deployable static site is generated into `dist/`. No server, database, credentials, or AI service is needed.

## Content and behaviour

- `src/data/portfolio.ts`: projects, skills and profile links.
- `src/data/notebook.ts`: photography order, descriptions and sizes.
- `src/pages/index.astro`: approved introduction, experience and other homepage copy.
- `public/Minesh-Rajput-Resume.pdf`: supplied résumé download.
- `src/styles/global.css`: responsive layout and both theme palettes.
- `src/scripts/site.ts`: theme preference, copy email, and initialization of motion, gallery, audio, and navigation lifecycle modules.
- `src/lib/ocean`: adapted ASCII shark simulation.
- `src/lib/seo.ts`: page metadata and structured data; production URLs use `site` in `astro.config.mjs`.
- `src/pages/robots.txt.ts` and `src/pages/sitemap.xml.ts`: generated crawl files for the production domain.

The site defaults to light mode until the visitor chooses a theme. The selection persists locally. At the owner�s explicit request, the ocean animates by default even when the system requests reduced motion; there is no play/pause UI. Hidden tabs and offscreen canvases stop rendering. Photography supports keyboard arrows and Escape, with focus returned to the original image.

All four project previews use fresh captures of their public live pages, normalized to 1440 × 810 (16:9). Screenshot cards follow the image dimensions on desktop and mobile, without letterboxing or hover zoom. The fallback illustrations remain available if a future project has no screenshot.

Music starts at 8% volume, attempts playback immediately, and retries after interaction if the browser blocks autoplay. It has no visible controls, as requested. Hidden pages pause playback. Cached history returns resume the same ocean; uncached Back/Forward navigation also restores open project disclosures through session storage.

See `research/usability-validation.md` for the polish pass, automated/browser checks, and remaining device checks.

## SEO and repository cleanup

Both pages render their own titles, descriptions, canonical URLs, Open Graph/Twitter cards, and JSON-LD directly into the static HTML. The homepage identifies Minesh as a developer in Kolhapur; the photography page describes the image collection and includes breadcrumbs. Sitemap and robots URLs come from the same configured production domain. No search-account credentials or verification tags are invented.

`public/social-card.svg` is the editable source for the published `social-card.png`; both are intentionally retained. Local font files and their OFL license remain, without requiring the unused font npm package. Old project image variants, the unused ocean export/grid helper, outdated implementation notes, and temporary capture/video tooling have been removed. Build output, installed dependencies, tests, source, the résumé, photographs, music, and attribution notices remain.

See `research/seo-validation.md` for checks and post-deployment steps.

## Source attribution and release dependency

The ASCII engine is adapted from stackedlol/ascii-sharks at revision `c521e24a787e6d4cc460d4cf2b9815f25e4fe453`:
https://github.com/stackedlol/ascii-sharks

It was provided by the user for this implementation. At inspection the upstream tree and package metadata did not include a license grant. Do not assume this project owns that code or assign it a new license. Obtain permission or an explicit upstream license before public distribution. See `THIRD_PARTY_NOTICES.md`.

Changes to the engine include explicit light/dark palettes, muted accents, removal of the grid, mobile population settings, hidden-tab pausing, and pointer filtering over interactive content.

## Release checklist

- Resolve the upstream source permission.
- Review both themes at desktop and mobile sizes in a real browser.
- Check the live destinations and all project copy with Minesh.
- Build and deploy `dist/` using the existing `minesh.site` hosting setup after preview approval.

This checkout does not alter the existing site or its deployment.

## Recent changes
- Increased shark density (desktop 5, mobile 4) with varied sizes.
- Finer cell resolution for sharper shark shapes.
- Aligned ocean palette/lighting to upstream (black bg, cyan wake only).
- Responsive ocean background re-initializes on viewport change.

## Continuing with another AI

Read AI_HANDOFF.md first. It records approved styling, implementation, checks, remaining work, and portable export instructions. Keep it updated as work continues.

