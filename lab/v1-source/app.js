'use strict';

// These are explanatory system maps grounded in the project sources, not app screenshots.
const projects = {
  security: {
    name: 'Loveworld Security', category: 'Mobile · Full-stack system', status: 'Deployed in Lagos',
    headline: ['The right person.', 'The right access.'],
    description: 'A mobile-first identification and access-management system, built for staff and event operations at Loveworld headquarters.',
    stack: 'Kotlin · Android · API integration',
    nodes: [
      ['Identity', 'Staff records give every access decision a person to belong to. Profiles connect people, departments, and their registered passes.', 'identity'],
      ['Access pass', 'A pass connects a person to an event and a set of permissions. Its validity and expiry are part of the access rules.', 'pass'],
      ['Verification', 'The Android scanner checks the pass, event, permission, and expiry before determining whether access is allowed.', 'scan'],
      ['Decision', 'The guard sees an allowed or denied result with the reason, while access logs preserve the operational record.', 'decision']
    ],
    notes: [
      ['The context', 'Staff identification and event entry need a consistent connection between the person arriving, their pass, and the permissions a guard is checking.'],
      ['The system', 'The Android application brings together staff profiles, events, access groups, pass management, scanning, and logs. Pass verification checks event membership, permissions, and expiry.'],
      ['My contribution', 'I designed and built the full-stack architecture for the mobile-first staff identification and access-management system.'],
      ['In use', 'Deployed at Loveworld headquarters in Lagos, Nigeria, as recorded in my professional experience.']
    ],
    scope: 'Designed around clear permissions, explainable access decisions, and a traceable operational record.'
  },
  rabah: {
    name: 'RabahFoods Ops', category: 'Web · Business operations', status: 'Portfolio project',
    headline: ['From stock intake', 'to a settled order.'],
    description: 'An operations application for a frozen-food business, connecting inventory, orders, payments, reporting, and AI-assisted social ordering.',
    stack: 'Next.js · TypeScript · Firebase · AI integrations',
    nodes: [
      ['Inventory', 'Products, batches, and stock intake establish the quantities and pricing the order process depends on.', 'inventory'],
      ['Orders', 'Orders bring customer requests into one workflow. AI-assisted social orders remain drafts until the customer confirms.', 'order'],
      ['Payments', 'Payment records and debt allocations connect collections to the relevant customers and outstanding sales.', 'payment'],
      ['Reporting', 'Sales, stock history, cash-flow, and profit-and-loss views give the operational data a useful business context.', 'report']
    ],
    notes: [
      ['The context', 'Inventory, fulfilment, and collections are closely related. Treating them as disconnected lists makes it harder to follow an order through the business.'],
      ['The system', 'RabahFoods Ops spans stock intake, customer orders, payment collection, debt tracking, imports, and reporting. The application includes role-aware access and a shared domain model.'],
      ['A deliberate boundary', 'The social ordering assistant creates a draft. The order becomes pending only after the customer confirms, preserving an explicit handoff between conversation and fulfilment.'],
      ['Built with', 'Next.js, React, TypeScript, and Firebase, with server-side operations for webhooks and confirmation flows.']
    ],
    scope: 'One operational thread connects inventory, confirmed orders, collections, and reporting.'
  },
  lumos: {
    name: 'LumosCast', category: 'Desktop & web · Speech', status: 'Offline-first architecture',
    headline: ['Spoken references.', 'Ready for the screen.'],
    description: 'A presentation system that listens for spoken Bible references, retrieves the passage, and makes it available for projection or OBS.',
    stack: '.NET · React · SQLite · Speech recognition',
    nodes: [
      ['Listen', 'Live microphone audio enters through a dedicated capture layer with voice activity detection and speech-engine adapters.', 'audio'],
      ['Interpret', 'Reference parsing turns recognised speech into Bible references, with context and confidence handled in the domain layer.', 'parse'],
      ['Retrieve', 'Bundled translations are available in local SQLite storage. Optional online sources extend the available translations.', 'database'],
      ['Present', 'The operator console and display page share one local host, with updates delivered to projection screens on the local network.', 'display']
    ],
    notes: [
      ['The context', 'Live presentation depends on timing. A spoken reference should connect naturally to a passage and a screen without assuming constant internet access.'],
      ['The system', 'The project, housed in the LumosPresenter repository, separates audio capture, speech recognition, reference parsing, data access, and presentation.'],
      ['The architecture', 'A self-contained ASP.NET Core host serves the React operator console and display pages. Core domain logic stays independent of speech engines and platform-specific audio implementations.'],
      ['Designed for local use', 'Bundled translations and a local SQLite database support offline use. Optional online translations are handled separately from that local foundation.']
    ],
    scope: 'An offline-first core, with optional online translation sources and local-network presentation.'
  },
  employed: {
    name: 'employed', category: 'Web · AI-assisted workflow', status: 'Local by design',
    headline: ['Find the fit.', 'Keep the evidence.'],
    description: 'A local job-discovery and review workflow that connects opportunities to a person’s evidenced capabilities and tracks the next step.',
    stack: 'Python · FastAPI · SQLite · HTMX',
    nodes: [
      ['Discover', 'Public job feeds and company boards bring opportunities into the local pipeline, with source resolution and health tracking.', 'discover'],
      ['Match', 'Profile capabilities and eligibility rules shape the shortlist. Preferences guide the search; evidence supports the match.', 'match'],
      ['Analyse', 'AI-assisted analysis must support eligibility conclusions with verbatim evidence from the posting rather than invented explanations.', 'evidence'],
      ['Review', 'A local dashboard keeps the requirement-to-evidence view, job workspace, and application stages together for human review.', 'review']
    ],
    notes: [
      ['The context', 'Finding a remote role is only the beginning. The useful question is whether the person can plausibly win it and what evidence supports that assessment.'],
      ['The system', 'The current Employd implementation combines job discovery, eligibility filtering, ranking, AI-assisted analysis, and a review dashboard.'],
      ['The design principle', 'Claims must have evidence. The ingestion process checks that quoted evidence exists in the source posting or profile document.'],
      ['Human ownership', 'The application keeps the review and application decision with the person. Local SQLite storage and a FastAPI, Jinja, and HTMX interface keep the workflow self-contained.']
    ],
    scope: 'The person reviews each opportunity and owns the application decision.'
  },
  frontdesk: {
    name: 'FrontDesk', category: 'Mobile · Workplace operations', status: 'Android & iOS codebase',
    headline: ['A clearer welcome.', 'A connected workplace.'],
    description: 'A cross-platform workplace access application that connects visitors, appointments, staff, and access records across distinct user roles.',
    stack: 'Kotlin Multiplatform · Compose · API integration',
    nodes: [
      ['Appointment', 'Appointment records connect the visitor, their host, and the purpose of the visit before the arrival.', 'calendar'],
      ['Arrival', 'Visitor records give the reception workflow a consistent starting point, connected to the people being welcomed.', 'arrival'],
      ['Access', 'Staff, access points, and role-specific screens support the different tasks of administrators, security, and employees.', 'access'],
      ['Record', 'Visitor and staff access logs preserve the visit history, with repository operations connected to the shared API layer.', 'record']
    ],
    notes: [
      ['The context', 'Reception, security, and employees each need a different view of the same visit. The underlying records need to stay connected.'],
      ['The system', 'The Kotlin Multiplatform codebase targets Android and iOS with shared Compose screens and separate administrator, security, and employee flows.'],
      ['The implementation', 'Shared models cover appointments, visitors, staff, access points, and logs. Repository implementations delegate to a common API service rather than embedding network calls in the screens.'],
      ['The architectural intent', 'Viewmodels hold screen state and emit navigation effects, while platform-specific entry points connect the shared application to Android and iOS.']
    ],
    scope: 'Architecture focus: shared mobile interfaces, role-specific flows, and a common API layer.'
  }
};

