'use client';

import Accordion from './Accordion';

const services = [
    {
        title: 'Intelligent Web & Growth Systems',
        description: 'Websites that think, not just exist. We design conversion-focused, AI-ready architecture that acts as the central brain of your business.',
        features: [
            'High-performance, futuristic UI/UX',
            'Conversion-first architecture & funnels',
            'Technical SEO & search visibility',
            'Predictive growth analytics',
            'Built to integrate automation'
        ]
    },
    {
        title: 'AI Automation for Revenue',
        description: 'Every lead handled. Every opportunity optimized. We automate how your business captures, qualifies, follows up, and converts users.',
        features: [
            'Lead qualification workflows',
            'WhatsApp & email automation',
            'Auto-quoting systems',
            'CRM and pipeline automation',
            'Smart follow-ups'
        ]
    },
    {
        title: 'SaaS using AI',
        description: 'Turn your specialized knowledge into scalable software. We build bespoke, AI-powered SaaS platforms ready for market acquisition.',
        features: [
            'Custom AI LLM Pipelines',
            'Tiered Subscription Models',
            'Automated Onboarding Flows',
            'Scalable Cloud Infrastructure',
            'Admin & User Dashboards'
        ]
    },
    {
        title: 'Content & Media Systems',
        description: 'Content that fuels trust and automation. Our in-house studio creates high-quality visual content designed to power AI workflows.',
        features: [
            'Brand visuals and motion content',
            'Product and service storytelling',
            'AI-assisted content workflows',
            'Media optimized for funnels'
        ]
    },
];

export default function Services() {
    return (
        <section className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto z-10">
            <div className="mb-16">
                <h2 className="text-sm font-mono tracking-[0.3em] text-ai-blue uppercase mb-6">
                    Our Capabilities
                </h2>
                <h3 className="text-4xl md:text-5xl font-bold text-white max-w-2xl leading-tight mb-8">
                    End-to-End <span className="text-ai-blue">AI Integration</span>
                </h3>
            </div>

            <Accordion items={services} />
        </section>
    );
}
