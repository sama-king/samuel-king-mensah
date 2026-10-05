// Writes projects/<key>.html from lab/projects-data.mjs. Output is plain, static, semantic HTML.
// Run: node lab/build-projects.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { projects, order } from './projects-data.mjs';
import { icon } from './project-icons.mjs';
import { arch } from './projects-arch.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const outDir = path.join(root, 'projects');
fs.mkdirSync(outDir, { recursive: true });

const esc = (s) => String(s).replace(/&(?!amp;|lt;|gt;|quot;|#)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const mail = (name) => `mailto:skingmensah@gmail.com?subject=${encodeURIComponent(`Enquiry about ${name.replace(/&amp;/g, '&')}`)}`;

// The hero reuses the gallery's own figure so the cross-document view transition morphs like for like.
function heroFigure(key) {
  const m = home.match(new RegExp(`<figure class="project-visual visual-${key}"[^>]*>[\\s\\S]*?</figure>`));
  if (!m) throw new Error(`No gallery figure for ${key}`);
  return m[0]
    .replace(/<figure class="project-visual visual-(\w+)"[^>]*>/, `<figure class="project-visual visual-$1 pp-hero-visual" style="view-transition-name:pv-$1" data-sc-tilt="4">`)
    .replace(/src="assets\//g, 'src="../assets/')
    .replace(/ loading="lazy"/g, '');
}

function page(key) {
  const p = projects[key];
  const i = order.indexOf(key);
  const next = projects[order[(i + 1) % order.length]];
  const nextKey = order[(i + 1) % order.length];
  const plainName = p.name.replace(/&amp;/g, '&');

  const a = arch[key];
  const names = Object.fromEntries(a.nodes.map(([id, , name]) => [id, name]));

  const features = p.features.map(([ic, title, text]) => `
          <article class="pp-feature">
            ${icon(ic)}
            <div><h3>${esc(title)}</h3><p>${esc(text)}</p></div>
          </article>`).join('');

  const innovations = p.innovations.map(([ic, title, text], n) => `
        <article class="pp-innovation">
          <div class="pp-innovation-art">${icon(ic, 'glyph glyph-xl')}</div>
          <p class="pp-innovation-label">Innovation ${['one', 'two', 'three'][n]}</p>
          <h3>${esc(title)}</h3>
          <p>${esc(text)}</p>
        </article>`).join('');

  // Components sit on a 4-column grid; on phones the same grid folds to two columns.
  const nodes = [...a.nodes].sort((x, y) => x[6] - y[6] || x[5] - y[5]).map(([id, ic, name, handles, tech, col, row]) => `
          <article class="arch-node" data-node="${id}" tabindex="0" style="--c:${col};--r:${row};--mc:${(col - 1) % 2 + 1};--mr:${(row - 1) * 2 + (col > 2 ? 2 : 1)}">
            <span class="arch-icon">${icon(ic)}</span>
            <h3>${esc(name)}</h3>
            <p>${esc(handles)}</p>
            <ul>${tech.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
            <ol class="arch-links">${a.edges.filter(([f]) => f === id).map(([, to, label]) => `<li><span aria-hidden="true">→</span> ${esc(names[to])} · ${esc(label)}</li>`).join('')}</ol>
          </article>`).join('');

  const edges = a.edges.map(([from, to, label], n) => `<li data-edge="${n}" data-from="${from}" data-to="${to}"><span>${esc(names[from])}</span> to <span>${esc(names[to])}</span>: ${esc(label)}</li>`).join('');

  const stack = p.stack.map(([group, items]) => `
        <div class="pp-stack-group">
          <h3>${esc(group)}</h3>
          <ul>${items.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
        </div>`).join('');

  return `<!doctype html>
<html lang="en" class="pp pp-${key}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${plainName} · Samuel King-Mensah</title>
  <meta name="description" content="${esc(p.lede)}">
  <meta name="theme-color" content="#eef1f5">
  <link rel="icon" href="../assets/favicon.png">
  <link rel="stylesheet" href="../scrollcraft.css">
  <link rel="stylesheet" href="project.css">
  <script>document.documentElement.classList.add('js')</script>
  <noscript><style>[data-sc-in],[data-sc-stagger]>*,[data-sc-cue]{opacity:1!important;transform:none!important}</style></noscript>
</head>
<body>
  <span data-sc-progress></span>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="pp-bar">
    <a class="pp-back" href="../index.html#project-${key}" data-back><span aria-hidden="true">←</span> Featured projects</a>
    <a class="pp-mark" href="../index.html" aria-label="Samuel King-Mensah, home"><img src="../assets/skm-logo.png" alt="" width="200" height="50"></a>
    <a class="pp-contact" href="${mail(p.name)}">Get in touch <span aria-hidden="true">↗</span></a>
  </header>

  <main id="main">
    <section class="pp-hero" data-sc-act="flow" data-sc-spotlight aria-labelledby="pp-title">
      <div class="pp-hero-grid" aria-hidden="true" data-sc-parallax="-0.8"></div>
      <div class="pp-hero-copy">
        <p class="pp-kicker">${p.category} <span>·</span> ${p.status}</p>
        <h1 id="pp-title" style="view-transition-name:pt-${key}">${p.titleHtml}</h1>
        <p class="pp-headline">${p.headline.map(esc).join('<br>')}</p>
        <p class="pp-lede">${esc(p.lede)}</p>
        <dl class="pp-facts">${p.facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
      </div>
      ${heroFigure(key)}
    </section>

    <section class="pp-features sc-section" data-sc-act="flow" aria-labelledby="pp-features-title">
      <div class="pp-section-head" data-sc-in>
        <h2 id="pp-features-title">Core features.</h2>
        <p>${esc(p.featuresIntro)}</p>
      </div>
      <div class="pp-feature-grid" data-sc-in data-sc-stagger="45">${features}
      </div>
    </section>

    <section class="pp-arch sc-section" data-sc-act="flow" aria-labelledby="pp-arch-title">
      <div class="pp-section-head" data-sc-in>
        <div>
          <p class="pp-eyebrow">Architecture</p>
          <h2 id="pp-arch-title">${esc(a.title)}</h2>
        </div>
        <p class="arch-hint">Hover or tap a component to trace its connections.</p>
      </div>
      <div class="arch-diagram">
        <svg class="arch-wires" aria-hidden="true"></svg>
        <div class="arch-grid">${nodes}
        </div>
      </div>
      <details class="arch-connections">
        <summary>All connections</summary>
        <ol>${edges}</ol>
      </details>
    </section>

    <section class="pp-innov sc-section" data-sc-act="flow" aria-labelledby="pp-innov-title">
      <div class="pp-section-head" data-sc-in>
        <h2 id="pp-innov-title">Innovation highlights.</h2>
      </div>
      <div class="pp-innov-list" data-sc-in data-sc-stagger="70">${innovations}
      </div>
    </section>

    <section class="pp-stack sc-section" data-sc-act="flow" aria-labelledby="pp-stack-title">
      <div class="pp-stack-head" data-sc-in>
        <p class="pp-eyebrow">Technology stack</p>
        <h2 id="pp-stack-title">What it is built with.</h2>
      </div>
      <div class="pp-stack-grid" data-sc-in data-sc-stagger="60">${stack}
      </div>
    </section>

    <section class="pp-close" data-sc-act="flow" aria-labelledby="pp-close-title">
      <p class="pp-eyebrow">Next project</p>
      <a class="pp-next" href="${nextKey}.html">
        <span class="pp-next-cat">${next.category}</span>
        <span id="pp-close-title" class="pp-next-name" data-vt="pt-${nextKey}">${next.titleHtml.replace('<br>', '')}</span>
        <span class="pp-next-arrow" aria-hidden="true">→</span>
      </a>
      <div class="pp-close-foot">
        <a href="../index.html#project-${key}" data-back>All featured projects</a>
        <a class="pp-close-mail" href="${mail(p.name)}" data-sc-magnet="0.25" data-sc-rise="0">Talk about ${esc(plainName)} <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  </main>
  <script src="../scrollcraft.js"></script>
  <script src="project.js"></script>
</body>
</html>
`;
}

for (const key of order) {
  const html = page(key);
  if (html.includes('—')) throw new Error(`Em dash in ${key} page`);
  fs.writeFileSync(path.join(outDir, `${key}.html`), html);
  console.log(`projects/${key}.html`);
}
