# Portfolio AI handoff

Updated: 20 October 2026. Read this before making changes. This records the owner's decisions and current implementation; inspect source before editing. Continue from the current files rather than recreating the site.

## Project and commands

Minesh Rajput's static Astro + TypeScript portfolio, production URL https://minesh.site. Two pages: `/` and `/photography/`. No backend, database, API credentials, or AI service is required.

Requires Node.js 22.12 or later. Run `npm ci`, then `npm run dev`. Default development URL is http://127.0.0.1:4321. During this session a production preview was available on port 4330; processes are not portable with the export.

Validation: `npm run build`, `npm test`, `npm run check`. Build before running tests that inspect `dist/`. Deployment files are generated in `dist/`. Publishing has not been requested or performed.

## Owner decisions to preserve

- Website location is **Kolhapur, India**. The resume intentionally says **Pune**. Replace `public/Minesh-Rajput-Resume.pdf` with the same filename to update the download; do not edit its location automatically.
- Preserve approved hero wording, headline size, gradient, and first-paint staggered reveal. Previous accidental hero changes were rejected.
- Keep ASCII ocean and reveal animations enabled independently of reduced-motion preferences, per explicit request. No animation controls.
- Keep background music low at **8%** (`audio.volume = 0.08`), looping, with no visible controls. Audible autoplay depends on browser policy; retry on interaction.
- Use shared SVG icons, never platform-dependent Unicode/emoji arrows. Down arrow for downward page navigation, download arrow for resume, northeast arrow for external destinations. Preserve the half-filled theme icon.
- Desktop right-side page index: collapsed dashes, section labels on hover/focus, tight 148px box with 8px padding and existing glass surface/14px blur. Do not change the hero to make this box translucent.
- Mobile back-to-top: 48px, visible after 400px scrolling, solid contrasting fill, soft shadow, no border/ring.
- Project screenshots must all be **16:9 (1440 x 810)**, without white bars, hover zoom, or unintended cropping. Architectural Walkthrough must retain the upper header. Owner approved the final image.
- Three.js belongs in INTERFACE toolkit, not DELIVERY. Retain the styled toolkit panels.
- Keep both themes and mobile About navigation. Do not introduce unsupported performance claims.

## Implementation map

- `src/data/portfolio.ts`: verified project details, contribution statements, toolkit, profile URLs, active screenshot paths.
- `src/data/notebook.ts`: photography captions, paths, dimensions and order (38 photographs).
- `src/pages/index.astro`: homepage sections and approved hero. Project live link is emphasized; technical details remain in Behind the build disclosures.
- `src/pages/photography.astro`: gallery and dialog markup.
- `src/layouts/Layout.astro`: shared HTML metadata, sticky header, theme initialization, ocean canvas, single music element, footer.
- `src/styles/global.css`: both palettes, responsive styles, hero reveal, glass surfaces, screenshot and gallery layout. Existing compact CSS plus later overrides requires attention to cascade.
- `src/components/Icon.astro`, `SectionIndex.astro`, `BackToTop.astro`: consistent SVG system and navigation controls.
- `src/scripts/site.ts`: initializes theme, copy email, ocean, motion, audio, gallery and lifecycle.
- `src/scripts/motion.ts`: measured header height plus 16px anchor clearance shared with CSS/native hashes; smooth anchor animation; pending reveal observers; pointer/keyboard focus distinction; navigation cancellation.
- `src/scripts/gallery.ts`: loading/error/Retry, current/total, selected-photo aspect ratio, request tokens preventing stale results, keyboard arrows/Escape/focus restoration. Explicit navigation controls; swipe deferred.
- `src/scripts/audio.ts`: immediate best-effort playback, synchronous interaction retries, no overlapping attempts, handled rejections, visibility/history restoration at low volume.
- `src/scripts/lifecycle.ts`: cached departure pauses ocean; cached return resumes same engine; noncached departure destroys it. Session storage restores disclosures on uncached Back/Forward.
- `src/lib/ocean/`: simulation and renderer. Same-size resizes avoid resets; actual resize repaints immediately. Mobile 4 sharks/32 fish; desktop 5 sharks/75 fish. Hidden/offscreen rendering pauses.
- `src/lib/seo.ts`: unique titles/descriptions, canonical URLs, social metadata and JSON-LD. Person/WebSite/WebPage homepage; photography CollectionPage/ImageObjects/breadcrumbs.
- `astro.config.mjs`: production domain, static output, trailing slashes.
- `src/pages/robots.txt.ts`, `sitemap.xml.ts`: generated canonical crawl endpoints for both pages; do not restore duplicate static public copies.

