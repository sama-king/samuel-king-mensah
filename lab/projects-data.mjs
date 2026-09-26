// Project page content. Every claim here is grounded in the project's own repository in ~/dev.
// `mood` is art direction only and never rendered.
// No em dashes in visible copy (Scroll Craft rule). No invented figures.

export const order = ['security', 'rabah', 'lumos', 'employed', 'frontdesk'];

export const projects = {
  security: {
    name: 'Loveworld Security',
    titleHtml: 'Loveworld<br> Security',
    category: 'Identity &amp; access · Android',
    status: 'Deployed in Lagos',
    headline: ['The right person.', 'The right access.'],
    lede: 'A mobile-first identification and access-management system, built for staff and event operations at Loveworld headquarters.',
    facts: [['Role', 'Full-stack architecture and build'], ['Platform', 'Android app with a PHP API'], ['In use', 'Loveworld headquarters, Lagos']],
    palette: { canvas: '#0e0c09', deep: '#090806', surface: '#1a1610', ink: '#f4eddf', soft: '#a99e88', accent: '#d8ab52', line: '#3a3226' },
    mood: 'Night watch at the gate: warm gold on near black.',
    featuresIntro: 'Everything a checkpoint needs, from the pass in a visitor\'s hand to the record an administrator reviews.',
    features: [
      ['scan', 'Scan and decide', 'Guards scan a QR pass and receive an allowed or denied result with the reason: wrong event, missing permission, or an expired pass.'],
      ['pass', 'Event passes', 'Administrators create events, register attendees, and generate passes tied to that event and its access groups.'],
      ['users', 'Permissions and groups', 'Permissions are grouped into access groups, so a pass carries exactly the areas its holder may enter.'],
      ['identity', 'Staff and guard profiles', 'People, departments and photographs sit behind every pass. Guards have their own accounts and roles.'],
      ['log', 'A traceable record', 'Every entry and exit is logged against the pass, the guard, and the checkpoint, then synced to the server.'],
      ['phone', 'Phone verification', 'One-time passcodes verify a phone number before an account is trusted.']
    ],
    innovations: [
      ['sync', 'Local first, remote on demand', 'A scan checks the pass hash against the device database first. Only an unknown pass triggers an API lookup, and the result is cached for the next scan.'],
      ['shield', 'Decisions that explain themselves', 'The verifier walks event, permission and expiry in order and reports which check failed. A guard can tell a visitor why, not only that.'],
      ['layers', 'Incremental sync', 'The API exposes "latest after" endpoints for guards, events, permissions, passes and logs, so devices pull only what changed since their last sync.']
    ],
    stack: [
      ['Android app', ['Kotlin', 'Fragments + Navigation', 'ViewModel + LiveData', 'Room', 'DataStore']],
      ['Scanning', ['code-scanner', 'ZXing', 'QR generator']],
      ['Network', ['Retrofit', 'Gson', 'OkHttp logging']],
      ['Platform services', ['Firebase Auth', 'Remote Config', 'Crashlytics']],
      ['Server', ['PHP', 'CodeIgniter 4', 'MySQL']]
    ]
  },

  rabah: {
    name: 'RabahFoods Ops',
    titleHtml: 'RabahFoods<br> Ops',
    category: 'Business operations · Web',
    status: 'Live storefront',
    headline: ['From stock intake', 'to a settled order.'],
    lede: 'An operations application for a frozen meats and fish business, connecting inventory, orders, payments, reporting, and AI-assisted ordering across WhatsApp, Instagram and the website.',
    facts: [['Role', 'Architecture and full build'], ['Platform', 'Next.js web app on Firebase'], ['Public site', '<a href="https://www.rabahfoods.com/" target="_blank" rel="noopener noreferrer">rabahfoods.com ↗</a>']],
    palette: { canvas: '#f5e7d3', deep: '#efdcc2', surface: '#fbf3e8', ink: '#4a2c24', soft: '#7d5c50', accent: '#d96c1f', line: '#dcc3a6', alt: '#3dbcc9' },
    mood: 'The brand itself: warm cream, cocoa and burnt orange, with a cold aqua for the freezer.',
    featuresIntro: 'One application for the whole business, from the freezer to the settled balance.',
    features: [
      ['box', 'Stock intake by batch', 'Every box or lot is received as a batch with its cost, and each intake records how the invoice was paid across cash, mobile money and bank.'],
      ['cart', 'Orders and fulfilment', 'Multi-item orders move from pending to ready to closed, selling loose pieces or full boxes at the box price.'],
      ['receipt', 'Payments and debt', 'Sales run unpaid, partial, paid. A debt payment is allocated first-in, first-out across a customer\'s outstanding sales, with a reprintable receipt.'],
      ['chart', 'Cash flow and reconciliation', 'Admin reports cover cash flow and profit, daily expected-versus-actual reconciliation per channel, expenses and owner drawings.'],
      ['chat', 'Ms Poundz, the ordering assistant', 'Customers order in natural language on WhatsApp, Instagram or the storefront chat, and receive a link to confirm.'],
      ['store', 'A public storefront', 'The virtual shop lets visitors browse the frozen range and start an order with the assistant.']
    ],
    innovations: [
      ['lock', 'A draft is not an order', 'The assistant can only create a draft. It becomes a pending order when the customer confirms on a single-use page with a 24-hour token, keeping a human handoff between conversation and fulfilment.'],
      ['bolt', 'Answer Meta in time, think afterwards', 'The webhook verifies the HMAC signature, stores the message and returns 200 immediately. The agent runs after the response with Next.js after(), so no worker queue is needed.'],
      ['switch', 'One agent, three channels, two models', 'WhatsApp, Instagram and web chat share one conversation model and one agent loop. OpenAI or Anthropic sits behind a shared runner interface, switched by one setting.']
    ],
    stack: [
      ['Application', ['Next.js 16 App Router', 'React 19', 'TypeScript']],
      ['Interface', ['Tailwind CSS 4', 'TanStack Table', 'Recharts', 'React Hook Form']],
      ['Data', ['Firestore', 'Firebase Auth', 'Firebase Storage', 'Admin SDK']],
      ['AI and messaging', ['OpenAI', 'Anthropic', 'WhatsApp Cloud API', 'Instagram Messaging', 'Telegram Bot API']]
    ]
  },

  lumos: {
    name: 'LumosCast',
    titleHtml: 'LumosCast',
    category: 'Speech &amp; presentation · Desktop',
    status: 'Offline-first',
    headline: ['Spoken references.', 'Ready for the screen.'],
    lede: 'A presentation system that listens to a live sermon, detects spoken Bible references, retrieves the passage from a local database, and puts it on the projector or OBS.',
    facts: [['Role', 'Architecture and full build'], ['Platform', 'macOS, Windows and Linux'], ['Network', 'Runs with no internet']],
    palette: { canvas: '#0b0d1f', deep: '#070817', surface: '#151939', ink: '#eef0ff', soft: '#9ea4cf', accent: '#f3b95f', line: '#2b3160', alt: '#adc6ff' },
    mood: 'A dark auditorium and a single warm light on the screen.',
    featuresIntro: 'Everything between the preacher\'s voice and the passage on the screen.',
    features: [
      ['mic', 'Live listening', 'Microphone audio is captured, split on voice activity and transcribed locally, with the engine and model switchable from the console.'],
      ['brackets', 'Reference detection', 'A parser turns messy transcripts into references: misheard book names, spoken numbers, and partial references spread across utterances.'],
      ['book', 'Offline scripture', 'KJV, ASV and BSB are bundled in SQLite. NIV, AMP and MSG can be added through api.bible and are cached locally.'],
      ['screen', 'Operator console', 'A React console to search, preview, confirm and queue passages before they go live.'],
      ['broadcast', 'Displays for projection and OBS', 'Each configured display is a web page on the local network, styled per screen and updated instantly.'],
      ['desktop', 'A desktop launcher', 'An Avalonia launcher starts the server, lives in the tray, picks the microphone, and recovers the server if it stops.']
    ],
    innovations: [
      ['layers', 'Context that bridges the pauses', 'Sticky book and chapter context survives a window of utterances, so a reference split by filler still resolves. An explicit cue can resume the last passage long after.'],
      ['shield', 'Confidence before the screen', 'Every heuristic match carries a confidence score for a confirm gate, because on a live display a false positive costs more than a miss.'],
      ['wave', 'Recognition biased to scripture', 'Whisper is primed with a vocabulary built from the parser\'s own book catalogue, so book names and numbers survive transcription.']
    ],
    stack: [
      ['Host', ['.NET 10', 'ASP.NET Core Minimal API', 'Server-Sent Events']],
      ['Speech and audio', ['Whisper.net', 'sherpa-onnx', 'PortAudio']],
      ['Data', ['SQLite', 'Dapper', 'api.bible']],
      ['Interface', ['React', 'Vite', 'Avalonia']],
      ['Quality', ['xUnit', 'Golden-audio tests']]
    ]
  },

  employed: {
    name: 'employed',
    titleHtml: 'employed',
    category: 'AI-assisted workflow · Web',
    status: 'Local by design',
    headline: ['Find the fit.', 'Keep the evidence.'],
    lede: 'A local workspace that finds remote roles a person could plausibly win, explains how to approach each one, and tracks what they did about it.',
    facts: [['Role', 'Design and full build'], ['Platform', 'Local Python web app'], ['Data', 'Stays on your machine']],
    palette: { canvas: '#eef0e6', deep: '#e3e7d6', surface: '#f8f9f2', ink: '#1b2a1f', soft: '#56645a', accent: '#3f7d3a', line: '#cdd4bf', alt: '#b8d272' },
    mood: 'A well-kept notebook: paper, ink green and a highlighter.',
    featuresIntro: 'From thousands of postings to the few worth a serious application.',
    features: [
      ['magnify', 'Two lanes of discovery', 'Seven public aggregators, plus an 884-company registry resolved into company job boards and your own watchlist.'],
      ['funnel', 'A filter cascade', 'Geo gate, seniority gate, anti-terms, then an unambiguous title signal, before anything is scored.'],
      ['spark', 'Analysis on demand', 'Each card has its own Analyse button. The agent classifies eligibility, quotes the posting, and builds a requirement-to-evidence matrix.'],
      ['doc', 'A profile built from documents', 'CVs, portfolios and notes are read into proposed capabilities, each tied to the exact span of the document that proves it.'],
      ['board', 'One board from arrival to outcome', 'Ranked, Analysed, Applied, Interview, Lost. No drag and drop and no JavaScript library.'],
      ['plug', 'Bring your own model', 'OpenAI-compatible, Anthropic and Google formats, local models through Ollama or LM Studio, or the coding agent itself.']
    ],
    innovations: [
      ['check', 'Evidence the model cannot invent', 'Every ingested answer is checked: the quote must be a verbatim substring of the posting or document. A hallucinated quote is refused before it reaches the database.'],
      ['layers', 'Degraded mode is a supported state', 'Without an agent, harvest, the geo gate, matching and ranking still run. The dashboard names what is dark and why, rather than faking it.'],
      ['search', 'A board token is a hypothesis', 'A company\'s job board only counts once its API answers with a 200 and at least one real posting. Nothing becomes a source on a guess, and roughly a third of the registry resolves.']
    ],
    stack: [
      ['Application', ['Python', 'FastAPI', 'Uvicorn', 'Pydantic']],
      ['Interface', ['Jinja', 'HTMX', 'No build step']],
      ['Harvesting', ['httpx (HTTP/2)', 'selectolax', 'Playwright (optional)']],
      ['Data and documents', ['SQLite', 'pypdf', 'python-docx', 'PyYAML']],
      ['Tooling', ['Typer', 'Rich', 'pytest']]
    ]
  },

  frontdesk: {
    name: 'FrontDesk',
    titleHtml: 'FrontDesk',
    category: 'Workplace access · Multiplatform',
    status: 'Android &amp; iOS',
    headline: ['A clearer welcome.', 'A connected workplace.'],
    lede: 'A cross-platform workplace access application that connects visitors, appointments, staff and access records across administrator, security and employee roles.',
    facts: [['Role', 'Architecture and mobile build'], ['Platform', 'Android and iOS, one codebase'], ['UI', 'Compose Multiplatform']],
    palette: { canvas: '#07130f', deep: '#040c09', surface: '#0f211a', ink: '#e9f3ee', soft: '#93aca1', accent: '#4cc58a', line: '#1f3a2f' },
    mood: 'A quiet reception at night: deep green glass and a clear signal light.',
    featuresIntro: 'Every part of a visit, from the invitation to the door.',
    features: [
      ['users', 'Visitors and check-in', 'Register visitors, check them in and out, and keep their details and history in one place.'],
      ['calendar', 'Appointments', 'Employees schedule visits in advance so reception knows who is coming and who they are seeing.'],
      ['scan', 'Access card scanning', 'Security scans an access card and sees the result straight away, with the entry written to the logs.'],
      ['door', 'Access points and logs', 'Doors and gates are modelled as access points, with staff and visitor entry logs behind them.'],
      ['bell', 'Broadcasts and notifications', 'Administrators broadcast messages to staff, and each person gets their own notification feed.'],
      ['lock', 'Account lifecycle', 'First-time login, forgotten and reset passwords, and a stored session for returning users.']
    ],
    innovations: [
      ['devices', 'One codebase, two platforms', 'Screens, state and data live in shared Kotlin. Only the entry points and the HTTP engine differ between Android and iOS.'],
      ['users', 'Role-shaped experiences', 'Administrator, security and employee flows are separate, built on the same shared components and models.'],
      ['layers', 'Screens that never touch the network', 'Viewmodels hold state and emit navigation effects. Repositories delegate to one API service, so network calls never live in the UI.']
    ],
    stack: [
      ['Shared app', ['Kotlin Multiplatform', 'Compose Multiplatform', 'Material 3']],
      ['State and navigation', ['Lifecycle ViewModel', 'Navigation Compose', 'Coroutines']],
      ['Data', ['Ktor client', 'kotlinx.serialization', 'DataStore']],
      ['Media and utilities', ['Coil', 'FileKit', 'QR code', 'Kermit']],
      ['Targets', ['Android', 'iOS']]
    ]
  }
};
