'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { markLoaded } from '@/lib/loader';

const ease = [0.76, 0, 0.24, 1] as const;
const SEEN_KEY = 'nk-intro-seen';

/**
 * Branded intro: the N mark draws itself stroke by stroke, the node dots pop in,
 * a counter runs to 100, then the panel wipes up to reveal the page.
 * Plays once per browser session; skipped for reduced-motion users.
 */
export default function Preloader() {
    const [show, setShow] = useState(true);
    const count = useMotionValue(0);
    const rounded = useTransform(count, (v) => String(Math.round(v)).padStart(3, '0'));

    useEffect(() => {
        let seen = false;
        try {
            seen = sessionStorage.getItem(SEEN_KEY) === '1';
        } catch {}
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (seen || reduce) {
            // Hidden instantly via CSS already; just unmount and release the hero.
            const id = requestAnimationFrame(() => {
                setShow(false);
                markLoaded();
            });
            return () => cancelAnimationFrame(id);
        }

        document.documentElement.style.overflow = 'hidden';
        const controls = animate(count, 100, { duration: 2, ease: [0.65, 0, 0.35, 1] });
        const t = setTimeout(() => {
            setShow(false);
            try {
                sessionStorage.setItem(SEEN_KEY, '1');
            } catch {}
        }, 2400);
        return () => {
            controls.stop();
            clearTimeout(t);
        };
    }, [count]);

    return (
        <AnimatePresence
            onExitComplete={() => {
                document.documentElement.style.overflow = '';
                markLoaded();
            }}
        >
            {show && (
                <motion.div
                    id="nk-preloader"
                    key="preloader"
                    aria-hidden
                    className="fixed inset-0 z-[200] flex items-center justify-center bg-ink"
                    exit={{ clipPath: 'inset(0 0 100% 0)' }}
                    initial={{ clipPath: 'inset(0 0 0% 0)' }}
                    transition={{ duration: 0.9, ease }}
                >
                    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/20 blur-[120px]" />

                    <motion.div
                        className="relative flex flex-col items-center"
                        exit={{ scale: 1.25, opacity: 0, filter: 'blur(12px)' }}
                        transition={{ duration: 0.6, ease }}
                    >
                        <svg viewBox="0 0 100 100" className="h-28 w-28 md:h-36 md:w-36">
                            <defs>
                                <linearGradient id="pl-grad" gradientUnits="userSpaceOnUse" x1="20" y1="15" x2="80" y2="85">
                                    <stop offset="0%" stopColor="#9cc0ff" />
                                    <stop offset="100%" stopColor="#4d8eff" />
                                </linearGradient>
                            </defs>
                            {['M30 25 L30 75', 'M30 25 L70 75', 'M70 25 L70 75'].map((d, i) => (
                                <motion.path
                                    key={d}
                                    d={d}
                                    stroke="url(#pl-grad)"
                                    strokeWidth="16"
                                    strokeLinecap="round"
                                    fill="none"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.15 + i * 0.3, ease: [0.65, 0, 0.35, 1] }}
                                />
                            ))}
                            {[
                                [30, 25, 1.1],
                                [70, 75, 1.3],
                            ].map(([cx, cy, d]) => (
                                <motion.circle
                                    key={cx}
                                    cx={cx}
                                    cy={cy}
                                    r="4.5"
                                    fill="#08090b"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: [0, 1.6, 1] }}
                                    transition={{ duration: 0.5, delay: d }}
                                    style={{ transformOrigin: `${cx}px ${cy}px` }}
                                />
                            ))}
                        </svg>

                        <div className="mt-6 overflow-hidden">
                            <motion.p
                                initial={{ y: '110%' }}
                                animate={{ y: '0%' }}
                                transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
                                className="text-2xl font-semibold tracking-tight text-paper md:text-3xl"
                            >
                                NousKun<span className="text-brand"> AI</span>
                            </motion.p>
                        </div>
                    </motion.div>

                    <div className="absolute inset-x-5 bottom-6 flex items-end justify-between md:inset-x-10 md:bottom-10">
                        <motion.span className="font-mono text-5xl font-medium tabular-nums tracking-tighter text-paper/90 md:text-7xl">
                            {rounded}
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="max-w-[12rem] text-right text-xs text-muted md:text-sm"
                        >
                            Building intelligent systems
                        </motion.span>
                    </div>
                    <motion.div
                        className="absolute bottom-0 left-0 h-[2px] bg-brand"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 2, ease: [0.65, 0, 0.35, 1] }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
