'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Minus, ArrowRight } from 'lucide-react';
import { WordsReveal, Reveal } from '@/components/motion/Reveal';
import { scrollToContact } from '@/components/site/Nav';
import { cn } from '@/lib/utils';

type Plan = {
    name: string;
    blurb: string;
    price: number;
    features: { label: string; included: boolean }[];
    recommended?: boolean;
};

const plans: Record<'ai' | 'web' | 'saas', Plan[]> = {
    ai: [
        {
            name: 'Starter Agent',
            blurb: 'Lead capture, an AI chatbot and automated email follow-ups.',
            price: 29000,
            features: [
                { label: 'AI chatbot for your website', included: true },
                { label: 'Lead capture & sync', included: true },
                { label: 'Automated email sequences', included: true },
                { label: 'Zapier / Make hooks', included: false },
                { label: 'Voice AI', included: false },
            ],
        },
        {
            name: 'Autopilot Growth',
            blurb: 'Conversational agents, WhatsApp automation and CRM routing.',
            price: 59000,
            recommended: true,
            features: [
                { label: 'Custom-trained AI chatbot', included: true },
                { label: 'WhatsApp Business API automation', included: true },
                { label: 'Multi-step workflows (Make / n8n)', included: true },
                { label: 'Intelligent lead qualification', included: true },
                { label: 'Two-way CRM integration', included: true },
            ],
        },
        {
            name: 'Enterprise Matrix',
            blurb: 'A full AI ecosystem: agents, knowledge bases and voice.',
            price: 120000,
            features: [
                { label: 'Custom RAG knowledge base', included: true },
                { label: 'Multi-agent systems', included: true },
                { label: 'Voice AI phone agents', included: true },
                { label: 'Data pipelines & security', included: true },
                { label: 'Dedicated AI engineer', included: true },
            ],
        },
    ],
    web: [
        {
            name: 'Starter',
            blurb: 'A polished, fast first website for early-stage founders.',
            price: 29000,
            features: [
                { label: 'Responsive design', included: true },
                { label: 'Core UX/UI & animations', included: true },
                { label: 'CMS setup', included: true },
                { label: 'Standard SEO setup', included: true },
                { label: 'Basic analytics', included: true },
            ],
        },
        {
            name: 'Growth Systems',
            blurb: 'Performance and conversion focus for serious businesses.',
            price: 55000,
            recommended: true,
            features: [
                { label: 'Advanced UI & motion', included: true },
                { label: 'Conversion-focused UX', included: true },
                { label: 'Technical SEO', included: true },
                { label: 'Funnel analytics & heatmaps', included: true },
                { label: 'Performance optimisation', included: true },
            ],
        },
        {
            name: 'Scale Infrastructure',
            blurb: 'Custom architecture, growth analytics and deep integrations.',
            price: 110000,
            features: [
                { label: 'Custom web architecture', included: true },
                { label: 'Predictive growth analytics', included: true },
                { label: 'Complex backend integration', included: true },
                { label: 'Dedicated design team', included: true },
                { label: 'Weekly growth sprints', included: true },
            ],
        },
    ],
    saas: [
        {
            name: 'AI MVP',
            blurb: 'Rapid AI product prototype to validate your market.',
            price: 75000,
            features: [
                { label: 'Core AI model integration', included: true },
                { label: 'User authentication', included: true },
                { label: 'Stripe billing', included: true },
                { label: 'MVP UI/UX design', included: true },
                { label: 'Scalable cloud hosting', included: false },
            ],
        },
        {
            name: 'SaaS Platform',
            blurb: 'A fully featured AI platform ready for real users.',
            price: 150000,
            recommended: true,
            features: [
                { label: 'Advanced AI pipelines & RAG', included: true },
                { label: 'Tiered subscriptions', included: true },
                { label: 'Admin & user dashboards', included: true },
                { label: 'Custom API development', included: true },
                { label: 'Scalable AWS / GCP infra', included: true },
            ],
        },
        {
            name: 'Enterprise App',
            blurb: 'Bespoke AI with compliance and custom models.',
            price: 300000,
            features: [
                { label: 'Fine-tuned / custom LLMs', included: true },
                { label: 'Enterprise security & compliance', included: true },
                { label: 'Multi-tenant architecture', included: true },
                { label: 'Dedicated infra management', included: true },
                { label: '24/7 priority support & SLAs', included: true },
            ],
        },
    ],
};

