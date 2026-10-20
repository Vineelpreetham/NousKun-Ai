'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';

/* ---------- Chat: a looping WhatsApp-style conversation ---------- */

const script = [
    { from: 'user', text: 'Hi! Do you deliver to Bandra? 🛵' },
    { from: 'bot', text: 'Yes — same-day before 6pm. Want me to hold your cart?' },
    { from: 'user', text: 'Yes please' },
    { from: 'bot', text: 'Done ✓ Payment link sent. Anything else?' },
];

export function ChatVisual() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { margin: '-80px' });
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (!inView) return;
        const id = setInterval(() => setStep((s) => (s >= script.length + 2 ? 0 : s + 1)), 1300);
        return () => clearInterval(id);
    }, [inView]);

    const shown = script.slice(0, Math.min(step, script.length));
    const typing = step < script.length && script[step]?.from === 'bot';

    return (
        <div ref={ref} className="flex h-full flex-col justify-end gap-2 p-1">
            {shown.map((m, i) => (
                <motion.div
                    key={i}
                    layout
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className={
                        m.from === 'user'
                            ? 'ml-auto max-w-[78%] rounded-2xl rounded-br-md bg-white/[0.07] px-3.5 py-2 text-sm text-paper'
                            : 'mr-auto max-w-[82%] rounded-2xl rounded-bl-md bg-brand px-3.5 py-2 text-sm text-white'
                    }
                >
                    {m.text}
                </motion.div>
            ))}
            {typing && (
                <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mr-auto flex gap-1 rounded-2xl rounded-bl-md bg-brand/30 px-3.5 py-3">
                    {[0, 1, 2].map((d) => (
                        <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/80" style={{ animationDelay: `${d * 0.15}s` }} />
                    ))}
                </motion.div>
            )}
        </div>
    );
}

/* ---------- Flow: nodes connected by animated beams ---------- */

export function FlowVisual() {
    const nodes = [
        { x: 40, y: 50, label: 'Lead' },
        { x: 160, y: 30, label: 'AI' },
        { x: 160, y: 120, label: 'CRM' },
        { x: 280, y: 75, label: 'Sale' },
    ];
    const paths = ['M40 50 C100 50 100 30 160 30', 'M40 50 C100 50 100 120 160 120', 'M160 30 C220 30 220 75 280 75', 'M160 120 C220 120 220 75 280 75'];

    return (
        <svg viewBox="0 0 320 150" className="h-full w-full" aria-hidden>
            <defs>
                <linearGradient id="beam" x1="0" x2="1">
                    <stop offset="0%" stopColor="#4d8eff" stopOpacity="0" />
                    <stop offset="50%" stopColor="#9cc0ff" />
                    <stop offset="100%" stopColor="#4d8eff" stopOpacity="0" />
                </linearGradient>
            </defs>
            {paths.map((d, i) => (
                <g key={i}>
                    <path d={d} stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" fill="none" />
                    <motion.path
                        d={d}
                        stroke="url(#beam)"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ pathLength: 0.25, pathOffset: 0 }}
                        animate={{ pathOffset: [0, 1] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.45 }}
                    />
                </g>
            ))}
            {nodes.map((n, i) => (
                <g key={n.label}>
                    <motion.circle
                        cx={n.x}
                        cy={n.y}
                        r="16"
                        fill="#121418"
                        stroke="rgba(77,142,255,0.55)"
                        strokeWidth="1.5"
                        animate={{ stroke: ['rgba(77,142,255,0.35)', 'rgba(156,192,255,1)', 'rgba(77,142,255,0.35)'] }}
                        transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.5 }}
                    />
                    <text x={n.x} y={n.y + 3.5} textAnchor="middle" fontSize="9" fill="#f3f1ec" fontFamily="var(--font-geist)">
                        {n.label}
                    </text>
                </g>
            ))}
        </svg>
    );
}

/* ---------- Browser: a page assembling itself ---------- */

export function BrowserVisual() {
    const blocks = [
        'col-span-6 h-3 w-2/3',
        'col-span-6 h-3 w-1/2',
        'col-span-3 h-14',
        'col-span-3 h-14',
        'col-span-2 h-8',
        'col-span-2 h-8',
        'col-span-2 h-8',
    ];
    return (
        <div className="h-full overflow-hidden rounded-xl border border-line bg-ink/80">
            <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
                {['bg-red-400/70', 'bg-yellow-400/70', 'bg-green-400/70'].map((c) => (
                    <span key={c} className={`h-2 w-2 rounded-full ${c}`} />
                ))}
                <span className="ml-3 h-4 flex-1 rounded-md bg-white/[0.05] px-2 text-[9px] leading-4 text-muted">yourbrand.com</span>
            </div>
            <div className="grid grid-cols-6 gap-2 p-3">
                {blocks.map((b, i) => (
                    <motion.div
                        key={i}
                        className={`rounded-md ${i === 2 ? 'bg-brand/40' : 'bg-white/[0.07]'} ${b}`}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: '-40px' }}
                        transition={{ delay: 0.1 + i * 0.12, duration: 0.5 }}
                    />
                ))}
            </div>
        </div>
    );
}

/* ---------- Dashboard: a growth line drawing itself ---------- */

export function DashboardVisual() {
    const line = 'M0 90 C30 85 45 70 70 72 C95 74 110 50 140 48 C170 46 185 30 215 26 C245 22 265 10 300 6';
    return (
        <div className="flex h-full flex-col rounded-xl border border-line bg-ink/80 p-4">
            <div className="mb-3 flex items-center justify-between">
                <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted">Monthly recurring revenue</p>
                    <p className="text-lg font-medium text-paper">Growing</p>
                </div>
                <span className="flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] text-emerald-400">
                    <Check size={10} /> Live
                </span>
            </div>
            <svg viewBox="0 0 300 100" className="w-full flex-1" preserveAspectRatio="none" aria-hidden>
                <defs>
                    <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#4d8eff" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#4d8eff" stopOpacity="0" />
                    </linearGradient>
                </defs>
                {[25, 50, 75].map((y) => (
                    <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="rgba(255,255,255,0.05)" />
                ))}
                <motion.path
                    d={`${line} L300 100 L0 100 Z`}
                    fill="url(#area)"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.8, duration: 1 }}
                />
                <motion.path
                    d={line}
                    fill="none"
                    stroke="#9cc0ff"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                />
            </svg>
        </div>
    );
}
