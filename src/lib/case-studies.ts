export type CaseStudy = {
    slug: string;
    title: string;
    tagline: string;
    industry: string;
    service: 'ai' | 'web' | 'saas';
    serviceLabel: string;
    client: string;
    duration: string;
    challenge: string;
    solution: string;
    solutionPoints: string[];
    results: { metric: string; value: string; description: string }[];
    tags: string[];
    coverGradient: string;
    accentColor: string;
};

export const caseStudies: CaseStudy[] = [
    {
        slug: 'krave-ecommerce-ai-automation',
        title: 'From Cart Abandonment to 41% Revenue Recovery',
        tagline: 'AI-powered abandoned cart + upsell engine for a D2C food brand',
        industry: 'E-Commerce',
        service: 'ai',
        serviceLabel: 'AI & Automation',
        client: 'Krave Foods (D2C)',
        duration: '3 weeks',
        challenge:
            'Krave was losing over 68% of their online visitors at checkout. Their Shopify store had no follow-up logic — every abandoned cart was money left on the table. Manual email sequences were taking 3+ hours per week and had a 6% open rate.',
        solution:
            'We built a multi-step AI agent that monitors cart events in real time, triggers a personalized WhatsApp message within 90 seconds of abandonment, and follows up with dynamic upsell recommendations based on the cart contents.',
        solutionPoints: [
            'Real-time cart event webhooks connected to a custom AI orchestration layer',
            'Personalized WhatsApp message sequences using GPT-4o (not generic templates)',
            'Dynamic upsell logic based on product catalog & purchase history',
            'Auto-segmentation of high-value vs. low-intent leads for different flows',
        ],
        results: [
            { metric: '41%', value: 'Revenue Recovery', description: 'Of abandoned carts converted in the first 60 days' },
            { metric: '6x', value: 'Response Rate', description: 'vs. previous email sequences (WhatsApp outperforms email)' },
            { metric: '3 hrs → 0', value: 'Manual Work', description: 'Fully automated — zero team intervention required' },
            { metric: '₹2.4L', value: 'Monthly Revenue Added', description: 'From recovered carts alone in month 2' },
        ],
        tags: ['WhatsApp Automation', 'E-Commerce', 'Lead Recovery', 'GPT-4o', 'Shopify'],
        coverGradient: 'from-orange-600/20 via-red-900/10 to-transparent',
        accentColor: '#f97316',
    },
    {
        slug: 'nexora-saas-mvp-build',
        title: 'AI SaaS MVP Built and Live in 4 Weeks',
        tagline: 'Custom RAG-powered document intelligence platform for a legal tech startup',
        industry: 'Legal Tech / SaaS',
        service: 'saas',
        serviceLabel: 'SaaS using AI',
        client: 'Nexora Legal (Stealth Startup)',
        duration: '4 weeks',
        challenge:
            'A legal tech founder had a validated idea: help small law firms instantly search and summarize case documents. They had a design mockup but no technical co-founder and needed to go to market in under a month to meet an investor deadline.',
        solution:
            'We engineered a full-stack AI SaaS platform with document upload, OpenAI-powered RAG (retrieval-augmented generation), tiered Stripe billing, and a clean client dashboard — shipped to production in 28 days.',
        solutionPoints: [
            'Next.js frontend with role-based user authentication (Clerk)',
            'Pinecone vector database for semantic document search',
            'Custom RAG pipeline: PDF → chunked embeddings → GPT-4o answers with citations',
            'Stripe Checkout + webhook integration for pay-per-use and monthly tiers',
            'Deployed on Vercel with auto-scaling edge functions',
        ],
        results: [
            { metric: '28 days', value: 'To Production', description: 'Full SaaS platform live and investor-ready' },
            { metric: '3', value: 'Pilot Clients', description: 'Law firms onboarded within 2 weeks of launch' },
            { metric: '92%', value: 'Query Accuracy', description: 'On legal document retrieval benchmarks' },
            { metric: '₹18L', value: 'Seed Funding Raised', description: 'Investor demo enabled by the live product' },
        ],
        tags: ['RAG Pipeline', 'Legal Tech', 'SaaS', 'Stripe', 'Next.js', 'Pinecone'],
        coverGradient: 'from-violet-600/20 via-purple-900/10 to-transparent',
        accentColor: '#7c3aed',
    },
    {
        slug: 'elara-restaurant-intelligence',
        title: 'Autonomous Table & Waitlist System Cuts Wait Times by 38%',
        tagline: 'AI-driven operations intelligence for a premium restaurant chain',
        industry: 'Hospitality / F&B',
        service: 'ai',
        serviceLabel: 'AI & Automation',
        client: 'Elara Dining (Multi-location)',
        duration: '5 weeks',
        challenge:
            'Elara Dining was running 3 locations with zero systems integration. Table management was done on paper, waitlists were managed by hand, and managers had no real-time visibility into table turnover or peak-hour forecasting. Peak hours meant chaos.',
        solution:
            'Built a custom operations intelligence platform: real-time table status tracking, AI-predicted peak hour windows, automated customer waitlist via WhatsApp, and a manager dashboard with live floor views.',
        solutionPoints: [
            'Real-time table status board with drag-and-drop floor management',
            'Predictive peak-hour AI model trained on 6 months of historical footfall data',
            'Automated WhatsApp waitlist: join queue, get updates, auto-notify when table is ready',
            'Multi-location manager dashboard with live occupancy, turnover, and revenue metrics',
        ],
        results: [
            { metric: '38%', value: 'Shorter Wait Times', description: 'Average customer wait time reduced across all 3 locations' },
            { metric: '22%', value: 'Table Turnover Increase', description: 'More covers served per shift without adding staff' },
            { metric: '4.8★', value: 'Google Rating Lift', description: 'From 4.1 to 4.8 in 60 days (fewer wait complaints)' },
            { metric: '0 hrs', value: 'Manual Waitlist Work', description: 'Fully automated — no host needed for queue management' },
        ],
        tags: ['Restaurant Automation', 'WhatsApp Workflow', 'Operations Intelligence', 'Real-time Dashboard'],
        coverGradient: 'from-emerald-600/20 via-teal-900/10 to-transparent',
        accentColor: '#10b981',
    },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
    return caseStudies.find((cs) => cs.slug === slug);
}