## Completed polish and SEO

Mobile informative labels/tags increased to at least 11px, navigation/profile links 12px, toolkit descriptions 13px; controls have 44px targets. Hero mobile spacing tightened without changing copy/headline/reveal. Bottom hero/contact/email rows wrap. Reading surfaces strengthened to .72 light/.68 dark, broad 8px text glow removed while retaining small 3px shadow. Ocean opacity and hero gradient preserved.

All four projects use public captures: NoteStack.AI, Chequers9, DropDox, Architectural Walkthrough. Active WebP files are referenced in portfolio data and use natural 16:9 image flow. Gallery reserves photo dimensions and handles rapid navigation races. Cached return no longer forces a reload; pending reveals reconnect without replaying completed text.

SEO is in generated static HTML: distinct titles/descriptions, canonical links, Open Graph/Twitter previews using existing 1200x630 PNG, truthful structured data and generated sitemap/robots. No Search Console submission, ownership verification, ranking guarantee, or fabricated modification dates.

Cleanup removed obsolete project image variants, unused ocean barrel/grid helper, unused font package, outdated implementation notes and 1,460 scratch files (~176 MB). Local font and OFL remain. `public/social-card.svg` is editable source for PNG and is intentional. The historical `UI_UX_AUDIT.md` was removed at the owner's request. Keep this file current as the primary agent handoff; detailed validation/provenance remains under `research/`.

## Validation and honest limits

Last verified implementation: production build passed, **20/20 tests passed**, Astro/TypeScript **0 errors, warnings or hints**. Tests cover build assets/links/SEO, responsive anchor clearance, motion/ocean behavior, cached lifecycle/disclosure restoration, reveal restoration, audio rejection/retry and gallery request races. Browser checks and their limits are recorded in `research/usability-validation.md`; SEO checks in `research/seo-validation.md`.

Representative reading-surface contrast was measured at 5.31:1 light and 6.97:1 dark. Observed development reload CLS was 0; this is not a cold production-load guarantee. Temporary before/after screenshot artifacts were removed during cleanup. Do not report them as included in the export or physical-device checks as passed.

Remaining:

1. Physical iOS/mobile validation, including toolbar expansion/collapse, rotation, device autoplay and touch behavior; 200% text scaling and full accessibility review.
2. Cold-cache production CLS measurement (target <=0.1), and any additional representative animated-background contrast checks.
3. After an authorized deployment: verify redirects/status codes, canonicals/crawl files/social previews on the live domain; use actual Search Console property to submit sitemap and inspect pages.
4. ASCII ocean upstream permission remains unresolved. See `THIRD_PARTY_NOTICES.md` and `research/ascii-sharks-integration.md`: upstream revision did not include an explicit license grant. Do not invent a license or claim permission. Publishing is outside the current task.

No known site bug is recorded as outstanding beyond these verification/release items. Recheck before claiming current live behavior.

## Handoff and continuation

The owner clarified that “export everything” means recording all available context in this Markdown file, **not producing a project ZIP**. The mistakenly created `portfolio-export.zip` was deleted at their request. Do not recreate it unless asked. This file is the primary maintained agent context; it does not replace the source/assets needed to run the project. No complete verbatim chat transcript is available in the repository.

