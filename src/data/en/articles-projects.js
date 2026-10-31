/** Artículos que nacen de proyectos y aprendizaje propio, en inglés. Ver src/data/en/articles.js. */

export const projectArticles = {
  'aws-cloud-practitioner-conceptos-fundamentales': {
    title: "What I'm learning while studying for AWS Cloud Practitioner",
    description: 'Cloud concepts that change engineering and business decisions: shared responsibility, elasticity, security, architecture and cost.',
    category: 'Cloud and architecture',
    readingTime: '7 min read',
    contextLabel: 'Ongoing professional learning',
    lead: "Studying for AWS Cloud Practitioner is putting order into concepts that show up in every product I build: where the provider's responsibility ends, how to design so things fail less, why cost is an architecture decision and what it means to run a system without managing the hardware. More than memorizing services, the value is in adopting a model for making better technical and business decisions.",
    architecture: {
      caption: 'The shared responsibility model in the cloud',
      description: 'AWS runs the physical infrastructure and the base services. The customer team defines identity, access, configuration, data, applications and operational controls depending on the service used.',
      layers: [
        { label: 'Business', items: ['Requirements and risk', 'Cost and compliance'] },
        { label: 'Application', items: ['Code and data', 'Configuration and secrets'] },
        { label: 'Shared controls', items: ['Identity and access', 'Monitoring and response'] },
        { label: 'AWS', items: ['Regions and hardware', 'Network and managed services'] },
      ],
    },
    sections: [
      {
        title: "The cloud doesn't eliminate responsibilities: it redistributes them",
        paragraphs: [
          'The concept that organizes everything else is the shared responsibility model. AWS takes care of security of the cloud: data centers, hardware, network and base services. The customer remains responsible for security in the cloud: identity, permissions, data, configuration, applications and correct use of the services.',
          "The boundary shifts depending on the service chosen. With a virtual machine, the team manages more layers than with a managed service. For a business owner, this means that buying cloud doesn't automatically transfer the risk; it changes which controls have to be designed, operated and audited.",
        ],
      },
      {
        title: 'Elasticity is a product capability',
        paragraphs: [
          "Elasticity lets you adjust resources as demand changes. It isn't just about withstanding a traffic spike: it lets you avoid paying for idle capacity while a product is still validating its market, and respond when a campaign, an integration or an event increases usage.",
          'The distinction between scalability and elasticity helps make more precise decisions. Scaling is increasing capacity; being elastic is adapting it. The architecture has to separate components, avoid state that is hard to move and use metrics that indicate when the system needs to react.',
        ],
      },
      {
        title: 'High availability means thinking about expected failures',
        paragraphs: [
          "An AWS region is made up of isolated availability zones. That design lets you build systems that don't depend on a single physical point of failure. The lesson isn't that every product has to be global from day one; it's that every availability requirement has a cost and an associated architecture.",
          "For an MVP, a simple solution can be the right one. For a payments flow, health or critical data, the conversation has to include recovery, backups, observability and availability targets. The cloud offers the building blocks to solve it; it doesn't decide for the team what level of risk is acceptable.",
        ],
      },
      {
        title: 'IAM and least privilege are part of the design',
        paragraphs: [
          'Identity and Access Management turns access into explicit policies: who can do what to which resource and under what conditions. The principle of least privilege reduces the impact of an exposed credential, a configuration error or an accidental action.',
          'In practice, this connects with decisions I already apply in multi-tenant products and payment platforms: never trust implicit permissions, separate responsibilities and leave a trail. A root account, static credentials in code or broad permissions are security debt, even if the system is still small.',
        ],
      },
      {
        title: 'FinOps starts in the architecture',
        paragraphs: [
          'Pay-as-you-go is an advantage when you understand what drives consumption and what can be turned off, reserved, automated or measured. Cloud cost is not just an infrastructure bill: it reflects decisions about compute, storage, data transfer, retention, availability and observability.',
          'That is why cost has to enter the design early. Tagging resources, setting budgets and alerts, choosing managed services when they reduce operational work and reviewing unused resources are practices that let engineering and business talk using the same data.',
        ],
      },
    ],
    takeaway: 'Cloud principle: on-demand infrastructure speeds up delivery, but the value shows up when security, availability and cost are designed as explicit product responsibilities.',
  },

  'web-corporativa-2026-impacto-rendimiento': {
    title: 'The corporate website in 2026: designing impact without sacrificing performance or control',
    description: 'Architecture for high-impact corporate experiences: scroll-driven storytelling, progressive WebGL, purposeful animation and a maintainable foundation.',
    category: 'Web experiences',
    readingTime: '7 min read',
    contextLabel: 'Pambú 2026',
    sourceLabel: 'View the Pambú 2026 repository',
    lead: "A corporate website no longer competes only on telling people what a company does. It competes on communicating judgment, differentiating an offer and steering a sales conversation. The technical challenge is creating a memorable experience without turning the page into a fragile, slow SPA that's hard to evolve. Pambú 2026 was built from that balance.",
    architecture: {
      caption: 'Architecture of a scroll-driven corporate experience',
      description: 'A semantic HTML layer organizes the commercial content. CSS defines the visual identity and vanilla JavaScript coordinates a Three.js WebGL layer and GSAP transitions triggered by scrolling.',
      layers: [
        { label: 'Business narrative', items: ['Value proposition', 'Services and contact'] },
        { label: 'Semantic base', items: ['HTML5 by section', 'Navigation and content'] },
        { label: 'Visual experience', items: ['CSS3', 'Identity and responsive'] },
        { label: 'Motion and depth', items: ['GSAP + ScrollTrigger', 'Three.js + WebGL'] },
      ],
    },
    sections: [
      {
        title: 'A corporate website is a communication system',
        paragraphs: [
          "A visit to a company site is short. In that time, the person needs to understand what the organization does, why they should pay attention and what the next step is. The information architecture can't be a list of interchangeable sections: it needs a narrative that orders value proposition, approach, identity, services and contact.",
          'In Pambú 2026, the structure is organized as a one-page experience with section navigation. Scrolling stops being just a way to move around and becomes the rhythm of the presentation. For the business, this lets you guide the message; for engineering, it keeps a direct, understandable content model.',
        ],
      },
      {
        title: 'WebGL should reinforce the message, not hide it',
        paragraphs: [
          "The animated WebGL and Three.js background adds depth and motion to an offer centered on creativity, technology and innovation. But the visual component can't carry the meaning of the page. Commercial content, navigation and contact must remain available as semantic, readable HTML without depending on the graphics layer.",
          'This separation is a resilience control. The rich experience can evolve, degrade acceptably on limited hardware or fail without blocking the message. Visual impact is a progressive enhancement layer, not a condition for the site to work.',
        ],
      },
      {
        title: 'Animation with intent and a performance budget',
        paragraphs: [
          "GSAP and ScrollTrigger let you sync transitions with the reading of each section. Using them well doesn't mean animating everything: it means directing attention to a change of context, a visual hierarchy or a call to action. Each animation has to justify what understanding or conversion it improves.",
          "On a high-impact page, performance is part of the brand. The team has to treat asset weight, rendering work and execution on lower-end devices as design constraints. Choosing vanilla JavaScript for the interaction layer shrinks the runtime surface and helps keep the experience focused.",
        ],
      },
      {
        title: 'A simple foundation makes evolution easier',
        paragraphs: [
          "Pambú 2026 is built with HTML5, CSS3 and vanilla JavaScript, with Three.js and GSAP loaded from a CDN. This decision doesn't deny the value of a framework; it responds to a case where the page is a bounded editorial experience, not an application with complex business state.",
          'The consequence is operational: fewer layers to deploy, inspect and modify. The team can focus its effort on narrative, content, performance and visual quality. If the product later needs a CMS, personalization or transactional features, the architecture can grow on a proven need, not a hypothesis.',
        ],
      },
    ],
    takeaway: "Corporate experience principle: high impact comes from narrative, visual identity and performance working as a system. Technology should intensify the message, not become the message.",
  },

  'milo-care-onboarding-calendario-clinico': {
    title: 'Clinical onboarding: how to keep a health product from starting empty',
    description: "Milo Care's onboarding architecture: rules by country, a preloaded vaccination schedule and a first session with operational value.",
    category: 'Product and architecture',
    readingTime: '6 min read',
    lead: 'Milo Care was born from an information management problem: vaccines, medication and checkups spread across a photo, a chat, a note and memory. The first product decision was to avoid shifting that work onto the user. Useful onboarding does not ask for data to fill a database: it turns minimal data into an actionable care plan.',
    architecture: {
      caption: 'Onboarding assisted by clinical and country rules',
      description: "The person records the dog's basic details and their country. Milo Care applies schedule rules based on veterinary sources, creates initial events and delivers a medical history ready for follow-up.",
      layers: [
        { label: 'Input', items: ['Caregiver profile', 'Dog details and country'] },
        { label: 'Domain rules', items: ['SENASA and WSAVA', 'Schedule by AR/UY'] },
        { label: 'Medical history', items: ['Vaccines and due dates', 'Medications and appointments'] },
        { label: 'Experience', items: ['Useful dashboard', 'Next actions'] },
      ],
    },
    sections: [
      {
        title: 'The empty state is an activation problem',
        paragraphs: [
          "A medical record that opens empty asks the user to reconstruct months or years of information before getting anything in return. For a care product, that upfront cost competes directly with the paper, the chat or the note they already use. It isn't a UX detail: it's an activation and retention problem.",
          "In Milo Care, registering the dog captures the country and the details needed to start a vaccination schedule. The expected result isn't a more complete record; it's a first session that already shows next actions, dates and a history you can work with.",
        ],
      },
      {
        title: 'Turning clinical guidelines into domain rules',
        paragraphs: [
          "The schedule couldn't be a generic list of vaccines. Recommendations change by country, source and clinical context. The solution was to model business rules that distinguish the Argentine and Uruguayan schedules, with SENASA and the WSAVA guidelines as references, without presenting the platform as a substitute for a vet's instructions.",
          'That boundary is part of the domain architecture. The system can organize, remind and display the plan; clinical evaluation and professional decisions stay outside the automation. Separating both responsibilities keeps a software recommendation from being presented as a diagnosis.',
        ],
      },
      {
        title: 'A model ready for the full cycle',
        paragraphs: [
          'The initial schedule integrates with modules for vaccines, medications, appointments and symptoms. Each module handles its own status and due dates, but feeds a single history per animal. That consolidation lets the dashboard prioritize pending work and lets reminders operate on structured data.',
          'For the business, the decision has a clear effect: the product delivers value before asking for complex habits. For engineering, it leaves an extensible domain for new species, veterinary clinics and premium plans without turning onboarding into a collection of exceptions.',
        ],
      },
    ],
    takeaway: 'Product principle: onboarding should turn minimal information into a valuable first action. In health domains, automated rules organize follow-up, but they do not replace professional judgment.',
  },

  'milo-care-recordatorios-confiables': {
    title: 'Reliable reminders: designing notifications as a product responsibility',
    description: "How Milo Care models due dates and scheduled jobs so notifications help with care without eroding the user's trust.",
    category: 'Operations and reliability',
    readingTime: '5 min read',
    lead: 'A vaccine or medication reminder seems like a small feature until it arrives late, arrives twice or arrives for a treatment that has already changed. In a care product, every notification is an operational promise. Milo Care treats that promise as part of the domain, not as an email sent at the end of a flow.',
    architecture: {
      caption: 'Reminder pipeline based on due dates',
      description: 'The clinical modules record events and dates. A scheduled job identifies applicable reminders, applies sending rules and delivers the email through Resend. The history preserves the context for the caregiver.',
      layers: [
        { label: 'Clinical domain', items: ['Vaccines and medication', 'Appointments and symptoms'] },
        { label: 'Scheduling', items: ['Due dates', 'Reminder rules'] },
        { label: 'Execution', items: ['node-cron', 'Conservative jobs'] },
        { label: 'Delivery', items: ['Resend', 'Email to the caregiver'] },
      ],
    },
    sections: [
      {
        title: 'A wrong notification is trust debt',
        paragraphs: [
          "On transactional platforms, a wrong notification can generate a ticket. On a platform tied to an animal's care, it can lead the user to ignore the next message. That's why the quality of a reminder isn't measured only by email delivery: it depends on the date, the status and the clinical context being correct.",
          'Milo Care starts from structured events —vaccines, medications and appointments— with their own due-date logic. The reminder is derived from that state, not from an isolated list of pending emails. That way, the system preserves the link between the message and the information that justifies it.',
        ],
      },
      {
        title: 'Scheduled jobs with explicit rules',
        paragraphs: [
          "Execution uses node-cron to go through the due dates and Resend for delivery. The technical component is simple; the operational design isn't. The rules have to define when an event is eligible, when it stops being so and what should happen when the user modifies or completes a task.",
          'The strategy is conservative: with a reminder, sending too much or too late degrades the product just as fast as not sending at all. Scheduling should favor visible, auditable conditions over opaque automation that maximizes email volume.',
        ],
      },
      {
        title: 'Operations start before sending',
        paragraphs: [
          "A notification pipeline needs observability over runs, eligible events and deliveries. Although the MVP doesn't need a complex messaging platform, it does need the team to be able to answer basic questions: which task produced the email, when it was evaluated and why it was sent.",
          'This foundation lets the product evolve without rewriting it: channel preferences, time windows, engagement metrics and premium rules can be added on top of the same due-date model. Extensibility comes from the domain, not from anticipating unnecessary infrastructure.',
        ],
      },
    ],
    takeaway: 'Reliability principle: a notification is part of the product experience. It must be derived from a correct domain state, run on explicit rules and be explainable when the user asks why they got it.',
  },

  'webhooks-pagos-maquinas-de-estado': {
    title: "Payment architecture: why a charge isn't an HTTP call",
    description: 'Integration patterns, idempotency and traceability for modeling payments as auditable business processes.',
    category: 'Payments and infrastructure',
    readingTime: '6 min read',
    lead: 'Experience in banking and fintech leaves an operational rule: creating a link does not complete a charge. A provider responds asynchronously, retries notifications and may deliver partial information. In MiCuota, that reality translated into a state model, idempotency controls and an auditable ledger.',
    architecture: {
      caption: 'Processing a charge operation',
      description: 'The provider starts a charge in MiCuota. The platform records the operation and delegates execution to a payment provider. Webhooks update the ledger through validated, idempotent transitions.',
      layers: [
        { label: 'Channels', items: ['Provider back office', 'Payment page'] },
        { label: 'MiCuota domain', items: ['Charge operation', 'State machine'] },
        { label: 'Integration', items: ['PaymentProviderGateway', 'Validated webhooks'] },
        { label: 'Traceability', items: ['payment_events', 'Reconciliation and support'] },
      ],
    },
    sections: [
      {
        title: 'A charge is an asynchronous process',
        paragraphs: [
          "For someone collecting a fee, the flow looks linear: share a link, the person pays and the money shows up. On the system side, though, the provider may notify a few seconds later, notify again if it didn't get a response, or send a notification with less data than you expected. It's a well-known reality in payments, but it becomes very concrete when the business depends on knowing for sure who paid and who didn't.",
          "In MiCuota I decided to treat every charge as a state machine. The operation is created, sent, receives updates and changes state with a source and a date. The provider takes part in that story, but doesn't write all of it. The application needs its own reliable version of the facts.",
        ],
      },
      {
        title: 'Idempotency as a business control',
        paragraphs: [
          "The problem with a repeated webhook isn't elegant or academic. It can be a duplicate subscription, a person charged twice or a seller who loses trust in the tool. That's why processing a notification twice must produce exactly the same result as processing it once.",
          'That requires identifying the notification, validating whether the transition makes sense and querying the provider again when the notice arrives incomplete. The external reference plays a humble but crucial role: it lets you go from a partial signal back to the exact operation that produced it.',
        ],
      },
      {
        title: 'An event ledger for support and reconciliation',
        paragraphs: [
          "Logs are indispensable for understanding what a service did. But when someone asks why a payment didn't go through, they need a business answer, not an excursion through five observability dashboards. That's why I stored the charge creation, the link being sent, every webhook and every transition in a ledger.",
          'You feel the difference at the first incident. Instead of reconstructing a probable version of what happened, you can read the timeline of the operation. And that same history, which serves support today, enables reconciliation, recovery and delinquency reports tomorrow.',
        ],
      },
    ],
    takeaway: 'Operational principle: a reliable payment requires valid transitions, idempotent processing and traceability that lets you explain every state without depending on scattered logs.',
  },

  'multi-tenancy-rls-frontera-datos': {
    title: "Secure multi-tenancy: data isolation can't depend on a WHERE clause",
    description: "How to combine identity, RBAC and Row Level Security to protect each organization's data by design.",
    category: 'Architecture and security',
    readingTime: '5 min read',
    lead: "Patio manages vehicles, margins, documents, reservations and opportunities for multiple dealerships. In that context, a missing filter isn't an interface defect: it's an isolation incident. The architecture combines authenticated context, RBAC and RLS policies in PostgreSQL so that a wrong query can't cross an organization's boundary.",
    architecture: {
      caption: 'Defense in depth for multi-tenancy',
      description: 'The authenticated identity resolves the organization and the role. The application applies business permissions and the database restricts the available rows through Row Level Security.',
      layers: [
        { label: 'Identity', items: ['Authenticated user', 'Organization and role'] },
        { label: 'Application', items: ['RBAC by role', 'Permissions by branch'] },
        { label: 'Transaction', items: ['Tenant context', 'Least-privilege access'] },
        { label: 'PostgreSQL', items: ['Row Level Security', 'Rows isolated per organization'] },
      ],
    },
    sections: [
      {
        title: 'The risk of delegating isolation to the application',
        paragraphs: [
          "A dealership stores data that matters: the real cost of a unit, its documents, a customer's reservation and the margin on a sale. In a product shared by several organizations, that data must always be kept apart, even when the team adds a report, an admin query or a new relationship.",
          "Trusting that separation to every endpoint remembering to add organization_id seems reasonable until it isn't. It doesn't take bad intent; a query written in a hurry is enough. The defect isn't human: it's architectural, because it lets an oversight have consequences that are far too big.",
        ],
      },
      {
        title: 'Row Level Security as a data control',
        paragraphs: [
          "That's why Patio uses PostgreSQL Row Level Security. The database policies express which rows an organization can read or modify, while the application keeps responsibility for authenticating people and managing their roles. One layer doesn't replace the other: they work together.",
          'RBAC answers what someone can do within their dealership. RLS answers a prior question: whether that row even belongs to their dealership. It is defense in depth applied to an everyday risk.',
        ],
      },
      {
        title: 'Organization context and least privilege',
        paragraphs: [
          "The important decision isn't just turning on a policy; it's keeping the tenant from traveling as an optional parameter throughout the application. The context is derived from the authenticated identity and set for the transaction before touching the data. That way, a query that forgot the filter still hits a barrier.",
          "Support exceptions exist, but they must be explicit, audited and minimal. An invisible exception isn't flexibility: it's a door nobody is watching.",
        ],
      },
    ],
    takeaway: 'Architecture principle: multi-tenant isolation must be verifiable at every layer and, above all, stay active when the application code makes a mistake.',
  },

  'ia-especificacion-antes-codigo': {
    title: 'AI-assisted work: the specification is the control system for ambiguity',
    description: 'How a sequence of product artifacts turns an idea into operational context for teams and coding agents.',
    category: 'AI and product',
    readingTime: '6 min read',
    lead: "Agents reduce implementation time, but they don't resolve incomplete product decisions. In fact, they turn an ambiguous instruction into more wrong code, in less time. WebSpec AI formalizes the context before building: it defines scope, users, constraints and backlog as a traceable chain of artifacts.",
    architecture: {
      caption: 'Context chain for AI-assisted development',
      description: 'The initial idea is turned into linked product artifacts. Teams and agents consume the up-to-date specification instead of working from an isolated instruction.',
      layers: [
        { label: 'Discovery', items: ['Idea', 'Brief and users'] },
        { label: 'Product', items: ['PRD', 'Metrics and scope'] },
        { label: 'Technical design', items: ['RFC', 'UX/UI and backlog'] },
        { label: 'Execution', items: ['Versioned specs', 'Team and coding agents'] },
      ],
    },
    sections: [
      {
        title: 'Ambiguity as product debt',
        paragraphs: [
          "Working on my own products and with clients, I've seen again and again that delays almost never start when someone opens the editor. They start earlier: in an idea that still doesn't define who it serves, what's out of scope or how we'll know it worked.",
          "Before agents, that ambiguity turned into meetings, interpretations and slow corrections. Now it can turn into screens, APIs and tests generated in minutes. Speed doesn't remove the cost of a missing decision; it just makes the waste arrive sooner.",
        ],
      },
      {
        title: 'Chained specifications as operational context',
        paragraphs: [
          'WebSpec AI was born to organize that earlier moment. Instead of jumping from a vague sentence to code, it guides you through brief, PRD, RFC, UX/UI, backlog and specifications. Each document builds on the decisions of the previous one and makes visible the ones still missing.',
          "The value isn't in producing a tidy PDF. It's in asking the right question at the right time: who the user is, what problem we're trying to solve, which constraint is non-negotiable, which metric would justify continuing. A clear answer to any of them saves more than a brilliant prompt.",
        ],
      },
      {
        title: 'Traceability to manage change',
        paragraphs: [
          "A specification isn't a promise that nothing will change. It's the record of why a decision was made, so that change has context when it inevitably comes. If the PRD moves, the backlog and the specs that depend on it need to find out.",
          'That traceability is especially important with AI. It lets an agent build on the current version of the product, and it lets the team discuss a decision before turning it into hundreds of lines that are hard to unlearn.',
        ],
      },
    ],
    takeaway: 'Delivery principle: AI amplifies the quality of the available context. A traceable specification reduces rework, improves decisions and avoids automating ambiguity.',
  },

  'agentes-ia-salidas-verificables': {
    title: 'AI for compliance: an answer without evidence is an operational risk',
    description: 'Designing verifiable agents for privacy: traceable evidence, explicit uncertainty and human review.',
    category: 'AI and compliance',
    readingTime: '5 min read',
    lead: 'In privacy and regulation, a plausible but unverifiable output can lead to a wrong decision with legal and reputational impact. Compliance UY uses AI to speed up the technical survey, not to simulate certainty: every finding is tied to evidence, a risk level, remediation and the point where human review must step in.',
    architecture: {
      caption: 'Verifiable technical analysis flow',
      description: 'The tool inspects the repository, identifies data and provider signals and produces findings with evidence. Human review validates the conclusions before any compliance decision.',
      layers: [
        { label: 'Repository', items: ['Code and configuration', 'Dependencies and services'] },
        { label: 'Analysis', items: ['Data detection', 'Provider mapping'] },
        { label: 'Evidence', items: ['file:line', 'Risk and remediation'] },
        { label: 'Decision', items: ['Technical review', 'Legal validation'] },
      ],
    },
    sections: [
      {
        title: 'Technical detection: signals, not conclusions',
        paragraphs: [
          "A repository can reveal email, phone, address, payment or health fields. That's a valuable signal, but it isn't enough to know the purpose of the processing, who accesses that information or what legal basis supports it. A column name doesn't tell the whole story.",
          "That's where the healthy limit of an agent shows up. It can scan, flag, gather context and raise questions that would otherwise stay hidden. What it shouldn't do is turn an inference into a definitive conclusion just because it sounds well written.",
        ],
      },
      {
        title: 'Traceable evidence for cross-functional review',
        paragraphs: [
          "In Compliance UY, a finding doesn't arrive with just a label. It comes with file:line evidence, status, risk level and a suggested remediation. When certainty is missing, it's flagged to be checked against the official source instead of filling the gap with a probable answer.",
          'That changes the conversation. Engineering, legal and security can look at the same evidence, discuss the same case and decide what to do next. The report stops being a black box and becomes a reviewable piece of work.',
        ],
      },
      {
        title: 'Explicit limits and output governance',
        paragraphs: [
          "The tool states that it produces technical assessments and drafts, not legal advice. Saying so doesn't reduce its usefulness; it makes it more honest about the role it can play and the one that needs an accountable person.",
          "Citing sources, separating jurisdictions and asking for confirmation when context is insufficient aren't wording details. They're product decisions. A trustworthy AI doesn't pretend to know everything: it helps the user know what to review.",
        ],
      },
    ],
    takeaway: 'Governance principle: in regulated domains, AI should improve the quality and speed of review, not hide the evidence or replace professional accountability.',
  },

  'infraestructura-proporcionada-problema': {
    title: "Proportional architecture: don't build an e-commerce store to solve a house move",
    description: 'How to choose a static, maintainable solution focused on the real flow instead of oversizing an MVP.',
    category: 'Infrastructure and product',
    readingTime: '4 min read',
    lead: "Casa Médanos solved a need that was bounded in time: publishing, sharing and keeping up to date an inventory of furniture and appliances before a move. The architecture criterion was operational: eliminate manual work and maintenance cost, not anticipate the capabilities of an e-commerce platform the case didn't need.",
    architecture: {
      caption: 'A static solution with focused automation',
      description: 'Visitors browse a catalog published on GitHub Pages. A panel updates availability and an n8n workflow helps with repetitive questions without introducing a transactional backend.',
      layers: [
        { label: 'Acquisition', items: ['Social media', 'Shareable link'] },
        { label: 'Web experience', items: ['Catalog and search', 'Filters and prices'] },
        { label: 'Publishing', items: ['Static site', 'GitHub Pages'] },
        { label: 'Operations', items: ['Availability', 'n8n automation'] },
      ],
    },
    sections: [
      {
        title: "The problem's lifespan defines the solution",
        paragraphs: [
          'The technical temptation was familiar: accounts, payments, cart, backend, inventory. But the problem had a concrete date. With every week that went by, publishing the catalog mattered more than designing a platform capable of surviving ten years.',
          'That constraint shaped the decision. Casa Médanos became a fast, shareable catalog: photos, visible prices, filters by room, search and a clear status for what was sold. A single link replaced an absurd number of repeated messages.',
        ],
      },
      {
        title: 'Static architecture with product value',
        paragraphs: [
          "Choosing a static site on GitHub Pages wasn't cutting features for sport. It took servers to monitor, databases to back up and costs that didn't help sell a couch out of the picture. For someone arriving from social media, a page that loads fast also does more than a sophisticated architecture.",
          'Complexity stayed where the real work was: updating availability, finding an item and showing that something had already sold without making it disappear. The technology followed the flow, not the other way around.',
        ],
      },
      {
        title: 'Focused automation and operating cost',
        paragraphs: [
          'The repeated questions justified a targeted automation. An n8n flow, versioned alongside the code, helps answer them without inventing a messaging app or turning a temporary sale into a permanent operation.',
          "Since then I've used a simple test: if a piece of infrastructure doesn't reduce a repetitive task, a real risk or a current cost, it doesn't belong in the MVP yet. It can come later. Today it's just a distraction.",
        ],
      },
    ],
    takeaway: 'Architecture principle: the solution should match the lifespan, risk and volume of the current problem. Every extra capability also adds operating cost.',
  },

  'emprender-desde-problemas-observados': {
    title: "From observed problem to MVP: designing products around the user's real work",
    description: 'EscalaImprov shows how a concrete friction can turn into a hypothesis, distinct flows and reusable capabilities.',
    category: 'Startups and entrepreneurship',
    readingTime: '5 min read',
    lead: 'EscalaImprov started with an observable need: turning music theory into immediate decisions during a jam session. The case illustrates a product practice that applies to any business: start from a concrete friction, validate it as a pattern and design different flows for the jobs the user actually needs to get done.',
    architecture: {
      caption: 'Music theory engine with flows by context of use',
      description: 'A shared scale engine powers two experiences. Study prioritizes understanding and feedback; Jam prioritizes quick decisions, keyboard navigation and rhythmic backing.',
      layers: [
        { label: 'Domain engine', items: ['Scales and keys', 'Harmony and intervals'] },
        { label: 'Study mode', items: ['Trainer', 'Visualization and feedback'] },
        { label: 'Jam mode', items: ['Resting notes', 'Guide and BPM click'] },
        { label: 'Interaction', items: ['Web Audio', 'SVG and keyboard'] },
      ],
    },
    sections: [
      {
        title: 'An observed friction as the initial hypothesis',
        paragraphs: [
          "Having a problem yourself doesn't automatically make it a market opportunity. What it does give you is a head start: you know the exact moment the frustration shows up, the shortcuts you try and the words people use to explain it.",
          'In this case, an encyclopedia of music theory wasn\'t needed. What was needed was instant feedback while practicing and a short guide while playing. That difference between "learning about something" and "needing to do something" ended up defining the product.',
        ],
      },
      {
        title: 'From individual experience to a testable pattern',
        paragraphs: [
          "Your own experience is the start of the research, not a substitute for it. Then you have to ask who else lives with that friction, when it shows up, what alternative they use and what price they pay for not solving it. That's where an interesting story separates from a problem that deserves a product.",
          "For EscalaImprov, that observation led to separating two moments that seemed the same: Study, to understand scales, chords and intervals; and Jam, to play with a short guide, resting notes and a click. It wasn't an aesthetic decision: they were two different jobs.",
        ],
      },
      {
        title: 'Reusable capabilities as a product asset',
        paragraphs: [
          "Building something of your own doesn't just leave a published application behind. It leaves a way of looking at the next problem. In this case, designing a study tool forced me to really understand the circle of fifths, instant feedback and why playing with a mouse is awkward.",
          "The same pattern repeats across very different domains. MiCuota left a foundation for auditable payments; Patio, multi-tenancy decisions; WebSpec AI, a flow for specifying. The most interesting asset isn't always the product: sometimes it's the reusable capability left behind.",
        ],
      },
    ],
    takeaway: "Product principle: your own experience doesn't replace validation, but it produces better initial hypotheses and helps separate features from the user's real jobs.",
  },
};
