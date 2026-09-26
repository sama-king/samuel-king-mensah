'use strict';

// Project names for project-aware email enquiries. Full write-ups live in projects/*.html.
const projects = {
  security: { name: 'Loveworld Security' },
  rabah: { name: 'RabahFoods Ops' },
  lumos: { name: 'LumosCast' },
  employed: { name: 'employed' },
  frontdesk: { name: 'FrontDesk' }
};


const $ = (id) => document.getElementById(id);
const work = $('work');
const hero = $('top');
const rail = document.querySelector('.project-rail');
const projectWindow = document.querySelector('.project-window');
const slides = [...document.querySelectorAll('.project-slide')];
const jumps = [...document.querySelectorAll('[data-jump]')];
const keys = slides.map(slide => slide.dataset.key);
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const shortLandscape = matchMedia('(max-height: 480px)');
const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
let currentIndex = 0;
let motionEnabled = false;
let framePending = false;

function contactUrl(key) {
  const subject = key === 'general' ? 'Let’s discuss a project or opportunity' : `About ${projects[key].name}`;
  const body = key === 'general' ? 'Hi Samuel,\n\nI’d like to discuss ' : `Hi Samuel,\n\nI was looking at ${projects[key].name} in your portfolio and would like to discuss `;
  return `mailto:skingmensah@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
function updateInquiry(key) {
  $('inquiry-project').value = key;
  $('project-inquiry').href = contactUrl(key);
}
$('inquiry-project').addEventListener('change', (event) => updateInquiry(event.target.value));


function markCurrent(index, force = false) {
  if (index === currentIndex && !force) return;
  currentIndex = index;
  jumps.forEach((link, i) => link.setAttribute('aria-current', String(i === index)));
  slides.forEach((slide, i) => { slide.inert = motionEnabled && i !== index; });
  // Only the current project carries view-transition names, so opening it morphs one figure and one title.
  slides.forEach((slide, i) => {
    const key = slide.dataset.key;
    slide.querySelector('.project-visual').style.viewTransitionName = i === index ? `pv-${key}` : '';
    slide.querySelector('h3').style.viewTransitionName = i === index ? `pt-${key}` : '';
  });
  $('previous-project').disabled = index === 0;
  $('next-project').disabled = index === keys.length - 1;
  document.querySelector('.collection-current').textContent = ['Identity & access', 'Business operations', 'Speech & presentation', 'AI-assisted workflows', 'Workplace access'][index];
}
document.querySelectorAll('a.project-notes').forEach(link => link.addEventListener('click', () => {
  const index = slides.indexOf(link.closest('.project-slide'));
  if (index >= 0 && index !== currentIndex) markCurrent(index);
  // Remember the project so Back returns to it even when the page is reloaded rather than restored.
  if (index >= 0) history.replaceState(null, '', `#project-${keys[index]}`);
}));
function slideStep() {
  return projectWindow.clientWidth + (parseFloat(getComputedStyle(rail).columnGap) || 0);
}
function jumpToProject(index, behavior = 'smooth') {
  index = clamp(index, 0, keys.length - 1);
  if (!motionEnabled) {
    slides[index].scrollIntoView({ behavior: reduceMotion.matches ? 'instant' : behavior, block: 'center' });
    markCurrent(index);
    return;
  }
  projectWindow.scrollTo({ left: index * slideStep(), behavior });
}
jumps.forEach((link, index) => {
  link.addEventListener('click', (event) => { event.preventDefault(); jumpToProject(index); });
  link.addEventListener('keydown', (event) => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % keys.length;
    else if (event.key === 'ArrowLeft') next = (index + keys.length - 1) % keys.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = keys.length - 1;
    else return;
    event.preventDefault(); jumps[next].focus({ preventScroll: true }); jumpToProject(next);
  });
});
$('previous-project').addEventListener('click', () => jumpToProject(currentIndex - 1));
$('next-project').addEventListener('click', () => jumpToProject(currentIndex + 1));

