# ASCII sharks integration research

Inspected 20 October 2026. Research only; no implementation. Source tree revision: `c521e24a787e6d4cc460d4cf2b9815f25e4fe453`.

## Verified source and API

- This is a small TypeScript canvas simulation with no runtime dependencies, not an installable public package: package metadata marks it private; Vite and TypeScript are development dependencies. [Package metadata](https://github.com/stackedlol/ascii-sharks/blob/main/package.json)
- Actual engine API: `new OceanEngine(canvas: HTMLCanvasElement, sharks?: SharkSpec[])`, with `destroy()` for cleanup. It includes resize observation, offscreen detection, reduced-motion still rendering, fixed 60 Hz simulation steps with bounded catch-up, and a device-pixel-ratio cap of 2. There is no public pause/resume or theme setter. Pointer listeners attach to the window, so `pointer-events: none` on the canvas does not disable simulation interaction. [Engine](https://github.com/stackedlol/ascii-sharks/blob/main/src/engine.ts)
- An existing client React wrapper exports `AsciiOcean({ className?, sharks? })` from `src/react.tsx`. It instantiates the engine in an effect and destroys it on cleanup. The shark roster is fixed at mount; changing that prop alone does not update the simulation. It renders an `aria-hidden` canvas. [React wrapper](https://github.com/stackedlol/ascii-sharks/blob/main/src/react.tsx)
- `SharkSpec` is `{ kind, size }`; eight species are supported. Defaults are four classic sharks at different sizes. Fish population is area-based, clamped to 85–340. A fish-count override exists on `World`, but is not exposed by `OceanEngine`. [World](https://github.com/stackedlol/ascii-sharks/blob/main/src/world.ts)

## Theme implications

The renderer requests an opaque 2D canvas, paints black, uses a faint white grid and pale fish, and gives swimming paths cyan highlights. These colors are embedded in renderer code; page CSS alone cannot create a coherent light theme. The example uses Geist Mono at weight 600. [Renderer](https://github.com/stackedlol/ascii-sharks/blob/main/src/renderer.ts), [Demo HTML](https://github.com/stackedlol/ascii-sharks/blob/main/index.html)

Recommended adaptation: introduce explicit renderer palettes for background, grid, fish, shark shading, and wake colors. Preserve the video's palette after reference inspection; do not treat the repository's black demo as evidence of video colors. Changing a theme should repaint cached background and dependent color arrays, including while motion is paused. Prefer intentional light colors over blanket CSS inversion.

## Recommended portfolio integration

- Keep one viewport-sized canvas fixed behind the entire scrolling document, mounted at the application shell. Do not allocate a document-height canvas. Keep DOM text and links above it with an overlay or surfaces that preserve readable contrast.
- Retain engine ownership inside a React effect with symmetrical cleanup. Verify development Strict Mode's extra setup/cleanup cycle does not create duplicate loops/listeners. [React effect guidance](https://react.dev/reference/react/useEffect)
- Add an explicit motion control that freezes the current scene. Default to a static scene for reduced motion. Automatically moving decorative content beside reading content needs a pause/stop/hide mechanism when it continues over five seconds; system reduced motion alone should not be the only control. [W3C Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)
- Extend the loop with document visibility handling. A fixed canvas remains in the viewport, so offscreen observation does not address hidden tabs explicitly. Pause on `visibilitychange`, resume only if user motion preference permits, and reset elapsed-time accounting. [Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API)
- Provide a static background fallback if canvas initialization fails. On narrow/mobile devices start with fewer sharks and lower density; expose fish-count and rendering-quality options rather than adding a heavyweight 3D library.
- Filter interaction over links, buttons and forms so clicking navigation does not also create splash effects. This requires guarding the existing global event handlers.

These are design recommendations, not measured performance results. Profile the actual integrated page before setting a final frame-rate or population budget.

## Verification and remaining dependency

Test theme switching in animated and paused states; reduced-motion changes while open; manual pause surviving tab switches; keyboard navigation; readable content over the busiest frames; portrait/landscape resize; React remount cleanup; and graceful canvas failure. Test one midrange mobile browser as well as desktop.

GitHub reports `license: null`; the complete source tree has no license file, and the README/package metadata contain no license grant. Confirm the author's reuse permission or an added license before shipping copied source. Public visibility alone is not a general reuse license. [Repository metadata](https://api.github.com/repos/stackedlol/ascii-sharks), [Full tree](https://api.github.com/repos/stackedlol/ascii-sharks/git/trees/main?recursive=1), [GitHub licensing guidance](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository)

No backend, AI API, animation SaaS, WebGL framework, or video playback is needed for this background. Exact reference colors, density, pace and content composition still require inspecting the attached videos.
