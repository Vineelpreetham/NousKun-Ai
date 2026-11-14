'use client';

import { motion } from 'framer-motion';
import { WordsReveal, Reveal } from '@/components/motion/Reveal';
import { workforce } from '@/lib/content';

const ease = [0.22, 1, 0.36, 1] as const;

/** A unique, deterministic gradient "face" per agent. */
function Avatar({ seed, name }: { seed: number; name: string }) {
    const hue = 210 + ((seed * 23) % 40);
    return (
        <div
            className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl"
            style={{ background: `conic-gradient(from ${seed * 45}deg, hsl(${hue} 95% 62%), hsl(${hue + 25} 90% 35%), hsl(${hue - 10} 95% 70%), hsl(${hue} 95% 62%))` }}
        >
            <div className="absolute inset-[3px] rounded-[13px] bg-ink-2/85" />
            <span className="relative text-lg font-semibold text-paper">{name[0]}</span>
            <span className="absolute bottom-1.5 right-1.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-ink-2" />
        </div>
    );
}

export default function Workforce() {
    return (
        <section className="relative overflow-hidden px-5 py-24 md:px-8 md:py-32">
            <div className="pointer-events-none absolute left-1/2 top-1/3 h-[400px] w-[900px] -translate-x-1/2 rounded-full bg-brand/10 blur-[140px]" />
            <div className="relative mx-auto max-w-6xl">
                <div className="mb-14 grid gap-6 md:grid-cols-2 md:items-end">
                    <div>
                        <p className="mb-6 flex items-center gap-3 text-sm text-muted">
                            <span className="h-px w-8 bg-brand" /> Your digital team
                        </p>
                        <h2 className="text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1] tracking-[-0.04em] text-paper">
                            <WordsReveal text="New hires." />{' '}
                            <WordsReveal text="Always on shift." className="serif text-brand-soft" delay={0.2} />
                        </h2>
                    </div>
                    <Reveal delay={0.2}>
                        <p className="max-w-md text-muted md:ml-auto">
                            Every AI agent we build has one job, does it 24/7 and reports to your team. Here are some of the roles we build and run for clients.
                        </p>
                    </Reveal>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {workforce.map((w, i) => (
                        <motion.article
                            key={w.code}
                            initial={{ opacity: 0, y: 40, rotate: i % 2 ? 2 : -2 }}
                            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.8, ease, delay: (i % 4) * 0.08 }}
                            whileHover={{ y: -6, rotate: i % 2 ? 1 : -1 }}
                            className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface/80 p-5 pt-7 backdrop-blur"
                        >
                            {/* badge lanyard slot */}
                            <span className="absolute left-1/2 top-2.5 h-1.5 w-10 -translate-x-1/2 rounded-full bg-white/10" />
                            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_40%,rgba(156,192,255,0.08)_50%,transparent_60%)] bg-[length:250%_100%] bg-[position:100%_0] transition-[background-position] duration-700 group-hover:bg-[position:0%_0]" />

                            <div className="mb-5 flex items-start justify-between">
                                <Avatar seed={i} name={w.name} />
                                <span className="font-mono text-[11px] text-muted">{w.code}</span>
                            </div>

                            <h3 className="text-lg font-medium tracking-tight text-paper">{w.name}</h3>
                            <p className="mb-3 text-sm text-brand-soft">{w.role}</p>
                            <p className="mb-6 text-sm leading-relaxed text-muted">{w.task}</p>

                            <div className="mt-auto flex items-center justify-between border-t border-line pt-4 text-xs">
                                <span className="flex items-center gap-1.5 text-emerald-400">
                                    <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emerald-400" />
                                    On shift · 24/7
                                </span>
                                <span className="text-muted">{w.tag}</span>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
