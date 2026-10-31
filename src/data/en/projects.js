/**
 * Proyectos en inglés: solo textos, indexados por slug. La estructura (slug, stack,
 * URLs, imágenes, estado) vive en src/data/projects.js.
 */

export const capabilities = {
  Descubrir: 'Discover',
  Diseñar: 'Design',
  Construir: 'Build',
  Operar: 'Operate',
  Liderar: 'Lead',
  'Acelerar con IA': 'Accelerate with AI',
};

export const labFilters = [
  { key: 'all', label: 'All' },
  { key: 'ia', label: 'AI' },
  { key: 'herramientas', label: 'Backend and tools' },
  { key: 'clientes', label: 'Clients' },
  { key: 'musica', label: 'Music' },
  { key: 'ecommerce', label: 'Web' },
  { key: 'academico', label: 'Academic' },
];

export const projects = {
  // ─────────────────────────────────────────────────────────────── Featured
  micuota: {
    tagline: 'Collecting recurring payments without chasing anyone on WhatsApp.',
    categoryLabel: 'Fintech and payments',
    image: {
      alt: 'MiCuota.online website: headline "Get paid by link, QR or subscription without chasing payments" next to a sample dashboard with revenue, active links and subscriptions.',
    },
    audience: 'Teachers, freelancers and small providers who bill on a recurring basis.',
    role: 'Product, architecture, backend, frontend and integrations. Personal project.',
    originStory:
      'I spent years in banking and fintech, where a payment is a state machine with reconciliation and auditing behind it. On the other side, I saw teachers and professionals tracking fees in a spreadsheet and chasing bank transfers over WhatsApp. The gap between those two worlds was the product.',
    problem:
      "People who bill on a recurring basis but aren't a large company end up in no man's land: payment providers handle the one-off charge, but nobody handles the portfolio. Not knowing who paid, who is overdue or why a charge failed is silent admin work that eats into billable hours.",
    solution:
      'A multi-tenant platform where each provider connects their own payment credentials and runs their portfolio: one-off payment links, subscriptions, statuses and reconciliation. Underneath, a provider abstraction layer so that switching or adding one does not mean rewriting the business logic, and an event ledger that makes every charge auditable end to end.',
    highlights: [
      '`PaymentProviderGateway` layer with six implementations: Mercado Pago, Stripe, Square, Plexo, Prometeo and WooCommerce.',
      '`ONE_TIME` and `SUBSCRIPTION` flows on top of the same operation model.',
      'Each tenant connects their own access token: charges belong to the actual seller, with no global intermediary account.',
      'Mercado Pago webhooks with secret validation and lookup by `externalReference` when the notification only carries the id.',
      '`payment_events` ledger: charge creation, link sent, webhook received and every status change, queryable as a timeline per operation.',
      "Provider back office, SaaS admin panel and the end customer's payment page, as separate pages.",
      'Internal sandbox mode to test Stripe, Square and Plexo without external credentials.',
    ],
    evidence: [
      'Maven backend with controllers for payments, callbacks, webhooks, back office, reconciliation and administration.',
      '18 test classes across unit and integration tests, plus a smoke test suite against the running backend.',
      'Browsable documentation generated with MkDocs Material, built in `--strict` mode.',
      'Versioned Flyway migrations and separate profiles for development (H2) and production (PostgreSQL).',
    ],
    challenges: [
      'Every payment provider models the same thing differently. Mercado Pago separates `checkout/preferences` from `preapproval` for subscriptions, and in Uruguay subscriptions require a `preapproval_plan`. The abstraction had to absorb those differences without becoming a useless lowest common denominator.',
      'Webhooks arrive incomplete, duplicated and out of order. Resolving the operation when the notification only carries `data.id` meant relying on the `externalReference` in the URL and querying the provider API again.',
      "Having each tenant use their own credentials complicates everything —you have to resolve the right token on every call— but it's the only way for the money to land in the provider's account and not in a pass-through account.",
    ],
    learnings: [
      'Without an immutable event log, reconciliation is archaeology. Storing the raw provider response on every operation solved more incidents than any log.',
      "Deduplication isn't an implementation detail: a retried webhook that creates a duplicate subscription is a business problem.",
      'The internal sandbox mode was the decision that gave the most speed: it lets you walk through the entire flow without depending on third-party credentials.',
    ],
    nextSteps: [
      'Delinquency, recovery and automatic reconciliation reports can be built on top of the event ledger.',
      'The same foundation enables split payments and third-party payouts.',
    ],
    demoLabel: 'Visit MiCuota.online',
  },

  patio: {
    tagline: "A car dealership's inventory, without the shared spreadsheet.",
    categoryLabel: 'Mobility and platforms',
    image: {
      alt: 'Patio website: headline "Know which cars you have, what they cost you and which one you need to sell first" next to a sample dashboard with stock, reserved, sold and margin.',
    },
    audience: 'Car dealerships and used-car lots in Uruguay and Argentina, with one or several branches.',
    role: 'Product, specifications, multi-tenant architecture and backend development. Personal project.',
    originStory:
      "I set out to sell my car and ended up touring dealerships. I saw the process from the inside: paper records, photos on someone's phone, prices in dollars and pesos that didn't add up, and a vehicle that could be reserved and listed at the same time. The problem wasn't the sale: it was that nobody knew for sure what was on the lot.",
    problem:
      "A mid-sized dealership manages stock, reconditioning costs, documents with expiry dates, trade-ins, reservations and sales opportunities. It almost always does so with shared spreadsheets and WhatsApp groups. The cost doesn't show up in one place: it shows up in the car that has been sitting for ninety days, the margin nobody calculated and the unit that was sold twice.",
    solution:
      'A multi-tenant DMS built with spec-driven development: the specifications are the source of truth and the code implements them. It covers the full cycle —vehicle intake, photos and documents, costs and margin, CRM, reservation, trade-in, sale and delivery— with per-organization isolation at the database level and an immutable audit trail of every movement.',
    highlights: [
      'Multi-tenancy with Row Level Security in PostgreSQL: isolation lives in the database, not only in application code.',
      'Dual currency USD/UYU with versioned exchange rates, the way the Uruguayan market actually operates.',
      'RBAC by role and by branch.',
      'Vehicle state machine with history and explicit transitions.',
      'Per-unit costs and real, not estimated, margin calculation.',
      'Opportunity CRM with activities and WhatsApp link generation.',
      'Reservation with locking, trade-in, sale, delivery and cancellation.',
      'Dashboard with a stale-vehicles report, CSV import/export and an audit viewer.',
    ],
    evidence: [
      'Ten functional verticals (F01–F10) implemented and documented endpoint by endpoint.',
      '50 passing e2e tests, including a no-double-sale case under concurrency.',
      'Production migrations verified by running the API without `synchronize`, with the full schema and RLS applied.',
      'Five prior specification phases —research, product, UX and prototype, architecture and plan— versioned in `specs/` before the first line of production code.',
    ],
    challenges: [
      "A double sale under concurrency is the bug you can't afford: two salespeople reserving the same unit at the same time. It was solved with explicit locking and covered by a concurrent e2e test.",
      'Row Level Security gives much stronger isolation than filtering by `tenant_id` in every query, but it forces you to rethink migrations, connections and database roles.',
      "Dual currency isn't formatting: it runs through cost, margin, reporting and listed price, and each can be pinned to a different currency.",
    ],
    learnings: [
      'Writing five specification phases before coding looked slow and turned out to be exactly the opposite: the entire backend came out without structural refactors.',
      'With AI assisting development, the specification becomes the real bottleneck. The more precise it is, the more useful the assistance.',
      'A test that reproduces a race condition is worth more than twenty happy-path tests.',
    ],
    nextSteps: [
      'Next.js frontend wired to the full API.',
      'Integrations with listing portals and the WhatsApp Cloud API.',
      'RLS hardening with a restricted role and `SET app.tenant_id` per connection.',
    ],
    demoLabel: 'Product website',
  },

  'milo-care': {
    tagline: "Your dog's health no longer lives in screenshots.",
    categoryLabel: 'Pet health and wellbeing',
    image: {
      alt: 'Milo Care website: headline "Your dog\'s care, without relying on your memory", with free access and availability in Argentina and Uruguay.',
    },
    audience: 'People caring for dogs in Uruguay and Argentina who currently keep that information scattered across chats and paper.',
    role: 'Product, design, backend, frontend and infrastructure. Personal project.',
    originStory:
      "Milo is my dog. When I had to get his vaccines, medication and checkups in order, I realized the information lived in four different places: a photo of his vaccination card, a chat with the vet, a note on my phone and my memory. None of the four was going to warn me when the next dose was due.",
    problem:
      "A pet's medical history is fragmented by design: every visit produces a different piece of paper and every reminder depends on someone remembering. The result is expired vaccines, interrupted treatments and vet visits where nobody can reconstruct what happened over the last six months.",
    solution:
      "A platform where the caregiver records vaccines, medications, appointments and symptoms in one place, with email reminders that fire on their own. Onboarding builds the vaccination schedule for the country, based on SENASA regulations and WSAVA guidelines, so the record starts with useful content instead of an empty screen.",
    highlights: [
      'Dog profiles with a complete medical history per animal.',
      'Modules for vaccines, medications, vet appointments and symptoms, each with its own expiry and status logic.',
      'Email reminders with scheduled jobs (`node-cron`) delivered through Resend.',
      'Vaccination schedule by country (AR/UY) based on SENASA regulations and WSAVA guidelines.',
      'JWT authentication, password recovery and GDPR-style full account deletion.',
      'Admin panel with user and role management.',
      'Bilingual Spanish/English interface with a language selector.',
      'Freemium model: one dog on the free plan, unlimited on premium.',
    ],
    evidence: [
      'Working MVP with dashboard, dog onboarding and admin panel implemented.',
      'Full environment that runs with Docker Compose (API + SPA + MongoDB 7).',
      'Full account deletion implemented as a privacy requirement, not an optional feature.',
    ],
    challenges: [
      "The vaccination schedule changes by country and by source. Turning regulations and clinical guidelines into software rules —without ending up as a generic checklist or pretending to replace the vet— was the most delicate part.",
      'A reminder that arrives late or too often breaks trust immediately. The scheduled jobs had to be conservative and explicit.',
      'The free plan limit had to be generous enough for the product to be genuinely tried, and still sustainable.',
    ],
    learnings: [
      "Onboarding is the product: if the screen is empty after you register your dog, nobody comes back. Preloading the vaccination schedule completely changed the first session.",
      'Designing with privacy from the start —including full deletion— is far cheaper than adding it once there are users.',
      'A product born from my own need has a concrete advantage: I can test every decision in real, everyday use.',
    ],
    nextSteps: [
      'Premium plan billing and subscriptions handled by the [MiCuota](/en/projects/micuota/) engine.',
      'Extend the model to other species and to veterinary clinics.',
    ],
    demoLabel: 'Go to Milo Care',
  },

  'compliance-uy': {
    tagline: 'Data protection law, turned into an audit of your repository.',
    categoryLabel: 'Compliance and AI',
    audience: 'Development teams and Uruguayan startups that need to get their personal data protection compliance in order.',
    role: 'Design, regulatory research and implementation. Open source.',
    originStory:
      "On every project where I handled personal data I found the same scene: the regulation exists, it's public, and still nobody on the technical team knows what it means for the code they're writing. The gap between the law and the implementation is where compliance gets lost.",
    problem:
      "Complying with Uruguay's Law 18.331 requires knowing what personal data your system processes, which providers you share it with and where it leaves the country. That information is in the code, scattered across integrations and data models, but the assessment happens in meetings and ends up in a document that looks nothing like the real system.",
    solution:
      'An open source skill for Claude Code that reads the repository and produces an initial compliance package for Uruguay. It detects personal data and providers in the code, maps international transfers, evaluates fourteen controls and produces documents and an auditable state where every finding points to a specific file and line.',
    highlights: [
      'Grounded in official sources: Law 18.331, Decree 414/009, arts. 37-40 of Law 19.670, Decree 64/020 and guidance from the URCDP (Uruguay’s data protection authority).',
      'Every regulatory claim cites the rule, article and source file in `/sources`.',
      "Anything that can't be verified is explicitly marked `[verificar contra fuente oficial]` instead of being filled in by guesswork.",
      'Detects personal data: email, phone, national ID, tax ID, address, IP, location, messages, files, payments, health, minors and biometrics.',
      'Detects more than twenty providers (AWS, GCP, Azure, Supabase, Stripe, Mercado Pago, OpenAI, Anthropic, Twilio, Datadog and others) and maps international transfers.',
      'Evaluates fourteen controls and produces a `state.json` with status, `file:line` evidence, risk level and suggested remediation.',
    ],
    evidence: [
      'Rewritten from scratch for Uruguay: it contains no legal text from other jurisdictions.',
      'Explicit warning in the README: it produces drafts and technical assessments, not legal advice.',
      'Published as open source, installable in any repository.',
    ],
    challenges: [
      'A tool that talks about law can do harm if it sounds more certain than it is. Almost all of the design went into deciding what it asserts, what it flags as pending verification and how it cites it.',
      'Detecting personal data in real code is noisy: an `email` field may belong to a user or to an internal log. The rule became to flag and ask for confirmation, never to conclude on its own.',
    ],
    learnings: [
      'An agent is most useful when its output is verifiable. The rule of citing the rule, the article and the `file:line` is what makes the result reviewable.',
      "Translating regulation into concrete controls is product design: the hard part isn't reading the law, it's deciding what question to ask the code.",
    ],
    nextSteps: [
      'Extend coverage to other jurisdictions in the region while keeping strict per-country separation.',
    ],
  },

  'webspec-ai': {
    tagline: 'From a vague idea to a specification a team can execute.',
    categoryLabel: 'Artificial intelligence',
    image: {
      alt: 'Project creation screen in WebSpec AI: a form with the project name and idea, and flow templates (Full Spec, Landing Page, MVP SaaS, Desktop App, API Backend).',
    },
    audience: 'Founders, product managers and teams who need to turn an idea into documents before hiring or building.',
    role: 'Product, flow design, development and model integration. Personal project.',
    originStory:
      "Working with AI on my own products confirmed something I already knew from client projects: the bottleneck was never writing code. It's ambiguity. An agent that gets a vague instruction produces a lot of wrong code, faster than ever.",
    problem:
      'Between "I have an app idea" and "this can be built" there is work almost nobody does: brief, PRD, RFC, UX definition and backlog. Without it, the project starts anyway, but decisions get made one at a time, late and without context.',
    solution:
      'A conversational application that guides the user through that sequence of documents, in order, building each artifact on top of the previous one until it reaches an exportable specification. Instead of jumping straight to code, it produces the product package that makes the code the easy part.',
    highlights: [
      'Guided flow: brief, PRD, RFC, UX/UI, backlog, specs and final export.',
      'Each document builds on the previous ones instead of being generated in isolation.',
      "Conversational interface: the user answers questions, they don't fill in forms.",
      'Public website presenting the product.',
    ],
    evidence: [
      'Product website published and accessible.',
      'Application deployable to Netlify with configuration included.',
      'No secrets in the repository: the API key is set through an environment variable.',
    ],
    challenges: [
      "A flow that's too rigid feels like a form, and one that's too loose never reaches a specification. Finding that middle ground was nearly all of the product work.",
      'The documents have to be consistent with each other: if the PRD changes, the backlog that came out earlier is now lying.',
    ],
    learnings: [
      "It's the same method I apply to my own products —specify before building— turned into a tool.",
      'Output quality depends far more on the design of the question flow than on the model behind it.',
    ],
    nextSteps: [
      'Direct export to formats that coding agents can consume.',
    ],
    demoLabel: 'Try WebSpec AI',
  },

  'casa-medanos': {
    tagline: 'Selling an entire house’s contents before moving out.',
    categoryLabel: 'E-commerce',
    image: {
      alt: 'Casa Médanos catalog: "I\'m moving and selling everything", with filters by category and room, a search box, items marked as sold and a WhatsApp sales assistant.',
    },
    audience: 'Buyers of second-hand furniture and appliances, arriving from social media and WhatsApp.',
    role: 'Everything: catalog, design, development, automation and publishing. Personal project.',
    originStory:
      'I was moving and had to sell the furniture and appliances of an entire house. The alternative was posting fifty times on marketplaces, repeating the same price in every conversation and losing track of what was still available.',
    problem:
      'Selling many items at once breaks any tool designed to sell one. Without a shareable catalog, every interested buyer means repeating photos, prices and availability, and the seller ends up as a human index of their own house.',
    solution:
      'A fast, static catalog shareable through a single link, organized by room and category, with visible prices and an admin panel to update availability. I added an automated customer service flow with n8n to answer repeated questions without staring at my phone.',
    highlights: [
      'Catalog browsable by room and category, with search and explicit prices.',
      'A single shareable link that replaces repeated marketplace listings.',
      'Per-item status: sold items stay marked as sold instead of disappearing.',
      'Admin panel to manage items and their availability.',
      'Automated sales chat flow with n8n, versioned alongside the code.',
      'Static site: instant loading, no backend to maintain and no running costs.',
    ],
    evidence: [
      'Published and live on GitHub Pages.',
      'n8n workflows exported and versioned in the repository.',
      'Metadata and description geared toward sharing the link on social media.',
    ],
    challenges: [
      'The temptation was to set up a full e-commerce store. The problem had an expiry date —the move— so the right call was a static site with no backend.',
      'Keeping availability up to date while things were actually selling, without the upkeep costing more than the sale.',
    ],
    learnings: [
      'The right product is the one that fits the lifespan of the problem. This one had to last a few weeks and be ready in days.',
      'Automating the repeated conversation was more valuable than any catalog feature.',
    ],
    nextSteps: [
      'The catalog became a reusable template for any one-off sale with many items.',
    ],
    demoLabel: 'See the live site',
  },

  escalaimprov: {
    tagline: 'What I needed to understand to dare to play at a jam session.',
    categoryLabel: 'Music and creativity',
    image: {
      alt: 'The EscalaImprov app in Study view: root and scale selectors, tabs for keyboard, guitar, fifths, trainer and harmony, with a three-step guide to improvising and a click with BPM.',
    },
    audience: 'Musicians studying improvisation who need to see the theory, not just read it.',
    role: 'Product, study experience design and development. Personal project.',
    originStory:
      "I wanted to play at a jam and I was missing what a lot of people miss: recognizing intervals quickly and knowing which scale fits over which chord, without thinking. Books explain it well, but they don't correct you when you get it wrong, and none of them tells you what to do when your mind goes blank on stage.",
    problem:
      "Music theory is studied by reading and learned by playing. In between, there's a missing tool that gives instant feedback —one that tells you, in the moment, whether that minor sixth was the one you thought— and that also turns theory into an actionable instruction while you're playing.",
    solution:
      'It started as an Electron desktop app and is now a web application with two modes: Study, to understand the scale, degrees, chords and the circle of fifths; and Jam, to play with a short guide alongside. Each key comes with resting notes, phrasing ideas and a click with BPM, so the leap from theory to instrument does not depend on memory.',
    highlights: [
      'Two modes: Study (understand) and Jam (play), on the same scale engine.',
      'Keyboard, guitar, circle of fifths, trainer, builder, minors, harmony and ear-training views.',
      'Three-step guide per key: where to land, how to open the phrase and how to close it.',
      'Interval trainer with three exercise types —identify, build and find the root—, exam mode with a countdown and a session score.',
      '14 scales and modes —major, natural, harmonic and melodic minor, Greek modes, pentatonics, blues, whole tone, diminished and chromatic— in 12 keys.',
      "Quick map that separates the scale's notes from the ones outside it.",
      'Click with adjustable BPM and session presets you can save and load.',
      'Full keyboard navigation: arrow keys to change root and scale.',
    ],
    evidence: [
      'App published and accessible online, plus the product landing page.',
      'Circle of fifths implemented in responsive SVG, synced both ways with the rest of the application.',
      'The Electron desktop version the project started from is still in the repository, packaged for Windows, macOS and Linux.',
    ],
    challenges: [
      'Showing music theory without overwhelming: every visible element had to answer a question musicians actually ask themselves while playing.',
      'Feedback has to be instant. Any delay between answering and knowing if you got it right breaks the exercise.',
      'Moving from desktop to web meant rebuilding the interface around two different intentions —studying and playing— instead of replicating the same screen.',
    ],
    learnings: [
      'Building the tool I needed taught me more theory than studying it: to model the circle of fifths you really have to understand it.',
      "Keyboard navigation wasn't an accessibility improvement added at the end: practicing with a mouse is downright awkward.",
      'Separating Study from Jam was the product decision that changed usage the most: they are two different moments and needed two different interfaces.',
    ],
    nextSteps: [
      'Exercises on full progressions, not just isolated intervals.',
    ],
    demoLabel: 'Open the app',
  },

  'neuro-candombe': {
    tagline: 'A Transformer that plays chico, repique and piano drums.',
    categoryLabel: 'AI and music',
    audience: 'Musicians, teachers and researchers who want to listen to, study or reuse candombe patterns.',
    role: 'Model, data representation, API, frontend and evaluation. Personal project.',
    originStory:
      "Montevideo's candombe has very precise rules —the chico barely changes, the piano marks the neighborhood, the repique improvises— and at the same time a groove that doesn't fit on a grid. I wanted to know whether a model could learn both things together: the rule and the offset.",
    problem:
      "Rhythm generators quantize everything to the grid. In candombe that erases what matters most: the chico's microtiming, the articulation of each stroke and the shape of the llamada. A generic model also doesn't know that some things are non-negotiable, like the chico pattern.",
    solution:
      "A bidirectional masked Transformer over a sixteenth-note grid for the three drums. Each cell stores intensity, microtiming offset and articulation. The playing rules aren't applied afterward: they go in as fixed cells and allowed-class masks during decoding. A FastAPI API generates, fills in one drum over others held fixed, or redoes bars, and a web frontend plays the llamada and exports WAV and MIDI.",
    highlights: [
      'Per-cell representation: intensity (silence + 4 levels), microtiming in 13 bins and articulation per drum (hand, stick, wood, open, muffled).',
      'Iterative confidence-based decoding, with the playing rules as hard constraints rather than a post-hoc filter.',
      'Three core styles —Cuareim, Ansina and Gaboto— loaded from published transcriptions, with the source next to each pattern.',
      'Microtiming taken from published measurements (Jure and Rocamora, 2022) and llamada form with "subir la llamada".',
      '`POST /regenerate`: redoes specific bars or drums and keeps the rest fixed; the seed makes every result reproducible.',
      'Objective evaluation with `copy_rate` to detect whether the model memorizes bars from the corpus, plus a blind listening test flow.',
      'Frontend "parade of llamadas": ensemble size, panning per drummer, lookahead scheduling and WAV/MIDI export.',
    ],
    evidence: [
      '31 pytest tests covering representation, generation, training, audio analysis, styles and API.',
      'Importer for the UdelaR candombe dataset (Zenodo 6533068: 35 performances, ~2 h annotated by an expert).',
      'Analysis of my own recordings by stems or from a mix, with sample-level onset refinement.',
      'Separate deploys: static frontend on Netlify and API on Render, with a fallback to a rule-based engine if there is no checkpoint.',
    ],
    challenges: [
      "The first version didn't learn: the target was visible in the input. Moving to a masked Transformer, which only scores hidden cells, was the change that unblocked it.",
      "Candombe microtiming isn't noise. It had to be represented as its own class per cell instead of quantizing it and \"humanizing\" at the end.",
      'Separating drums from a mixed recording is a band-based heuristic: soft ghost notes get lost. With per-drum stems the problem goes away.',
    ],
    learnings: [
      'Domain rules work better as decoding constraints than as after-the-fact correction: the model generates within the valid space.',
      'Measuring the copy rate keeps you honest: a model that sounds good may be repeating the corpus.',
      'Citing the source of every pattern makes the system something you can discuss with musicians, not just engineers.',
    ],
    nextSteps: [
      'Train on the real dataset and my own multitrack recordings: the included checkpoint has only seen the synthetic corpus.',
      'Replace the synthesized strokes with a bank of recorded samples.',
    ],
  },

  sombrilleros: {
    title: 'Sombrilleros: Escape from Porto',
    tagline: 'Cross the beach without being sold an umbrella.',
    categoryLabel: 'Games',
    image: {
      alt: 'Start screen of Sombrilleros: Escape from Porto, with the 3D beach full of umbrellas and vendors, single-player, couple and story modes, and the three levels to the sea.',
    },
    audience: 'Anyone who has walked along a beach in Porto de Galinhas. Played in the browser, solo or as a couple.',
    role: 'Game design, logic, 3D, audio and deployment. Personal project.',
    originStory:
      'In Porto de Galinhas, getting from the hotel to the water is a negotiation: every few meters someone offers you an umbrella, a tour or "mas tem WiFi!". The situation already had game mechanics —distance, line of sight, fatigue— it just needed to be programmed.',
    problem:
      "Turning a travel anecdote into a game you understand in ten seconds and that stays fair: vendors who see you, remember you and chase you, without the difficulty depending on luck.",
    solution:
      'A 3D browser game built with Three.js and TypeScript. Three levels to the sea, the natural pools and boarding. Vendors have line of sight, suspicion and memory; the player has sprint and energy, and can hide behind cover. There is a single-player mode, local co-op for couples and a three-chapter story mode with the reais earned along the way.',
    highlights: [
      'Vendor AI with line of sight, cover that blocks their view, and suspicion and memory configurable by difficulty.',
      'Two versioned difficulty profiles ("sin emoción" and "con emoción") with separate high scores and measurement of the observed win rate.',
      'Local co-op: shared camera, a common wallet and a maximum distance between the two players.',
      "Three-chapter story mode that carries over the money earned and remembers the couple's names.",
      'Proximity voices with Web Audio: volume by distance, stereo panning relative to the camera and at most two voices at a time.',
      'Verbal defense by double tap ("Ya tenemos sombrilla, gracias") with a cooldown and a different effect per difficulty.',
      "Optional global arcade leaderboard; the game works just the same if the service doesn't respond.",
    ],
    evidence: [
      'Game published on GitHub Pages with automatic deploys via GitHub Actions.',
      "14 tests with Node's native runner covering the pure logic: vision, conversation, energy, difficulty, couple and story.",
      'Game logic lives in DOM-free modules (`core`, `difficulty`, `couple`, `story`, `verbal`), separate from the Three.js rendering.',
    ],
    challenges: [
      'Making losing feel fair: difficulty comes from explicit parameters (speed, vision radius, memory), not random events.',
      'In co-op, two players share one camera. The distance between them had to be capped, and we had to work out which vendor targets whom.',
      "Audio can't break the game: if Web Audio is missing or a clip fails to decode, the speech bubbles remain and the match goes on.",
    ],
    learnings: [
      'Splitting the logic into pure functions made it possible to test gameplay without opening a browser.',
      'Versioning the difficulty profiles makes high scores and win rates comparable across changes.',
      'A small game is a good test bench for agent AI, spatial audio and shared state.',
    ],
    nextSteps: [
      'Replace the provisional synthetic voices with real recordings.',
      "Tune mix and pacing with tests in players' browsers.",
    ],
    demoLabel: 'Play',
  },

  chordlocal: {
    tagline: 'What Chordify charges for, on your own computer and with no subscription.',
    categoryLabel: 'Music and AI',
    audience: 'Musicians who want to learn a song by ear with chords, lyrics and analysis, without paying for a subscription.',
    role: 'Analysis of the reference product, architecture, audio pipeline and local app. Personal project.',
    originStory:
      'I wanted to learn to play any song, and the tool that solved it, Chordify, charges for transposing, capo or MIDI export. Before paying, I did the reverse exercise: list what it does, what it charges for and what it really costs to build each piece.',
    problem:
      "Chord apps charge for features that, technically, are simple transformations over an analysis that's already been done. Only one thing is hard: detecting chords and meter correctly from the audio, on an ordinary machine with no GPU.",
    solution:
      'A Python pipeline that runs once per song: beats and meter with `beat_this`, chords with beat-synchronized chroma, harmonic templates and Viterbi, and notes with `basic-pitch`. Everything ends up in an `analysis.json`; transposing, capo, simplifying or exporting are derived from that file instantly. Then it looks up the transcription on LaCuerda and the lyrics on LRCLIB, and keeps the one that best matches the audio.',
    highlights: [
      'Separation between analysis (slow, once) and use (instant): `analysis.json` is the single source of truth.',
      'Custom chord recognizer: per-beat chroma, weighted templates and two-pass Viterbi decoding with a key prior.',
      'Source chosen by agreement with the audio, not by title similarity; it detects transcriptions written in another key.',
      'Synced sheet: player, current and next chord, lyrics that follow the audio, speed 0.5×–1.5× without changing pitch.',
      'Harmonic analysis: key, cycle in scale degrees, cadences, out-of-key chords and suggested capo.',
      'Output in HTML, ChordPro, MusicXML, MIDI and ASCII tablature.',
      "Respects `robots.txt` (LaCuerda's Crawl-delay) and doesn't disguise itself as a browser to get around a 403.",
    ],
    evidence: [
      'Analysis document of the reference product with a feature matrix, free/paid plan and difficulty of each one (`docs/analisis-chordify.md`).',
      '99.8% time-weighted exact chord accuracy in validation with synthetic G–Em–C–D audio.',
      'Against four human transcriptions, transition precision went from 0.44 to 0.74 between version 0.1 and 0.2.',
      'A 4-minute song is analyzed in ~80 s on a 2016 Intel MacBook Pro, without a GPU.',
      "REA analysis of Chordify's public pages: transposition and tempo are handled on the client, over data already shipped with the page.",
    ],
    challenges: [
      'The hardware defined the architecture: an Intel Mac without a GPU forces `torch==2.2.2` and Python 3.11, and means the analysis runs offline, not in real time.',
      'A triad with a weak fifth loses to the triad a third above (E → G#m). Raising the weight of the fifth in the templates was the highest-impact change.',
      'Online transcriptions come in another key, under another name or in a different version. Choosing by agreement with the audio solved most cases.',
    ],
    learnings: [
      "Six of the reference product's seven paid features are transformations over a JSON file. The value is in the analysis, not in the premium features.",
      "A well-calibrated classic recognizer can outperform a large model that can't be installed on the available machine.",
      'Measuring against human transcriptions changed the priorities: what mattered most was when the chord changes, not its exact name.',
    ],
    nextSteps: [
      'A-B loop, tuner and track separation with Demucs to play along.',
    ],
  },

  // ─────────────────────────────────────────────────────────────── Lab
  chefgpt: {
    tagline: 'Recipes from what you already have in the fridge, with a local model.',
    summary:
      'Web application that generates recipes from available ingredients, running the model locally with Ollama instead of depending on an external API. It includes its own documented design system, with palette, typography and AA accessibility criteria.',
    categoryLabel: 'Applied AI',
  },
  'datos-sensores': {
    title: 'Sensor Data',
    tagline: 'Two Spring Boot services for industrial monitoring.',
    summary:
      'Sensor readings API and a monitoring service for industrial waste collection, with storage swappable between SQL and MongoDB, an OpenAPI specification and a Postman collection. Includes service proposal documentation and a use-case simulation guide.',
    categoryLabel: 'Backend',
  },
  'automotora-fase-1': {
    title: 'Inventory management for a car dealership',
    tagline: 'A client engagement that turned out to be the origin of Patio.',
    summary:
      'First phase for a Uruguayan dealership: vehicle intake by purchase, sales records and real-time business metrics, with dual-currency USD/UYU formatting and days-in-stock calculation. The experience from this project led to the multi-tenant product that is now Patio. Private repository by agreement with the client.',
    categoryLabel: 'Clients',
  },
  'landing-estudio-creativo': {
    title: 'Landing page for a creative studio',
    tagline: 'Scroll-driven storytelling with WebGL, no framework.',
    summary:
      'Single-page experience with section-based storytelling, an animated WebGL background and transitions with GSAP and ScrollTrigger, built in vanilla JavaScript. An exercise in showing that visual impact does not require an SPA behind it. Private repository by agreement with the client.',
    categoryLabel: 'Clients',
  },
  'cursor-idp-mvp': {
    tagline: 'Exploring a minimal Internal Developer Platform.',
    summary:
      'Proof of concept of what an AI-assisted internal developer platform could look like: what it automates, what it exposes to developers and where the limits should be. Early exploration, without a full implementation.',
    categoryLabel: 'Platform',
  },
  'lacuerda-txt': {
    title: 'lacuerda to txt',
    tagline: "Download a band's songbook as text files.",
    summary:
      'A Python utility that downloads a band’s songs from lacuerda and saves them to a folder as plain text, so you can read and annotate them without depending on a connection. Solved in an afternoon, used many times.',
    categoryLabel: 'Music',
  },
  'wildfly-mdb': {
    tagline: 'Enterprise messaging proof of concept.',
    summary:
      "POC of Message Driven Beans on WildFly consuming queues against SQL Server. The kind of integration that holds up the enterprise systems almost nobody sees, and that you need to know how to debug when it fails.",
    categoryLabel: 'Enterprise',
  },
  'patrones-java': {
    title: 'Design patterns in Java',
    tagline: 'A systematic review of patterns, written to understand them.',
    summary:
      'Implementation of design patterns in Java along with tests of Spring annotations and configuration through environment variables. My own study material that later became a quick reference on real projects.',
    categoryLabel: 'Foundations',
  },
  ucubooks: {
    tagline: 'Library management system in Java.',
    summary:
      'Academic library management system project: domain modeling, persistence and separated layers. One of the first places where organizing the domain before coding stopped being advice and became obvious.',
    categoryLabel: 'Academic work',
  },
  'algoritmos-estructuras': {
    title: 'Algorithms and data structures',
    tagline: 'The foundation that keeps showing up fifteen years later.',
    summary:
      "Algorithms and data structures coursework in Java, including the AED II exam preparation project. Complexity, structures and analysis: exactly what you need the day a query takes eight seconds and you have to explain why.",
    categoryLabel: 'Academic work',
  },
  'data-science-python': {
    title: 'Statistics and data science',
    tagline: 'Probability, applied statistics and a final project in Python.',
    summary:
      'Probability and applied statistics coursework, plus a final project developed as a team. The quantitative groundwork that later lets you discuss product metrics without guessing.',
    categoryLabel: 'Academic work',
  },
  'recursos-educativos': {
    title: 'Interactive educational resources',
    tagline: 'Web teaching material on climate change and interactive learning.',
    summary:
      'Educational resources published as websites: interactive material on climate change and a teaching resource based on mandalas. Content and experience work more than technical complexity.',
    categoryLabel: 'Web',
  },
  'programacion-csharp': {
    title: 'Programming II in C#',
    tagline: 'Windows Forms, file handling and a Clash of Clans clone.',
    summary:
      'Object-oriented programming labs in C#: graphical interfaces with Windows Forms, file handling and a game simulation project. The starting point, in 2017.',
    categoryLabel: 'Academic work',
  },
};
