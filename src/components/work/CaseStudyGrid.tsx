'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CaseStudyCard from '@/components/CaseStudyCard';
import { caseStudies } from '@/lib/case-studies';
import { cn } from '@/lib/utils';

type Filter = 'all' | 'ai' | 'web' | 'saas';

const filters: { id: Filter; label: string }[] = [
    { id: 'all', label: 'All work' },
    { id: 'ai', label: 'AI & Automation' },
    { id: 'saas', label: 'AI SaaS' },
    { id: 'web', label: 'Websites' },
];

export default function CaseStudyGrid() {
    const [active, setActive] = useState<Filter>('all');
    const list = active === 'all' ? caseStudies : caseStudies.filter((c) => c.service === active);

    return (
        <section className="px-5 pb-24 md:px-8 md:pb-32">
            <div className="mx-auto max-w-6xl">
                <div className="mb-10 inline-flex max-w-full overflow-x-auto rounded-full border border-line bg-white/[0.03] p-1 scrollbar-hide">
                    {filters.map((f) => (
                        <button
                            key={f.id}
                            onClick={() => setActive(f.id)}
                            className={cn('relative whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors', active === f.id ? 'text-ink' : 'text-muted hover:text-paper')}
                        >
                            {active === f.id && (
                                <motion.span layoutId="work-tab" className="absolute inset-0 rounded-full bg-paper" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
                            )}
                            <span className="relative">{f.label}</span>
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        {list.length === 0 ? (
                            <p className="py-20 text-center text-muted">New case studies in this category are coming soon.</p>
                        ) : (
                            <div className="grid auto-rows-[minmax(380px,auto)] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {list.map((s, i) => (
                                    <CaseStudyCard key={s.slug} study={s} index={i} />
                                ))}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