Read this file and `README.md`, run `npm ci` if dependencies are missing, build/test/check, then start the local server. Rebuild `dist/` after code changes. Preserve notices and licenses. Changes in the original workspace were not committed during this session; do not reset or discard them. Continue local work autonomously within the owner's request, and do not publish without authorization.

## Conversation decisions and corrections

This section preserves the sequence that explains the final requirements, including corrections that a future agent must not accidentally undo.

1. Mobile scrolling made the background glitch, and fresh load/refresh showed shifting. Ocean viewport sizing was stabilized with `100lvh` (fallback `100vh`); duplicate resize notifications preserve the simulation and wake, actual resizes paint synchronously. These changes address blank resize frames; physical Safari toolbar behavior still needs testing.
2. The owner requested smooth scrolling resembling Apple's subtle motion and text reveals, explicitly independent of reduced-motion preferences. A later missing hero reveal was called out. Hero animation is now CSS from first paint; below-fold text uses one-time JS observation. Do not replace this with an observer that hides/replays already visible hero content.
3. Arrows appeared cartoonish on iOS versus Windows. Shared inline SVGs replaced platform-dependent glyphs across arrows and other controls. The half-filled theme switcher SVG was restored when the owner noticed its change.
4. “The tools behind the work” was too bland. Three coordinated toolkit panels were approved, with category labels, restrained decorative marks, descriptions, highlighted core tools and tags. Three.js was later moved to the interface panel.
5. Desktop page index was requested to resemble ChatGPT's right-side dashes that expand to page-section labels. Clicking Introduction initially focused the whole section and drew a large rectangle. Pointer clicks now keep link focus; keyboard destination focus is retained.
6. The owner asked for transparency, initially referring to the index box; a hero transparency change was rejected. Hero appearance was restored. The index retains a soft, readable blur matching the header, rather than being fully transparent or excessively blurred, and stays tight to its content.
7. The mobile back-to-top button blended into its background. Its fill was strengthened; the owner then rejected a strong border. Final button is borderless, 48px, contrasting, softly shadowed.
8. Owner corrected website location from Pune to Kolhapur and explicitly retained Pune on the resume.
9. The owner approved the three-batch usability plan: readability/navigation, projects/gallery, lifecycle/audio. Implementation is described above and below. No redesign or backend changes were authorized by that plan.
10. Initial music target in the plan was 20%; a later request to keep music low supersedes it. Final source sets 8%. No visible music control is wanted.
11. Project images were first cropped, then contained images showed white bars. Owner requested fresh NoteStack capture and consistent proportions, then explicitly required **all images 16:9**. Final capture assets are 1440x810 and cards follow their natural image ratio.
12. Architectural Walkthrough's upper part was inadvertently cropped when a taller screenshot was normalized. It was replaced with a native 16:9 capture retaining its header. The owner approved that correction (“good”). Do not apply another center crop.
13. Owner requested cleanup and SEO. Scratch outputs and unused files were removed; SEO implemented locally. Owner subsequently requested removal of the old UI/UX audit and a detailed Markdown handoff for another AI. This file is that handoff, not a new audit.

## Approved visible content and destinations

Hero headline: “Hi, I’m Minesh. I care about how things feel—and what people can do with them.” The final clause is visually muted. Description: “I’m a full-stack developer with a frontend foundation. I build websites and web apps, with attention to the details that make them easier to use.” Retain the existing line-break markup and spacing, rather than reconstructing it from this prose.

Homepage section anchors: `#top` Introduction, `#work`, `#experience`, `#skills`, `#about`, `#photography`, `#contact`; skip link targets `#main`. The photography notebook is a separate `/photography/` route. Check the actual section index labels in its component before editing navigation.

Contact: `rajputminesh22@gmail.com`; GitHub https://github.com/mineshrajput22 ; LinkedIn https://linkedin.com/in/mineshrajput22 . Use the existing Instagram identity in SEO/gallery source; do not invent additional social accounts. Contact email has both mailto and copy controls with status feedback.

