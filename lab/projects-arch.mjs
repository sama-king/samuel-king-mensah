// High-level component maps for each project page, grounded in each repository.
// node: [id, icon, name, what it handles, tech[], column (1-4), row (1-3)]
// edge: [from, to, label]  (drawn in array order as the reader scrolls)

export const arch = {
  security: {
    title: 'The components behind a trusted scan.',
    nodes: [
      ['pass', 'pass', 'Access pass', 'QR credential tied to an event, its permissions and an expiry', ['QR generator', 'Access groups'], 1, 1],
      ['app', 'phone', 'Guard app', 'Scanning, passes, events, guards and logs on Android', ['Kotlin', 'Fragments', 'ViewModel'], 2, 1],
      ['rules', 'shield', 'Verification rules', 'Checks event, permission and expiry, and names the failed check', ['Scan view model'], 2, 2],
      ['cache', 'database', 'Local database', 'Synced passes, events, permissions and pending logs on the device', ['Room', 'DataStore'], 3, 2],
      ['api', 'plug', 'Security API', 'Guards, users, events, passes, logs and OTP verification', ['PHP', 'CodeIgniter 4', 'Auth filter'], 4, 1],
      ['mysql', 'database', 'MySQL', 'The system of record administrators review', ['MySQLi'], 4, 2],
      ['firebase', 'gear', 'Firebase', 'Sign-in, runtime configuration and field crash reports', ['Auth', 'Remote Config', 'Crashlytics'], 1, 2]
    ],
    edges: [
      ['pass', 'app', 'QR scan'],
      ['app', 'rules', 'pass + checkpoint'],
      ['rules', 'cache', 'lookup by hash'],
      ['cache', 'api', 'incremental sync'],
      ['app', 'api', 'unknown pass, logs'],
      ['api', 'mysql', 'persist'],
      ['app', 'firebase', 'auth, config']
    ]
  },

  rabah: {
    title: 'How a conversation, the shop and the back office share one system.',
    nodes: [
      ['social', 'chat', 'WhatsApp and Instagram', 'Where customers message the business', ['WhatsApp Cloud API', 'Instagram Messaging'], 1, 1],
      ['webhook', 'bolt', 'Meta webhook', 'Verifies the signature, stores the message, replies 200 at once', ['Next.js route', 'HMAC', 'after()'], 2, 1],
      ['agent', 'spark', 'Ordering agent', 'Reads the live catalogue, asks questions, drafts the order', ['Tool calling', 'Shared runner'], 3, 1],
      ['llm', 'switch', 'Model provider', 'OpenAI or Anthropic behind one interface', ['OpenAI', 'Anthropic'], 4, 1],
      ['store', 'store', 'Storefront and web chat', 'The public shop and its chat with the same agent', ['Next.js', 'React'], 3, 2],
      ['confirm', 'check', 'Confirmation page', 'Customer reviews, picks payment and address, confirms', ['Single-use token', 'Places'], 1, 2],
      ['db', 'database', 'Firestore', 'Products, batches, orders, sales, payments, conversations', ['Firestore', 'Admin SDK'], 2, 2],
      ['telegram', 'bell', 'Staff alerts', 'Pushes each confirmed order to staff', ['Telegram Bot API'], 1, 3],
      ['ops', 'chart', 'Operations app', 'Stock intake, orders, payments, reconciliation, reports', ['TanStack Table', 'Recharts'], 2, 3],
      ['auth', 'lock', 'Firebase Auth', 'Admin and sales roles', ['Email and password'], 3, 3]
    ],
    edges: [
      ['social', 'webhook', 'message'],
      ['webhook', 'agent', 'agent turn'],
      ['store', 'agent', '/api/chat'],
      ['agent', 'llm', 'prompt + tools'],
      ['agent', 'db', 'draft order'],
      ['social', 'confirm', 'confirm link'],
      ['confirm', 'db', 'draft to pending'],
      ['confirm', 'telegram', 'staff alert'],
      ['ops', 'db', 'fulfil, collect, report'],
      ['ops', 'auth', 'roles']
    ]
  },

  lumos: {
    title: 'One process, from microphone to screen.',
    nodes: [
      ['launcher', 'desktop', 'Desktop launcher', 'Starts and supervises the server, tray, microphone picker', ['Avalonia'], 1, 1],
      ['host', 'broadcast', 'Web host', 'Pipeline, minimal API and the event broadcaster', ['ASP.NET Core', 'SSE'], 3, 1],
      ['console', 'screen', 'Operator console', 'Search, preview, confirm and queue passages', ['React', 'Vite'], 4, 1],
      ['audio', 'mic', 'Audio capture', 'Microphone input cut into speech at pauses', ['PortAudio', 'VAD'], 1, 2],
      ['speech', 'wave', 'Speech engine', 'Local transcription, biased to scripture vocabulary', ['Whisper.net', 'sherpa-onnx'], 2, 2],
      ['parser', 'brackets', 'Reference parser', 'Finds references across utterances and scores confidence', ['Core', 'No dependencies'], 3, 2],
      ['display', 'screen', 'Display pages', 'One styled page per projector or OBS output', ['React'], 4, 2],
      ['data', 'book', 'Scripture store', 'Bundled KJV, ASV and BSB for offline use', ['SQLite', 'Dapper'], 3, 3],
      ['online', 'sync', 'api.bible', 'Optional NIV, AMP and MSG, cached for 14 days', ['HTTP', 'Local cache'], 4, 3]
    ],
    edges: [
      ['launcher', 'host', 'starts, restarts'],
      ['audio', 'speech', 'speech chunks'],
      ['speech', 'parser', 'transcripts'],
      ['parser', 'data', 'verse lookup'],
      ['data', 'online', 'online translations'],
      ['parser', 'host', 'detected verses'],
      ['host', 'console', 'SSE + REST'],
      ['host', 'display', 'SSE /events']
    ]
  },

  employed: {
    title: 'From thousands of postings to evidence you can trust.',
    nodes: [
      ['sources', 'magnify', 'Job sources', 'Seven aggregators plus resolved company boards', ['JSON', 'RSS', 'ATS APIs'], 1, 1],
      ['harvest', 'sync', 'Harvester', 'Fetches and normalises postings politely', ['httpx', 'selectolax'], 2, 1],
      ['cascade', 'funnel', 'Filter cascade', 'Geo, seniority, anti-terms and title signal, then ranking', ['Deterministic'], 3, 1],
      ['resolver', 'search', 'ATS resolver', 'Detects each careers page\'s job board and verifies it live', ['Greenhouse', 'Lever', 'Ashby'], 1, 2],
      ['docs', 'doc', 'Profile documents', 'CVs and notes read into evidenced capabilities', ['pypdf', 'python-docx'], 2, 2],
      ['agent', 'spark', 'Analysis agent', 'Eligibility, requirement matrix and approach notes', ['Any provider', 'Degraded mode'], 3, 2],
      ['guard', 'check', 'Evidence check', 'Rejects any quote that is not verbatim in its source', ['Pydantic'], 4, 1],
      ['db', 'database', 'Local store', 'Postings, profile, runs and decisions in ~/.employed', ['SQLite'], 4, 2],
      ['cli', 'gear', 'Command line', 'Harvest, resolve, match and analyse on a schedule', ['Typer', 'Rich'], 3, 3],
      ['ui', 'board', 'Dashboard', 'Board, job workspace, profile, sources and agent pages', ['FastAPI', 'Jinja', 'HTMX'], 4, 3]
    ],
    edges: [
      ['resolver', 'sources', 'verified boards'],
      ['sources', 'harvest', 'postings'],
      ['harvest', 'cascade', 'normalised'],
      ['cascade', 'agent', 'shortlist'],
      ['docs', 'agent', 'evidence spans'],
      ['agent', 'guard', 'verdicts + quotes'],
      ['guard', 'db', 'verified only'],
      ['cli', 'db', 'runs'],
      ['db', 'ui', 'review and decide']
    ]
  },

  frontdesk: {
    title: 'One shared Kotlin codebase, two platforms, three roles.',
    nodes: [
      ['android', 'phone', 'Android app', 'Platform entry point hosting the shared app', ['Activity', 'OkHttp engine'], 1, 1],
      ['ui', 'devices', 'Shared screens', 'Role-based home, visitors, appointments, logs, broadcasts', ['Compose Multiplatform', 'Material 3'], 2, 1],
      ['vm', 'gear', 'ViewModels', 'Screen state and navigation effects', ['Lifecycle', 'Coroutines'], 3, 1],
      ['ios', 'phone', 'iOS app', 'Xcode host for the same shared app', ['Darwin engine'], 1, 2],
      ['scan', 'scan', 'Card scanning', 'Reads access cards and QR codes at the door', ['QR code'], 2, 2],
      ['repos', 'layers', 'Repositories', 'Visitors, appointments, staff, access points, logs, auth', ['8 repositories'], 3, 2],
      ['api', 'plug', 'API service', 'One HTTP client and call wrapper for every request', ['Ktor', 'kotlinx.serialization'], 4, 2],
      ['session', 'lock', 'Session store', 'Keeps the signed-in user between launches', ['DataStore'], 3, 3],
      ['backend', 'database', 'Workplace API', 'The shared record of visits, staff and access', ['REST', 'JSON'], 4, 3]
    ],
    edges: [
      ['android', 'ui', 'hosts'],
      ['ios', 'ui', 'hosts'],
      ['ui', 'vm', 'intents, state'],
      ['scan', 'vm', 'card read'],
      ['vm', 'repos', 'suspend calls'],
      ['repos', 'api', 'requests'],
      ['repos', 'session', 'session'],
      ['api', 'backend', 'HTTPS']
    ]
  }
};
