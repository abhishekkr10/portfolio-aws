# Architecture

## Runtime

Vite 8 builds the original React 19 and Tailwind PCB interface. src/main.tsx mounts App; src/index.css preserves its visual design and adds focus/reduced-motion rules. Fonts are bundled through Fontsource. The static application requires no backend or secrets.

## Content and provenance

src/data/projects.ts is the shared project source for cards, dialogs and project console responses. Each record carries a slug, verified name/status/summary, scoped metrics, tags, repository visibility, proof location, limitation and exact code excerpt with commit-pinned provenance. All four repositories have verified public access. Repository and commit-pinned code links are rendered from project data. Contact destinations and the downloaded resume come from the previous portfolio.

## Proof pipeline

pnpm build runs scripts/build-proof-manifest.mjs first. It scans public/proof recursively, supports PNG/JPEG/WebP/GIF and MP4/WebM, derives captions from filenames, warns above 10 MB and writes src/data/proof-manifest.json. Empty image/video folders generate empty lists and no gallery. Original high-resolution recordings remain outside Git; web copies use H.264 at 960 px and 15 fps, without audio, for quick loading.

ProjectDetail uses native modal dialogs with explicit Tab wrapping, Escape handling, scroll locking and focus restoration. The image lightbox is a nested modal. Images load lazily; videos use controls, muted, playsInline and preload none.

## Interaction

The UART console is explicitly DEMO. History and completion never autofocus or navigate on load. proof commands open the corresponding project dialog. AeroNode output is a recorded replay; CausalBench marks simulated actuation and a recorded stale-sample divergence. Scroll progress writes through a ref in a single pending animation frame, with listener/frame cleanup.

## Build and verification

amplify.yml selects Node 22, enables Corepack, installs the frozen pnpm lockfile and publishes dist. ESLint and TypeScript run through pnpm lint. Browser scripts in scripts/ verify viewport sizes, console interaction, keyboard dialogs, accessibility and destination responses against the production preview at port 4173. Lighthouse and browser reports live in verification/. Tests use the installed Microsoft Edge browser.

Resume: public/Abhishek-Kumar-Singh-Resume.pdf is a static one-page PDF, updated from the user's original resume and verified repository evidence. Source links and portfolio URL are clickable.

## Case-study presentation

src/project-detail.css scopes the supplied Figma panel styling to ProjectDetail, preserving homepage CSS. Case-study stages and notes now live alongside project metadata in projects.ts. The curated viewer switches between existing screenshots and compressed recordings, with native video controls and image posters. A nested native dialog supports full-size images and next/previous navigation. AeroNode's only supplied proof is a testing guide: a clearly labelled first-page preview and PDF download appear instead of an invented recording. scripts/check-proof.mjs verifies browser image decoding and video playback across all four viewport sizes; scripts/check-case-accessibility.mjs checks the panel with axe.

## Measured results and descriptive evidence

proof-captions.json maps inspected image/video paths to user-facing descriptions. The prebuild manifest uses those captions. AeroNode now renders src/data/aeronode-results.json from actual local runbook execution; a downloadable sanitized summary lives at public/proof/aeronode/test-results.json. Raw compact verification artifacts are retained in verification/aeronode-run; no model binaries are committed. The old guide preview is removed. Each project snippet is a complete real function, with a source explanation and commit-pinned line range.

## Motion architecture

MotionLayer provides a small persistent reduced-motion toggle and decorative circuit SVG. An early document preference check prevents animation flashes for returning users. motion-runtime.ts is dynamically imported after load/two frames, with generation guards and cleanup for preference changes. Native IntersectionObserver gates project loops and once-only heading decode; requestAnimationFrame batches scroll/pointer writes without React scroll renders. CSS supplies paused project loops, desktop spotlight, idle chip motion and static reduced-motion states. Pointer handlers require mouse input plus fine/hover media support. Marquee playback rate changes through the browser animation API and settles back to its CSS baseline. No animation dependency is added. Layout-bearing heading text stays intact; the brief decode uses a clipped overlay with the real accessible name. Cleanup disconnects observers, removes listeners, cancels frames and restores styles.