Project inventory and verified contribution scope:

| Project | Public destination | Preview file under public/images/projects | Contribution |
| --- | --- | --- | --- |
| NoteStack.AI | https://notestack-ai.101mineshrajput.workers.dev/ | notestack-homepage.webp | Notes workspace, authentication, APIs, Kanban workflow; related-note ranking, Zod response validation, caching unchanged AI results, editable suggestions and fallback are documented in existing details. |
| Chequers9 | https://chequers9architects.com/ | chequers9-homepage.webp | Independent client design, development, deployment and maintenance; responsive imagery and deferred interactive 3D introduction. |
| DropDox | https://drop-dox-app.vercel.app | dropdox-homepage.webp | Next.js/TypeScript file management, Clerk OTP authentication, ImageKit uploads, starred/trash interface, PostgreSQL. Public screenshot is the homepage, not an authenticated dashboard. |
| Architectural Walkthrough | https://architectural-walkthrough-demo.101mineshrajput.workers.dev/ | walkthrough-homepage.webp | Independent client design, development, deployment and maintenance of the browser walkthrough. |

Source-code destinations are existing Minesh GitHub repositories `NoteStack.AI`, `Chequers9`, `DropDox`, and `architectural-walkthrough-demo`. Use `src/data/portfolio.ts` as the definitive URL/copy source. Do not invent employment details, project metrics, performance improvements, or access to private product screens.

Toolkit categories:

- INTERFACE / “What you interact with”: React, Next.js, TypeScript, JavaScript, Redux Toolkit, TanStack Query, Tailwind CSS, Three.js. Highlighted core: React and TypeScript.
- SYSTEMS / “What makes it work”: Node.js, Express, REST APIs, MongoDB, PostgreSQL, JWT. Highlighted core: Node.js and PostgreSQL.
- DELIVERY / “From build to browser”: Git, Jest, Docker, AWS, Google Gemini. Highlighted core: Git and Docker.

## Exact layout and interaction guardrails

Mobile breakpoint for the main narrow-layout overrides is 600px. Approved mobile hero headline remains 39px, line-height 1.16, with the existing letter spacing. Final mobile spacing overrides: hero top 56px, content bottom 40px, description top margin 20px, actions top margin 24px, profile links top margin 20px. Informative labels/tags must not fall back to the original tiny sizes. Decorative illustration text is intentionally excluded from those minimums.

Header height currently measures 74px mobile and 92px desktop; adding 16px gives 90px/108px anchor clearance. **Measure dynamically**, do not hardcode these observed totals as the scrolling algorithm. ResizeObserver updates the CSS property and observes again on pageshow. Native hashes and scripted scrolling share the root scroll padding.

Scripted same-page scrolling validates origin/path/query/hash, ignores modified clicks, downloads and external targets, updates history only when hash changes, clamps the destination to the scrollable range, and uses a quartic ease over 550–1200ms depending on distance. Wheel, touchstart, keydown, pagehide and popstate cancel its pending animation frame. Preserve keyboard/skip-link destination focus with temporary tabindex cleanup; do not globally suppress focus outlines.

Root light colors: background #f7f7f2, ink #252b28, muted #687069, accent #657a48, button #28342b. Dark background #0b0d0c, ink #e7e9e2, muted #9ba398, accent #b5c398, button #d8dfcd. Reading sections/footer scope stronger muted/accent colors: light #465047/#42562e; dark #b5bdae/#b5c398. These scoped overrides deliberately avoid changing hero colors. Glass backgrounds use .83 opacity and 14px blur. Read the later CSS overrides: original .48/.42 section values and broad text glow still appear earlier but are overridden by final .72/.68 surfaces and 3px shadow.

Screenshot layout uses `.project-image.project-screenshot{aspect-ratio:auto}` with image width 100% and height auto; actual files plus width/height attributes enforce 16:9. The general illustration fallback is 16:9. Avoid using object-fit contain in a mismatched box (bars) or object-fit cover on the wrong source ratio (cropping). Keep actual capture pixels and accurate alt text. Public capture only; never sign into products to obtain replacements without authorization.

