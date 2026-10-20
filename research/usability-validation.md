# Usability implementation and validation — 20 October 2026

## Delivered

- Mobile informational labels/tags at least 11px, navigation/profile links 12px, toolkit descriptions 13px, and 44px theme/copy/gallery targets. Decorative illustration text is unchanged.
- Mobile hero spacing tightened without rewriting the introduction, changing its gradient, or removing its entrance animation. About navigation is restored. Contact and hero-bottom rows wrap.
- Content surfaces increased to .72 light/.68 dark. Broad text glow removed; reading-area muted/accent colors adjusted after sampled contrast checks. Hero and ocean colors/opacity are unchanged.
- Shared anchor clearance equals measured header height plus 16px: 90px on mobile and 108px on desktop. Pointer links retain focus; keyboard anchors and the skip link retain destination focus behavior.
- All four projects now use fresh public-page WebP captures standardized to 1440 × 810 (16:9), including the current NoteStack homepage. Screenshot cards use the images' natural proportions without letterboxing, cropping, or hover zoom. No authenticated or private screens were accessed.
- Project cards show a verified contribution statement and emphasize View live project.
- Gallery viewer includes current/total count, loading status, error/Retry handling, dimensions reserved from selected-photo metadata, contained images, and protection from stale requests. Escape and arrow keys remain supported, and focus returns to the opener.
- Cached navigation pauses/resumes the existing ocean and reconnects only pending reveals. Browser-cache misses restore open project disclosures using session storage. No forced reload remains.
- Music has no controls, starts at 8% per the later instruction, attempts immediately, retries synchronously on interaction after rejection, prevents overlapping attempts, pauses when hidden, and preserves playback position on cached return.

## Automated validation

Production build, 16 tests, and Astro/TypeScript checks pass (zero errors, warnings, or hints).

Regression coverage includes header-resize clearance, pointer/keyboard focus, duplicate canvas resizes, immediate canvas repaint, repeated cached returns, pending reveal restoration, uncached disclosure restoration, blocked audio/retry/concurrency/visibility, and gallery success/error/retry/stale completion/close focus.

## Browser validation

The production build was served locally on port 4330. Both light and dark themes were checked at 320, 375, 390, 430, 768, 1100, and 1440px widths.

- No page, header, or contact-row horizontal overflow in the homepage matrix.
- No page/dialog horizontal overflow in the gallery matrix; gallery controls measured at least 44px throughout.
- Desktop section links landed approximately 108px below the viewport top without focusing the entire section after a pointer click.
- Gallery image loading succeeded; rapid navigation and keyboard Right/Escape were checked. Escape returned focus to the original photograph.
- Real Back navigation preserved theme, scroll position (1316px in the checked scenario), and the open project disclosure after the fallback fix.
- Music playback was observed after interaction. Browser autoplay permission remains browser-controlled.

## Contrast and layout stability

Representative final reading-surface screenshots were sampled in a text-free strip between the work heading and project grid, including the moving ocean behind the content. Computed muted-text colors were compared with screenshot background pixels using relative luminance. Minimum sampled ratios were approximately **5.31:1 light** and **6.97:1 dark**. These are frame/region samples, not certification of every text style or every animation frame; JPEG capture introduces measurement uncertainty.

A temporary development-only buffered LayoutShift observer reported **CLS 0** in the observed desktop reload. The probe was removed. This is not a true cold-cache production or physical-device performance result.

## Evidence

Homepage before/after screenshots, gallery after screenshots, and responsive/contrast measurements were captured in `tmp/qa/` during verification. Those temporary artifacts were removed during the requested repository cleanup; the measured results are recorded above. Final project screenshots remain in `public/images/projects/`.

A gallery before screenshot was not captured before implementation; no before comparison is claimed for that viewer.

## Outstanding manual checks

- Physical iOS Safari scrolling, toolbar changes, rotation, audio-volume behavior, and refreshing.
- True cold-cache production CLS/performance measurement and slow-network visual loading checks.
- Browser text enlargement at 200% and a complete keyboard/screen-reader walkthrough.
- Comprehensive contrast audit across every control, gallery/title surface, and moving-ocean frame.

Error/retry and deliberately reordered image completions were verified in automated tests rather than by throttling the live browser network. The site was not published.
