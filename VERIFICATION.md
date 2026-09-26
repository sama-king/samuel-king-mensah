# Verification of the scroll revision

Preview: http://127.0.0.1:4500. Current deployment package: site/ and samuel-king-mensah-portfolio.zip (32 files, 1,954,404 bytes). Earlier layout and interaction checks were performed against prior portrait revisions; the latest folded-arm portrait received asset and package checks below.

## Final package checks

- Desktop 1440 × 900, laptop 1280 × 720, tablet 768 × 1024, phone 390 × 844, compact phone 360 × 640, and reduced-motion desktop.
- All five project positions in each layout: no horizontal document overflow, broken images, or JavaScript runtime errors. Normal-motion gallery copy and artwork fit within the viewport.
- 22 functional checks passed: direct project links, arrow-key navigation, Home, previous/next controls and endpoint disabling, actual native-wheel movement, project notes, Escape and native focus restoration, email context, gallery exit, ten proficiency indicators, dynamic reduced-motion change, correct filled segments under reduced motion, short landscape fallback, no-JavaScript full project content, and emulated touch controls.
- Ten foreground/background contrast checks across five sections on desktop and phone: 236 text samples, zero failures, lowest observed ratio 4.99:1. This tests rendered CSS colors and opaque ancestor backgrounds; it is not a full composited-image contrast audit or accessibility certification. Text embedded inside the original app screenshots is source imagery, not portfolio UI, and is not counted.
- Final source files exactly match the deployment manifest hashes. Scroll Craft engine JS and CSS match the installed skill unchanged. No secret/configuration file or private application data is packaged.
- The final RabahFoods screenshot was captured from the public live website after its Enter screen. No order, chat message, or sign-in was submitted.

## Visual scroll verification

Scroll Craft harness: 31 samples each on desktop, phone and reduced motion. No dead scroll detected. The bespoke gallery publishes its actual painted rail transform and selected project to the harness. Desktop and phone intermediate frames show different visible project imagery, not just an internal progress value.

All three contact sheets were inspected, along with full-resolution hero, project, phone, proficiency, and final RabahFoods frames. The harness runs preceded the final RabahFoods image replacement and completed proficiency labels. The final package was then rechecked across all six layouts and all controls; these final images and reports supersede the earlier provisional-rating screenshots.

## Evidence

- lab/revision-final/report.json and screenshots: final packaged page at six viewport/motion combinations.
- lab/revision-final/desktop-rabah.png: final live-site visual in the gallery.
- lab/revision/functional.json: 22 final-package interaction checks.
- lab/revision/contrast.json: targeted text contrast results.
- lab/revision-scroll-desktop/, lab/revision-scroll-mobile/, lab/revision-scroll-reduced/: 31-frame sequences and inspected contact sheets.
- lab/v1-source/: preserved superseded source and its original verification report.

## Findings and fixes

1. The previous mobile layout removed the held scroll interaction entirely. Normal phone layouts now use a deliberately stacked, scroll-driven project composition; short landscape and reduced-motion contexts retain vertical flow.
2. The old diagram changed too little to make the scroll effect evident. It has been replaced by a full-width continuous project rail with meaningful imagery and direct navigation.
3. Early gallery frames revealed clipped neighboring copy at the outer page edge. A dedicated gallery viewport now clips the track cleanly while it travels.
4. Reduced-motion styling initially filled every language segment, including unselected ones. It now preserves each language's actual named level, verified by a dedicated check.
5. Hidden project line breaks needed explicit whitespace in the natural mobile layout. This was corrected before final packaging.

## Feel check and design report

Grammar: Architect's folio, retaining the general design as explicitly requested. The original rationale against the eight other grammars remains in lab/v1-source/BRIEF.md. This is a same-site revision, intentionally sharing four fingerprint dimensions with the first version; it does not claim a new-site 4-of-6 gate pass.

Signature: vertical scrolling carries five application worlds through a single frame; opening project notes connects those visuals to architecture and an inquiry. Journey: cover, approach, gallery, proficiency, career, contact. Score: parallax, entrance, horizontal travel in a sticky stage, segmented fills, career stagger, contact reveal.

