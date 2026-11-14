export type Service = {
    id: string;
    title: string;
    timeline: string;
    short: string;
    description: string;
    outcomes: string[];
    stack: string[];
};

// Three tracks. Timelines are typical ranges from kickoff to launch.
export const services: Service[] = [
    {
        id: 'ai-agents',
        title: 'AI agents & applied AI',
        timeline: 'Live in 3–5 weeks',
        short: 'Agents that do real work inside your business — not demos that die in a slide deck.',
        description:
            'We design, build and run AI agents that take on real jobs: answering customers, searching your documents, watching your systems and moving data between tools. Each one is tested, monitored and connected to the software you already use.',
        outcomes: [
            'Customer support agents on WhatsApp, web and email',
            'Knowledge assistants that answer from your documents, with sources (RAG)',
            'Operations monitors that flag problems before customers notice',
            'Workflow automation across your CRM, sheets and inbox (n8n, Make)',
            'Custom MCP servers and tool integrations for your own systems',
        ],
        stack: ['Claude', 'OpenAI', 'Gemini', 'DeepSeek', 'MCP', 'Vercel AI SDK', 'WhatsApp API'],
    },
    {
        id: 'saas',
        title: 'SaaS products',
        timeline: 'Live in 6–10 weeks',
        short: 'From idea to a product real users pay for — with AI at the core.',
        description:
            'We take product ideas from a blank page to production: authentication, billing, dashboards, AI features and infrastructure that holds up when real users arrive. Or we add AI to the product you already have.',
        outcomes: [
            'MVPs built for real users, not just investor demos',
            'Internal tools that replace spreadsheets and manual work',
            'AI features added to your existing product',
            'Subscription billing, roles and admin dashboards',
            'Scalable cloud infrastructure with monitoring',
        ],
        stack: ['Next.js', 'React', 'Supabase', 'Postgres', 'Stripe', 'Vercel', 'AWS'],
    },
    {
        id: 'web',
        title: 'Web & apps',
        timeline: 'Live in 2–6 weeks',
        short: 'Fast, beautiful sites and apps built to rank, convert and impress.',
        description:
            'Marketing sites, online stores and apps that look sharp and load fast. Motion, 3D and interaction where it earns attention; clean, search-friendly engineering everywhere else.',
        outcomes: [
            'Marketing websites and e-commerce stores',
            'Mobile and desktop apps',
            'Immersive 3D and WebGL experiences',
            'Technical SEO and Core Web Vitals',
            'AI lead capture built into every page',
        ],
        stack: ['Next.js', 'React', 'Three.js', 'WebGL', 'GSAP', 'Framer Motion', 'Shopify'],
    },
];

/** AI agents presented as team members. Illustrative roles we build and run. */
export const workforce = [
    { name: 'Aria', code: 'NK-01', role: 'Support agent', task: 'Replies to customer messages in seconds and hands tricky ones to your team.', tag: 'WhatsApp · Email' },
    { name: 'Sage', code: 'NK-02', role: 'Knowledge assistant', task: 'Answers questions from your documents and shows where each answer came from.', tag: 'RAG' },
    { name: 'Rex', code: 'NK-03', role: 'Lead qualifier', task: 'Scores every new lead, asks the right follow-ups and books calls into your calendar.', tag: 'CRM' },
    { name: 'Orbit', code: 'NK-04', role: 'Ops monitor', task: 'Watches dashboards and alerts you the moment a number looks wrong.', tag: 'Monitoring' },
    { name: 'Ledger', code: 'NK-05', role: 'Invoice processor', task: 'Reads invoices, matches them to orders and files them — every day.', tag: 'Finance' },
    { name: 'Flux', code: 'NK-06', role: 'Data pipeline', task: 'Processes large batches of files overnight so data is ready by morning.', tag: 'Batch jobs' },
    { name: 'Probe', code: 'NK-07', role: 'QA tester', task: 'Runs your test suites on every change and reports what broke.', tag: 'QA' },
    { name: 'Shield', code: 'NK-08', role: 'Guardrails', task: 'Checks inputs and outputs for risk, leaks and policy breaks.', tag: 'Security' },
];

export const toolStack = [
    'Claude',
    'OpenAI',
    'Gemini',
    'DeepSeek',
    'MCP servers',
    'RAG pipelines',
    'Vercel AI SDK',
    'WhatsApp Business API',
    'n8n',
    'Next.js',
    'React',
    'Three.js',
    'GSAP',
    'Supabase',
    'Stripe',
    'Observability',
    'Guardrails',
];

export const processSteps = [
    {
        id: '01',
        name: 'Scope',
        title: 'A call, then a clear plan',
        description:
            'Start with a free 30-minute call. Within a week you get a written proposal: what we will build, how it works, the timeline and a fixed price or monthly retainer. Nothing starts until you say yes.',
        details: ['Free 30-min call', 'Written proposal', 'Fixed price or retainer', 'No commitment'],
    },
    {
        id: '02',
        name: 'Build',
        title: 'Working demos every week',
        description:
            'You see something working from week one. We prove the system on sample data first, then connect your real tools and data only once it behaves the way it should.',
        details: ['Weekly demos', 'Sample data first', 'Then real integrations', 'You stay in the loop'],
    },
    {
        id: '03',
        name: 'Run',
        title: 'Launch, then we keep it running',
        description:
            'Most projects go live in 2–10 weeks. Testing, monitoring and cost tracking come built in — and after launch we keep operating and improving the system, so it never goes stale.',
        details: ['Live in weeks', 'Monitoring built in', 'Cost tracking', 'Ongoing support'],
    },
];

export const promise = {
    title: 'Built for production. Not for slide decks.',
    body: 'Plenty of AI projects look great in a demo and never make it to real customers. Ours are built to go live and stay live — with testing, monitoring and cost control included from day one, not bolted on later.',
    points: [
        { k: 'Reliable', v: 'Tested against real scenarios before launch.' },
        { k: 'Observable', v: 'You can see what every agent did, and why.' },
        { k: 'Cost-controlled', v: 'Usage and spend tracked, with limits you set.' },
    ],
};

export const faqs = [
    {
        q: 'What does NousKun AI do?',
        a: 'NousKun AI is an AI company. We design, build and run AI agents, SaaS products, websites and apps — and keep them working after launch.',
    },
    {
        q: 'How do I know if my workflow is ready for AI?',
        a: 'If a task is repetitive, follows rules most of the time and eats hours every week, it is usually a good fit. On the first call we look at your workflow with you and tell you honestly whether AI will pay off — and where to start.',
    },
    {
        q: 'Will my data be used to train AI models?',
        a: 'No. We use business APIs from providers like Anthropic and OpenAI, which do not train on your data by default. Access is limited to what each agent needs, and we can deploy inside your own cloud if you prefer.',
    },
    {
        q: 'How much does it cost?',
        a: 'Projects start from ₹29,000. Most are priced as a fixed project or a monthly retainer, and you get the exact number in your proposal before any work begins.',
    },
    {
        q: 'Who owns what you build?',
        a: 'You do. Once the project is paid for, the code, prompts and setup are yours.',
    },
    {
        q: 'What happens after launch?',
        a: 'We keep running the system: monitoring it, fixing issues, tracking costs and improving it as your business changes. You can also take it in-house whenever you want.',
    },
];
