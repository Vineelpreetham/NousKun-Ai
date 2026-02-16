'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        number: '01',
        title: 'Design the Intelligence',
        description: 'We map your business flow, customer journey, and revenue logic to create a blueprint for automation.',
    },
    {
        number: '02',
        title: 'Build the System',
        description: 'Website, automation, content, and analytics are connected into one intelligent engine.',
    },
    {
        number: '03',
        title: 'Activate & Optimize',
        description: 'Your system runs continuously, learns from data, and improves performance over time.',
    },
];

export default function SystemFlow() {
    const sectionRef = useRef<HTMLDivElement>(null);

    return (
        <section className="relative py-32 px-4 md:px-8 bg-zinc-950/50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-24">
                    <h2 className="text-sm font-mono tracking-[0.3em] text-ai-blue uppercase mb-6">
                        System Flow
                    </h2>
                    <h3 className="text-3xl md:text-5xl font-bold text-white">
                        How It Works
                    </h3>
                </div>

                <div ref={sectionRef} className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 gap-4 md:gap-8 pb-8 md:pb-0 px-4 md:px-0 -mx-4 md:mx-0 scrollbar-hide">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-ai-blue/30 to-transparent" />

                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2, duration: 0.8 }}
                            className="relative flex flex-col items-center text-center p-6 min-w-[85vw] md:min-w-0 snap-center border border-white/5 md:border-none rounded-xl md:rounded-none bg-white/5 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none"
                        >
                            {/* Number Circle */}
                            <div className="w-24 h-24 rounded-full bg-ai-black border border-ai-blue/20 flex items-center justify-center text-2xl font-mono text-ai-blue shadow-[0_0_20px_rgba(59,130,246,0.1)] mb-8 z-10 relative group hover:scale-110 transition-transform duration-300">
                                {step.number}
                                <div className="absolute inset-0 rounded-full border border-ai-blue/10 animate-ping opacity-20" />
                            </div>

                            <h4 className="text-xl font-bold text-white mb-4">{step.title}</h4>
                            <p className="text-zinc-400 leading-relaxed max-w-xs">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
