'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import type { CaseStudy } from '@/lib/case-studies';
import { Reveal, WordsReveal } from '@/components/motion/Reveal';
import { scrollToContact } from '@/components/site/Nav';

export default function CaseStudyDetailClient({ study }: { study: CaseStudy }) {
    return (
        <article>
            <header className="relative overflow-hidden px-5 pb-16 pt-36 md:px-8 md:pt-44">
                <div className="pointer-events-none absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
                <div className="pointer-events-none absolute -top-32 left-1/2 h-[460px] w-[760px] -translate-x-1/2 rounded-full opacity-25 blur-[130px]" style={{ background: study.accentColor }} />

                <div className="relative mx-auto max-w-4xl">
                    <Link href="/case-studies" className="mb-10 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-paper">
                        <ArrowLeft size={15} /> All case studies
                    </Link>
                    <Reveal className="mb-6 flex flex-wrap gap-2 text-xs">
                        {[study.serviceLabel, study.industry, `Delivered in ${study.duration}`].map((t) => (
                            <span key={t} className="rounded-full border border-line bg-white/[0.03] px-3 py-1 text-muted">
                                {t}
                            </span>
                        ))}
                    </Reveal>
                    <h1 className="text-[clamp(2.25rem,5.5vw,4.25rem)] font-medium leading-[1] tracking-[-0.04em] text-paper">
                        <WordsReveal text={study.title} animateOnMount stagger={0.04} />
                    </h1>
                    <Reveal delay={0.3}>
                        <p className="mt-6 max-w-2xl text-lg text-muted">{study.tagline}</p>
                    </Reveal>
                </div>
            </header>

            <section className="px-5 md:px-8">
                <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 md:grid-cols-4">
                    {study.results.map((r, i) => (
                        <motion.div
                            key={r.value}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08, duration: 0.6 }}
                            className="rounded-2xl border border-line bg-surface p-5"
                        >
                            <p className="text-3xl font-medium tracking-[-0.04em]" style={{ color: study.accentColor }}>
                                {r.metric}
                            </p>
                            <p className="mt-1 text-sm font-medium text-paper">{r.value}</p>
                            <p className="mt-2 text-xs leading-relaxed text-muted">{r.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="px-5 py-20 md:px-8">
                <div className="mx-auto max-w-3xl space-y-16">
                    <Reveal>
                        <h2 className="mb-4 text-sm text-muted">The challenge</h2>
                        <p className="border-l-2 pl-6 text-xl leading-relaxed text-paper/90" style={{ borderColor: study.accentColor }}>
                            {study.challenge}
                        </p>
                    </Reveal>
                    <Reveal>
                        <h2 className="mb-4 text-sm text-muted">What we built</h2>
                        <p className="mb-8 text-lg leading-relaxed text-paper/90">{study.solution}</p>
                        <ul className="space-y-3">
                            {study.solutionPoints.map((p) => (
                                <li key={p} className="flex items-start gap-3 text-muted">
                                    <Check size={17} className="mt-1 shrink-0" style={{ color: study.accentColor }} />
                                    {p}
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                    <Reveal>
                        <h2 className="mb-4 text-sm text-muted">Stack &amp; approach</h2>
                        <div className="flex flex-wrap gap-2">
                            {study.tags.map((t) => (
                                <span key={t} className="rounded-full border border-line bg-white/[0.03] px-3 py-1.5 text-xs text-muted">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </Reveal>

                    <Reveal className="rounded-3xl border border-line bg-surface p-8 text-center md:p-12">
                        <p className="mb-3 text-3xl font-medium tracking-[-0.03em] text-paper">
                            Want results <span className="serif text-brand-soft">like this?</span>
                        </p>
                        <p className="mx-auto mb-8 max-w-sm text-muted">Every engagement starts with understanding your problem. No generic pitches.</p>
                        <button
                            onClick={scrollToContact}
                            className="group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 font-medium text-white transition-shadow hover:shadow-[0_0_30px_-4px_rgba(77,142,255,0.7)]"
                        >
                            Book a strategy call
                            <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                        </button>
                    </Reveal>
                </div>
            </section>
        </article>
    );
}
