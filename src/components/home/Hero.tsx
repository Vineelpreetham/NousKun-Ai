'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import DotField from '@/components/motion/DotField';
import Marquee from '@/components/motion/Marquee';
import MagneticButton from '@/components/ui/MagneticButton';
import { scrollToContact } from '@/components/site/Nav';
import HeroMark from './HeroMark';
import { toolStack } from '@/lib/content';
import { useLoaded } from '@/lib/loader';

const rotating = ['capture every lead.', 'reply in seconds.', 'book your meetings.', 'never clock out.'];
const ease = [0.22, 1, 0.36, 1] as const;

const headline = ['AI', 'systems', 'that'];

export default function Hero() {
    const ref = useRef<HTMLElement>(null);
    const ready = useLoaded();
    const [i, setI] = useState(0);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
    const textY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
    const markY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
    const markScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
    const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

    useEffect(() => {
        if (!ready) return;
        const id = setInterval(() => setI((n) => (n + 1) % rotating.length), 2600);
        return () => clearInterval(id);
    }, [ready]);

    const show = ready ? 'show' : 'hidden';

    return (
        <section ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden">
            <div className="absolute inset-0 opacity-60">
                <DotField />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,transparent_20%,#08090b_80%)]" />
            {/* giant outlined wordmark behind everything */}
            <motion.div
                aria-hidden
                initial={{ opacity: 0, y: 60 }}
                animate={ready ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.6, ease, delay: 0.4 }}
                className="pointer-events-none absolute inset-x-0 bottom-16 select-none text-center text-[22vw] font-semibold leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgba(156,192,255,0.09)]"
            >
                nouskun
            </motion.div>

            <div className="relative z-10 mx-auto grid w-full max-w-6xl flex-1 items-center gap-6 px-5 pb-10 pt-24 md:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-4 lg:pt-24">
                {/* copy */}
                <motion.div style={{ y: textY, opacity: fade }} className="order-2 text-center lg:order-1 lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={ready ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease, delay: 0.1 }}
                        className="mb-7 inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] py-1 pl-1 pr-3 text-xs text-muted backdrop-blur"
                    >
                        <span className="flex items-center gap-1.5 rounded-full bg-brand/15 px-2 py-0.5 font-medium text-brand-soft">
                            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-brand-soft" />
                            NousKun AI
                        </span>
                        AI automation company
                    </motion.div>

                    <h1 className="text-[clamp(2.6rem,6vw,4.75rem)] font-medium leading-[0.95] tracking-[-0.045em] text-paper">
                        <motion.span initial="hidden" animate={show} className="block">
                            {headline.map((w, k) => (
                                <span key={w} className="inline-block overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em]">
                                    <motion.span
                                        className="inline-block"
                                        variants={{ hidden: { y: '110%' }, show: { y: '0%', transition: { duration: 0.9, ease, delay: 0.2 + k * 0.08 } } }}
                                    >
                                        {w}
                                        {k < headline.length - 1 ? ' ' : ''}
                                    </motion.span>
                                </span>
                            ))}
                        </motion.span>
                        <span className="sr-only"> capture every lead, reply in seconds, book your meetings and never clock out.</span>
                        <span aria-hidden className="relative mt-1 block h-[1.1em] overflow-hidden">
                            <AnimatePresence mode="popLayout" initial={false}>
                                {ready && (
                                    <motion.span
                                        key={i}
                                        initial={{ y: '100%', opacity: 0, filter: 'blur(10px)' }}
                                        animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                                        exit={{ y: '-100%', opacity: 0, filter: 'blur(10px)' }}
                                        transition={{ duration: 0.7, ease }}
                                        className="serif absolute inset-x-0 block whitespace-nowrap bg-gradient-to-r from-brand-soft via-white to-brand bg-clip-text pr-2 text-transparent"
                                    >
                                        {rotating[i]}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={ready ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.9, ease, delay: 0.55 }}
                        className="mx-auto mt-7 max-w-lg text-base leading-relaxed text-muted md:text-lg lg:mx-0"
                    >
                        We build custom AI agents, WhatsApp automations and high-converting websites — wired into one system that
                        works for your business 24/7.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={ready ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.9, ease, delay: 0.7 }}
                        className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
                    >
                        <MagneticButton strength={0.25}>
                            <button
                                onClick={scrollToContact}
                                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-brand px-7 py-4 font-medium text-white shadow-[0_0_0_1px_rgba(255,255,255,0.12)_inset,0_10px_40px_-10px_rgba(77,142,255,0.8)]"
                            >
                                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                                Book a free strategy call
                                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                            </button>
                        </MagneticButton>
                        <Link
                            href="/case-studies"
                            className="group inline-flex items-center justify-center gap-2 rounded-full border border-line bg-white/[0.03] px-7 py-4 font-medium text-paper backdrop-blur transition-colors hover:bg-white/[0.07]"
                        >
                            See our work
                            <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </Link>
                    </motion.div>
                </motion.div>

                {/* animated logo system */}
                <motion.div
                    style={{ y: markY, scale: markScale, opacity: fade }}
                    className="order-1 mx-auto flex w-full max-w-[320px] justify-center sm:max-w-[420px] lg:order-2 lg:max-w-[560px]"
                >
                    <HeroMark start={ready} />
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={ready ? { opacity: 1 } : {}}
                transition={{ delay: 1.2, duration: 1 }}
                className="relative z-10 border-t border-line bg-ink/40 py-5 backdrop-blur-sm"
            >
                <Marquee duration={45}>
                    {toolStack.map((t) => (
                        <span key={t} className="mx-7 flex items-center gap-7 whitespace-nowrap text-sm text-muted">
                            {t}
                            <span className="h-1 w-1 rounded-full bg-brand/60" />
                        </span>
                    ))}
                </Marquee>
            </motion.div>
        </section>
    );
}
