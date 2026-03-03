'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { caseStudies } from '@/lib/case-studies';
import CaseStudyCard from '@/components/CaseStudyCard';
import { cn } from '@/lib/utils';

type Filter = 'all' | 'ai' | 'web' | 'saas';

const filters: { id: Filter; label: string }[] = [
    { id: 'all', label: 'All Work' },
    { id: 'ai', label: 'AI & Automation' },
    { id: 'saas', label: 'SaaS using AI' },
    { id: 'web', label: 'Intelligent Web' },
];

export default function CaseStudiesPage() {
    const [activeFilter, setActiveFilter] = useState<Filter>('all');

    const filtered = activeFilter === 'all'
        ? caseStudies
        : caseStudies.filter((cs) => cs.service === activeFilter);

    return (
        <main className="min-h-screen bg-ai-black text-white">
            {/* Hero */}
            <section className="relative pt-32 pb-20 px-6 md:px-8 overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-ai-blue/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-6xl mx-auto relative z-10">
                    <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-xs font-mono tracking-widest uppercase mb-10">
                        <ArrowLeft size={14} /> Back to Home
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <p className="text-xs font-mono tracking-[0.3em] text-ai-blue uppercase mb-4">Intelligence at Work</p>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6">
                            Proof of<br /><span className="text-ai-blue">Results.</span>
                        </h1>
                        <p className="text-zinc-400 text-lg max-w-xl leading-relaxed">
                            Real systems. Measurable outcomes. Every engagement is engineered for impact.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filter Bar */}
            <section className="sticky top-16 z-30 bg-ai-black/80 backdrop-blur-sm border-b border-white/5">
                <div className="max-w-6xl mx-auto px-6 md:px-8 py-4 flex gap-2 overflow-x-auto">
                    {filters.map((f) => (
                        <button
                            key={f.id}
                            onClick={() => setActiveFilter(f.id)}
                            className={cn(
                                'px-4 py-2 rounded-lg text-xs font-mono tracking-widest uppercase whitespace-nowrap transition-all',
                                activeFilter === f.id
                                    ? 'bg-ai-blue text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                                    : 'text-zinc-500 hover:text-white hover:bg-white/5'
                            )}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </section>

            {/* Grid */}
            <section className="max-w-6xl mx-auto px-6 md:px-8 py-16">
                {filtered.length === 0 ? (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-zinc-500 text-center py-20 font-mono"
                    >
                        No case studies in this category yet.
                    </motion.p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((study, i) => (
                            <CaseStudyCard key={study.slug} study={study} index={i} />
                        ))}
                    </div>
                )}
            </section>

            {/* Bottom CTA */}
            <section className="max-w-6xl mx-auto px-6 md:px-8 pb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="border border-white/5 rounded-2xl p-10 text-center bg-ai-card relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-ai-blue/5 to-transparent pointer-events-none" />
                    <p className="text-xs font-mono tracking-widest text-ai-blue uppercase mb-4">Your business next?</p>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-4">
                        Ready to Build Something Real?
                    </h2>
                    <p className="text-zinc-400 mb-8 max-w-md mx-auto">
                        Every system starts with a conversation. Tell us your problem — we'll engineer the solution.
                    </p>
                    <Link
                        href="/#contact"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-ai-blue text-white font-bold rounded-lg hover:bg-blue-600 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                    >
                        INITIATE A PROJECT
                    </Link>
                </motion.div>
            </section>
        </main>
    );
}
