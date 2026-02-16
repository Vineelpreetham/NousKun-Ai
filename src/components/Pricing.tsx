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
    TrendingUp,
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
            { label: 'Core UX/UI', included: true },
            { label: 'Basic Animations', included: true },
            { label: 'CMS Setup', included: true },
            { label: 'Standard SEO Setup', included: true },
        ]
    },
    {
        id: 'web-growth',
        name: 'Growth',
        description: 'For serious businesses wanting performance + conversion focus.',
        icon: <Rocket className="w-8 h-8" />,
        priceMonthly: 55000,
        priceYearly: 55000 * 10,
        users: 'For growing businesses',
        features: [
            { label: 'Advanced UI & Motion Effects', included: true },
            { label: 'Conversion-Focused UX', included: true },
            { label: 'SEO-Ready Structure', included: true },
            { label: 'Headless CMS Integration', included: true },
            { label: 'Performance Optimization', included: true },
        ],
        recommended: true,
    },
    {
        id: 'web-scale',
        name: 'Scale',
        description: 'Full premium system. Custom architecture, high-performance animations, advanced integrations.',
        icon: <Gem className="w-8 h-8" />,
        priceMonthly: 110000,
        priceYearly: 110000 * 10,
        users: 'For market leaders',
        features: [
            { label: 'Custom Web Application', included: true },
            { label: 'Complex Backend Integration', included: true },
            { label: 'Global CDN & Optimization', included: true },
            { label: 'Dedicated Design Team', included: true },
            { label: '24/7 SLAs', included: true },
        ]
    }
];

const aiPlans: PricingPlan[] = [
    {
        id: 'ai-starter',
        name: 'Starter',
        description: 'Basic lead capture automation + email workflows.',
        icon: <Bot className="w-8 h-8" />,
        priceMonthly: 22000,
        priceYearly: 22000 * 10,
        users: 'Entry-level automation',
        features: [
            { label: 'Lead Capture System', included: true },
            { label: 'Basic Email Sequences', included: true },
            { label: 'Standard Chatbot', included: true },
            { label: 'Simple Zapier Workflows', included: false },
            { label: 'WhatsApp API Integration', included: false },
        ]
    },
    {
        id: 'ai-growth',
        name: 'Growth',
        description: 'Lead qualification + WhatsApp automation + CRM integration.',
        icon: <Workflow className="w-8 h-8" />,
        priceMonthly: 48000,
        priceYearly: 48000 * 10,
        users: 'Business process automation',
        features: [
            { label: 'WhatsApp Business API', included: true },
            { label: 'Custom AI Chatbot (GPT-4)', included: true },
            { label: 'Multi-step Zapier/Make Automations', included: true },
            { label: 'Lead Qualification Logic', included: true },
            { label: 'CRM Integration', included: true },
        ],
        recommended: true,
    },
    {
        id: 'ai-scale',
        name: 'Scale',
        description: 'Full AI automation stack (chatbot + advanced workflows + multi-channel automation).',
        icon: <BrainCircuit className="w-8 h-8" />,
        priceMonthly: 95000,
        priceYearly: 95000 * 10,
        users: 'Enterprise automation',
        features: [
            { label: 'Custom LLM Training/Fine-tuning', included: true },
            { label: 'Autonomous Agents', included: true },
            { label: 'Complex Data Pipelines', included: true },
            { label: 'Enterprise Security', included: true },
            { label: 'Dedicated AI Engineer', included: true },
        ]
    }
];

const growthPlans: PricingPlan[] = [
    {
        id: 'growth-starter',
        name: 'Starter',
        description: 'Technical SEO + tracking setup.',
        icon: <TrendingUp className="w-8 h-8" />,
        priceMonthly: 18000,
        priceYearly: 18000 * 10,
        users: 'Basic tracking',
        features: [
            { label: 'Google Analytics 4 Setup', included: true },
            { label: 'Basic SEO Audit', included: true },
            { label: 'Monthly Performance Report', included: true },
            { label: 'Competitor Analysis', included: false },
            { label: 'Conversion Rate Optimization', included: false },
        ]
    },
    {
        id: 'growth-growth',
        name: 'Growth',
        description: 'Funnel tracking + AI-driven content + performance analysis.',
        icon: <BarChart3 className="w-8 h-8" />,
        priceMonthly: 38000,
        priceYearly: 38000 * 10,
        users: 'Performance marketing',
        features: [
            { label: 'Technical SEO Optimization', included: true },
            { label: 'Funnel Analytics & Heatmaps', included: true },
            { label: 'AI Search Content Strategy', included: true },
            { label: 'Performance Marketing Assets', included: true },
            { label: 'Bi-weekly Strategy Calls', included: true },
        ],
        recommended: true,
    },
    {
        id: 'growth-scale',
        name: 'Scale',
        description: 'Complete growth infrastructure + analytics + strategic optimization.',
        icon: <LineChart className="w-8 h-8" />,
        priceMonthly: 75000,
        priceYearly: 75000 * 10,
        users: 'Data-driven expansion',
        features: [
            { label: 'Advanced User Behavior Analysis', included: true },
            { label: 'Cross-channel Attribution', included: true },
            { label: 'Predictive Analytics', included: true },
            { label: 'Custom Dashboard Development', included: true },
            { label: 'Weekly Growth Sprints', included: true },
        ]
    }
];

type Category = 'web' | 'ai' | 'growth';

export default function Pricing() {
    const [activeCategory, setActiveCategory] = useState<Category>('web');

    const categories: { id: Category; label: string }[] = [
        { id: 'web', label: 'Intelligent Web Systems' },
        { id: 'ai', label: 'AI & Automation' },
        { id: 'growth', label: 'Growth Intelligence' },
    ];

    const getPlans = () => {
        switch (activeCategory) {
            case 'web': return webPlans;
            case 'ai': return aiPlans;
            case 'growth': return growthPlans;
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
