# Samuel King-Mensah portfolio, scroll revision

## Authority and user direction

This revises the existing user-authorized Scroll Craft portfolio. Original brief retained in lab/v1-source/BRIEF.md. User confirmed five projects and supplied a CV, logo, and profile links. The original generic portrait was replaced on 2026-09-26 with a portrait based on three supplied photographs. The current portrait uses the generic sample's folded-arm pose and slight smile while drawing Samuel's likeness from his photographs.

The current instruction:

> did you use the scroll-craft design skill? the site doesn't have any scroll interactions. i like the general design though. however include a section for my programming languages with some proficiency indicators. redesign the projects section to be scrollable with images/graphics of the apps (ask for them if you can't infer from project files).

Follow-up:

> these are fine. add .NET, React and Node.js as Familiar
> Rabahfoods you can look through the website rabahfoods.com or run the local project to see the site. i will send the frontdesk and loveworld security later

## Eight brief topics

1. Vibe: retain the general design the user likes. Premium, editorial navy/blue on silver, supplied SKM logo, monochrome portrait.
2. Journey: personal introduction, quiet approach, a visibly moving project gallery, language proficiency, career evidence, contact.
3. Energy: quiet opening builds to the larger project gallery, then settles into readable skills and experience.
4. Feelings: curiosity, recognition, discovery, range, confidence, readiness. The gallery must now visibly change on ordinary vertical scroll.
5. Signature: an architectural portfolio shelf. Vertical movement carries five project worlds across the viewport; project notes connect each visual to architectural choices and a project-aware inquiry.
6. Aesthetic range: preserve the approved typography, palette, hero, experience and correspondence treatment. No full-site aesthetic replacement.
7. Structure: distinct scenes with one held gallery. Ordinary wheel/touch scrolling is not intercepted. Direct project links, previous/next controls, and a Continue to skills exit avoid trapping visitors.
8. Assets: retain the actual SKM mark and use a new portrait based on Samuel's photographs; use actual repository app logos, existing Lumos console design, a fresh screenshot of the employed demo, and the public RabahFoods website. FrontDesk and Loveworld screenshots remain pending by the user's choice.

These are authored implementation decisions within the requested revision, not a fabricated interview.

## Feeling curve and peak

- Curiosity: familiar oversized title and portrait, with clearer separation between its moving planes.
- Recognition: short business-first approach statement.
- Discovery: each vertical scroll step brings another application's identity or interface into view. The work is the emotional and spatial peak.
- Range: segmented, named proficiency indicators connect language knowledge to practical use.
- Confidence: unchanged professional record and educational context.
- Readiness: stable contact plate, with the chosen project's name available in the email inquiry.

Peak: “I scrolled through five very different apps, then opened the thinking behind one.”

Tell-someone sentence: “It's the site where his applications travel across the page as you move through the work.”

Silence: the short approach section pauses before the gallery. No filler pinning or blank travel.

## Grammar and fingerprint

Retain Architect's folio. Personal cover, technical collection, competency and career ledger, correspondence plate. The reasons the eight stock grammars did not fit remain documented in the original brief.

The user explicitly asked to retain the general design. Consequently this is an intentional revision of the same fingerprint, not a new independent site that claims to pass a 4-of-6 difference gate. Shared: grammar, identity header, portrait hero, correspondence ending. Changed: act sequence and signature. The original registry row remains, with a revision row appended. User direction takes precedence over a forced redesign to pass the skill's new-site uniqueness gate.

Bans: simulated app dashboards, fabricated outcomes or percentages, forced wheel interception, generated UI screenshots, engine changes.

## Score and layer contract