Gallery stage reserves selected metadata dimensions through `--photo-aspect`, constrained viewer height, and contained image rendering. Each selection hides the old displayed image, sets caption/counter/dimensions/loading state, creates a new Image loader and increments a request token. Old callbacks are detached and token-guarded. Retry reloads the current selection; closing invalidates in-flight callbacks and restores opener focus. Previous/next wrap. Retain Escape/native dialog behavior and explicit controls. Swipe gestures are intentionally deferred, not accidentally omitted.

Reveal motion: hero CSS delays are 0/65/130/195/260ms across introductory blocks. JS below-fold reveal uses 16px upward travel, 850ms, cubic-bezier(0.22,1,0.36,1), stagger 65ms capped at 195ms, threshold 0 and bottom root margin -24px. Toolkit panels reveal as units to avoid double-animating their text. Already-visible/above-viewport content remains still; pending set contains only unrevealed items, reconnects on cached return, and deletes items as they reveal. Content remains visible if scripting fails.

Music state has pending/wanted/resume/suspended guards. Call play synchronously inside gesture callbacks, without awaiting beforehand; catch rejected promises. Do not attach multiple audio elements or overlapping play attempts. Visibility pause tracks whether playback was active or pending, and does not resume externally paused music merely because the tab becomes visible. Cached return preserves playback position; document navigation without cache may create a fresh element. Mobile browser volume restrictions still require device verification.

Lifecycle disclosure key is `minesh-disclosures:${location.pathname}`. Save open booleans on pagehide; restore only when navigation timing says back_forward. Fresh visits should not unexpectedly reopen saved details. Storage exceptions are tolerated. Cached pages retain DOM naturally; avoid forced reload or recreating the ocean on persisted pageshow.

## Detailed validation ledger

The current 20 automated tests comprise 8 build/SEO tests, 2 motion tests, 3 ocean tests and 7 polish tests. The earlier usability record says 16 because SEO added four later; 20 is the latest total.

- Build: local assets/anchor destinations resolve; professional content and four project links exist; resume is a real PDF and social image exists; descriptive gallery and native dialog controls exist.
- SEO: unique SSR titles/descriptions and canonical URLs; social titles/descriptions and real PNG dimensions; parsed structured data matches visible identity, website and 38-photo inventory; robots discovers a sitemap containing exactly the two canonical HTML pages.
- Motion: pointer link focus versus keyboard destination focus; first/restored viewport content stays still and new content reveals once.
- Ocean: resize paints immediately, duplicate resize preserves current frame/wake, default animation continues under reduced-motion preference while hidden tabs stop rendering.
- Polish: responsive header clearance including cache restore; repeated cached reveal restoration; cached ocean pause/resume versus final destroy; uncached Back disclosure restoration versus fresh visit; synchronous blocked-autoplay retries without overlapping requests; externally paused music stays paused on visibility return; gallery stale success/error, Retry, reserved dimensions and close focus.

Browser evidence from the previous implementation pass (not rerun merely for this handoff edit): both themes at **320, 375, 390, 430, 768, 1100, 1440px**; no homepage/header/contact horizontal overflow; no gallery/dialog horizontal overflow and gallery controls >=44px; desktop anchors approximately 108px below top without pointer section outline. Gallery success/rapid navigation/Right/Escape/focus return observed. Real Back preserved theme, scroll position 1316px in that scenario, and open disclosure after fallback fix. Music was observed after interaction. These checks used a local production preview, not a physical phone.

Slow-network/error/reordered gallery completion scenarios were automated with controlled test events; do not claim live browser throttling was done. No gallery before screenshot existed. Screenshots and contrast measurements were once saved in temporary QA directories but removed during cleanup; only final project previews remain. No Lighthouse score, Search Console inspection, comprehensive accessibility certification, or true cold-load production CLS was obtained.

