/** Pilares en inglés: solo textos, indexados por slug. Ver src/data/pillars.js. */

export const pillars = {
  'ingenieria-con-ia': {
    title: 'Engineering with AI and agents',
    eyebrow: 'Pillar',
    description:
      'How to bring AI agents into the development cycle: specification, context, a control harness and human review.',
    lead:
      "Programming with agents isn't asking a chat for code: it's designing the system they work in. This pillar gathers what I learned bringing Cursor, Kiro and Claude Code into real work: specifications that control ambiguity, context versioned in the repository, automated checks that validate every result and a team that decides what gets merged. The riskier the task, the more control it gets.",
    audiences: ['CTOs and Engineering Managers', 'Tech Leads adopting AI agents', 'Platform and developer experience teams'],
    questions: [
      'What has to be written down before delegating a task to an agent?',
      'What repository context does an agent need to work with the team’s judgment?',
      'What controls does each task need according to its risk, and which decisions are never delegated?',
    ],
    cta:
      'If your team is bringing AI agents into development, we can design together what to delegate, with what context and with what controls.',
  },
  'liderazgo-tecnico': {
    title: 'Technical leadership and teams',
    eyebrow: 'Pillar',
    description:
      'How I think about technical leadership, autonomy, sustainable delivery and the relationship between engineering, product and business.',
    lead:
      "This pillar gathers the least visible part of technical work: creating context, making decisions with others, translating trade-offs and sustaining teams that deliver without relying on heroes. Although many of these lessons show up inside architecture or product articles, the common thread is leadership.",
    audiences: ['CTOs and Engineering Managers', 'Tech Leads', 'Recruiters and companies looking for technical leadership'],
    questions: [
      'How does the job change when a technical leader stops optimizing only for code and starts optimizing for the system?',
      'Which architecture decisions are also decisions about culture and autonomy?',
      'How do you connect product, delivery and technical judgment without micromanaging?',
    ],
    cta:
      "If you're leading an engineering team or building a technical function, I'd like to compare practices and decisions.",
  },
  'plataforma-arquitectura': {
    title: 'Platform engineering and architecture',
    eyebrow: 'Pillar',
    description:
      'Software architecture, multi-tenancy, payments, cloud, developer experience and systems that need to be explained and operated.',
    lead:
      'Architecture shows up wherever a system has to withstand real complexity: payments, data isolation, long context, integrations and day-to-day operations. This pillar organizes that applied knowledge around concrete problems.',
    audiences: ['CTOs and Tech Leads', 'Platform and infrastructure teams', 'SaaS and fintech startups'],
    questions: [
      'Where should a critical boundary like tenant isolation live?',
      'What makes a payment integration or a webhook reliable?',
      'Which responsibilities stay with the team even when the infrastructure is in the cloud?',
    ],
    cta:
      'If your team is evaluating an architecture, an integration or an internal platform, we can compare decisions and risks.',
  },
  'producto-mvps': {
    title: 'Products, startups and MVPs',
    eyebrow: 'Pillar',
    description:
      'From observing the problem to the MVP: onboarding, user experience, hypotheses, validation and designing sustainable solutions.',
    lead:
      'This pillar connects discovery, product and execution. The projects start from observed problems —caring for Milo, collecting fees, selling a house, understanding a jam, learning songs without a subscription— and turn into architecture and product decisions that may be useful to other teams.',
    audiences: ['Founders and venture builders', 'Product Managers', 'Teams validating new products'],
    questions: [
      'What should a user get in their first session for a product to make sense?',
      'How do you define the technical scope of an MVP without building an imaginary company?',
      'How do you turn a concrete experience into a testable hypothesis?',
    ],
    cta:
      "If you're validating a product or redefining the scope of an MVP, I'd like to hear about the problem and the hypothesis behind it.",
  },
};
