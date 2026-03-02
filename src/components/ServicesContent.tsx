'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Cpu, TrendingUp, ChevronRight, ArrowLeft } from 'lucide-react';

const serviceCategories = [
    {
        icon: Cpu,
        title: 'AI & Automation',
        description: 'Replace manual tasks with intelligent workflows that never sleep.',
        actionWord: 'Autonomy',
        features: [
            'Lead Capture & Qualification',
            'Automated Email & SMS Sequences',
            'WhatsApp Business API Integration',
            'Custom AI Chatbots',
            'Zapier/Make.com Workflow Design'
        ]
    },
    {
        icon: Monitor,
        title: 'Intelligent Web Systems',
        description: 'More than a website. A digital headquarters designed to convert.',
        actionWord: 'Architecture',
        features: [
            'Next.js & React Architecture',
            'High-Performance Animation (GSAP/Framer)',
            'Conversion-Focused UX/UI',
            'Mobile-First Responsive Design',
            'CMS Integration (Sanity/Strapi)'
        ]
    },
    {
        icon: TrendingUp,
        title: 'Growth Intelligence',
        description: 'Data-driven strategies to feed the system with high-quality traffic.',
        actionWord: 'Expansion',
        features: [
            'Technical SEO Optimization',
            'Funnel Analytics & Tracking',
            'Content Strategy for AI Search',
            'Performance Marketing Assets',
            'User Behavior Analysis'
        ]
    }
];

function ServiceCard({ service, index }: { service: typeof serviceCategories[0], index: number }) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className="relative h-[420px] w-full perspective-1000 group z-10">
            <motion.div
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full relative"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Front Face */}
                <div
                    className="absolute inset-0 backface-hidden bg-ai-card border border-white/5 p-8 rounded-2xl flex flex-col"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <div className="w-12 h-12 bg-ai-blue/10 rounded-lg flex items-center justify-center text-ai-blue mb-6 group-hover:scale-110 transition-transform">
                        <service.icon size={24} />
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-auto">
                        {service.description}
                    </p>

                    <button
                        onClick={() => setIsFlipped(true)}
                        className="w-full py-3 border border-white/10 rounded-lg text-sm font-mono uppercase tracking-wider text-zinc-400 hover:bg-white/5 hover:text-white transition-colors mt-8"
                    >
                        Explore {service.actionWord}
                    </button>
                </div>

                {/* Back Face */}
                <div
                    className="absolute inset-0 backface-hidden bg-ai-card border border-ai-blue/30 p-8 rounded-2xl flex flex-col rotate-y-180"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-white">Capabilities</h3>
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                            <service.icon size={16} className="text-ai-blue" />
                        </div>
                    </div>

                    <ul className="space-y-3 mb-auto">
                        {service.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-3 text-sm text-zinc-300">
                                <ChevronRight size={16} className="text-ai-blue mt-0.5 shrink-0" />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsFlipped(false);
                        }}
                        className="flex items-center justify-center gap-2 w-full py-3 bg-white/5 rounded-lg text-sm font-mono uppercase tracking-wider text-white hover:bg-white/10 transition-colors mt-6"
                    >
                        <ArrowLeft size={14} /> Back
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

export default function ServicesContent() {
    return (
        <section className="relative pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto min-h-screen overflow-hidden">
            {/* Lighting Waves Background */}
            <div className="absolute inset-0 pointer-events-none select-none">
                <svg className="absolute w-full h-full opacity-40" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {[...Array(3)].map((_, i) => (
                        <motion.path
                            key={i}
                            d={`M0,${40 + i * 10} Q25,${20 + i * 10} 50,${40 + i * 10} T100,${40 + i * 10}`}
                            fill="none"
                            stroke="rgba(0, 122, 255, 0.5)"
                            strokeWidth="0.5"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{
                                pathLength: [0, 1, 0],
                                opacity: [0, 1, 0],
                                d: [
                                    `M0,${40 + i * 10} Q25,${20 + i * 10} 50,${40 + i * 10} T100,${40 + i * 10}`,
                                    `M0,${60 + i * 10} Q25,${80 + i * 10} 50,${60 + i * 10} T100,${60 + i * 10}`
                                ]
                            }}
                            transition={{
                                duration: 10 + i * 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                repeatType: "mirror"
                            }}
                            style={{ filter: 'blur(1px)' }}
                        />
                    ))}

                    {/* Electric Arcs */}
                    {[...Array(4)].map((_, i) => (
                        <motion.path
                            key={`arc-${i}`}
                            d={`M${10 + i * 20},${20 + i * 10} Q${50 + i * 10},${50} ${90 - i * 20},${80 - i * 10}`}
                            stroke="rgba(0, 122, 255, 0.3)"
                            strokeWidth="0.2"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: [0, 1], opacity: [0, 0.5, 0] }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 1.5,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </svg>

                {/* Ambient Glow */}
                <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-ai-blue/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] bg-ai-blue/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="relative z-10 text-center mb-20">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter"
                >
                    OPERATIONAL <span className="text-ai-blue">CAPABILITIES</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-zinc-400 max-w-2xl mx-auto"
                >
                    We provide the infrastructure for autonomous business growth.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {serviceCategories.map((service, index) => (
                    <motion.div
                        key={service.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                        <ServiceCard service={service} index={index} />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
