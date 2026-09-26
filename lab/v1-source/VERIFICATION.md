# Verification and delivery

Final package: `site/`. Local source preview: http://127.0.0.1:4500. Packaged preview: http://127.0.0.1:4501.

## What was checked

- Desktop 1440 × 900, laptop 1280 × 720, tablet 768 × 1024, phone 390 × 844, compact phone 360 × 640, and desktop with reduced motion.
- All six layouts: no horizontal overflow, no broken images, no JavaScript errors, and no failed requests.
- Five project selections, all 20 stage controls, all five project-note dialogs, Escape closure, native focus restoration, keyboard tab-list navigation, phone tab visibility, and project-aware email destinations.
- JavaScript-disabled reading: all five projects are represented; introduction, experience, and contact remain visible and usable.
- Local fonts and logo load without third-party requests. The delivered source and shared engine match the packaged files; the engine is unchanged from the skill.
- Text foreground/background contrast in 24 section/viewport checks: zero failures, minimum observed ratio 4.99:1. This is a targeted audit, not an accessibility certification. Decorative grid lines, connection traces, and the supplied logo are not body text and are outside this text check. Meaningful diagram labels and buttons are included.
- Pointer depth produces actual pixel changes in the hero. Left/right pointer screenshots differ within the portrait composition; native pointer capture and lock were disabled in every browser context.
- Scroll Craft harness: 25 samples each on desktop, phone, and reduced motion. Final runs found no dead scroll. Contact sheets and full-resolution hero, project, phone, and contact frames were inspected.

## Evidence

- `lab/final3/report.json`: final comprehensive interaction, layout, and contrast run.
- `lab/final3/`: six layout sets, five dialog views, pointer comparison, phone full-page, and JavaScript-disabled screenshots.
- `lab/final-scroll-desktop/`: final desktop pacing and bespoke diagram state.
- `lab/final-scroll-mobile/`: phone scroll sequence.
- `lab/final-scroll-reduced/`: final reduced-motion sequence.
- The final copy-only polish replaced internal audit wording in note footers with useful architecture summaries and fixed the hero footer label. No behavior changed after the comprehensive pass. A final package smoke check covers these delivered files.

## Findings and fixes

1. The initial background threshold removed bright areas inside the generated portrait. A connected-background mask preserved the face and arms; the edges were inspected over light and blue backgrounds.
2. The first desktop pin held longer than the diagram warranted. It was shortened from 2.65 to 2.15 viewport heights. The custom diagram now publishes its real painted line offset, node transforms, and selected stage for the harness, whose default checks could not see bespoke motion. Actual screenshots also show the changing line and stage explanations.
3. A delayed dialog-close listener could steal keyboard focus after the visitor had already continued navigating. Native dialog focus restoration now handles this once.
4. Line breaks hidden on narrow screens concatenated adjacent words. Whitespace was added, then phone and tablet screenshots were checked.
5. A test selector became ambiguous when a second `noscript` element was added. It was corrected to target the main content. The final test run passed.
6. No-JavaScript styles now keep entrance-animated prose visible and replace inactive project controls with readable project summaries.

Earlier runs remain in `lab/qa`, `lab/final`, `lab/final2`, and `lab/scroll-*`. Their screenshots and partial results are superseded as noted above; they are not presented as final evidence.

## Feel check

Intended: curiosity → recognition → clarity → confidence → readiness.

First visual read: curiosity → calm → technical interest with an overlong pause → confidence → readiness. The work section held too long for small changes; the tighter span now gives the stages a clearer pace. The quiet approach section provides separation before the navy work section, which is the largest scene. The contact plate resolves in a stable, fully readable final frame.

The signature is the explorable system folio: project selection redraws the architecture, stage selection explains it, and the selected project carries into an email inquiry. The large color change and held project surface establish the peak. On phones it becomes natural flow without a pin, and all controls remain available.

## Assets and generation

- Supplied SKM logo, cropped to its alpha bounds; original retained in `assets/source/`.
- One generic fictional studio portrait generated with Scroll Craft's Kie.ai workflow using Seedream 5 Pro; prompt saved in `portrait-prompt.txt`. Original retained; transparent WebP used by the site.
- The portrait is visibly labeled “Temporary AI portrait” and has explicit placeholder alt text.
- Balance observations: 14 credits before generation, 0 after. One successful still request was made. The account delta is 14 credits; no unrelated account usage was audited.
- No OpenAI image CLI was used. The native image tool was unavailable; the explicitly requested Scroll Craft provider was used with the credential file supplied by the user. No credential is copied into the project or deployment package.
- System illustrations are original SVG diagrams grounded in project source files. They are labeled system maps, not represented as app screenshots.

## Content and limits

Professional copy is grounded in the supplied CV. The chosen projects were explicitly confirmed by the user. GitHub and LinkedIn use the supplied URLs; their page contents could not be retrieved, so no facts were inferred from them. The CV's third-party referee details are not published.

The site is complete as a local static portfolio. Public hosting/domain configuration was not requested and is not configured. Email links open a mail client; no message has been sent. Physical iPhone/Android hardware, screen readers, and Safari were not tested. There is no video, microphone capture, database, analytics, or form backend in this portfolio.

The creative brief contains clearly labeled authored decisions. No full eight-topic interview or explicit creative-delegation statement was invented. The grammar, journey, layer contract, score, alternatives, and empty-registry gate result are recorded in `BRIEF.md`.