const drawings = {
  identity: '<path d="M25 27 86 16 86 91 25 103Z"/><path d="M18 22 79 11 86 16M18 22v75l7 6"/><ellipse cx="55" cy="45" rx="10" ry="12"/><path d="M37 78c1-24 33-24 35-5M36 91l35-6"/><path d="M91 37h13m-6-6v12"/>',
  pass: '<path d="M25 30 83 19v70l-58 11Z"/><path d="M48 26V14h13v10M32 43l16-3M32 48l28-5M32 75v13h12V75Zm20-4v13h12V71Zm20-4v13h4V67Z"/><path d="m19 35-7 1v56l7-1M89 34l10-2v56l-10 2"/>',
  scan: '<path d="M24 30V18h19M24 83v13h19M87 30V18H68M87 83v13H68"/><path d="M34 38h17v17H34Zm29 0h14v14H63ZM34 67h17v17H34ZM63 66h6v7h8v11H63Z"/><path stroke-width="2" d="M13 60h86"/><path d="m97 54 6 6-6 6"/>',
  decision: '<path d="m55 15 31 12v30c0 21-15 33-31 43-17-10-31-22-31-43V27Z"/><path d="m55 23 23 9v25c0 17-11 26-23 34-12-8-23-17-23-34V32Z"/><path stroke-width="2" d="m41 55 10 10 20-24"/>',
  inventory: '<path d="m20 39 34-18 37 17-35 18ZM20 39v44l36 18 35-20V38M56 56v45M37 30l36 17v19"/><path d="m66 83 14-8M20 61l36 18"/>',
  order: '<path d="M26 23h53v74H26Z"/><path d="M39 23v-9h27v9M35 42h7m6 0h21M35 58h7m6 0h21M35 74h7m6 0h21M32 102h53V29"/>',
  payment: '<path d="m18 37 72-15v53l-72 16Z"/><path d="m18 52 72-15M23 43l21-4M27 78l19-4"/><ellipse cx="75" cy="85" rx="20" ry="19"/><path d="M69 92c12 5 17-7 6-7-10 0-8-12 5-9M76 71v27"/>',
  report: '<path d="M20 18v81h77M32 82V61h13v21ZM54 82V43h13v39ZM76 82V25h13v57Z"/><path d="m29 47 29-16 26-17m-12 0h12v12"/>',
  audio: '<rect x="43" y="14" width="26" height="52" rx="13"/><path d="M31 47v9c0 32 50 32 50 0v-9M56 80v22M41 103h30M13 43v22m-5-16v10M98 43v22m5-16v10"/>',
  parse: '<path d="M31 21H20v73h11M78 21h11v73H78M40 41h28M40 57h28M40 73h17"/><path d="m48 96 8 7 8-7M56 87v16"/>',
  database: '<ellipse cx="55" cy="29" rx="31" ry="13"/><path d="M24 29v53c0 18 62 18 62 0V29M24 47c0 18 62 18 62 0M24 65c0 18 62 18 62 0"/><path d="M76 44v8m0 12v8m0 9v8"/>',
  display: '<path d="M13 22h87v61H13ZM19 28h75v49H19ZM55 83v16M39 101h33"/><path d="M34 42h45M34 51h39M34 60h44"/>',
  discover: '<circle cx="46" cy="46" r="26"/><path d="m65 65 28 28-8 8-28-28M33 36h24M33 45h24M33 54h15M83 16v18m-9-9h18"/>',
  match: '<path d="M14 25h34v64H14ZM65 25h34v64H65ZM23 39h16m-16 13h16m-16 13h10M74 39h16m-16 13h16m-16 13h10M48 57h17"/><path d="m54 50 7 7-7 7"/>',
  evidence: '<path d="M24 16h43l18 18v67H24ZM67 16v20h18M34 48h34M34 58h34M34 68h18"/><path d="m44 87 6 6 15-16M16 26v67"/>',
  review: '<path d="M18 24h77v73H18ZM18 43h77M43 43v54M69 43v54M26 53h10v15H26Zm25 0h10v25H51Zm26 0h10v34H77Z"/><path d="M27 32h8m5 0h7"/>',
  calendar: '<path d="M19 25h76v73H19ZM19 43h76M36 14v23M76 14v23M32 57h11v11H32Zm24 0h11v11H56Zm-24 22h11v11H32Z"/><path d="m66 80 7 7 14-18"/>',
  arrival: '<path d="M41 20h45v80H41ZM45 100l29-12V24l-29-4M61 57v9M41 100h52M8 59h43"/><path d="m35 48 12 11-12 11"/>',
  access: '<path d="m55 13 29 13v30c0 23-29 43-29 43S26 79 26 56V26Z"/><circle cx="56" cy="48" r="9"/><path d="M52 56v15h8V56M20 32l-8 4v30m78-34 8 4v30"/>',
  record: '<path d="M25 17h57v84H25ZM34 35h13m8 0h18M34 51h13m8 0h18M34 67h13m8 0h18M34 83h13m8 0h18M17 25v69M90 25v69"/>'
};

