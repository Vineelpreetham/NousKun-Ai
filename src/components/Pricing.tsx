'use client';

import { useState } from 'react';
import { PricingModule, PricingPlan } from '@/components/ui/pricing-module';
import {
    Code2,
    Rocket,
    Gem,
    Bot,
    Workflow,
    BrainCircuit,
    Database,
    BarChart3,
    LineChart
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// --- Data Definition ---

const webPlans: PricingPlan[] = [
    {
        id: 'web-starter',
        name: 'Starter',
        description: 'Perfect for early-stage founders launching their first digital presence.',
        icon: <Code2 className="w-8 h-8" />,
        priceMonthly: 29000,
        priceYearly: 29000 * 10,
        users: 'Ideal for early-stage startups',
        features: [
            { label: 'Responsive Design', included: true },
            { label: 'Core UX/UI & Animations', included: true },
            { label: 'CMS Setup', included: true },
            { label: 'Standard SEO Setup', included: true },
            { label: 'Basic Analytics', included: true },
        ]
    },
    {
        id: 'web-growth',
        name: 'Growth Systems',
        description: 'For serious businesses wanting performance + conversion focus.',
        icon: <Rocket className="w-8 h-8" />,
        priceMonthly: 55000,
        priceYearly: 55000 * 10,
        users: 'For growing businesses',
        features: [
            { label: 'Advanced UI & Motion Effects', included: true },
            { label: 'Conversion-Focused UX', included: true },
            { label: 'Technical SEO Optimization', included: true },
            { label: 'Funnel Analytics & Heatmaps', included: true },
            { label: 'Performance Optimization', included: true },
        ],
        recommended: true,
    },
    {
        id: 'web-scale',
        name: 'Scale Infrastructure',
        description: 'Full custom architecture, growth analytics, and advanced integrations.',
        icon: <Gem className="w-8 h-8" />,
        priceMonthly: 110000,
        priceYearly: 110000 * 10,
        users: 'For market leaders',
        features: [
            { label: 'Custom Web Architecture', included: true },
            { label: 'Predictive Growth Analytics', included: true },
            { label: 'Complex Backend Integration', included: true },
            { label: 'Dedicated Design Team', included: true },
            { label: 'Weekly Growth Sprints', included: true },
        ]
    }
];

const aiPlans: PricingPlan[] = [
    {
        id: 'ai-starter',
        name: 'Starter Agent',
        description: 'Basic autonomous lead capture + email and simple chat workflows.',
        icon: <Bot className="w-8 h-8" />,
        priceMonthly: 29000,
        priceYearly: 29000 * 10,
        users: 'Entry-level automation',
        features: [
            { label: 'Basic AI Chatbot (GPT-4o mini)', included: true },
            { label: 'Lead Capture & Sync (Simple)', included: true },
            { label: 'Automated Email Sequences', included: true },
            { label: 'Standard Zapier Hooks', included: false },
            { label: 'Voice AI Integration', included: false },
        ]
    },
    {
        id: 'ai-growth',
        name: 'Autopilot Growth',
        description: 'Advanced conversational agents + WhatsApp automation + CRM routing.',
        icon: <Workflow className="w-8 h-8" />,
        priceMonthly: 59000,
        priceYearly: 59000 * 10,
        users: 'Business process automation',
        features: [
            { label: 'Custom Trained AI Chatbot (GPT-4o)', included: true },
            { label: 'WhatsApp Business API Autonomy', included: true },
            { label: 'Multi-step Agent Workflows (Make/n8n)', included: true },
            { label: 'Intelligent Lead Qualification logic', included: true },
            { label: 'Two-way CRM Integration', included: true },
        ],
        recommended: true,
    },
    {
        id: 'ai-scale',
        name: 'Enterprise Matrix',
        description: 'Full custom AI ecosystem (autonomous agents + internal knowledge bases).',
        icon: <BrainCircuit className="w-8 h-8" />,
        priceMonthly: 120000,
        priceYearly: 120000 * 10,
        users: 'Enterprise autonomy',
        features: [
            { label: 'Custom RAG / Internal Knowledge Base', included: true },
            { label: 'Multi-Agent Autonomous Systems', included: true },
            { label: 'Voice AI Phone Agents', included: true },
            { label: 'Complex Data Pipelines & Security', included: true },
            { label: 'Dedicated AI Engineer', included: true },
        ]
    }
];

const saasPlans: PricingPlan[] = [
    {
        id: 'saas-mvp',
        name: 'AI MVP',
        description: 'Rapid prototyping of AI-powered SaaS solutions for market validation.',
        icon: <Database className="w-8 h-8" />,
        priceMonthly: 75000,
        priceYearly: 75000 * 10,
        users: 'For stealth startups',
        features: [
            { label: 'Core AI Model Integration', included: true },
            { label: 'Basic User Authentication', included: true },
            { label: 'Stripe Billing Setup', included: true },
            { label: 'MVP UI/UX Design', included: true },
            { label: 'Scalable Cloud Hosting', included: false },
        ]
    },
    {
        id: 'saas-pro',
        name: 'SaaS Platform',
        description: 'Fully featured AI software platform ready for user acquisition.',
        icon: <BarChart3 className="w-8 h-8" />,
        priceMonthly: 150000,
        priceYearly: 150000 * 10,
        users: 'For growing platforms',
        features: [
            { label: 'Advanced AI Pipelines & RAG', included: true },
            { label: 'Tiered Subscription Management', included: true },
            { label: 'Admin & User Dashboards', included: true },
            { label: 'Custom API Development', included: true },
            { label: 'Scalable AWS/GCP Infrastructure', included: true },
        ],
        recommended: true,
    },
    {
        id: 'saas-enterprise',
        name: 'Enterprise App',
        description: 'Bespoke AI solutions with high compliance and custom large language models.',
        icon: <LineChart className="w-8 h-8" />,
        priceMonthly: 300000,
        priceYearly: 300000 * 10,
        users: 'For specialized tech',
        features: [
            { label: 'Fine-tuned / Custom LLMs', included: true },
            { label: 'Enterprise Security & Compliance', included: true },
            { label: 'Multi-tenant Architecture', included: true },
            { label: 'Dedicated Infrastructure Management', included: true },
            { label: '24/7 Priority Support & SLAs', included: true },
        ]
    }
];

type Category = 'web' | 'ai' | 'saas';

export default function Pricing() {
    const [activeCategory, setActiveCategory] = useState<Category>('ai');

    const categories: { id: Category; label: string }[] = [
        { id: 'ai', label: 'AI & Automation' },
        { id: 'web', label: 'Intelligent Web & Growth Systems' },
        { id: 'saas', label: 'SaaS using AI' },
    ];

    const getPlans = () => {
        switch (activeCategory) {
            case 'web': return webPlans;
            case 'ai': return aiPlans;
            case 'saas': return saasPlans;
            default: return webPlans;
        }
    };

    return (
        <section id="pricing" className="bg-ai-black min-h-screen relative py-12 md:py-24 border-t border-white/10 shadow-[0_-20px_60px_rgba(0,0,0,0.5)]">

            {/* Category Switcher */}
            <div className="container mx-auto px-4 mb-2">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 md:mb-8 tracking-tighter">Strategic Investment</h2>
                    <p className="text-zinc-400 mb-6 md:mb-12 max-w-2xl mx-auto">
                        Transparent pricing designed to scale with your ambition. Choose the intelligence layer that fits your growth stage.
                    </p>

                    <div className="relative inline-block max-w-full w-full">
                        <div className="flex flex-wrap justify-center gap-2 p-1 bg-white/5 rounded-xl border border-white/10 mb-6 md:mb-8 w-full md:w-auto mx-auto">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={cn(
                                        "px-3 py-2 md:px-6 md:py-3 rounded-lg text-[10px] md:text-sm font-medium transition-all leading-tight flex-1 md:flex-none min-w-[30%]",
                                        activeCategory === cat.id
                                            ? "bg-ai-blue text-white shadow-lg shadow-ai-blue/20"
                                            : "text-zinc-400 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Pricing Module */}
            <div className="relative">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-ai-blue/5 rounded-full blur-[120px] pointer-events-none" />

                <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <PricingModule
                        title={categories.find(c => c.id === activeCategory)?.label}
                        subtitle="Detailed breakdown of features and capabilities."
                        plans={getPlans()}
                        buttonLabel="Inquire Now"
                        className="bg-transparent pt-0" // Remove background/padding as wrapper handles it
                    />
                </motion.div>
            </div>

        </section>
    );
}
