export type Service = {
    id: string;
    title: string;
    short: string;
    description: string;
    outcomes: string[];
    stack: string[];
};

export const services: Service[] = [
    {
        id: 'ai-agents',
        title: 'AI agents & chatbots',
        short: 'Assistants that answer, qualify and book — on WhatsApp, web and voice.',
        description:
            'Custom-trained AI agents that know your business. They reply to customers in seconds, qualify leads with your own criteria, and book meetings straight into your calendar — any hour of the day.',
        outcomes: [
            'Custom AI chatbots trained on your docs and FAQs',
            'WhatsApp Business API assistants',
            'Lead qualification and scoring',
            'Voice AI phone agents',
            'Internal knowledge-base assistants (RAG)',
        ],
        stack: ['OpenAI', 'Claude', 'Gemini', 'WhatsApp API', 'Twilio', 'Pinecone'],
    },
    {
        id: 'automation',
        title: 'Workflow automation',
        short: 'Connect your tools so data moves itself — from first click to closed deal.',
        description:
            'We map the repetitive work your team does every day and replace it with automations that run on their own: lead capture, follow-ups, CRM updates, reminders, reports and hand-offs.',
        outcomes: [
            'Lead capture and instant follow-up',
            'Automated email, SMS and WhatsApp sequences',
            'Two-way CRM sync and routing',
            'Multi-step agent workflows (n8n, Make, Zapier)',
            'Reporting and alerts on autopilot',
        ],
        stack: ['n8n', 'Make', 'Zapier', 'Google Sheets', 'HubSpot', 'Webhooks'],
    },
    {
        id: 'web',
        title: 'Websites that convert',
        short: 'Fast, beautiful Next.js sites built to rank on Google and turn visitors into leads.',
        description:
            'A website should be your best salesperson. We design and build fast, motion-rich sites with technical SEO, analytics and AI lead capture baked in from day one.',
        outcomes: [
            'Conversion-focused UX and motion design',
            'Next.js and React architecture',
            'Technical SEO and Core Web Vitals',
            'Funnel analytics and heatmaps',
            'Headless CMS setup',
        ],
        stack: ['Next.js', 'React', 'Tailwind', 'Vercel', 'Sanity', 'GA4'],
    },
    {
        id: 'saas',
        title: 'AI-powered SaaS',
        short: 'From idea to paying users — MVPs and platforms with AI at the core.',
        description:
            'Have a product idea that needs AI? We build the whole thing: auth, billing, dashboards, AI pipelines and scalable infrastructure — shipped fast enough to validate with real users.',
        outcomes: [
            'AI MVPs for market validation',
            'RAG pipelines and LLM integrations',
            'Subscription billing with Stripe',
            'User and admin dashboards',
            'Scalable cloud infrastructure',
        ],
        stack: ['Next.js', 'Supabase', 'Stripe', 'Postgres', 'AWS', 'GCP'],
    },
];

export const toolStack = [
    'OpenAI',
    'Claude',
    'Gemini',
    'WhatsApp Business API',
    'n8n',
    'Make',
    'Zapier',
    'Next.js',
    'Supabase',
    'Stripe',
    'Pinecone',
    'Twilio',
    'Vercel',
    'HubSpot',
];

export const processSteps = [
    {
        id: '01',
        name: 'Blueprint',
        title: 'Map what to automate',
        description:
            'We study your customer journey, tools and bottlenecks, then design a system around the problems that cost you the most time and revenue.',
        details: ['Workflow mapping', 'Data architecture', 'UX strategy', 'ROI estimate'],
    },
    {
        id: '02',
        name: 'Build',
        title: 'Engineer the core',
        description:
            'We build the website, agents and back-end automation as one connected system — not a pile of disconnected tools.',
        details: ['Next.js', 'AI agents', 'API integrations', 'CRM connection'],
    },
    {
        id: '03',
        name: 'Connect',
        title: 'Wire everything together',
        description:
            'Your site, WhatsApp, email, CRM and analytics start talking to each other. Data flows from visitor to lead to sale with no manual copy-paste.',
        details: ['Webhooks', 'n8n / Make', 'Database sync', 'Notifications'],
    },
    {
        id: '04',
        name: 'Evolve',
        title: 'Measure and improve',
        description:
            'Launch is day one. We track what the system does, learn from real usage and keep tuning it for more conversions and less friction.',
        details: ['A/B testing', 'Heatmaps', 'CRO', 'Feature scaling'],
    },
];

export const faqs = [
    {
        q: 'What does NousKun AI do?',
        a: 'NousKun AI is an AI automation company. We build custom AI agents and chatbots, WhatsApp and workflow automations, conversion-focused websites and AI-powered SaaS products for businesses that want to capture more leads and spend less time on repetitive work.',
    },
    {
        q: 'How much does an AI automation project cost?',
        a: 'Projects start from ₹29,000 for a starter AI agent or website. Growth-stage automation systems start around ₹59,000, and custom SaaS platforms from ₹75,000. You get a fixed quote after a free consultation.',
    },
    {
        q: 'How long does it take to build?',
        a: 'Most automation and website projects go live in 2–6 weeks depending on scope. AI SaaS MVPs typically take around 4–8 weeks.',
    },
    {
        q: 'Can you automate WhatsApp for my business?',
        a: 'Yes. We build on the official WhatsApp Business API to send instant replies, qualify leads, recover abandoned carts, share updates and hand conversations to your team when needed.',
    },
    {
        q: 'Do I need technical knowledge to use what you build?',
        a: 'No. We set everything up, connect it to the tools you already use, and hand over simple dashboards. We also provide training and ongoing support.',
    },
    {
        q: 'Which AI models and tools do you use?',
        a: 'We pick the right tool for each job — including OpenAI, Claude and Gemini models, n8n, Make, Zapier, Supabase, Stripe, Pinecone and Next.js — so you are never locked into one vendor.',
    },
];