let currentProject = 'security';
let currentNode = 0;
let userIsExploring = false;
const $ = (id) => document.getElementById(id);
const nodeButtons = [...document.querySelectorAll('[data-node]')];
const tabs = [...document.querySelectorAll('[data-project]')];
const work = $('work');
const dialog = $('project-dialog');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const smallScreen = matchMedia('(max-width: 900px)');

function contactUrl(key) {
  const subject = key === 'general' ? 'Let’s discuss a project or opportunity' : `About ${projects[key].name}`;
  const body = key === 'general' ? 'Hi Samuel,\n\nI’d like to discuss ' : `Hi Samuel,\n\nI was looking at ${projects[key].name} in your portfolio and would like to discuss `;
  return `mailto:skingmensah@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
function updateInquiry(key) {
  $('inquiry-project').value = key;
  $('project-inquiry').href = contactUrl(key);
}
function selectNode(index, manual = false) {
  currentNode = index;
  if (manual) userIsExploring = true;
  const [name, description] = projects[currentProject].nodes[index];
  $('node-title').textContent = name;
  $('node-description').textContent = description;
  nodeButtons.forEach((button, i) => {
    button.classList.toggle('is-selected', i === index);
    button.setAttribute('aria-pressed', String(i === index));
  });
}
function selectProject(key, manual = false) {
  currentProject = key;
  if (manual) userIsExploring = true;
  const project = projects[key];
  tabs.forEach((tab) => {
    const active = tab.dataset.project === key;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  $('project-panel').setAttribute('aria-labelledby', `tab-${key}`);
  $('project-category').textContent = project.category;
  $('project-status').textContent = project.status;
  $('project-title').replaceChildren(document.createTextNode(project.headline[0]), document.createElement('br'), document.createTextNode(project.headline[1]));
  $('project-description').textContent = project.description;
  $('project-stack').textContent = project.stack;
  project.nodes.forEach(([name,,art], i) => {
    nodeButtons[i].querySelector('.node-name').textContent = name;
    nodeButtons[i].querySelector('.node-art').innerHTML = `<svg viewBox="0 0 112 116" aria-hidden="true">${drawings[art]}</svg>`;
    nodeButtons[i].style.setProperty('--lift', `${8 + i * 5}px`);
    nodeButtons[i].setAttribute('aria-label', `${name}: explore this stage`);
  });
  selectNode(0);
  if (manual) updateInquiry(key);
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectProject(tab.dataset.project, true));
  tab.addEventListener('keydown', (event) => {
    let next = index;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else return;
    event.preventDefault();
    selectProject(tabs[next].dataset.project, true);
    tabs[next].focus({ preventScroll: true });
    if (smallScreen.matches) tabs[next].scrollIntoView({ behavior: 'instant', block: 'nearest', inline: 'nearest' });
  });
});
nodeButtons.forEach((button, index) => button.addEventListener('click', () => selectNode(index, true)));
$('inquiry-project').addEventListener('change', (event) => updateInquiry(event.target.value));

function openProjectNotes() {
  const project = projects[currentProject];
  $('dialog-category').textContent = project.category;
  $('dialog-title').textContent = project.name;
  $('dialog-intro').textContent = project.description;
  const fragment = document.createDocumentFragment();
  project.notes.forEach(([title, text]) => {
    const heading = document.createElement('h3'); heading.textContent = title;
    const paragraph = document.createElement('p'); paragraph.textContent = text;
    fragment.append(heading, paragraph);
  });
  const scope = document.createElement('p'); scope.className = 'scope-note'; scope.textContent = project.scope;
  fragment.append(scope);
  $('dialog-content').replaceChildren(fragment);
  $('dialog-inquiry').href = contactUrl(currentProject);
  dialog.showModal();
  document.body.style.overflow = 'hidden';
  dialog.scrollTop = 0;
  dialog.querySelector('.dialog-close').focus();
}
$('open-project').addEventListener('click', openProjectNotes);
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) {
    const r = dialog.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
  }
});
// Native dialog restoration returns focus to the opener. Re-focusing in the
// delayed close event would steal focus from a visitor already navigating on.
dialog.addEventListener('close', () => { document.body.style.overflow = ''; });

selectProject('security');
$('year').textContent = new Date().getFullYear();
ScrollCraft.mount(document.body);

const hero = $('top');
let framePending = false;
const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
function drawScrollState() {
  framePending = false;
  const heroRect = hero.getBoundingClientRect();
  if (heroRect.bottom > 0) hero.style.setProperty('--hero-p', reduceMotion.matches ? 0 : clamp(-heroRect.top / heroRect.height, 0, 1));
  const workRect = work.getBoundingClientRect();
  if (workRect.bottom >= 0 && workRect.top <= innerHeight) {
    const p = clamp(-workRect.top / Math.max(workRect.height - innerHeight, 1), 0, 1);
    const staticState = reduceMotion.matches || smallScreen.matches;
    work.style.setProperty('--draw', staticState ? 1 : .32 + p * .68);
    if (!userIsExploring && !staticState) {
      const index = Math.min(3, Math.floor(p * 4.2));
      if (index !== currentNode) selectNode(index);
    }
    // Publish the rendered diagram state so the Scroll Craft harness can inspect
    // bespoke motion. These are painted properties and visible text, not a timer.
    const map = document.querySelector('.system-view');
    if (!staticState && workRect.top <= 0 && workRect.bottom >= innerHeight) {
      map.dataset.scVerifyState = JSON.stringify({
        line: getComputedStyle(document.querySelector('.trace-live')).strokeDashoffset,
        selected: $('node-title').textContent,
        transforms: nodeButtons.map(button => getComputedStyle(button.querySelector('.node-art')).transform)
      });
    } else map.removeAttribute('data-sc-verify-state');
  }
}
function queueFrame() { if (!framePending) { framePending = true; requestAnimationFrame(drawScrollState); } }
window.addEventListener('scroll', queueFrame, { passive: true });
window.addEventListener('resize', queueFrame, { passive: true });
function updateOrientation() {
  document.querySelector('[role="tablist"]').setAttribute('aria-orientation', smallScreen.matches ? 'horizontal' : 'vertical');
  queueFrame();
}
smallScreen.addEventListener('change', updateOrientation);
reduceMotion.addEventListener('change', queueFrame);
updateOrientation();
hero.addEventListener('pointermove', (event) => {
  if (reduceMotion.matches || event.pointerType !== 'mouse') return;
  const r = hero.getBoundingClientRect();
  hero.style.setProperty('--pointer-x', clamp((event.clientX - r.left) / r.width * 2 - 1, -1, 1));
});
hero.addEventListener('pointerleave', () => hero.style.setProperty('--pointer-x', 0));
