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

Resume final wording updated per user: AeroNode, CausalBench, SafeTrack, JOCKY order; SafeTrack team attribution and individual contributions; full school name and expected graduation wording. One-page render verified.

Resume header simplified to clickable GitHub, LinkedIn and Portfolio labels; project URLs remain visible. All 8 PDF link annotations verified and one-page render checked.

Resume matches latest user-provided wording; restored visible profile URLs and confirmed no seeking-internships sentence. One-page PDF visually checked.

Resume profile replaced with user's exact requested approximately 25% wording; remaining content unchanged. One-page render verified.

Resume changes 2/5/9 applied: consistent 25.2% profile metric, separated AeroNode result/setup sentences, clickable labelled profile links. One-page visual and hyperlink checks passed.

## Case-study proof integration - 3 November 2026

Integrated the supplied Figma export's case-study panel design without replacing the verified homepage, contacts, console or resume. Added shared case-study stages/notes, large contained previews, screenshot thumbnails, recorded video selectors, poster images, image lightbox navigation, loading-error recovery, code and source actions. All media paths use /proof rather than /public/proof.

Evidence inventory: AeroNode has a labelled preview and download of the supplied PDF guide (not a run recording); JOCKY has 9 screenshots and one recording; SafeTrack 13 screenshots and one recording; CausalBench 6 screenshots and one recording. Original recording folders remain unchanged.

Validation: build and ESLint/TypeScript pass; actual image decoding and video playback pass for every project at 360/390/768/1440 px; no panel horizontal overflow. Keyboard focus trap, nested lightbox Escape, focus return, proof command and mobile menu pass. Case-study axe scan reports zero violations. Latest revised resume matches the public download byte for byte. Evidence in verification/proof-results.json and case-study screenshots.

Resume updated with exact latest profile, merged AeroNode benchmark bullet, user-provided project dates aligned right, shortened JOCKY and ruled section headings. One-page PDF visually verified.

Resume polish: varied profile verb, single-line JOCKY bullet, TS/JS skills abbreviation, aligned graduation date, and user-confirmed CausalBench Nov 2026 - Present. One-page visual and header hyperlink checks passed.
