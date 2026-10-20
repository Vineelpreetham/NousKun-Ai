'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { WordsReveal, Reveal } from '@/components/motion/Reveal';
import { faqs } from '@/lib/content';

export default function FAQ() {
    const [open, setOpen] = useState<number | null>(0);

    return (
        <section className="relative px-5 py-24 md:px-8 md:py-32">
            <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
                <div className="md:sticky md:top-32 md:self-start">
                    <h2 className="text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1] tracking-[-0.04em] text-paper">
                        <WordsReveal text="Questions," />{' '}
                        <WordsReveal text="answered." className="serif text-brand-soft" delay={0.15} />
                    </h2>
                    <Reveal delay={0.2}>
                        <p className="mt-5 max-w-xs text-muted">Can&apos;t find what you need? Ask the AI strategist in the corner — or book a call.</p>
                    </Reveal>
                </div>

                <div className="divide-y divide-line border-y border-line">
                    {faqs.map((f, i) => {
                        const isOpen = open === i;
                        return (
                            <div key={f.q}>
                                <h3>
                                    <button
                                        onClick={() => setOpen(isOpen ? null : i)}
                                        aria-expanded={isOpen}
                                        className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-medium tracking-tight text-paper transition-colors hover:text-brand-soft md:text-xl"
                                    >
                                        {f.q}
                                        <motion.span
                                            animate={{ rotate: isOpen ? 45 : 0 }}
                                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line"
                                        >
                                            <Plus size={16} />
                                        </motion.span>
                                    </button>
                                </h3>
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <p className="max-w-xl pb-6 leading-relaxed text-muted">{f.a}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
