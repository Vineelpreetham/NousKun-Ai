'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { WordsReveal } from '@/components/motion/Reveal';
import { processSteps } from '@/lib/content';

export default function Process({ heading = true }: { heading?: boolean }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.6', 'end 0.6'] });
    const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

    return (
        <section className="relative px-5 py-24 md:px-8 md:py-32">
            <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
                {heading && (
                    <div className="md:sticky md:top-32 md:self-start">
                        <p className="mb-6 flex items-center gap-3 text-sm text-muted">
                            <span className="h-px w-8 bg-brand" /> How we work
                        </p>
                        <h2 className="text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1] tracking-[-0.04em] text-paper">
                            <WordsReveal text="From messy to" />{' '}
                            <WordsReveal text="machine-smooth." className="serif text-brand-soft" delay={0.2} />
                        </h2>
                        <p className="mt-6 max-w-sm text-muted">
                            Four steps, one connected system. You see progress every week, and nothing ships that doesn&apos;t move a number.
                        </p>
                    </div>
                )}

                <div ref={ref} className={`relative ${heading ? '' : 'md:col-span-2 mx-auto max-w-3xl'}`}>
                    <div className="absolute bottom-0 left-[15px] top-0 w-px bg-line" />
                    <motion.div style={{ scaleY: progress }} className="absolute bottom-0 left-[15px] top-0 w-px origin-top bg-gradient-to-b from-brand via-brand-soft to-brand" />

                    <ol className="space-y-16">
                        {processSteps.map((p) => (
                            <motion.li
                                key={p.id}
                                initial={{ opacity: 0.25 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ margin: '-45% 0px -45% 0px' }}
                                transition={{ duration: 0.4 }}
                                className="relative pl-14"
                            >
                                <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-brand/50 bg-ink font-mono text-[11px] text-brand-soft">
                                    {p.id}
                                </span>
                                <p className="mb-2 text-sm text-brand-soft">{p.name}</p>
                                <h3 className="mb-3 text-2xl font-medium tracking-tight text-paper md:text-3xl">{p.title}</h3>
                                <p className="mb-5 max-w-lg leading-relaxed text-muted">{p.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {p.details.map((d) => (
                                        <span key={d} className="rounded-full border border-line bg-white/[0.02] px-3 py-1 text-xs text-muted">
                                            {d}
                                        </span>
                                    ))}
                                </div>
                            </motion.li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}
