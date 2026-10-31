/** Artículos de actualidad y análisis de IA, en inglés. Ver src/data/en/articles.js. */

export const aiArticles = {
  'rea-ingenieria-inversa-chordify-chordlocal': {
    title: 'Reverse engineering with agents: from Chordify to ChordLocal with REA',
    description: "We ran REA (Reverse Engineer Anything) against Chordify's public pages: what stack it uses, where its paid features live and what that confirms about the architecture of ChordLocal, a local and free alternative.",
    category: 'AI and product',
    readingTime: '9 min read',
    sourceLabel: 'Official REA repository: morluto/rea',
    lead: "REA (Reverse Engineer Anything) is an MCP server and CLI that gives a coding agent tools to inspect software without its source code: binaries, JavaScript and Electron apps, .NET assemblies, APKs and websites. We used it to study Chordify, the app that detects a song's chords, and compare it with ChordLocal, the local and free version we built. The question was concrete: are Chordify's paid features hard to build, or are they simple logic over data that's already in the browser?",
    architecture: {
      caption: 'From a reference product to an app of your own, with evidence',
      description: "First, the product's features and their plans are listed. Then REA observes the public pages in a real browser and returns evidence: scripts, resources, endpoints and client state. That is used to validate our own data model before building.",
      layers: [
        { label: 'Hypothesis', items: ['Feature matrix', 'Free vs. paid'] },
        { label: 'REA', items: ['inspect-web-page', 'analyze-web-bundle'] },
        { label: 'Evidence', items: ['Scripts and resources', 'Client-side state'] },
        { label: 'ChordLocal', items: ['analysis.json', 'Instantly derived features'] },
      ],
    },
    sections: [
      {
        title: 'What REA is',
        paragraphs: [
          'REA is installed with `npx rea-agents setup` and registers as an MCP server in agents like Claude Code, Codex or Cursor; it can also be used as a CLI with the `rea` command. For websites it connects to a local browser over the Chrome DevTools Protocol and returns evidence: page structure, loaded scripts, resources, endpoints detected in the code and the shape of the data, without storing values, cookies or response bodies.',
          'Each result comes with an evidence identifier, its confidence level and its limits. That is the difference from "poking around DevTools for a while": the conclusions are backed up and can be verified again.',
        ],
      },
      {
        title: 'First iteration: the hypothesis',
        paragraphs: [
          'The initial request was "analyze the Chordify app with REA so we can have it locally, with all its features, but free". In that first session REA was installed but not connected to the agent, so the starting point was a matrix built from public information: each feature, its plan, the free equivalent and the real difficulty of building it.',
          'The hypothesis that came out of it: almost all paid features are simple transformations over the analysis result. Transposing is adding semitones to the root of each chord, `(root + n) % 12`. The only truly hard thing is detecting chords and meter correctly from the audio. ChordLocal was built on that idea.',
        ],
      },
      {
        title: 'Second iteration: REA against Chordify',
        paragraphs: [
          'To validate the hypothesis we ran REA 6.5.0 against two public pages: the home page and a song page. Chrome was opened with a clean profile, no session or account, and with the debugging port on loopback only. We used `inspect-web-page` for structure, resources and storage, `analyze-web-bundle` for static analysis of the scripts and `export-web-scripts` to review the exact context of each finding.',
          'There was a useful stumble. In headless mode, Chordify showed the Cloudflare challenge ("Just a moment…") and REA reported it as it was: the observed page was the challenge, not the app. No attempt was made to get around it. With a regular visible Chrome, the check passed on its own. We also did not download the source maps, even though the bundles declare them publicly, nor extract any song data.',
        ],
      },
      {
        title: 'What it found',
        paragraphs: [
          'Stack: React bundled with webpack, in eight scripts totaling 1.9 MB on a song page. The song data comes inside the HTML, not through a separate call. The chord diagrams come from an API that returns SVG per instrument and per chord, with names like `D:maj` or `B:min`: Harte notation, the standard in chord recognition research.',
          "Transposition is an integer in the client state. Each step adds or subtracts semitones, reset sets it back to 0, and the song object is built with that value before the chords are drawn in the browser. Changing the tempo adjusts the player's playback rate. When the capo or the transposition changes, an event makes the player redraw the current chord. The bundle also ships tables to spell each chord with sharps or flats depending on the major or minor key.",
          'The same code lists the features the product offers as paid: capo, transposition, loop, tempo, volume, countdown, setlists, audio upload, MIDI, printing and AI lyrics. None of the ones that could be traced needs to go back to the server to recompute the analysis.',
        ],
      },
      {
        title: 'What it confirms for ChordLocal',
        paragraphs: [
          "The hypothesis holds up with evidence: the paid features run on the client over data that's already on the page. The difference between the free and the paid plan isn't about compute, it's about product. Chordify's value lies in its catalog of analyses and in the experience, not in how hard it is to transpose.",
          'ChordLocal already has that same shape: an `analysis.json` as the single source of truth and instantly derived features. The analysis also leaves two concrete ideas to adopt. The first is exporting chords in Harte notation, so they can be compared with research datasets. The second is already done: spelling each chord according to the key (Eb and not D# in E-flat major), something ChordLocal solved in version 0.2.',
        ],
      },
      {
        title: 'Limits and potential',
        paragraphs: [
          "Understanding how a product works doesn't entitle you to copy it. Chordify's chord database is its product: ChordLocal doesn't use it, doesn't scrape it and generates its own analyses. The observed code served to validate decisions, not to be reused. Nor do we publish details about how access to the paid features is controlled: they add nothing to the architecture and would only serve to bypass it.",
          'Within those limits, the potential is big. The same method works for auditing an undocumented internal tool, understanding a legacy integration before migrating it, evaluating a competitor with evidence instead of assumptions, or maintaining compatibility with a closed format. What changes with an agent and REA is speed: going from "I think it works like this" to "here is the evidence" takes minutes.',
        ],
      },
    ],
    takeaway: 'Practical rule: useful reverse engineering starts with a product hypothesis and ends with evidence. First you list what an app does and what it charges for; then a tool like REA confirms where each feature lives. All within the limits of licenses, terms of service and data ownership.',
  },

  'gpt-6-astra-openai-superinteligencia-especulaciones': {
    title: 'OpenAI launches GPT-6 Astra: frontier capability, competitive pressure and the superintelligence debate',
    description: 'A technical and strategic analysis of the GPT-6 Astra launch: stated capabilities, product architecture and what talking about superintelligence does (and does not) mean.',
    category: 'AI news',
    readingTime: '8 min read',
    contextLabel: 'Current AI analysis',
    sourceLabel: 'Official sources: OpenAI Newsroom',
    lead: 'The GPT-6 Astra announcement once again moved the frontier of expectations in AI: more reasoning capability, deeper multimodal integration and signs of a clear strategy to close the loop between model, product and enterprise operations. The important discussion for technical and business teams is not whether superintelligence "has arrived", but what evidence exists, which risks are growing and which decisions are worth making now.',
    architecture: {
      caption: 'Adoption pattern for a frontier model in a real product',
      description: 'A high-capability foundation model does not create value on its own: it needs orchestration, evaluation, controls and a product layer that turns answers into business outcomes.',
      layers: [
        { label: 'Input', items: ['Prompts and business context', 'Internal and external data'] },
        { label: 'Frontier model', items: ['GPT-6 Astra', 'Reasoning and multimodality'] },
        { label: 'Orchestration', items: ['Tools, RAG and policies', 'Cost and latency control'] },
        { label: 'Governance', items: ['Evaluation, security and auditing', 'Human review for critical decisions'] },
        { label: 'Outcome', items: ['Useful automation', 'Faster, traceable decisions'] },
      ],
    },
    sections: [
      {
        title: 'What really changes with GPT-6 Astra',
        paragraphs: [
          'Every model leap has two readings: the technological and the operational. On the first, GPT-6 Astra raises the bar for what is expected in reasoning, context handling and multimodal tasks. On the second, it forces a rethink of where it makes sense to automate, which tasks need human validation and how value is measured beyond public benchmarks.',
          'For technical leaders, the advantage is not in "using the newest model" out of inertia. It is in identifying concrete friction: specification time, documentation bottlenecks, repetitive analysis or internal support flows where an incremental improvement already pays for the cost of adoption.',
        ],
      },
      {
        title: 'Superintelligence: marketing signal, scientific hypothesis or interpretation risk',
        paragraphs: [
          'Speculation about superintelligence shows up every time a leading player announces a frontier model. The problem is semantic and practical: there is no universally accepted operational threshold that would let anyone claim a system has reached "superintelligence" in the strong sense.',
          'In business terms, that label contributes little to decision-making. What does matter is verifiable evidence: performance by domain, error rate on critical tasks, robustness against adversarial inputs, cost per use case and compliance with security and traceability requirements.',
        ],
      },
      {
        title: 'An adoption framework for executive and engineering teams',
        paragraphs: [
          'If GPT-6 Astra makes it onto the roadmap, it should be treated as a platform initiative rather than a simple API integration. That means defining use cases by impact, designing guardrails from day one and setting joint metrics for quality, risk and efficiency.',
          'The pattern that works best in technical organizations is progressive: scoped pilots, continuous evaluation, human review at high-risk points and scaling only when there is evidence of sustained improvement. Without that framework, the cost of managing expectations usually exceeds the initial benefit.',
        ],
      },
    ],
    takeaway: 'Executive conclusion: beyond the superintelligence headline, GPT-6 Astra should be evaluated as a capability multiplier under strict governance. Competitive advantage will not come from hype, but from turning model capability into reliable product and operations flows.',
  },

  'hardware-modelos-redifinen-arquitectura-ia': {
    title: 'Hardware is no longer a detail: how the new model standard redefines AI architecture',
    description: 'An analysis of the new discussion about hardware for frontier models and why infrastructure has become central to AI strategy.',
    category: 'AI news',
    readingTime: '7 min read',
    contextLabel: 'Current AI analysis',
    sourceLabel: 'Official source: Anthropic News',
    lead: 'Every leap in model capability comes with a new conversation: not just about intelligence, but about infrastructure. When a provider defines a hardware standard for frontier models, the discussion stops being lab-level technical talk and becomes operational: cost, latency, governance and traceability. What matters is no longer winning the best benchmark, but designing an architecture capable of sustaining real value.',
    architecture: {
      caption: 'AI architecture with infrastructure as a product decision',
      description: 'Model capability is no longer the only decision axis; what surrounds the model determines whether the solution scales with control or becomes fragile.',
      layers: [
        { label: 'Input', items: ['Prompts and context', 'Internal and external data'] },
        { label: 'Model', items: ['Frontier model', 'Reasoning and multimodality'] },
        { label: 'Infrastructure', items: ['GPU, latency and throughput', 'Servers and caching'] },
        { label: 'Governance', items: ['Monitoring', 'Human review', 'Cost control'] },
        { label: 'Outcome', items: ['Useful automation', 'Traceable operational decisions'] },
      ],
    },
    sections: [
      {
        title: 'AI is no longer just a model layer',
        paragraphs: [
          'The AI industry is moving from talking only about models to talking about infrastructure as part of the product decision. The reason is simple: a powerful model can produce a mediocre experience if execution is not designed for the real business context.',
          'When a provider defines a hardware standard aimed at frontier models, it makes clear that the frontier is not only model quality, but also the way it is served, evaluated and operated. That changes the conversation on two levels.',
        ],
      },
      {
        title: 'Cost, latency and governance are no longer secondary',
        paragraphs: [
          'Before, the discussion was whether a model was "better" on generic benchmarks. Now performance has to be measured on real business tasks: case resolution rate, response time, cost per case, materiality of errors and capacity for human oversight.',
          'The difference between a strong model and a useful system is huge. The best technical decision is no longer the most powerful one, but the one that lets you run operations with control, predictability and reasonable cost.',
        ],
      },
      {
        title: 'AI architecture needs traceability and human review',
        paragraphs: [
          'If AI is used in processes with material decisions, you need to define zones where automation is useful and zones where human review is mandatory. AI architecture can no longer be a black box; it must be traceable, evaluable and operable.',
          'The priority for technical teams is not "adopting the latest technology", but building a foundation on which intelligence can grow without destroying the reliability of the system.',
        ],
      },
    ],
    takeaway: 'Model capability is essential, but not sufficient. When hardware enters the design conversation, AI stops being an experimental layer and becomes an infrastructure, product and risk decision.',
  },

  'puffin-world-modelos-multimodales-open-weight': {
    title: 'Puffin-World and the new wave of multimodal models: less hype, more real architecture',
    description: 'A look at the new generation of multimodal models and what really matters when evaluating open repositories and product architecture.',
    category: 'AI news',
    readingTime: '7 min read',
    contextLabel: 'Analysis of new models and repositories',
    sourceLabel: 'Official source: Hugging Face Blog',
    lead: 'The evolution of the open-model ecosystem no longer looks like a race of isolated benchmarks. The new wave is defined by more integrated multimodal models, better visual reasoning and real pressure to solve productive use cases. In that context, repositories like Puffin-World are more than an experiment: they are a sign that architecture and execution will define the next generation of value.',
    architecture: {
      caption: 'Multimodality as an operational layer of the product',
      description: 'The question is no longer just what the model sees, but what decisions it can make with what it sees, how to validate them and how to operate them in a real context.',
      layers: [
        { label: 'Inputs', items: ['Text', 'Images', 'Visual signals and interactions'] },
        { label: 'Representation', items: ['Multimodal context', 'Tool integration'] },
        { label: 'Reasoning', items: ['Inference flows', 'Task-adapted models'] },
        { label: 'Operations', items: ['Human validation', 'Monitoring and evaluation', 'Cost and latency'] },
      ],
    },
    sections: [
      {
        title: 'The center of gravity is no longer just text',
        paragraphs: [
          'When the market started talking about LLMs, the focus was on response speed, text quality and reasoning ability. Today the conversation has moved on. The center of gravity is no longer just text; it is the ability to understand multimodal context, interact with the environment and integrate visual signals into a complete flow.',
          'Puffin-World is a useful case because it shows that innovation is not only in parameter count or in the marketing value of a spec sheet. It is in a more useful question: what kind of system can you build on top of this model?',
        ],
      },
      {
        title: 'Multimodality needs orchestration and validation',
        paragraphs: [
          'The most interesting part is no longer "what the model sees", but "what decisions it can make with what it sees", "how the output is validated" and "what role human review plays". That is what turns a technical capability into a product.',
          'A multimodal model is only valuable when it is useful in a concrete flow. A system that analyzes documents, images, interfaces or interaction sequences has a huge advantage over a model that simply responds to well-written prompts. But that advantage only appears if the orchestration layer is designed for the real domain.',
        ],
      },
      {
        title: 'The new wave of open models demands real architecture',
        paragraphs: [
          'The new generation of models does not necessarily mean a new generation of software, but it does demand a deep review of the integration layer. The difference between a technical detail and a competitive advantage lies in context, tools, evaluation and operations.',
          'Innovation does not depend only on the model, but on how it is integrated into decision flows. That is where the difference between a "demo" and an operational solution appears.',
        ],
      },
    ],
    takeaway: "The new multimodal wave is not just a cosmetic upgrade to the ecosystem. It is a sign that real value no longer lives only in the model's signature, but in the system's ability to understand the world, context and decisions.",
  },

  'ia-no-cambia-solo-herramienta-liderazgo-operacion': {
    title: "AI doesn't just change a tool: it changes the structure of leadership and operations",
    description: 'An analysis of why AI redefines leadership, coordination, metrics and operational responsibility, not just the technical stack.',
    category: 'Leadership and product',
    readingTime: '8 min read',
    contextLabel: 'Leadership and digital transformation',
    sourceLabel: 'Source: Harvard Business Review — AI',
    lead: 'The biggest promise of AI is not replacing human work with a smarter tool. The biggest promise is changing how decisions are made, how work is organized and how execution is measured. That is why the leadership conversation cannot keep being reduced to "which tool to use": the real change is in operations.',
    architecture: {
      caption: 'AI as part of the operating model, not an isolated feature',
      description: 'When AI is integrated into operations, the structure of work and human responsibility change along with the technology.',
      layers: [
        { label: 'Decision', items: ['Goals and priorities', 'Use case definition'] },
        { label: 'System', items: ['AI', 'Flows and rules'] },
        { label: 'Operations', items: ['Human validation', 'Policies and guardrails'] },
        { label: 'Leadership', items: ['Ownership', 'Metrics and review'] },
      ],
    },
    sections: [
      {
        title: 'AI changes structure, not just tasks',
        paragraphs: [
          'The most repeated story about AI in business is usually simple: a company buys a tool, tries a use case and expects "productivity to go up". That story works as a sales narrative, but it rarely reflects the reality of operations.',
          'The truth is that AI changes not only tasks, but also responsibility, structure, decisions and the position of leadership. When a tool automates part of the analysis or production, the organization needs to redefine who validates, who decides, what gets automated and what stays human.',
        ],
      },
      {
        title: 'The real challenge is designing a decision system',
        paragraphs: [
          'There are two classic mistakes: the first is confusing AI with productivity. The second is treating it as a full replacement for human judgment. Reality lies in between. AI can speed up analysis, synthesis and execution, but it does not replace the ability to prioritize with judgment, interpret context and take on real risk.',
          'This means technical leadership has to think of AI as part of an operating model, not an isolated module. A team that wants to integrate AI usefully must define high-impact use cases, security and review policies, evaluation mechanisms and a clear degree of automation.',
        ],
      },
      {
        title: 'Leadership becomes more critical, not less',
        paragraphs: [
          'AI can create speed, but it can also multiply errors if the organization is not clear on where it is used, how it is validated and who has the authority to intervene. That is where the real leadership challenge appears.',
          'The organization that wins with AI is not the one with the most advanced tool, but the one that knows how to turn it into a decision system with judgment, metrics and clear accountability.',
        ],
      },
    ],
    takeaway: "The future is not defined by the most advanced tool, but by the organization's ability to turn AI into a decision system with judgment. That is the point where technical leadership stops being a side function and becomes central.",
  },

  'llama-4-scout-open-weight-usa': {
    title: "Llama 4 Scout: what Meta's multimodal open-weight model brings to product teams",
    description: 'An analysis of Llama 4 Scout: multimodal MoE architecture, a 10-million-token context, a specific commercial license and real deployment requirements.',
    category: 'Open-weight LLMs',
    readingTime: '7 min read',
    contextLabel: 'Open-weight model analysis',
    sourceLabel: 'Official source: Meta Llama on Hugging Face',
    lead: "Llama 4 Scout is Meta's multimodal open-weight model worth looking at when evaluating vision, text and long-context capabilities under your own deployment strategy. It combines a Mixture-of-Experts architecture, 17 billion parameters activated per inference and a stated context window of up to 10 million tokens. The critical point for the business is not just its capability: it's understanding what operating 109 billion total parameters under a specific community license involves.",
    architecture: {
      caption: 'Llama 4 Scout: multimodal input and MoE execution',
      description: "Text and images are integrated early in the model's representation. Transformer blocks route each token to selected experts before producing multilingual text or code.",
      layers: [
        { label: 'Inputs', items: ['Multilingual text', 'Images'] },
        { label: 'Early fusion', items: ['Multimodal representation', 'Shared embeddings'] },
        { label: 'MoE compute', items: ['16 experts', '17B active / 109B total'] },
        { label: 'Output', items: ['Text and code', 'Context of up to 10M tokens'] },
      ],
    },
    sections: [
      {
        title: 'The distinctive capability: multimodality and long context',
        paragraphs: [
          "Meta positions Scout as a model with early fusion of text and images: visual information is not added as a later layer, but takes part in the representation from the model's processing onward. For products that work with documents, interfaces, images or visual evidence, this architecture enables flows that a text-only model cannot handle by itself.",
          'The context window of up to 10 million tokens is another relevant capability, although it should be treated as an engineering constraint and not a marketing argument. Available context does not automatically mean precise retrieval: the team has to measure quality, latency, cost and behavior with the kind of corpus it will actually use.',
        ],
      },
      {
        title: 'MoE reduces active compute; it does not eliminate operating cost',
        paragraphs: [
          'Scout uses a Mixture-of-Experts with 16 experts: it activates 17B parameters per step, but carries 109B total weights. The pattern lets you increase capacity without running every parameter for every token, an inference advantage over a dense model of equivalent size.',
          "However, the weights still need memory. The model card and practical operation force you to evaluate quantization, distribution across several GPUs, required throughput and latency limits. Choosing an open-weight model means taking on responsibility for that platform, not just downloading a checkpoint.",
        ],
      },
      {
        title: 'Open-weight is not the same as open source',
        paragraphs: [
          "Scout's weights can be downloaded publicly after accepting the Llama 4 Community License, but that license is not Apache 2.0 or an OSI license. It includes usage conditions for organizations with more than 700 million monthly active users.",
          'For a startup or a company, license review should be part of the adoption design alongside security, evaluation and privacy. The model can be technically suitable and still not be compatible with the distribution, the product or the projected scale.',
        ],
      },
    ],
    takeaway: 'Adoption rule: Llama 4 Scout is a powerful open-weight option for multimodal and long-context cases, as long as the team validates quality in its domain, plans infrastructure and reviews the obligations of its community license.',
  },

  'qwen3-235b-open-weight-china': {
    title: "Qwen3-235B-A22B: China's case for large-scale open-weight inference",
    description: "An analysis of Qwen's open-weight flagship: a 235B/22B-active MoE, 119 languages, up to 1M context and an Apache 2.0 license.",
    category: 'Open-weight LLMs',
    readingTime: '7 min read',
    contextLabel: 'Open-weight model analysis',
    sourceLabel: 'Official source: Qwen on Hugging Face',
    lead: "Qwen3-235B-A22B-Instruct-2507 condenses a trend that is redefining the open-weight market: high-capacity models that activate a fraction of their parameters per token. Qwen's model, developed by Alibaba's team, states 235B total parameters, 22B active, support for 119 languages and up to a million tokens of extended context. Its Apache 2.0 license makes it especially relevant for teams that need commercial and redistribution freedom.",
    architecture: {
      caption: 'Qwen3-235B-A22B: MoE and grouped attention',
      description: 'Multilingual text goes through 94 transformer blocks with Grouped Query Attention. The MoE router selects eight of 128 experts per token to produce a direct instruction response.',
      layers: [
        { label: 'Input', items: ['Text in 119 languages', 'Native 262K-token window'] },
        { label: 'Attention', items: ['94 transformer layers', 'Grouped Query Attention'] },
        { label: 'MoE compute', items: ['128 experts', '8 active per token'] },
        { label: 'Output', items: ['22B active / 235B total', 'Non-thinking instruct'] },
      ],
    },
    sections: [
      {
        title: 'Global capability with a license that is simple to evaluate',
        paragraphs: [
          'The Qwen3 family publishes dense and MoE models under Apache 2.0. For organizations evaluating open-weight models, this license reduces friction in commercial use, modification and redistribution compared with community licenses that carry specific conditions.',
          "The stated support for 119 languages and dialects is especially relevant for regional or multilingual products. Even so, a list of languages doesn't replace evaluation: Rioplatense Spanish, domain vocabulary, safety and tool quality need to be measured with your own test set before bringing the model into a business flow.",
        ],
      },
      {
        title: 'The economics of MoE at 235B-parameter scale',
        paragraphs: [
          'The architecture has 235B total parameters, but activates 22B through a router that selects eight of 128 experts per token. That sparsity aims to concentrate compute in a portion of the model and improve the ratio between capacity and inference cost.',
          "This should not be read as the model running like a 22B one. The checkpoint, the serving system, the KV cache and long context still define a significant infrastructure footprint. Full-precision operation requires enterprise-grade resources; quantization and servers like vLLM or SGLang are platform decisions that need to be validated against real load.",
        ],
      },
      {
        title: 'Extended context needs a retrieval policy',
        paragraphs: [
          'Qwen states 262,144 tokens of native context and extension to roughly one million through YaRN. That reach opens up use cases like repository analysis, extensive documentation and long conversations, but it also amplifies the problems of information selection and cost per request.',
          "The product architecture has to decide which documents go in, how they are retrieved, when they are summarized and what evidence accompanies the answer. Giving a model more context doesn't fix an incomplete source, an ambiguous policy or a missing evaluation.",
        ],
      },
    ],
    takeaway: 'Adoption rule: Qwen3-235B-A22B combines MoE capability, multilingual reach and Apache 2.0; its practical value depends on measuring local quality and designing the infrastructure, retrieval and governance needed to run it at scale.',
  },

  'claude-watermarking-gobernanza-contenido-ia': {
    title: 'Claude will add text watermarking: what changes for AI governance',
    description: 'Anthropic announced that future Claude models will generate watermarked text: implications for traceability, compliance and controls on AI-generated content.',
    category: 'AI news',
    readingTime: '6 min read',
    contextLabel: 'Current events analysis',
    sourceLabel: 'Official source: Anthropic',
    lead: 'Anthropic announced that future Claude models will generate watermarked text to make it possible to estimate the likelihood of model involvement. The news matters less for the mechanism itself than for the shift in conversation it enables: product, legal and compliance teams start to have an additional technical signal for governing AI-generated content.',
    architecture: {
      caption: 'Watermarking as a provenance signal',
      description: 'Claude selects linguistic alternatives with low semantic relevance using a watermarking key. A verifier with that key can estimate whether a long text likely contains content generated by Claude.',
      layers: [
        { label: 'Generation', items: ['Claude model', 'Linguistic alternatives'] },
        { label: 'Statistical mark', items: ['Key-based selection', 'No hidden characters'] },
        { label: 'Verification', items: ['Sufficient sample', 'Probabilistic estimate'] },
        { label: 'Governance', items: ['Content traceability', 'Policies and human review'] },
      ],
    },
    sections: [
      {
        title: 'The news: a signal, not a personal identifier',
        paragraphs: [
          'According to Anthropic, the watermark does not add hidden characters or information that would link the text to a person, organization or conversation. The mechanism uses meaning-preserving alternative word choices to leave a statistical pattern that can be verified with a key.',
          'The distinction matters for the business. It is not a complete audit log or a label visible to the reader. It is a signal that answers a narrow question: how likely is it that a text was generated, at least in part, by Claude.',
        ],
      },
      {
        title: 'The impact is in the governance cycle',
        paragraphs: [
          'Organizations that use AI for documentation, customer service, marketing or internal processes need to separate three problems: provenance, quality and accountability. Watermarking provides evidence of provenance; it does not validate that the content is correct, permitted or appropriate for a regulated context.',
          "That's why it needs to be integrated with existing controls: acceptable use policies, risk-based review, traceability of prompts and outputs where appropriate, and approval processes before publishing sensitive content. A technical signal does not replace editorial, legal or professional judgment.",
        ],
      },
      {
        title: 'Limitations the design must respect',
        paragraphs: [
          "The announcement itself clarifies that detection needs sufficient samples and that the watermark is less effective when there are few linguistic choices, as in factual passages or light edits. It also doesn't identify text produced by other models, nor does it prove that a text had no human involvement.",
          'For technical teams, the consequence is to avoid binary automation. A detection result should feed a risk assessment, not trigger a punitive or compliance decision on its own. The right architecture preserves context, thresholds and human review.',
        ],
      },
    ],
    takeaway: 'Operational impact: watermarking can improve the traceability of AI-generated content, but it only produces real governance when combined with policies, context of use and human accountability.',
  },

  'kiro-acp-interoperabilidad-agentes-ide': {
    title: 'Kiro adopts ACP: agent interoperability reaches the specialized IDE',
    description: 'Kiro CLI added the Agent Client Protocol to run agents in compatible IDEs: impact on specialized tools, standardization and execution control.',
    category: 'AI news',
    readingTime: '6 min read',
    contextLabel: 'Current events analysis',
    sourceLabel: 'Official source: Kiro',
    lead: "Kiro announced Agent Client Protocol (ACP) support in its CLI. The change lets you use the agent's capabilities from compatible IDEs and tools, instead of tying them to a single editor. For technical teams, the relevant change is architectural: a common protocol reduces ad hoc integrations and lets you apply the agent where specialized context already exists.",
    architecture: {
      caption: 'Interoperability between a specialized tool and an agent',
      description: "A compatible IDE or tool implements ACP and talks to Kiro CLI. The agent receives context from the tool, proposes or runs authorized actions and returns results to the specialized environment.",
      layers: [
        { label: 'Tool', items: ['Specialized IDE', 'Schema, indexes and context'] },
        { label: 'Protocol', items: ['Agent Client Protocol', 'Interoperable contract'] },
        { label: 'Agent', items: ['Kiro CLI', 'Reasoning and planning'] },
        { label: 'Execution', items: ['Commands and tools', 'Approval and results'] },
      ],
    },
    sections: [
      {
        title: 'From one-to-one integrations to a common contract',
        paragraphs: [
          'Before a shared protocol, every combination of agent and editor requires a specific integration. ACP proposes standardizing communication between clients —editors or tools— and coding agents. Kiro compares this role with the impact the Language Server Protocol had on language capabilities in IDEs.',
          'The consequence for an organization is less dependence on a single interface. A team can keep its specialized environment for databases, data science or mobile development and reach the agent through the same contract, instead of giving up working context to adopt an AI tool.',
        ],
      },
      {
        title: 'The important use case is specialized context',
        paragraphs: [
          'The announcement illustrates the integration with DataGrip: the tool provides schema visualization, execution plans, autocompletion and connection management; the agent can help with queries, migrations, test data or explaining complex conditions. Neither layer replaces the other.',
          "This pattern applies to other domains. The specialized tool keeps the area's own model, telemetry or controls. The agent brings reasoning and automation on top of that context. The value isn't in putting chat everywhere, but in shrinking the distance between intention, context and verifiable action.",
        ],
      },
      {
        title: 'Interoperability demands execution controls',
        paragraphs: [
          "An agent that can run commands from a tool connected to real data widens the risk surface. The protocol doesn't remove the need for identity, authorization, secure secrets, isolated environments and review of actions with impact.",
          'To adopt this capability professionally, it pays to define which environments the agent can touch, which actions require approval, how activity is logged and who is responsible for reviewing a change. Interoperability speeds up the flow; governance keeps it from speeding up mistakes.',
        ],
      },
    ],
    takeaway: 'Operational impact: ACP lets you place agents where the working context is. The next challenge for teams is combining that flexibility with permissions, traceability and execution controls proportionate to the risk.',
  },

  'spec-kit-1-especificaciones-agentes-adopcion': {
    title: 'Spec Kit 1.0: the specification consolidates as the interface for agents',
    description: 'GitHub released Spec Kit 1.0 and 1.0.1, with adoption guides, quickstarts and extensions: impact on spec-driven development and automation with agents.',
    category: 'AI news',
    readingTime: '7 min read',
    contextLabel: 'Current events analysis',
    sourceLabel: 'Official source: GitHub Spec Kit',
    lead: 'GitHub released Spec Kit 1.0 and version 1.0.1 on August 21, 2026. The update adds adoption guides for existing projects, workflow quickstarts and changes to the extensions catalog. The impact is not one more tool for generating code: it is the maturing of the specification as a working contract between product, engineering and agents.',
    architecture: {
      caption: 'Spec-driven flow with coding agents',
      description: 'The team defines principles and versioned specifications. From them, a plan and tasks are derived that an agent implements with validations and reviews in the repository.',
      layers: [
        { label: 'Intent', items: ['Project principles', 'Versioned specification'] },
        { label: 'Planning', items: ['Technical plan', 'Tasks and dependencies'] },
        { label: 'Execution', items: ['Coding agent', 'Repository changes'] },
        { label: 'Control', items: ['Tests and review', 'Evidence and delivery'] },
      ],
    },
    sections: [
      {
        title: 'The news: 1.0 with adoption and extensibility',
        paragraphs: [
          'Release 1.0.1 includes adoption documentation for existing projects, project history, workflow quickstarts and updates to the community catalog. Version 1.0.0 also adds extensions and presets focused on security, architecture, inventory and quality assurance.',
          "This moves Spec Kit from an experimental flow toward a foundation better prepared for teams that aren't starting from an empty repository. The real problem isn't starting a demo with agents; it's introducing them into systems where conventions, debt, dependencies and delivery responsibilities already exist.",
        ],
      },
      {
        title: 'The specification is executable context',
        paragraphs: [
          "In a spec-driven flow, the specification doesn't replace technical design or the product conversation. It organizes both so that decisions on scope, constraints and acceptance are available before the agent generates code. Then the plan and tasks turn that intent into a verifiable path.",
          "This approach matches a practice I apply in my own products: ambiguity is the main hidden cost of AI-assisted delivery. If the team doesn't define the problem, the limits and the validation criteria, the agent just automates an interpretation that may be wrong.",
        ],
      },
      {
        title: 'Adaptability does not replace change control',
        paragraphs: [
          'The 1.0 release notes argue that agents lower the cost of adapting a repository to change. It is a valuable observation: migrations and refactors can speed up when the agent has context on the diff and the affected contracts.',
          'However, a change that is easier to make is not automatically a change that is safe to deploy. Teams still need review, testing, security controls, observability and a clear definition of what evidence shows the change meets the specification.',
        ],
      },
    ],
    takeaway: 'Operational impact: Spec Kit 1.0 reinforces the specification as the coordination interface for agents. Its value shows up when the team versions intent, validates results and keeps control over change.',
  },
};
