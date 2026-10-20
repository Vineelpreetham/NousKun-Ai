'use client';

import Link from 'next/link';
import { useRef, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { CaseStudy } from '@/lib/case-studies';

/** Case study card with 3D tilt and an accent-coloured glow. */
export default function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
    const ref = useRef<HTMLAnchorElement>(null);
    const mx = useMotionValue(0.5);
    const my = useMotionValue(0.5);
    const rx = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 200, damping: 20 });
    const ry = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 });

    const onMove = (e: MouseEvent) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
    };
    const reset = () => {
        mx.set(0.5);
        my.set(0.5);
    };

    const lead = study.results[0];

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: 1000 }}
            className="h-full"
        >
            <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }} className="h-full">
                <Link
                    ref={ref}
                    href={`/case-studies/${study.slug}`}
                    onMouseMove={onMove}
                    onMouseLeave={reset}
                    className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface p-6 transition-colors hover:border-white/15 md:p-7"
                >
                    <div
                        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-30 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
                        style={{ background: study.accentColor }}
                    />
                    <div className="relative mb-10 flex items-center justify-between">
                        <span className="rounded-full border border-line bg-white/[0.03] px-3 py-1 text-xs text-muted">{study.industry}</span>
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 group-hover:rotate-45 group-hover:border-paper group-hover:bg-paper group-hover:text-ink">
                            <ArrowUpRight size={16} />
                        </span>
                    </div>

                    <div className="relative mt-auto" style={{ transform: 'translateZ(30px)' }}>
                        <p className="text-6xl font-medium tracking-[-0.05em] md:text-7xl" style={{ color: study.accentColor }}>
                            {lead.metric}
                        </p>
                        <p className="mb-6 text-sm text-muted">{lead.value}</p>
                        <h3 className="text-lg font-medium leading-snug tracking-tight text-paper md:text-xl">{study.title}</h3>
                        <p className="mt-3 text-sm text-muted">
                            {study.serviceLabel} · {study.duration}
                        </p>
                    </div>
                </Link>
            </motion.div>
        </motion.div>
    );
}
