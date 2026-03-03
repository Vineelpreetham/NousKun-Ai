'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Clock } from 'lucide-react';
import { CaseStudy } from '@/lib/case-studies';

export default function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Link href={`/case-studies/${study.slug}`} className="block group h-full">
                <div className="h-full bg-ai-card border border-white/5 rounded-2xl overflow-hidden hover:border-white/15 transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,0,0,0.4)] hover:-translate-y-1">
                    {/* Gradient Cover */}
                    <div className={`relative h-40 bg-gradient-to-br ${study.coverGradient} bg-ai-black flex items-end p-6`}>
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />
                        <div className="relative z-10 inline-flex items-center gap-2">
                            <span
                                className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full border"
                                style={{ color: study.accentColor, borderColor: `${study.accentColor}40`, backgroundColor: `${study.accentColor}10` }}
                            >
                                {study.serviceLabel}
                            </span>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 flex items-center gap-1">
                                <Clock size={10} /> {study.duration}
                            </span>
                        </div>
                        {/* Arrow icon */}
                        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                            <ArrowUpRight size={14} className="text-zinc-400 group-hover:text-white transition-colors" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col gap-4">
                        <div>
                            <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">{study.industry}</p>
                            <h3 className="text-white font-bold text-lg leading-snug group-hover:text-ai-blue transition-colors">{study.title}</h3>
                            <p className="text-zinc-500 text-sm mt-2 leading-relaxed">{study.tagline}</p>
                        </div>

                        {/* Key Metrics Preview */}
                        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/5">
                            {study.results.slice(0, 2).map((result, i) => (
                                <div key={i}>
                                    <div className="text-white font-bold text-xl" style={{ color: study.accentColor }}>{result.metric}</div>
                                    <div className="text-zinc-500 text-xs leading-tight">{result.value}</div>
                                </div>
                            ))}
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 pt-1">
                            {study.tags.slice(0, 3).map((tag) => (
                                <span key={tag} className="text-[10px] font-mono text-zinc-600 bg-white/3 border border-white/5 px-2 py-0.5 rounded-full">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