| Beat | Device | Purpose |
|---|---|---|
| Cover | Natural-flow parallax | Portrait, backing, and orbit separate visibly while the headline remains stable |
| Approach | Flow entrance | A short quiet interval |
| Projects | Sticky stage and continuous horizontal rail | Largest span, 5.4 viewports on desktop and 5 on phone; all five apps pass through one framing window |
| Languages | Scroll-linked segmented fills | Named proficiency with contextual use, no invented percentage |
| Experience | Flow stagger | Calm, readable career evidence |
| Contact | Reveal and stable hold | A clear destination with project-aware inquiry |

Hero far grid remains quiet; blue middle plane moves upward 95px over the exit; portrait moves 38px downward; orbital foreground moves 125px and rotates 16 degrees. Reduced motion removes displacement. Gallery art layers have subtle relative travel while the rail moves at native scroll speed. No autoplay or audio.

Desktop pairs copy and artwork. Phone stacks artwork above concise copy in the held viewport. Reduced motion, no JavaScript, and short landscape screens expose the full vertical project collection. All content is semantic HTML; the shared Scroll Craft engine is unchanged.

## Content and proficiency

Projects: Loveworld Security, RabahFoods Ops, LumosCast/LumosPresenter, employed, FrontDesk. No Jubi or Electrosol.

Kotlin, Python, PHP and VBA: Advanced, grouped beneath the introduction on the left at the user’s explicit request. .NET, React and Node.js: Familiar, explicitly requested, now in the right-hand list with JavaScript/TypeScript, Java and SQL (Proficient). These qualitative ratings contain no numeric percentages.

CV supports Loveworld headquarters deployment in Lagos. Other project descriptions describe implemented architecture without assuming deployment. RabahFoods public storefront was inspected at the user's request. The portfolio does not publish personal job records, referee contacts, credentials, or repository source code.

## Asset provenance

- Security and FrontDesk: repository logos in authored dimensional brand compositions, labelled App identity. Screenshots to follow from the user.
- RabahFoods: actual capture of https://www.rabahfoods.com/ after Enter, labelled Public storefront, with a live site link.
- LumosCast: existing LumosPresenter console design from stitch_designs, labelled Console design.
- employed: actual interface with repository-provided fictional demo fixtures in a separate temporary data directory, labelled App capture / Demo data.
- Hero: generated portrait based on Samuel's three supplied photos, labelled as such. The prior generic portrait remains in source assets for recovery and is excluded from deployment.

No paid generation was used for this revision. Detailed source paths are in assets/projects/README.txt, excluded from deployment.

## Revision 3: gallery spacing and project pages (2026-09-26)

### User direction, verbatim

> it was built using /nateherk-design:scrollcraft , however the projects section is not satisfactory. the spacing between projects is faulty as the next is flat against prev item item. I also want to improve the project details. it should be a full interactive page as well giving core features, innovation highlights, architecture diagram (refer to sample image) and technology stack. use visually exciting elements (generate from kie.ai as stated in scrollcraft plugin where needed) and immersive scroll effects for the project pages.

Interview answers:

- Sample image: supplied mid-build. A dark "Selected systems" panel with a horizontal system map of thin line-art stages (Identity, Access pass, Verification, Decision), hairline connectors, an active dot, "Select a stage to explore", and an "Inside the system" detail panel.
- kie.ai: "Yes, use kie-api.txt". The account first had 0 credits; the user then reported "kie api key updated" (1014 credits).
- Page form: "lauch effect should feel like a motion transition from home page. if that can be achieved with a separate page then go ahead"
- Feel: "option 1, but each project can have it's own palette and mood." (Option 1: the peak is the architecture diagram assembling as you scroll.)

### Gallery fix

Slides were `flex: 0 0 100%` with `gap: 0`, translated by exactly one window width, so each project sat flush against the last. The rail now has a real gap (`clamp(64px, 9vw, 160px)`, 48px on phones) with a hairline divider, the translate includes the gap, and each project holds still for part of its scroll stop before easing to the next.

### Project pages: journey and feeling curve

