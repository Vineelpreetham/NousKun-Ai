'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Bot, Database, Globe, MessageCircle, Workflow, LineChart } from 'lucide-react';

const N_PATHS = ['M30 25 L30 75', 'M30 25 L70 75', 'M70 25 L70 75'];
const N_FLOW = 'M30 75 L30 25 L70 75 L70 25'; // one continuous route for the light to run along
const ease = [0.22, 1, 0.36, 1] as const;

const satellites = [
    { icon: MessageCircle, label: 'WhatsApp', angle: -60, ring: 'outer' },
    { icon: LineChart, label: 'Analytics', angle: 0, ring: 'inner' },
    { icon: Bot, label: 'AI agent', angle: 60, ring: 'outer' },
    { icon: Globe, label: 'Website', angle: 120, ring: 'inner' },
    { icon: Database, label: 'CRM', angle: 180, ring: 'outer' },
    { icon: Workflow, label: 'Automation', angle: 240, ring: 'inner' },
] as const;

/**
 * The NousKun "N" as a living system: strokes draw in, light flows through the
 * letter, and connected services orbit around it with data pulses on each link.
 */
export default function HeroMark({ start }: { start: boolean }) {
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const rx = useSpring(useTransform(my, [-1, 1], [10, -10]), { stiffness: 80, damping: 18 });
    const ry = useSpring(useTransform(mx, [-1, 1], [-12, 12]), { stiffness: 80, damping: 18 });
    const tx = useSpring(useTransform(mx, [-1, 1], [-14, 14]), { stiffness: 60, damping: 20 });
    const ty = useSpring(useTransform(my, [-1, 1], [-14, 14]), { stiffness: 60, damping: 20 });

    useEffect(() => {
        const onMove = (e: PointerEvent) => {
            mx.set((e.clientX / window.innerWidth) * 2 - 1);
            my.set((e.clientY / window.innerHeight) * 2 - 1);
        };
        window.addEventListener('pointermove', onMove, { passive: true });
        return () => window.removeEventListener('pointermove', onMove);
    }, [mx, my]);

    return (
        <div className="relative aspect-square w-full max-w-[560px]" style={{ perspective: 1200 }}>
            {/* rotating light cone + glow */}
            <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={start ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1.4, ease }}
                className="absolute inset-[12%] rounded-full"
            >
                <div className="absolute inset-0 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,transparent,rgba(77,142,255,0.35),transparent_35%,transparent_60%,rgba(156,192,255,0.25),transparent_85%)] blur-2xl" />
                <div className="absolute inset-[20%] rounded-full bg-brand/30 blur-[70px]" />
            </motion.div>

            {/* orbit rings */}
            {[
                { inset: '4%', dur: 60, dash: '2 6' },
                { inset: '13%', dur: 45, dash: '1 4' },
            ].map((r, i) => (
                <motion.svg
                    key={i}
                    viewBox="0 0 100 100"
                    className="absolute"
                    style={{ inset: r.inset }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={start ? { opacity: 1, scale: 1, rotate: i ? -360 : 360 } : {}}
                    transition={{
                        opacity: { duration: 1, delay: 0.3 + i * 0.15 },
                        scale: { duration: 1.2, delay: 0.3 + i * 0.15, ease },
                        rotate: { duration: r.dur, repeat: Infinity, ease: 'linear' },
                    }}
                >
                    <circle cx="50" cy="50" r="49.5" fill="none" stroke="rgba(156,192,255,0.28)" strokeWidth="0.3" strokeDasharray={r.dash} />
                </motion.svg>
            ))}

            {/* satellites: orbit slowly, each linked to the core with a pulsing beam */}
            <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={start ? { opacity: 1, rotate: 360 } : {}}
                transition={{ opacity: { duration: 1, delay: 0.9 }, rotate: { duration: 90, repeat: Infinity, ease: 'linear' } }}
            >
                <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
                    {satellites.map((s, i) => {
                        const r = s.ring === 'outer' ? 47 : 37;
                        const a = (s.angle * Math.PI) / 180;
                        const x = 50 + Math.cos(a) * r;
                        const y = 50 + Math.sin(a) * r;
                        return (
                            <g key={s.label}>
                                <line x1="50" y1="50" x2={x} y2={y} stroke="rgba(77,142,255,0.18)" strokeWidth="0.25" />
                                <line
                                    x1="50"
                                    y1="50"
                                    x2={x}
                                    y2={y}
                                    stroke="#9cc0ff"
                                    strokeWidth="0.45"
                                    strokeLinecap="round"
                                    strokeDasharray="3 60"
                                    className="nk-beam"
                                    style={{ animationDelay: `${i * 0.55}s` }}
                                />
                            </g>
                        );
                    })}
                </svg>

                {satellites.map((s, i) => {
                    const r = s.ring === 'outer' ? 47 : 37;
                    const a = (s.angle * Math.PI) / 180;
                    const Icon = s.icon;
                    return (
                        <div
                            key={s.label}
                            className="absolute"
                            style={{ left: `${50 + Math.cos(a) * r}%`, top: `${50 + Math.sin(a) * r}%` }}
                        >
                            {/* counter-rotate so icons stay upright */}
                            <motion.div
                                animate={start ? { rotate: -360 } : {}}
                                transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
                                className="-translate-x-1/2 -translate-y-1/2"
                            >
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={start ? { scale: 1, opacity: 1 } : {}}
                                    transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 1 + i * 0.12 }}
                                    className="group flex items-center gap-2 rounded-full border border-white/10 bg-ink-2/80 p-2 pr-3 shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-md"
                                >
                                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand/15 text-brand-soft">
                                        <Icon size={14} />
                                    </span>
                                    <span className="whitespace-nowrap text-[11px] font-medium text-paper/85">{s.label}</span>
                                </motion.div>
                            </motion.div>
                        </div>
                    );
                })}
            </motion.div>

            {/* the N core, with mouse parallax tilt */}
            <motion.div style={{ rotateX: rx, rotateY: ry, x: tx, y: ty }} className="absolute inset-[33%] [transform-style:preserve-3d]">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={start ? { opacity: 1 } : {}}
                    className="absolute inset-[-6%] rounded-[28%] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.01] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_30px_80px_-20px_rgba(77,142,255,0.55)] backdrop-blur-xl"
                    transition={{ duration: 1, delay: 0.2 }}
                />
                <svg viewBox="0 0 100 100" className="relative h-full w-full overflow-visible" style={{ transform: 'translateZ(40px)' }}>
                    <defs>
                        <linearGradient id="hm-grad" gradientUnits="userSpaceOnUse" x1="20" y1="15" x2="80" y2="85">
                            <stop offset="0%" stopColor="#b8d2ff" />
                            <stop offset="55%" stopColor="#4d8eff" />
                            <stop offset="100%" stopColor="#2563eb" />
                        </linearGradient>
                        <filter id="hm-glow" filterUnits="userSpaceOnUse" x="-20" y="-20" width="140" height="140">
                            <feGaussianBlur stdDeviation="2.4" result="b" />
                            <feMerge>
                                <feMergeNode in="b" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {N_PATHS.map((d, i) => (
                        <motion.path
                            key={d}
                            d={d}
                            stroke="url(#hm-grad)"
                            strokeWidth="16"
                            strokeLinecap="round"
                            fill="none"
                            filter="url(#hm-glow)"
                            initial={{ pathLength: 0 }}
                            animate={start ? { pathLength: 1 } : {}}
                            transition={{ duration: 0.7, delay: 0.2 + i * 0.25, ease: [0.65, 0, 0.35, 1] }}
                        />
                    ))}

                    {/* light running through the letter */}
                    <motion.path
                        d={N_FLOW}
                        stroke="#ffffff"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        initial={{ pathLength: 0.12, pathOffset: 0, opacity: 0 }}
                        animate={start ? { pathOffset: [0, 1], opacity: [0, 0.9, 0.9, 0] } : {}}
                        transition={{ duration: 2.6, delay: 1.4, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' }}
                        style={{ filter: 'drop-shadow(0 0 4px #9cc0ff)' }}
                    />

                    {/* node dots with ripple */}
                    {[
                        [30, 25],
                        [70, 75],
                    ].map(([cx, cy], i) => (
                        <g key={cx}>
                            <motion.circle
                                cx={cx}
                                cy={cy}
                                r="5"
                                fill="none"
                                stroke="#9cc0ff"
                                strokeWidth="0.8"
                                initial={{ scale: 1, opacity: 0 }}
                                animate={start ? { scale: [1, 3], opacity: [0.8, 0] } : {}}
                                transition={{ duration: 2, repeat: Infinity, delay: 1.6 + i, ease: 'easeOut' }}
                                style={{ transformOrigin: `${cx}px ${cy}px` }}
                            />
                            <motion.circle
                                cx={cx}
                                cy={cy}
                                r="4.5"
                                fill="#08090b"
                                initial={{ scale: 0 }}
                                animate={start ? { scale: 1 } : {}}
                                transition={{ type: 'spring', stiffness: 300, damping: 12, delay: 1 + i * 0.2 }}
                                style={{ transformOrigin: `${cx}px ${cy}px` }}
                            />
                        </g>
                    ))}
                </svg>
            </motion.div>
        </div>
    );
}
