'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { ChatVisual, DashboardVisual, BrowserVisual } from './Visuals';
import { services, type Service } from '@/lib/content';
import { cn } from '@/lib/utils';

// One look per panel so each slide reads as its own chapter.
const themes = [
    {
        panel: 'bg-surface text-paper',
        muted: 'text-muted',
        chip: 'border-brand/30 bg-brand/10 text-brand-soft',
        check: 'text-brand-soft',
        cta: 'bg-brand text-white',
        tag: 'border-line text-muted',
        glow: 'bg-brand/25',
    },
    {
        panel: 'bg-paper text-ink',
        muted: 'text-ink/60',
        chip: 'border-ink/15 bg-ink/5 text-ink/80',
        check: 'text-brand-deep',
        cta: 'bg-ink text-paper',
        tag: 'border-ink/15 text-ink/60',
        glow: 'bg-brand/30',
    },
    {
        panel: 'bg-gradient-to-br from-brand to-brand-deep text-white',
        muted: 'text-white/75',
        chip: 'border-white/30 bg-white/15 text-white',
        check: 'text-white',
        cta: 'bg-white text-ink',
        tag: 'border-white/30 text-white/80',
        glow: 'bg-white/20',
    },
];

const visuals = [<ChatVisual key="c" />, <DashboardVisual key="d" />, <BrowserVisual key="b" />];

function Panel({
    s,
    i,
    total,
    progress,
    detailed,
}: {
    s: Service;
    i: number;
    total: number;
    progress: MotionValue<number>;
    detailed: boolean;
}) {
    const t = themes[i % themes.length];
    // While the next panel slides over this one, push it back and dim it.
    const start = i / (total - 1);
    const end = (i + 1) / (total - 1);
    const isLast = i === total - 1;
    const scale = useTransform(progress, [start, end], [1, isLast ? 1 : 0.9]);
    const dim = useTransform(progress, [start, end], [0, isLast ? 0 : 0.55]);
    const radius = useTransform(progress, [start, end], [36, isLast ? 36 : 48]);

    return (
        <motion.section
            id={s.id}
            style={{ scale, borderTopLeftRadius: radius, borderTopRightRadius: radius }}
            className={cn(
                'sticky top-0 flex h-[100svh] origin-top items-center overflow-hidden shadow-[0_-30px_80px_-20px_rgba(0,0,0,0.6)]',
                t.panel
            )}
        >
            <div className={cn('pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full blur-[120px]', t.glow)} />

            <div className="relative mx-auto grid w-full max-w-6xl items-center gap-6 px-5 pt-14 md:grid-cols-[1.05fr_1fr] md:gap-14 md:px-8 md:pt-10">
                <div>
                    <div className="mb-5 flex items-center gap-3 text-sm">
                        <span className={cn('font-mono', t.muted)}>
                            0{i + 1} / 0{total}
                        </span>
                        <span className={cn('rounded-full border px-3 py-1 font-mono text-xs', t.chip)}>{s.timeline}</span>
                    </div>
                    <h3 className="mb-4 text-[clamp(2.25rem,5.5vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.045em]">{s.title}</h3>
                    <p className={cn('mb-6 max-w-lg text-base leading-relaxed md:text-lg', t.muted)}>{detailed ? s.description : s.short}</p>

                    <ul className="mb-7 space-y-2.5">
                        {s.outcomes.slice(0, detailed ? 5 : 4).map((o, k) => (
                            <li key={o} className={cn('items-start gap-3 text-sm md:text-[15px]', k > 2 ? 'hidden md:flex' : 'flex')}>
                                <Check size={17} className={cn('mt-0.5 shrink-0', t.check)} />
                                {o}
                            </li>
                        ))}
                    </ul>

                    {detailed && (
                        <div className="mb-7 hidden flex-wrap gap-2 md:flex">
                            {s.stack.map((x) => (
                                <span key={x} className={cn('rounded-full border px-3 py-1 font-mono text-xs', t.tag)}>
                                    {x}
                                </span>
                            ))}
                        </div>
                    )}

                    <Link
                        href={`/?interest=${encodeURIComponent(s.title)}#contact`}
                        className={cn('group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-transform hover:scale-[1.03]', t.cta)}
                    >
                        Start your project
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="order-first h-[26svh] rounded-3xl border border-white/10 bg-ink p-4 shadow-2xl md:order-none md:h-[min(420px,48vh)] md:p-6">
                    {visuals[i % visuals.length]}
                </div>
            </div>

            {/* dims this panel as the next one covers it */}
            <motion.div style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-black" />
        </motion.section>
    );
}

/**
 * Full-screen service panels that stick to the top and stack:
 * each new panel slides up over the last, which recedes and dims.
 */
export default function StackedServices({ detailed = false }: { detailed?: boolean }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

    return (
        <div ref={ref} className="relative">
            {services.map((s, i) => (
                <Panel key={s.id} s={s} i={i} total={services.length} progress={scrollYProgress} detailed={detailed} />
            ))}
        </div>
    );
}
