# Architecture

## Runtime

Vite 8 builds the original React 19 and Tailwind PCB interface. src/main.tsx mounts App; src/index.css preserves its visual design and adds focus/reduced-motion rules. Fonts are bundled through Fontsource. The static application requires no backend or secrets.

## Content and provenance

src/data/projects.ts is the shared project source for cards, dialogs and project console responses. Each record carries a slug, verified name/status/summary, scoped metrics, tags, repository visibility, proof location, limitation and exact code excerpt with commit-pinned provenance. AeroNode and CausalBench sources were inspected through authenticated Git access; anonymous repository access was unavailable, so no public links are rendered. JOCKY and SafeTrack public sources were verified. Contact destinations and the downloaded resume come from the previous portfolio.

## Proof pipeline

pnpm build runs scripts/build-proof-manifest.mjs first. It scans public/proof recursively, supports PNG/JPEG/WebP/GIF and MP4/WebM, derives captions from filenames, warns above 10 MB and writes src/data/proof-manifest.json. Empty image/video folders generate empty lists and no gallery. Original high-resolution recordings remain outside Git; web copies use H.264 at 960 px and 15 fps, without audio, for quick loading.

ProjectDetail uses native modal dialogs with explicit Tab wrapping, Escape handling, scroll locking and focus restoration. The image lightbox is a nested modal. Images load lazily; videos use controls, muted, playsInline and preload none.

## Interaction

The UART console is explicitly DEMO. History and completion never autofocus or navigate on load. proof commands open the corresponding project dialog. AeroNode output is a recorded replay; CausalBench marks simulated actuation and a recorded stale-sample divergence. Scroll progress writes through a ref in a single pending animation frame, with listener/frame cleanup.

## Build and verification

amplify.yml selects Node 22, enables Corepack, installs the frozen pnpm lockfile and publishes dist. ESLint and TypeScript run through pnpm lint. Browser scripts in scripts/ verify viewport sizes, console interaction, keyboard dialogs, accessibility and destination responses against the production preview at port 4173. Lighthouse and browser reports live in verification/. Tests use the installed Microsoft Edge browser.