const tabs = [
    { id: 'ai', label: 'AI & Automation' },
    { id: 'web', label: 'Websites' },
    { id: 'saas', label: 'AI SaaS' },
] as const;

export default function Pricing() {
    const [tab, setTab] = useState<(typeof tabs)[number]['id']>('ai');

    return (
        <section id="pricing" className="relative px-5 py-24 md:px-8 md:py-32">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-[140px]" />
            <div className="relative mx-auto max-w-6xl">
                <div className="mb-12 text-center">
                    <h2 className="text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1] tracking-[-0.04em] text-paper">
                        <WordsReveal text="Clear pricing." />{' '}
                        <WordsReveal text="Serious ROI." className="serif text-brand-soft" delay={0.15} />
                    </h2>
                    <Reveal delay={0.2}>
                        <p className="mx-auto mt-5 max-w-lg text-muted">Starting prices in INR. Every project gets a fixed quote after a free call — no surprises.</p>
                    </Reveal>

                    <Reveal delay={0.25} className="mt-10 inline-flex rounded-full border border-line bg-white/[0.03] p-1">
                        {tabs.map((t) => (
                            <button
                                key={t.id}
                                onClick={() => setTab(t.id)}
                                className={cn('relative rounded-full px-4 py-2 text-sm transition-colors md:px-6', tab === t.id ? 'text-ink' : 'text-muted hover:text-paper')}
                            >
                                {tab === t.id && (
                                    <motion.span layoutId="price-tab" className="absolute inset-0 rounded-full bg-paper" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
                                )}
                                <span className="relative">{t.label}</span>
                            </button>
                        ))}
                    </Reveal>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <AnimatePresence mode="popLayout">
                        {plans[tab].map((p, i) => (
                            <motion.div
                                key={tab + p.name}
                                initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
                                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                                className={cn('relative rounded-3xl p-px', p.recommended ? 'overflow-hidden' : '')}
                            >
                                {p.recommended && (
                                    <div className="absolute left-1/2 top-1/2 aspect-square w-[200%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow bg-[conic-gradient(from_0deg,transparent_0%,#4d8eff_10%,transparent_25%,transparent_50%,#9cc0ff_60%,transparent_75%)]" />
                                )}
                                <div className={cn('relative flex h-full flex-col rounded-[23px] border p-7', p.recommended ? 'border-transparent bg-ink-2' : 'border-line bg-surface/70')}>
                                    <div className="mb-6 flex items-center justify-between">
                                        <h3 className="text-lg font-medium text-paper">{p.name}</h3>
                                        {p.recommended && <span className="rounded-full bg-brand/15 px-2.5 py-1 text-xs text-brand-soft">Most popular</span>}
                                    </div>
                                    <p className="text-sm text-muted">Starting from</p>
                                    <p className="mb-3 text-4xl font-medium tracking-[-0.04em] text-paper md:text-5xl">₹{p.price.toLocaleString('en-IN')}</p>
                                    <p className="mb-7 min-h-[40px] text-sm leading-relaxed text-muted">{p.blurb}</p>

                                    <ul className="mb-8 space-y-3">
                                        {p.features.map((f) => (
                                            <li key={f.label} className={cn('flex items-start gap-3 text-sm', f.included ? 'text-paper/85' : 'text-muted/50')}>
                                                {f.included ? <Check size={16} className="mt-0.5 shrink-0 text-brand-soft" /> : <Minus size={16} className="mt-0.5 shrink-0" />}
                                                {f.label}
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        onClick={scrollToContact}
                                        className={cn(
                                            'group mt-auto flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-medium transition-all',
                                            p.recommended ? 'bg-brand text-white hover:shadow-[0_0_30px_-4px_rgba(77,142,255,0.7)]' : 'border border-line text-paper hover:bg-white/[0.06]'
                                        )}
                                    >
                                        Get a quote
                                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