Intended and observed: curiosity → recognition → discovery → range → confidence → readiness. The gallery now produces the largest visual change and owns the longest span. The final contact plate remains settled and readable. Portrait, brand graphics, screenshots and artwork are separate layers; no full-screen media or audio was added.

## Content and remaining assets

Kotlin, Python, PHP and VBA are now Advanced and grouped on the left at the user’s request. .NET, React and Node.js are Familiar, moved to the right with JavaScript/TypeScript, Java and SQL (Proficient). These are qualitative ratings, not measured scores.

FrontDesk and Loveworld Security retain real app logos as temporary identity compositions, labelled App identity. The user will supply their screenshots later. LumosCast uses an existing console design; employed uses an actual capture of repository-provided fictional demo data. The hero portrait is generated from Samuel's three supplied photographs and is labelled accordingly.

The portrait update used the built-in image generation tool; the changed Kie key was not needed. No private CV source, referee contact details, credentials, personal job records, or original JPEG photos are deployed. No message has been sent. Public hosting was not requested. Physical phones, Safari and screen readers were not tested; Chrome phone emulation does not establish physical-device behavior.

The first generated studio portrait was compared with a second, more faithful edit of the first supplied photo. That earlier second portrait was 1086 × 1448 and was checked in desktop and phone screenshots. It has now been superseded by the folded-arm portrait described below. As with any generated image, exact photographic identity is not guaranteed; the user should review the visible portrait before using it as a definitive personal photograph.

## Advanced-group follow-up

Updated Kotlin, Python and PHP to Advanced and grouped them with VBA beneath the introduction. Moved .NET, React and Node.js into the right-hand list. Inspected the packaged page at 1440 × 1000 and 390 × 844; all ten entries are in the requested groups, with no horizontal overflow. Evidence: lab/revision-final/skills-grouping-desktop.png and skills-grouping-phone.png. No scroll or interaction code changed.

## Revision 3 checks (2026-09-26)

- Gallery: 1440 × 900 screenshots at mid-travel show a clear gap and divider between slides; each project holds before easing on.
- Project pages: Scroll Craft `shoot.mjs` run on all five pages at 1440 × 900, LumosCast at 390 × 844 and FrontDesk at 390 × 844. No dead scroll; every cue clears 4.5:1 over media after raising the "The problem" label on light pages to full ink. Sheets in `lab/projects-shots/`.
- `lab/revision-functional.mjs` updated for the project pages (link opens page, architecture stage selects on click, back returns to the gallery, touch opens a page): 22 checks pass. `lab/revision-check.mjs`: no errors, no horizontal overflow.
- Back navigation returns to the same gallery project (verified in the in-app browser).
- Not verified: the view-transition morph itself frame by frame (headless capture lands after it); Safari and Firefox; physical phones.

## Folded-arm portrait follow-up (2026-09-26)

Generated a new portrait from Samuel's three supplied photos, using the original placeholder only for its folded-arm pose, dark top and slight smile. Inspected the output visually: both arms are comfortably folded, the expression is warmer, and the face follows the supplied photos. Saved the 1050 × 1498 RGBA source in `assets/source/portrait-samuel-folded-arms.png` and a 168,628-byte transparent WebP in `assets/portrait-samuel-v3.webp`. The HTML points to the new dimensions and file; the deployment package and manifest contain the WebP but not the original JPEGs. The preview browser blocked access to the local page during this follow-up, so the new portrait has not had a fresh browser layout check.

## Revision 4 checks (2026-09-26)

- `lab/revision-functional.mjs`: 25 checks pass, including sideways wheel moving the gallery, vertical wheel passing over it, every architecture component rendered, one wire per connection, hover tracing, Back returning to the same project, and touch opening a page. `lab/revision-check.mjs` passes.
- Architecture maps inspected at 1440 × 900 for all five projects (RabahFoods rearranged once to remove wires crossing cards) and at 390 × 844 (connection lists in cards).
- Page lengths: project pages 4.4 to 4.7 viewports at 1440 × 900; home 5.2. No horizontal overflow.
- Scroll Craft harness on Loveworld Security and employed: no dead scroll.
- Not verified: a physical trackpad or phone. Headless Chrome did not turn shift+wheel into sideways scrolling, so that path is untested here.