| Act | Device | Feeling | Cause |
|---|---|---|---|
| Hero | flow, parallax grid, pointer spotlight, view-transition morph | Continuity | The gallery figure the visitor clicked grows into this page's hero |
| Problem | pin (1.9vh), photographic world, kinetic headline | Recognition | The real setting (gate, cold room, auditorium, desk, lobby) held while the problem is stated |
| Core features | pan (3.8vh), staggered settle, icons draw in | Breadth | Six capabilities travel sideways, each icon drawing itself as it arrives |
| Innovation | flow, rows draw in | Insight | Three architectural decisions, each tied to a drawn glyph |
| Architecture | pin (4vh, the largest), bespoke assembly | **Peak: understanding** | The system map assembles stage by stage under scroll, then a signal loops through it; any stage can be selected |
| Stack | flow stagger | Confidence | Grouped technologies, plainly listed |
| Close | flow, magnet CTA | Momentum | The next project's name, which morphs into that page's title |

Peak sentence: "I scrolled and watched the system put itself together, then clicked through each part." Tell-someone: "It's the site where each project opens out of the gallery and its architecture builds itself as you scroll."

### Assets

Five kie.ai seedream stills (one per project), 16:9, one shared photographic preamble. Security and FrontDesk were rerolled once because the first results baked in garbled text; the reroll preamble removes the phrase that invited it. Encoded as JPEG (the local ffmpeg has no WebP encoder) at 2200px and 1100px. Sources in `lab/gen/`. No video clips were used.

### Content provenance

All page copy is in `lab/projects-data.mjs`, grounded in each repository: Rabahfoods README and AI agent plan; LumosPresenter README and docs; Employd README and pyproject (not the older Employed pipeline); KMPProjects/FrontDesk sources and Gradle catalogue; AndroidProjects/loveworldsecurity sources and PHP/LW_Security-master (CodeIgniter 4, MySQLi). No invented figures; no counters. FrontDesk's backend technology is not named because it is not in the repository.

kie.ai spend: 7 seedream stills (5 + 2 rerolls). Balance 1014 before, 916 after (98 credits debited).
View transitions verified in headless Chrome 153: opening LumosCast animates only `pv-lumos`, `pt-lumos` and root. Names are applied only to the current gallery slide and, on project pages, to the next-project title at click time.

## Revision 4: less scrolling (2026-09-26)

User direction, verbatim:

> there is a bit too much scrolling needed to traverse the site.
> 1. On the project pages, remove the problem section. condense the core features design so it's easier to see at a glance. the architecture should be a high level overview of core components of the app, how they're connected and what each handles. the scroll should only draw the connections but the components should be visible all the time. (note diagram does not have to be linear or horizontal)
> 2. Enable side scrolling on the projects section as its intuitive behaviour.

- Project pages are now all normal-flow sections: hero, core features (3 x 2 grid), architecture, innovation highlights (three columns), stack, next project. About 4.5 viewports on desktop, down from about 14.
- The problem section and its generated photographs were removed (sources kept in `lab/gen/`; the web copies were deleted).
- Architecture is a component map (`lab/projects-arch.mjs`): 7 to 10 components on a 4-column grid, each showing what it handles and its technology. Components are always visible. Scrolling through the section draws the labelled connections one by one; once complete, a pulse runs along each. Hovering, tapping or focusing a component highlights its connections. On phones the wires give way to a list of each component's outgoing connections inside its card.
- Home gallery: no longer a 5.4-viewport pinned section. It is one screen tall and scrolls sideways natively (trackpad swipe, touch swipe, shift+wheel, mouse drag, arrows and jump links). Vertical scrolling passes over it. Touch uses CSS snap; mouse and trackpad settle to the next project in the direction of the gesture, because mandatory CSS snap swallowed small trackpad gestures. The home page is about 5.2 viewports, down from about 9.6.
- Opening a project records it in the home URL (`#project-<key>`), so Back returns to the same project even when the page is reloaded rather than restored.
