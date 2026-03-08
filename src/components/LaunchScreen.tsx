"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import logoImg from '../../NousKun_Brand_Logo.png';

const STAGES = {
    BUTTON: 0,
    QUOTE: 1,
    LOGO: 2,
};

export default function LaunchScreen({ children }: { children: React.ReactNode }) {
    const [hasLaunched, setHasLaunched] = useState<boolean | null>(null);
    const [mounted, setMounted] = useState(false);
    const [stage, setStage] = useState(STAGES.BUTTON);

    useEffect(() => {
        setMounted(true);

        // Set launch window to end tomorrow night
        const LAUNCH_WINDOW_END = new Date('2026-03-09T23:59:59').getTime();
        const now = new Date().getTime();

        // IF we are currently in the 24-hour launch window, ALWAYS show the launch screen
        if (now < LAUNCH_WINDOW_END) {
            setTimeout(() => {
                setHasLaunched(false);
            }, 100);
            return;
        }

        // AFTER the launch window, go back to normal "only once per user" behavior
        const launched = localStorage.getItem('nouskun_launched_v2');
        if (launched) {
            setHasLaunched(true);
        } else {
            setTimeout(() => {
                setHasLaunched(false);
            }, 100);
        }
    }, []);

    const proceedToQuote = () => {
        setStage(STAGES.QUOTE);
        setTimeout(() => {
            setStage(STAGES.LOGO);
            setTimeout(() => {
                setHasLaunched(true);
                // Save string for post-launch behavior
                localStorage.setItem('nouskun_launched_v2', 'true');
            }, 3000);
        }, 4500);
    };

    // Prevent hydration layout shift while SEO maintains content
    if (!mounted || hasLaunched === null) {
        return (
            <div className="w-full min-h-screen opacity-0 relative z-10 flex flex-col pointer-events-none">
                {children}
            </div>
        );
    }

    return (
        <>
            <AnimatePresence mode="wait">
                {!hasLaunched && (
                    <motion.div
                        key="launch-overlay"
                        className="fixed inset-0 z-[99999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    >
                        <AnimatePresence mode="wait">
                            {stage === STAGES.BUTTON && (
                                <motion.button
                                    key="launch-btn"
                                    onClick={proceedToQuote}
                                    className="relative group text-white/90 border border-white/20 px-10 py-5 rounded-full text-sm md:text-base tracking-[0.2em] uppercase hover:bg-white hover:text-black hover:border-white transition-all duration-700 overflow-hidden"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                >
                                    <span className="relative z-10 transition-colors duration-700 group-hover:text-black">
                                        Launch Nouskun AI
                                    </span>
                                    <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-700 ease-[0.22,1,0.36,1] z-0 rounded-full" />
                                </motion.button>
                            )}

                            {stage === STAGES.QUOTE && (
                                <motion.div
                                    key="quote"
                                    className="relative flex items-center justify-center text-center px-6 w-full h-full"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
                                    transition={{ duration: 2, ease: "easeOut" }}
                                >
                                    {/* Soft green matcha smoke animation */}
                                    <motion.div
                                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 2 }}
                                    >
                                        <motion.div
                                            className="w-[120vw] h-[120vw] md:w-[80vw] md:h-[80vw] rounded-full bg-[#c5d8a4] filter blur-[100px] md:blur-[150px] opacity-20 mix-blend-screen"
                                            animate={{
                                                scale: [1, 1.1, 0.95, 1],
                                                rotate: [0, 45, -45, 0],
                                                opacity: [0.1, 0.2, 0.15, 0.1]
                                            }}
                                            transition={{
                                                duration: 10,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                        />
                                    </motion.div>

                                    <h1
                                        className="text-2xl md:text-4xl lg:text-5xl text-white/90 font-serif tracking-widest leading-[2] z-10 max-w-4xl font-light"
                                        style={{ fontFamily: 'var(--font-playfair), "EB Garamond", serif' }}
                                    >
                                        “All glory, praise, and honour
                                        <br className="hidden md:block" />
                                        to Christ alone.”
                                    </h1>
                                </motion.div>
                            )}

                            {stage === STAGES.LOGO && (
                                <motion.div
                                    key="logo"
                                    className="relative flex items-center justify-center w-full h-full"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.1 }}
                                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <motion.div
                                        className="absolute w-64 h-64 bg-[#c5d8a4] rounded-full filter blur-[100px] opacity-20"
                                        animate={{ opacity: [0, 0.4, 0.2] }}
                                        transition={{ duration: 3, ease: "easeInOut" }}
                                    />
                                    <div className="relative w-48 h-48 md:w-64 md:h-64 z-10">
                                        <Image
                                            src={logoImg}
                                            alt="NousKun Logo"
                                            fill
                                            className="object-contain drop-shadow-2xl"
                                            priority
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={!hasLaunched ? { opacity: 0, scale: 0.95, filter: "blur(10px)" } : false}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: !hasLaunched ? 0 : 0.5 }}
                className="relative z-10 w-full min-h-screen flex flex-col"
            >
                {children}
            </motion.div>
        </>
    );
}
