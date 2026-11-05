# Abhishek Kumar Singh — Engineering Portfolio

Personal portfolio for embedded systems, Edge AI and IoT, with an interactive UART-style console, four project case studies and recorded engineering evidence. Built with React 19, TypeScript, Vite 8 and Tailwind.

The dark PCB-inspired interface was developed from a Figma Make export and integrated with project data, media, keyboard interaction and deployment using Codex. Project facts and code excerpts link to their source repositories.

## Published sites

- [Personal portfolio](https://abhishekkrsingh-portfolio.netlify.app/)
- [Source repository](https://github.com/abhishekkr10/portfolio)

## Explore

- About, Skills and Projects sections, plus a downloadable résumé.
- UART-style browser console with `help`, quick commands, command history and Tab completion. Try `aeronode` or `proof causalbench`.
- AeroNode, CausalBench, SafeTrack and JOCKY case studies with source links, commit-pinned code excerpts and available screenshots or recordings.
- Desktop pointer effects, responsive layouts and system reduced-motion support.

The console is a **DEMO**. Recorded replays are labelled **RECORDED**, and illustrative visuals are identified in context. SafeTrack is credited as a team project and links to [Naman Singh's original repository](https://github.com/inamansingh2401/tamperproject).

## Run

Use Node 22 and pnpm.

```sh
git clone https://github.com/abhishekkr10/portfolio.git
cd portfolio
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

```sh
pnpm lint
pnpm build
pnpm preview
```

The prebuild script generates the proof manifest. Vite writes the production site to `dist`; lint runs ESLint and TypeScript.

## Structure

- `src/App.tsx`: existing visual layout and UART console.
- `src/data/projects.ts`: project facts, metrics, code excerpts and source references.
- `src/data/proof-captions.json`: descriptive captions keyed by media path.
- `src/data/proof-manifest.json`: generated media index.
- `src/ProjectDetail.tsx`: accessible native dialog and recorded proof.
- `src/motion-runtime.ts`: deferred scroll and pointer interactions.
- `scripts/build-proof-manifest.mjs`: recursive media discovery.
- `public/proof/<slug>/`: project images and compressed recordings.
- `netlify.toml`: Netlify build, Node/pnpm versions and hashed-asset caching.
- `amplify.yml`: Node 22 deployment build for AWS Amplify.

## Add proof

Put PNG, JPEG, WebP, GIF, MP4 or WebM files under `public/proof/aeronode/`, `jocky/`, `safetrack/` or `causalbench/`. Nested directories are supported. Add a descriptive caption to `src/data/proof-captions.json`, using a key such as `proof/safetrack/example.png`. Without an override, the filename becomes the caption.

Run `pnpm build` to regenerate the manifest; empty galleries are hidden. Files over 10 MB produce a build warning. Assets in `public/proof/` are served at `/proof/`. Use compressed web recordings and keep original large files outside Git.

Project source links and code provenance are maintained in `src/data/projects.ts`. AeroNode's recorded CPU benchmark and the separate local Phase 1–3 test run have distinct scopes. Case-study evidence states the relevant scope and limitations.

## Deployment

Netlify publishes the personal portfolio from this repository's `main` branch using `netlify.toml`, Node 22, pnpm and the compiled `dist` output. Hashed assets receive immutable caching. AWS Amplify uses `amplify.yml` and retains the hackathon URL.

Builds and browser verification are separate checks. See `verification/`, [current status](current_status.md) and [architecture](architecture.md) for recorded checks and their scope.

## Repository hygiene and license

Keep credentials, `.env` files, private keys, personal runtime data, model weights and large binaries out of Git. Public proof media must be suitable for publication. This repository uses the [MIT license](LICENSE).
