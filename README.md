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
- `src/scripts/site.ts`: theme preference, copy email and accessible photo viewer.
- `src/lib/ocean`: adapted ASCII shark simulation.

The site defaults to light mode until the visitor chooses a theme. The selection persists locally. At the owner�s explicit request, the ocean animates by default even when the system requests reduced motion; there is no play/pause UI. Hidden tabs and offscreen canvases stop rendering. Photography supports keyboard arrows and Escape, with focus returned to the original image.

Project images for NoteStack.AI and Chequers9 are supplied screenshots. DropDox and Architectural Walkthrough currently use clearly labelled illustrations, not claimed screenshots. Replace these with verified captures when available.

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
