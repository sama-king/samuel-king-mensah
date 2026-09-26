# Fingerprints

Every site you build with **scrollcraft** gets one row here, appended after it
ships. The registry exists so your next build can prove it is a different page
rather than a re-skin of one you already made.

This file is **yours**. It starts empty on purpose: the gate is about not
repeating *yourself*, so it has nothing to say until you have built something.

The rules and the gate live in the skill's
`references/uniqueness.md`. Short version:

**A new build must differ from EVERY row below on at least 4 of the 6
dimensions.** Four against each row individually, not four on average across the
table. If a planned build fails, change the plan. Never edit a row to make room
for it.

The six dimensions are: **grammar**, **nav treatment**, **hero device**,
**act-sequence shape**, **close pattern**, **signature move**.

Dimension 6 is free, because a signature move is unique by definition. So the
gate really asks for three more out of the remaining five, and a build that
changes only grammar and world will fail it.

---

## The registry

| Build | Grammar | Nav treatment | Hero device | Act-sequence shape | Close pattern | Signature move | World | Port |
|---|---|---|---|---|---|---|---|---|
| skm-portfolio (home, revision 2) | Architect's folio | Fixed identity header, direct project jumps | Natural-flow layered portrait parallax | 6 acts: flow, flow, pin-held horizontal rail (peak, 5.4vh), flow fills, flow stagger, flow reveal | Correspondence plate with project-aware email | Five project worlds carried sideways by vertical scroll, each opening into its own page through a morph | Editorial navy on silver | 4500 |
| skm-project-dossiers (5 pages) | Technical dossier | Fixed bar: back to gallery, mark, contact; cross-document view-transition entry | Gallery figure morphs into the page hero (shared element), pointer spotlight | 7 acts: flow hero, pinned photographic problem, pan feature rail, flow drawn innovations, pinned system map (peak, 4vh), flow stack, flow next-project close | Next project as a giant link that morphs into the next page title | Architecture map assembles stage by stage under scroll, then a signal loops through it; each stage is selectable and explains itself | Per-project palette, photographic world stills (kie.ai seedream) | 4500 |

---

## What is taken

Add a bullet here whenever a build claims something a later build should avoid
reusing: a grammar, a nav treatment, a close pattern, a signature move, an
act-count-and-length band. The shared columns are what the next build inherits
as a constraint, so writing them down is the whole point.

- Technical dossier grammar with a pinned, selectable line-art system map as the peak (skm-project-dossiers).
- Cross-document view transition from a gallery figure into a page hero (skm-portfolio / skm-project-dossiers).
- Next-project close whose title morphs into the next page (skm-project-dossiers).

---

## Appending a row

After shipping, add one line to the table and one bullet to **What is taken** if
the build claimed something new. Fill every column. Say what the build shares
with existing rows.

Rows are append-only. A build that has been superseded stays in the table,
because the space it occupies is still occupied.

---

## Worked example

The skill's author kept a registry of twelve builds across eight page grammars.
If you want to see what a filled-in table looks like, and which shapes tend to
collide, read `EXAMPLES.md` in the scrollcraft repository. Treat it as
illustration only: those rows are somebody else's builds and they do **not**
constrain yours.
