'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';

const phases = [
    {
        id: '01',
        name: 'The Blueprint',
        title: 'Architecting Intelligence',
        description: 'Before code, we map the entire digital ecosystem. We analyze your customer journey, data touchpoints, and operational bottlenecks to design a system that solves real business problems.',
        details: ['Workflow Mapping', 'Data Architecture', 'UX Strategy', 'Automation Logic']
    },
    {
        id: '02',
        name: 'The Core',
        title: 'System Development',
        description: 'We build the engine. Integrating high-performance web frameworks with backend automation, we construct a platform that is not just a brochure, but a functional employee.',
        details: ['Next.js Framework', 'API Integration', 'CRM Connection', 'Dynamic Content']
    },
    {
        id: '03',
        name: 'The Nexus',
        title: 'Connection & Flow',
        description: 'Isolation is failure. We connect your website to your email, SMS, CRM, and analytics tools. Data flows seamlessly from visitor to lead to sale without manual input.',
        details: ['Zapier/Make Scenarios', 'Webhooks', 'Database Sync', 'Notification Systems']
    },
    {
        id: '04',
        name: 'The Evolution',
        title: 'Optimization & Growth',
        description: 'A launch is just Day 1. The system collects data, learns user behavior, and allows us to iterate for higher conversion rates and smoother operations.',
        details: ['A/B Testing', 'Heatmap Analysis', 'Conversion Rate Optimization', 'Feature Scaling']
    }
];

export default function SystemContent() {
    return (
        <section className="relative pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
            {/* Header */}
            <div className="mb-24 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter"
                >
                    SYSTEM <span className="text-ai-blue">ARCHITECTURE</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-zinc-400 max-w-2xl mx-auto"
                >
                    From concept to continuous operation. How we build autonomous digital assets.
                </motion.p>
            </div>

            {/* Phases Grid */}
            <div className="grid grid-cols-1 gap-12 relative">
                {/* Vertical Line */}
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-ai-blue/30 to-transparent hidden md:block" />

                {phases.map((phase, index) => (
                    <motion.div
                        key={phase.id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                        className={`relative flex flex-col md:flex-row gap-8 md:gap-16 items-start ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                    >
                        {/* Timeline Dot (Desktop) */}
                        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center w-4 h-4 rounded-full bg-ai-blue/20 border border-ai-blue/50 z-10">
                            <div className="w-1.5 h-1.5 rounded-full bg-ai-blue" />
                        </div>

                        {/* Content Card */}
                        <div className="flex-1 w-full bg-ai-card border border-white/5 p-8 rounded-2xl hover:border-ai-blue/30 transition-colors duration-500 group">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-4xl font-mono font-bold text-ai-blue/20 group-hover:text-ai-blue group-hover:opacity-100 transition-all">
                                    {phase.id}
                                </span>
                                <span className="text-xs font-mono tracking-[0.2em] text-ai-blue uppercase">
                                    {phase.name}
                                </span>
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                {phase.title}
                            </h3>
                            <p className="text-zinc-400 leading-relaxed mb-6">
                                {phase.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {phase.details.map((detail) => (
                                    <span key={detail} className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-xs text-zinc-500 font-mono">
                                        {detail}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Spacer for alternating layout */}
                        <div className="flex-1 hidden md:block" />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
