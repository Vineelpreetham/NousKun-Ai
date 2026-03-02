'use client';

import { motion } from 'framer-motion';

export default function StoryContent() {
    return (
        <section className="relative pt-32 pb-20 px-4 md:px-8 max-w-5xl mx-auto min-h-screen flex flex-col justify-center">

            <div className="mb-16">
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="block text-sm font-mono tracking-[0.3em] text-ai-blue uppercase mb-6"
                >
                    Origin Protocol
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-bold text-white leading-tight mb-8"
                >
                    We believe the future of business is <span className="text-ai-blue">autonomous.</span>
                </motion.h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6 text-lg text-zinc-400 leading-relaxed"
                >
                    <p>
                        For too long, businesses have relied on fragile, manual processes and digital brochures that passively wait for visitors to take action.
                    </p>
                    <p>
                        At NousKūn AI, we saw a different reality. We saw the potential for AI agents and automated workflows to take over operations, serving as active participants in your business.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="space-y-6 text-lg text-zinc-400 leading-relaxed"
                >
                    <p>
                        Our mission is to bridge the gap between human strategy and machine execution. We build systems that handle the repetitive, the data-heavy, and the operational—freeing you to focus on growth and connection.
                    </p>
                    <p className="text-white font-bold">
                        We don't just build websites. We are an AI Service Provider engineering the intelligence that powers entire organizations.
                    </p>
                </motion.div>
            </div>

            <div className="mt-24 border-t border-white/10 pt-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { label: 'Founded', value: '2026' },
                        { label: 'Systems Built', value: '1' },
                        { label: 'Efficiency Gain', value: '99.9%' },
                        { label: 'Location', value: 'Global' }
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + (i * 0.1) }}
                            className="text-center md:text-left"
                        >
                            <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                            <div className="text-xs font-mono tracking-widest text-zinc-500 uppercase">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>

        </section>
    );
}