function drawScrollState() {
  framePending = false;
  const heroRect = hero.getBoundingClientRect();
  hero.style.setProperty('--hero-p', reduceMotion.matches ? 0 : clamp(-heroRect.top / heroRect.height, 0, 1));
  const rect = work.getBoundingClientRect();
  if (motionEnabled) {
    const position = clamp(projectWindow.scrollLeft / slideStep(), 0, keys.length - 1);
    slides.forEach((slide, i) => slide.style.setProperty('--slide-offset', clamp(position - i, -1, 1)));
    document.querySelector('.collection-progress span').style.transform = `scaleX(${(position + 1) / keys.length})`;
    markCurrent(Math.round(position));
  } else {
    if (rect.top < innerHeight && rect.bottom > 0) {
      const closest = slides.reduce((best, slide, i) => Math.abs(slide.getBoundingClientRect().top - innerHeight * .2) < best.distance ? { index: i, distance: Math.abs(slide.getBoundingClientRect().top - innerHeight * .2) } : best, { index: 0, distance: Infinity });
      markCurrent(closest.index);
    }
  }
  document.querySelectorAll('.language').forEach(row => {
    const r = row.getBoundingClientRect();
    row.style.setProperty('--language-fill', reduceMotion.matches ? 1 : clamp((innerHeight * .96 - r.top) / (innerHeight * .28), 0, 1));
  });
}
function queueFrame() { if (!framePending) { framePending = true; requestAnimationFrame(drawScrollState); } }
function configureMotion() {
  motionEnabled = !reduceMotion.matches && !shortLandscape.matches;
  document.documentElement.classList.toggle('portfolio-motion', motionEnabled);
  markCurrent(currentIndex, true);
  queueFrame();
}
window.addEventListener('scroll', queueFrame, { passive: true });
projectWindow.addEventListener('scroll', queueFrame, { passive: true });

// Mouse users without a trackpad can drag the gallery sideways; a drag never counts as a click.
let drag = null;
projectWindow.addEventListener('pointerdown', (event) => {
  if (!motionEnabled || event.pointerType !== 'mouse' || event.button !== 0) return;
  drag = { x: event.clientX, left: projectWindow.scrollLeft, moved: false };
});
window.addEventListener('pointermove', (event) => {
  if (!drag) return;
  const dx = event.clientX - drag.x;
  if (!drag.moved && Math.abs(dx) > 6) { drag.moved = true; projectWindow.classList.add('is-dragging'); }
  if (drag.moved) projectWindow.scrollLeft = drag.left - dx;
});
window.addEventListener('pointerup', () => {
  if (!drag) return;
  const moved = drag.moved;
  drag = null;
  if (!moved) return;
  projectWindow.classList.remove('is-dragging');
  jumpToProject(Math.round(projectWindow.scrollLeft / slideStep()));
  const swallow = (e) => { e.preventDefault(); e.stopPropagation(); };
  projectWindow.addEventListener('click', swallow, { capture: true, once: true });
  setTimeout(() => projectWindow.removeEventListener('click', swallow, { capture: true }), 60);
});
projectWindow.addEventListener('dragstart', (event) => event.preventDefault());

// Trackpads and mice get no CSS snapping (it swallows small gestures), so a sideways gesture
// is settled here instead: once it ends, glide on to the next project in the direction of travel.
const finePointer = matchMedia('(pointer: fine)');
let settledLeft = 0, settleTimer = 0;
function settleGallery() {
  if (!motionEnabled || !finePointer.matches || drag) return;
  const step = slideStep(), pos = projectWindow.scrollLeft / step;
  if (Math.abs(pos - Math.round(pos)) < 0.02) { settledLeft = projectWindow.scrollLeft; return; }
  const dir = Math.sign(projectWindow.scrollLeft - settledLeft);
  jumpToProject(dir > 0 ? Math.ceil(pos) : dir < 0 ? Math.floor(pos) : Math.round(pos));
}
projectWindow.addEventListener('scroll', () => {
  clearTimeout(settleTimer);
  // Wait for the gesture, including trackpad momentum, to go quiet before settling.
  settleTimer = setTimeout(settleGallery, 180);
}, { passive: true });
window.addEventListener('resize', queueFrame, { passive: true });
reduceMotion.addEventListener('change', configureMotion);
shortLandscape.addEventListener('change', configureMotion);
hero.addEventListener('pointermove', (event) => {
  if (reduceMotion.matches || event.pointerType !== 'mouse') return;
  const r = hero.getBoundingClientRect();
  hero.style.setProperty('--pointer-x', clamp((event.clientX - r.left) / r.width * 2 - 1, -1, 1));
});
hero.addEventListener('pointerleave', () => hero.style.setProperty('--pointer-x', 0));
$('year').textContent = new Date().getFullYear();
ScrollCraft.mount(document.body);
configureMotion();
window.addEventListener('pageshow', () => {
  const index = keys.findIndex(key => location.hash === `#project-${key}`);
  if (index >= 0) requestAnimationFrame(() => {
    if (motionEnabled) work.scrollIntoView({ block: 'start', behavior: 'instant' });
    jumpToProject(index, 'instant');
  });
  else queueFrame();
});
