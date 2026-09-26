'use strict';
// Bespoke page behaviour for project pages. The Scroll Craft engine stays untouched;
// everything here reads the page's own scroll position.

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const SVG = 'http://www.w3.org/2000/svg';

// Returning to the gallery: prefer real history so the home page restores its exact scroll.
document.querySelectorAll('[data-back]').forEach(link => link.addEventListener('click', (event) => {
  try {
    const ref = new URL(document.referrer);
    if (ref.origin === location.origin && /\/(index\.html)?$/.test(ref.pathname) && history.length > 1) {
      event.preventDefault();
      history.back();
    }
  } catch { /* no referrer: follow the link */ }
}));

// The next-project title only takes its transition name when it is the thing being opened.
document.querySelectorAll('[data-vt]').forEach(el => el.closest('a').addEventListener('click', () => { el.style.viewTransitionName = el.dataset.vt; }));
addEventListener('pageshow', () => document.querySelectorAll('[data-vt]').forEach(el => { el.style.viewTransitionName = ''; }));

// Architecture map. Components are laid out by CSS grid and never hidden; the wires between
// them are measured from the live layout, then drawn in order as the section scrolls through.
const diagram = document.querySelector('.arch-diagram');
const svg = diagram && diagram.querySelector('.arch-wires');
const nodes = diagram ? Object.fromEntries([...diagram.querySelectorAll('[data-node]')].map(n => [n.dataset.node, n])) : {};
const edgeDefs = [...document.querySelectorAll('.arch-connections [data-edge]')].map(li => ({
  from: li.dataset.from, to: li.dataset.to, label: li.textContent.split(': ').pop()
}));
let wires = [];

function anchor(r, side, box) {
  const x = r.left - box.left, y = r.top - box.top;
  if (side === 'right') return [x + r.width, y + r.height / 2];
  if (side === 'left') return [x, y + r.height / 2];
  if (side === 'bottom') return [x + r.width / 2, y + r.height];
  return [x + r.width / 2, y];
}

function layoutWires() {
  if (!svg) return;
  const box = diagram.getBoundingClientRect();
  svg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
  svg.replaceChildren();
  diagram.querySelectorAll('.wire-label').forEach(l => l.remove());
  wires = edgeDefs.map((e, k) => {
    const a = nodes[e.from].getBoundingClientRect(), b = nodes[e.to].getBoundingClientRect();
    const dx = (b.left + b.width / 2) - (a.left + a.width / 2), dy = (b.top + b.height / 2) - (a.top + a.height / 2);
    // Leave through the side facing the target: horizontal links bend sideways, vertical ones bend up or down.
    const horizontal = Math.abs(dx) > Math.abs(dy) * 1.1 || Math.abs(dy) < 8;
    const [s, t] = horizontal ? (dx > 0 ? ['right', 'left'] : ['left', 'right']) : (dy > 0 ? ['bottom', 'top'] : ['top', 'bottom']);
    const [x1, y1] = anchor(a, s, box), [x2, y2] = anchor(b, t, box);
    const bend = Math.max(24, (horizontal ? Math.abs(x2 - x1) : Math.abs(y2 - y1)) * 0.5);
    const c1 = horizontal ? [x1 + Math.sign(x2 - x1) * bend, y1] : [x1, y1 + Math.sign(y2 - y1) * bend];
    const c2 = horizontal ? [x2 - Math.sign(x2 - x1) * bend, y2] : [x2, y2 - Math.sign(y2 - y1) * bend];
    const d = `M${x1},${y1} C${c1} ${c2} ${x2},${y2}`;

    const path = document.createElementNS(SVG, 'path');
    path.setAttribute('d', d); path.setAttribute('pathLength', '1'); path.setAttribute('class', 'wire');
    const pulse = document.createElementNS(SVG, 'path');
    pulse.setAttribute('d', d); pulse.setAttribute('pathLength', '1'); pulse.setAttribute('class', 'wire-pulse');
    pulse.style.setProperty('--k', k);
    const end = document.createElementNS(SVG, 'circle');
    end.setAttribute('cx', x2); end.setAttribute('cy', y2); end.setAttribute('r', '3'); end.setAttribute('class', 'wire-end');
    svg.append(path, pulse, end);

    // Label at the curve's midpoint (cubic Bezier at t = 0.5).
    const mx = (x1 + 3 * c1[0] + 3 * c2[0] + x2) / 8, my = (y1 + 3 * c1[1] + 3 * c2[1] + y2) / 8;
    const label = document.createElement('span');
    label.className = 'wire-label'; label.textContent = e.label;
    label.style.left = `${mx}px`; label.style.top = `${my}px`;
    diagram.append(label);
    return { ...e, path, pulse, end, label };
  });
  draw();
}

function focusNode(id) {
  diagram.classList.toggle('has-focus', !!id);
  const linked = (key) => wires.some(w => (w.from === id && w.to === key) || (w.to === id && w.from === key));
  Object.entries(nodes).forEach(([key, n]) => n.classList.toggle('is-lit', !!id && (key === id || linked(key))));
  wires.forEach(w => [w.path, w.pulse, w.end, w.label].forEach(el => el.classList.toggle('is-lit', !!id && (w.from === id || w.to === id))));
}
Object.entries(nodes).forEach(([id, n]) => {
  n.addEventListener('pointerenter', () => focusNode(id));
  n.addEventListener('pointerleave', () => focusNode(null));
  n.addEventListener('focus', () => focusNode(id));
  n.addEventListener('blur', () => focusNode(null));
});

let pending = false;
function draw() {
  pending = false;
  if (!diagram || !wires.length) return;
  const still = reduceMotion.matches;
  const r = diagram.getBoundingClientRect();
  // Starts as the map's top passes 85% of the viewport; complete once most of the map is in view.
  const p = still ? 1 : clamp((innerHeight * 0.85 - r.top) / Math.max(1, Math.min(r.height, innerHeight) * 0.75), 0, 1);
  const t = p * (wires.length + 0.5);
  wires.forEach((w, i) => {
    const d = clamp(t - i, 0, 1);
    w.path.style.setProperty('--draw', d.toFixed(3));
    w.label.style.setProperty('--draw', clamp((d - 0.5) * 2, 0, 1).toFixed(3));
    w.end.style.setProperty('--end', d >= 0.98 ? 1 : 0);
  });
  diagram.classList.toggle('is-live', p >= 0.999);
}
function queue() { if (!pending) { pending = true; requestAnimationFrame(draw); } }
addEventListener('scroll', queue, { passive: true });
reduceMotion.addEventListener('change', queue);
if (diagram) new ResizeObserver(() => layoutWires()).observe(diagram);

ScrollCraft.mount(document.body);
document.fonts.ready.then(layoutWires);
addEventListener('pageshow', queue);
