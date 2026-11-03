# Current status

Updated 3 November 2026. Implementation complete; AWS hosting remains a deployment step.

## Completed

- Preserved original PCB layout, palette and typography; removed Figma integrations and placeholders.
- Verified source repositories and contacts; added shared project data and commit-pinned source excerpts.
- Four source-driven project cards with code copying, case studies and recorded proof.
- Recursive prebuild proof manifest, lazy images, compressed videos with controls and no preload, native dialogs with explicit focus traps, Escape, focus return and scroll lock.
- UART DEMO console: history, completion, quick commands, project proof navigation and recorded AeroNode replay.
- Self-hosted fonts, reduced motion, visible focus, metadata, favicon and OG asset.
- README, MIT license, ignore rules and Node 22 Amplify build configuration.

## Verification

- pnpm build: passed.
- pnpm lint (ESLint + TypeScript): passed.
- 360, 390, 768, 1440 px: document width matches viewport, no horizontal page scroll.
- Keyboard/mobile: focus trap, nested lightbox Escape, case-study Escape, focus return, console completion/history, proof command and mobile menu passed.
- Automated accessibility: zero axe violations.
- Lighthouse mobile, local production build: performance 100, accessibility 100. Scores are laboratory observations, not a guarantee for AWS hosting.
- Link checker: 47 distinct destinations checked. Local assets/anchors resolve. LinkedIn returns bot-block status 999; one GitHub source permalink returns rate-limit status 429. These two cannot be certified by automated requests; no 404 or placeholder destinations were found. GitHub permalink corresponds to the checked-out real commit and file.
- Original recordings remain outside the repository; compressed web copies are 0.32–0.85 MB each.

## User input and remaining external actions

- AeroNode and CausalBench are now public: anonymous GitHub API access verified on 3 November 2026. Repository and commit-pinned code links are enabled.
- JOCKY status resolved from README: Working local platform.
- Tracking name resolved from supplied repo README: SafeTrack.
- Email, GitHub, LinkedIn and resume resolved from previous portfolio; nothing further needed for contacts.
- Connect portfolio-aws to AWS Amplify to publish using amplify.yml. No AWS deployment was requested or performed.
- AeroNode currently has only a proof PDF, so its image/video gallery is correctly hidden. Add screenshots or recordings to public/proof/aeronode to populate it.

Deployment asset check: removed inherited Git LFS filters; compressed web media is stored as normal Git blobs so Amplify needs no LFS setup.

Live verification 3 November: AWS URL https://main.d3uqlqzdn1kqb0.amplifyapp.com/ loads. Responsive and keyboard checks pass; live media checker caught an extra /public prefix in generated proof URLs. Fixed manifest to use paths relative to public; build and lint pass. Deployment verification pending after automatic rebuild.

Resume updated 3 November: one-page PDF revised from original resume and current source repositories; CausalBench and live portfolio link added, benchmark scope retained. Rendered and visually checked; public download replaced.

Resume revision: phone number, first-year CGPA 8.4/10, KV IIT Kanpur XII 89% and X 89.4% added. Project order AeroNode, SafeTrack, CausalBench, JOCKY; visible repository URLs and three skills groups. One-page PDF rendered and visually verified.
