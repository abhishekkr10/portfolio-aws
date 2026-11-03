# Abhishek Kumar Singh — Engineering Portfolio

Original Figma-exported PCB interface, completed with React 19, Vite 8, TypeScript and Tailwind. Project facts come from source repositories and the earlier portfolio; recordings and simulations are labelled.

## Run

Use Node 22 and pnpm. Run `corepack enable`, `pnpm install --frozen-lockfile`, then `pnpm dev`. `pnpm build` generates the proof manifest and creates `dist`. `pnpm lint` runs ESLint and TypeScript.

## Structure

- `src/App.tsx`: existing visual layout and UART console.
- `src/data/projects.ts`: project facts, metrics, code excerpts and source references.
- `src/ProjectDetail.tsx`: accessible native dialog and recorded proof.
- `scripts/build-proof-manifest.mjs`: recursive media discovery.
- `public/proof/<slug>/`: project images and compressed recordings.
- `amplify.yml`: Node 22 deployment build for AWS Amplify.

## Add proof

Put PNG, JPEG, WebP, GIF, MP4 or WebM files in the project slug directory. File names become captions. Run `pnpm build`; empty galleries are hidden. Files over 10 MB produce a warning. Keep original recordings outside Git and use compressed web copies. Never add credentials, environment files or model weights.

Repository links are hidden where anonymous access could not be verified. Code excerpts retain commit-pinned provenance in project data. A proof recording shows a historical run, not a service status claim.
