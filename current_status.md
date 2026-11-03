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

## Proof corrections - 3 November 2026

Supersedes the earlier document-preview implementation. Removed AeroNode's PDF thumbnail from the gallery and executed the supplied runbook against the existing local Phase 1-3 implementation. Fresh results are rendered as native result panels with stage outcomes, per-exit accuracy, parity and JSON evidence; no runbook is displayed. Initial tiny-model shape failure and recovery are disclosed. Later adaptive benchmark results were not rerun and are explicitly distinguished.

Replaced filename captions with image-specific descriptions after inspecting all 28 screenshots. Complete source functions and project-specific explanations now replace truncated excerpts, with correct commit-pinned line ranges. Fresh browser verification passed all 16 project/viewport combinations, actual image decoding and all video playback; panel axe scan has no violations. Build and lint pass.

## Motion and interaction layer - 3 November 2026

Implemented all six effects in separate commits: scroll-drawn circuit with active nav LEDs; viewport-gated recorded/illustrative project visuals; desktop spotlight/tilt; once-per-heading hex decode; reactive hero traces and touch idle; magnetic primary action and scroll-velocity marquee. No external animation libraries/assets. Runtime loads after window load plus two animation frames. Reduced motion honors OS preference and a persisted user toggle, with storage failures handled; all motion becomes static and pointer effects are gated by input type.

Validation: build and lint pass; 360/390/768/1440 document and header widths fit. Console, keyboard/dialog focus, Escape and mobile menu checks pass. Reduced-motion test reports zero running animations; persistence, system preference and blocked-storage fallback pass. Axe reports zero violations. Body entrance opacity fade was removed to preserve text contrast; checkpoint label contrast was corrected.

Lighthouse local production mobile: performance 100 -> 100, accessibility 100 -> 100. LCP 755.407 ms -> 756.173 ms (+0.766 ms, normal measurement variation; both 0.76 s rounded). No material LCP regression observed; this is lab evidence, not a guarantee for every device/network. Total JS gzip 74,778 -> 77,502 bytes (+2,724). Initial bundle +936 bytes; deferred motion runtime 1,788 bytes. All requested effects retained, well below the approximately 60 KB gzip allowance. Reports and checks are in verification/motion-* and scripts/check-motion.mjs.

Cursor polish: removed Reduce motion and Open to opportunities header items. Motion defaults on, ignoring the removed toggle's old saved preference; system reduced-motion still wins. Added a transform-only dot/ring cursor with time-based trailing, page-wide glow, native input/video cursors and keyboard restoration. Touch retains native cursor. Native scrolling retained; hero trace geometry cached to avoid per-path layout reads. Build/lint, four-width page checks and keyboard/dialog tests pass; cursor/default/system preference checks pass.
