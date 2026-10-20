import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import PageHeader from '@/components/site/PageHeader';
import SpotlightCard from '@/components/motion/SpotlightCard';
import { Reveal } from '@/components/motion/Reveal';
import { ChatVisual, FlowVisual, BrowserVisual, DashboardVisual } from '@/components/home/Visuals';
import Pricing from '@/components/Pricing';
import { services } from '@/lib/content';

export const metadata: Metadata = {
    title: 'AI Automation Services — AI Agents, WhatsApp Automation, Websites & SaaS',
    description:
        'Custom AI agents and chatbots, WhatsApp Business API automation, n8n/Make workflow automation, Next.js websites and AI SaaS development by NousKun AI.',
    alternates: { canonical: '/services' },
};

const visuals = [<ChatVisual key="c" />, <FlowVisual key="f" />, <BrowserVisual key="b" />, <DashboardVisual key="d" />];

export default function ServicesPage() {
    return (
        <>
            <PageHeader
                eyebrow="Services"
                title="Four ways we put AI"
                accent="to work for you."
                intro="Pick one, or combine them into a single connected system. Everything we build talks to everything else."
            />

            <section className="px-5 pb-12 md:px-8">
                <div className="mx-auto max-w-6xl space-y-6">
                    {services.map((s, i) => (
                        <Reveal key={s.id} id={s.id} className="scroll-mt-28">
                            <SpotlightCard>
                                <div className="relative z-10 grid gap-10 p-7 md:grid-cols-2 md:p-12">
                                    <div className={i % 2 ? 'md:order-2' : ''}>
                                        <p className="mb-3 font-mono text-xs text-muted">0{i + 1}</p>
                                        <h2 className="mb-4 text-3xl font-medium tracking-[-0.03em] text-paper md:text-4xl">{s.title}</h2>
                                        <p className="mb-8 leading-relaxed text-muted">{s.description}</p>
                                        <ul className="mb-8 space-y-3">
                                            {s.outcomes.map((o) => (
                                                <li key={o} className="flex items-start gap-3 text-sm text-paper/85">
                                                    <Check size={16} className="mt-0.5 shrink-0 text-brand-soft" />
                                                    {o}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="mb-8 flex flex-wrap gap-2">
                                            {s.stack.map((t) => (
                                                <span key={t} className="rounded-full border border-line bg-white/[0.02] px-3 py-1 text-xs text-muted">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                        <Link
                                            href={`/?interest=${encodeURIComponent(s.title)}#contact`}
                                            className="group inline-flex items-center gap-2 rounded-full bg-paper px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-white"
                                        >
                                            Start with {s.title}
                                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </div>
                                    <div className="flex min-h-[260px] items-center rounded-2xl border border-line bg-ink/50 p-6 md:min-h-[360px]">
                                        <div className="h-[240px] w-full">{visuals[i]}</div>
                                    </div>
                                </div>
                            </SpotlightCard>
                        </Reveal>
                    ))}
                </div>
            </section>

            <Pricing />
        </>
    );
}
