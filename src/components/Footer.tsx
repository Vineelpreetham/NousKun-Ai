'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import WhatsAppForm from './WhatsAppForm';

export default function Footer() {
    return (
        <footer className="relative bg-black pt-32 pb-12 px-4 md:px-8 border-t border-white/5 overflow-hidden">
            {/* Smooth Electric Waves Background */}
            <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
                <svg className="absolute w-full h-full opacity-80" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="2" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Multiple Wave Layers */}
                    {[...Array(4)].map((_, i) => (
                        <motion.path
                            key={i}
                            d={`M0,${50 + i * 5} Q25,${40 + i * 5} 50,${50 + i * 5} T100,${50 + i * 5}`}
                            fill="none"
                            stroke={i % 2 === 0 ? "#007AFF" : "#00FFFF"}
                            strokeWidth={0.5 + Math.random() * 0.5}
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{
                                pathLength: [0, 1, 1],
                                opacity: [0, 0.8, 0.4],
                                d: [
                                    `M0,${50 + i * 5} C30,${30 + i * 5} 70,${70 + i * 5} 100,${50 + i * 5}`,
                                    `M0,${50 + i * 5} C30,${70 + i * 5} 70,${30 + i * 5} 100,${50 + i * 5}`,
                                    `M0,${50 + i * 5} C30,${30 + i * 5} 70,${70 + i * 5} 100,${50 + i * 5}`
                                ]
                            }}
                            transition={{
                                duration: 4 + i * 0.3,
                                repeat: Infinity,
                                ease: "easeInOut",
                                repeatType: "mirror"
                            }}
                            style={{ filter: 'drop-shadow(0 0 4px rgba(0, 122, 255, 0.8))' }}
                        />
                    ))}

                    {/* Sharp Highlight Lines */}
                    {[...Array(2)].map((_, i) => (
                        <motion.path
                            key={`highlight-${i}`}
                            d={`M0,${45 + i * 10} Q50,${20 + i * 10} 100,${45 + i * 10}`}
                            stroke="white"
                            strokeWidth="0.2"
                            fill="none"
                            initial={{ opacity: 0 }}
                            animate={{
                                d: [
                                    `M0,${45 + i * 10} Q50,${20 + i * 10} 100,${45 + i * 10}`,
                                    `M0,${55 + i * 10} Q50,${80 + i * 10} 100,${55 + i * 10}`
                                ],
                                opacity: [0, 0.5, 0]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 2
                            }}
                        />
                    ))}
                </svg>

                {/* Deep Blue Core Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[40vw] bg-ai-blue/10 rounded-[100%] blur-[80px] pointer-events-none mix-blend-screen" />
            </div>

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20 mb-24 relative z-10">
                {/* Brand Column */}
                <div className="flex-1 space-y-8">
                    <div className="text-2xl font-bold tracking-tighter text-white">
                        NOUSKŪN <span className="text-ai-blue">AI</span>
                    </div>
                    <p className="text-lg text-zinc-400 max-w-sm leading-relaxed">
                        Intelligence Established.
                        NousKūn AI exists to help businesses operate smarter, faster, and autonomously in an AI-first world.
                    </p>
                    <div className="flex gap-6 pt-4">
                        {['LinkedIn', 'Twitter', 'Instagram'].map((social) => (
                            <Link key={social} href="#" className="text-xs font-mono tracking-widest text-zinc-500 hover:text-ai-blue uppercase transition-colors">
                                {social}
                            </Link>
                        ))}
                    </div>

                    <div className="pt-12 md:pt-24 opacity-80 select-none">
                        <h2 className="text-[12vw] md:text-[8rem] font-bold tracking-tighter text-white leading-none">
                            NOUSKŪN<span className="text-ai-blue">.</span>
                        </h2>
                    </div>
                </div>

                {/* Form Column */}
                <div className="flex-1">
                    <WhatsAppForm />
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono tracking-widest text-zinc-600 uppercase">
                <div>
                    © 2026 NOUSKŪN AI. ALL SYSTEMS NOMINAL.
                </div>
                <div>
                    DESIGNED BY ANTIGRAVITY.
                </div>
            </div>
        </footer>
    );
}
