/**
 * Newsletter en inglés: la página pública y el archivo. Las ediciones se envían en
 * español; acá se traduce lo que se publica en la web. `welcomeEmails` y los campos
 * de distribución no se renderizan, por eso no tienen traducción.
 */

export const newsletter = {
  base: {
    title: 'Notes from the front line',
    fullTitle: 'Notes from the front line: tech leadership in LATAM',
    description:
      'A personal newsletter about technical leadership, architecture decisions, product, applied AI and real lessons from building in Latin America. Issues are sent in Spanish; the archive is translated here.',
    promise:
      'Every issue has a practical idea, a real experience and a concrete question to think more clearly about how we build technology, products, teams and businesses.',
    cadence: 'One main issue every two weeks, with short notes whenever a lesson is worth sharing quickly.',
    statusNote:
      'The public page, the archive and the editorial sequence are already defined. Real subscriptions are connected to a secure Worker with consent, and the first welcome flow is ready to activate when sending starts.',
    primaryAudiences: [
      'Engineering Managers and Tech Leads',
      'CTOs and technology leaders',
      'Founders and product builders',
      'Platform, cloud, fintech and applied AI teams',
    ],
    pillars: [
      {
        slug: 'liderazgo-tecnico-humano',
        title: 'Technical and human leadership',
        description: 'Autonomy, growing Tech Leads, difficult conversations, engineering metrics and sustainable teams.',
      },
      {
        slug: 'ingenieria-plataformas',
        title: 'Engineering and platforms',
        description: 'Architecture, APIs, platform engineering, observability, security and decisions with real operational impact.',
      },
      {
        slug: 'ia-aplicada',
        title: 'Applied AI',
        description: 'Spec-driven development, agents, MCP, automation and the practical limits of AI in software teams.',
      },
      {
        slug: 'productos-emprendimientos',
        title: 'Products and ventures',
        description: 'Discovery, MVPs, hypotheses, pricing, learning in public and how to decide what is worth building.',
      },
      {
        slug: 'fintech-pagos-negocios',
        title: 'Fintech, payments and business',
        description: 'Subscriptions, webhooks, financial APIs, security, compliance and the trade-offs of the regional ecosystem.',
      },
      {
        slug: 'tecnologia-vida',
        title: 'Technology and life',
        description: 'Music, pets, creativity and personal experiences that turn into useful lessons for building better.',
      },
    ],
    launchCta: {
      label: 'Send me the first issue',
    },
    welcomeSequence: [
      {
        step: 'Email 1',
        title: 'Welcome',
        goal: "Explain the editorial promise and ask for a simple reply about the subscriber's main interest.",
        summary:
          'A short introduction, what kind of ideas they will receive, the expected cadence and a question to tag their initial interest: leadership, architecture, AI, product or payments.',
        cta: 'Reply with the topic that matters most to them today.',
      },
      {
        step: 'Email 2',
        title: 'Story and purpose',
        goal: 'Connect background, judgment and curiosity without sounding like a corporate bio.',
        summary:
          'How banking, fintech, leadership, my own products and applied AI come together in a single professional practice: translating real problems into sustainable decisions.',
        cta: "Reply with the hardest problem their team still can't explain well.",
      },
      {
        step: 'Email 3',
        title: 'Best content',
        goal: "Offer three ways in based on the reader's stated interest.",
        summary:
          'A selection of articles and cases by topic: leadership, platform, applied AI, product or payments. Each link explains why it is worth opening.',
        cta: 'Choose a topic to explore in upcoming issues.',
      },
      {
        step: 'Email 4',
        title: 'Projects as evidence',
        goal: 'Show real projects as a source of learning, not as advertising.',
        summary:
          "A short presentation of Milo Care, MiCuota.online, WebspecAI and Pambú Tech, with a question about which of the reader's hypotheses or products deserves a conversation.",
        cta: 'Share feedback or ask for context about one of the projects.',
      },
      {
        step: 'Email 5',
        title: 'Conversation',
        goal: 'Open a direct relationship and classify the kind of conversation that could come out of it.',
        summary:
          'An explicit invitation to reply if their interest is leadership, architecture, product, collaboration, press, events, investment or a professional opportunity.',
        cta: 'Reply with the kind of conversation they want to start.',
      },
    ],
  },

  issues: {
    'lo-dificil-de-un-webhook-no-es-recibirlo': {
      edition: 'Issue 001',
      title: "The hard part of a webhook isn't receiving it",
      format: 'Technical case',
      objective: 'Authority and conversation',
      audiencePrimary: 'CTOs, Tech Leads and fintech teams',
      audienceSecondary: 'Founders designing billing or integrations',
      articleTitle: 'Payment webhooks and auditable state machines',
      idea:
        "A payment integration breaks less often because it fails to receive events than because it doesn't know what to do with duplicated, out-of-order or ambiguous ones.",
      excerpt:
        "A webhook isn't a friendly notification: it's an operational edge where a payment system either stays consistent or starts losing trust.",
      metaDescription:
        "A note on webhooks, payments and operational consistency: why the real problem isn't receiving events but governing states, idempotency and auditing.",
      opening: [
        'There is a scene that repeats itself in many teams: the webhook arrives, returns 200, and someone breathes easy as if the hard part were over.',
        "In payments, that moment is only the beginning. The event can arrive duplicated, out of order or with partial information. If the system can't read it within an explicit state machine, the cost doesn't show up as an elegant technical error: it shows up as a questionable charge, a wrong notification or a manual reconciliation at the end of the day.",
      ],
      sections: [
        {
          title: 'Where it really breaks',
          paragraphs: [
            'The problem isn\'t receiving JSON. The problem is translating an external signal into a valid transition within your model. If the provider says "paid" and you don\'t distinguish between authorized, captured, reconciled or reversed, the integration becomes optimistic where it should be strict.',
            "At MiCuota.online this matters because the user isn't admiring the code. They're waiting to know whether their fee was recorded, whether the collection succeeded and whether they can trust the system not to duplicate an action because of a late retry.",
          ],
        },
        {
          title: 'The decision that limits the damage',
          paragraphs: [
            'The useful decision is to treat the webhook as input to an auditable state machine. Each event is recorded, validated against the current state and only then produces effects: marking a payment, sending a notification or updating a view for the user.',
            'That forces you to model idempotency, correlation and traceability. It also forces you to accept that some events must stay in quarantine until there is enough context. Not everything gets resolved "inline", and not every error should be hidden behind a blind retry.',
          ],
        },
        {
          title: 'What you can apply tomorrow',
          paragraphs: [
            'If your integration today mixes event intake, business rules and notifications in the same block, you are probably paying operational debt disguised as speed.',
            "Separating ingestion, validation and effects doesn't make the system slower: it makes it clearer who decided what, with what evidence and on which state.",
          ],
        },
      ],
      practicalTool: {
        title: 'Minimum checklist to review a payment webhook',
        items: [
          'Is there an explicit state machine for the payment domain?',
          'Does each event have an idempotency key or a robust way to deduplicate?',
          'Are invalid transitions logged and visible for review?',
          'Do notifications go out after the state is confirmed, not before?',
          'Is there enough traceability to get from the event back to the affected operation?',
        ],
      },
      ecosystem: {
        articleLabel: 'Go to the full technical article',
        projectLabel: 'See the MiCuota.online case',
      },
      cta: {
        label: 'Reply on this topic',
      },
      finalQuestion:
        'What is the most delicate state transition in your system, and why does it still depend more on luck than on design?',
      signature: 'Julián\nEngineering Manager, product builder and founder of Pambú Tech\njuliancardozo.github.io · LinkedIn',
      ps:
        "If you're designing subscriptions, billing or reconciliation for Latin America, tell me where the most fragile part of the operation shows up.",
      segment: ['Fintech', 'Payments', 'Architecture'],
    },
    'especificar-antes-de-construir-tambien-es-liderazgo': {
      edition: 'Issue 002',
      title: 'Specifying before building is leadership too',
      format: 'Note from the front line',
      objective: 'Authority and conversation',
      audiencePrimary: 'Engineering Managers, Tech Leads and Product Leaders',
      audienceSecondary: 'Founders who need to align idea, scope and execution',
      articleTitle: 'AI adds more value in the specification than in the code',
      idea:
        "Specifying well doesn't slow a team down: it keeps early speed from being paid for later in incompatible interpretations, rework and technical decisions without context.",
      excerpt:
        "When an idea is still blurry, racing straight into code tends to look like progress. Often it's just an expensive way of postponing the conversation that was missing.",
      metaDescription:
        'An issue on technical leadership, specification and applied AI: why writing better before building reduces rework and improves product and engineering decisions.',
      opening: [
        'One of the most expensive phrases in a product and engineering team is: "we get it, let\'s start".',
        "Not because it's always wrong, but because it often shows up right before each person fills in the gaps with their own mental model. Product imagines one experience, design another, backend a third, and the real conversation only happens once the code exists and changing it costs reputation, time and focus.",
      ],
      sections: [
        {
          title: 'Why this is leadership too',
          paragraphs: [
            "Specifying isn't a paperwork step. It's a leadership intervention: organizing context, exposing assumptions, making trade-offs visible and giving the team a shared basis for deciding.",
            'When that basis doesn\'t exist, the problem isn\'t only technical. It becomes political too. Nobody wants to stop an initiative that "has already started", even if everyone suspects it\'s being built on different interpretations.',
          ],
        },
        {
          title: 'Where AI does help',
          paragraphs: [
            'I find AI more useful before the code than during the code when the idea is still unstable. It helps structure PRDs, RFCs, user stories and uncomfortable questions that a busy team tends to push off until later.',
            "That doesn't replace judgment. Quite the opposite: it forces you to review more carefully what each document is saying, what was assumed and what isn't yet worth automating. WebspecAI was born from exactly that need: compressing the time between a fuzzy hypothesis and a specification that lets you work with less noise.",
          ],
        },
        {
          title: 'What changes in practice',
          paragraphs: [
            'A team doesn\'t need endless specifications. It needs enough clarity to understand the problem, the scope, the constraints and the signal that would say "this worked".',
            'When that clarity shows up early, the code gains real speed: fewer reactive discussions, less sideways rework and fewer architecture decisions made to prop up product ambiguity.',
          ],
        },
      ],
      practicalTool: {
        title: 'Five questions before writing the first line',
        items: [
          'What concrete problem are we solving, and for whom?',
          'Which parts of the experience are still hypotheses and which are already constraints?',
          'Which technical decision would be conditioned by a product definition that is still ambiguous?',
          'How will we know this worked without arguing about it after launch?',
          'Which uncomfortable question should we answer today so we do not pay for it mid-sprint?',
        ],
      },
      ecosystem: {
        articleLabel: 'Read the in-depth article on specification and AI',
        projectLabel: 'See how WebspecAI came about',
      },
      cta: {
        label: 'Reply to this issue',
      },
      finalQuestion:
        'Which product or architecture conversation is your team avoiding today, and how much rework could it save by having it this week?',
      signature: 'Julián\nEngineering Manager, product builder and founder of Pambú Tech\njuliancardozo.github.io · LinkedIn',
      ps:
        "If you're shaping a new initiative, I can share the minimal outline I use to turn a blurry idea into a workable specification.",
      segment: ['Leadership', 'AI', 'Product', 'WebspecAI'],
    },
  },
};