Acceptance remaining from the original plan includes real-device fresh load/refresh, hash/Back/Forward, rotation and mobile toolbar behavior; complete keyboard traversal of header/skip/index/disclosures/gallery/back-to-top; 200% text; cold-cache layout shift and exhaustive contrast coverage. Automated tests cover parts of these but cannot substitute for every physical/manual check.

## SEO implementation details and post-deployment boundary

Homepage title: “Minesh Rajput | Full-stack Developer in Kolhapur, India”. Photography title: “Photography by Minesh Rajput | Visual Notebook”. Descriptions are centralized in `pageMetadata` and canonical paths include trailing slashes. `canonicalUrl` requires configured site; avoid localhost in emitted search metadata. Shared layout emits language, viewport, author, robots index/follow/max-image-preview:large, theme color, canonical, favicon, one page title, complete OG and Twitter metadata and JSON-LD.

Structured data uses Person `#person`, WebSite `#website`, homepage WebPage mainEntity Person, and photography CollectionPage with actual ImageObjects/ItemList and Home/Photography breadcrumbs. No fabricated employer, address, ratings, credentials or rich-result eligibility claims. Existing social PNG is 1200x630; retain editable SVG too. Sitemap lists only `/` and `/photography/`, omits fabricated lastmod. Robots allows rendering resources and links production sitemap.

Google references already consulted: https://developers.google.com/search/docs/fundamentals/seo-starter-guide and https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap . Metadata implementation alone does not guarantee indexing/rankings. Live redirects, HTTP responses, canonical domain choice and Search Console remain hosting/account work after deployment authorization.

## Provenance, cleanup and collaboration cautions

Upstream ASCII source: https://github.com/stackedlol/ascii-sharks at `c521e24a787e6d4cc460d4cf2b9815f25e4fe453`. Local implementation is Astro/TypeScript canvas, not React; early research describes the original React wrapper and recommendations, not the final implementation. Early recommendations for reduced-motion defaults/manual pause were superseded by the owner's explicit animation preferences. Do not blindly implement historical recommendations from research as new requirements. The missing upstream license remains a separate unresolved fact.

Geist local file is `public/fonts/geist-latin.woff2` with `public/fonts/OFL.txt`. Removing the unused npm package did not remove the bundled font. Attribution documents its origin. User-provided resume/photos originated from the designated earlier portfolio at `E:\DEV\Minesh Rajput`; do not depend on that directory for running this checkout. Screenshot assets were subsequently refreshed from public destinations. No new blanket license was assigned to third-party code or owner media.

Deleted superseded assets: `notestack-dashboard.webp`, `notestack-dashboard.avif`, `chequers9-homepage.avif`; unused `src/lib/ocean/index.ts` and renderer `paintGrid`; old `research/implementation-validation.md`; static public sitemap/robots superseded by source endpoints; @fontsource-variable/geist dependency. Temporary cleanup removed 175,807,939 bytes. Do not delete current public media, resume, music, tests, notices, lockfile, or authoring SVG as “unused” without checking references/purpose.

Original workspace: `C:\Users\101mi\OneDrive\Documents\ChatGPT\ASCII art portfolio`. Shell was PowerShell, timezone Asia/Calcutta. Many source files were already modified/untracked during this extended session; no commits or deployment were made. An agent should inspect `git status` and applicable repository instructions before editing, preserve unrelated changes, and avoid resetting the checkout. The current Markdown handoff update changes documentation only, so no new functional test pass is claimed for it.

Owner favors action and concise, candid progress updates; repeated unnecessary confirmation is frustrating. Read files and do reversible local work within scope. Explain any actual blocker plainly. When updating this file, revise obsolete entries rather than stacking contradictory statuses; distinguish observed browser results, unit-test evidence and outstanding checks. Keep the approved hero/images and preference corrections prominent so the next AI does not repeat earlier regressions.
