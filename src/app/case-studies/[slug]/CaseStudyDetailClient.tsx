'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Clock, Building2 } from 'lucide-react';
import { CaseStudy } from '@/lib/case-studies';

export default function CaseStudyDetailClient({ study }: { study: CaseStudy }) {
    return (
        <main className="min-h-screen bg-ai-black text-white">
            {/* Hero */}
            <section className={`relative pt-32 pb-20 px-6 md:px-8 border-b border-white/5 bg-gradient-to-br ${study.coverGradient} bg-ai-black`}>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

                <div className="max-w-4xl mx-auto relative z-10">
                    <Link href="/case-studies" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-xs font-mono tracking-widest uppercase mb-10">
                        <ArrowLeft size={14} /> All Case Studies
                    </Link>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span
                            className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full border"
                            style={{ color: study.accentColor, borderColor: `${study.accentColor}40`, backgroundColor: `${study.accentColor}10` }}
                        >
                            {study.serviceLabel}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1.5">
                            <Building2 size={10} /> {study.industry}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1.5">
                            <Clock size={10} /> Delivered in {study.duration}
                        </span>
                    </div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-4 leading-tight"
                    >
                        {study.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-zinc-400 text-lg"
                    >
                        {study.tagline}
                    </motion.p>
                </div>
            </section>

            {/* Results Metrics */}
            <section className="max-w-4xl mx-auto px-6 md:px-8 py-16">
                <p className="text-xs font-mono tracking-[0.3em] text-zinc-500 uppercase mb-8">Key Outcomes</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                    {study.results.map((result, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-ai-card border border-white/5 rounded-xl p-5 hover:border-white/10 transition-colors"
                        >
                            <div className="text-3xl font-bold mb-1" style={{ color: study.accentColor }}>
                                {result.metric}
                            </div>
                            <div className="text-white font-semibold text-sm mb-1">{result.value}</div>
                            <div className="text-zinc-500 text-xs leading-relaxed">{result.description}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Challenge */}
                <div className="space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-xs font-mono tracking-[0.3em] text-zinc-500 uppercase mb-4">The Challenge</p>
                        <p className="text-zinc-300 text-lg leading-relaxed border-l-2 pl-6" style={{ borderColor: study.accentColor }}>
                            {study.challenge}
                        </p>
                    </motion.div>

                    {/* Solution */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-xs font-mono tracking-[0.3em] text-zinc-500 uppercase mb-4">What We Built</p>
                        <p className="text-zinc-300 text-lg leading-relaxed mb-6">{study.solution}</p>
                        <ul className="space-y-3">
                            {study.solutionPoints.map((point, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08 }}
                                    className="flex items-start gap-3 text-zinc-400"
                                >
                                    <CheckCircle size={16} className="mt-1 flex-shrink-0" style={{ color: study.accentColor }} />
                                    <span>{point}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Tags */}
                    <div>
                        <p className="text-xs font-mono tracking-[0.3em] text-zinc-500 uppercase mb-4">Stack & Approach</p>
                        <div className="flex flex-wrap gap-2">
                            {study.tags.map((tag) => (
                                <span key={tag} className="text-xs font-mono text-zinc-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="max-w-4xl mx-auto px-6 md:px-8 pb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="border border-white/5 rounded-2xl p-10 text-center bg-ai-card relative overflow-hidden"
                >
                    <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at center, ${study.accentColor}08 0%, transparent 70%)` }} />
                    <p className="text-xs font-mono tracking-widest uppercase mb-3" style={{ color: study.accentColor }}>
                        Want results like this?
                    </p>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-white mb-3">
                        Let's Build Your System.
                    </h2>
                    <p className="text-zinc-400 mb-8 max-w-sm mx-auto text-sm">
                        Every engagement starts with understanding your challenge. No fluff, no generic pitches.
                    </p>
                    <Link
                        href="/#contact"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition-all"
                    >
                        BOOK A STRATEGY CALL
                    </Link>
                </motion.div>
            </section>
        </main>
    );
}
