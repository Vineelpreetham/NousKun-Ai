'use client';

import { motion } from 'framer-motion';

export default function BrandStatement() {
    return (
        <section className="min-h-[60vh] flex flex-col items-center justify-center bg-zinc-950 border-t border-white/5 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative"
            >
                <h2 className="text-[15vw] font-bold tracking-tighter text-white leading-none select-none">
                    NOUSKŪN
                    <span className="text-ai-blue">.</span>
                </h2>
                <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 flex flex-col items-end">
                    <span className="text-xs md:text-sm font-mono tracking-[0.5em] text-zinc-500 uppercase">
                        Intelligence Established
                    </span>
                </div>
            </motion.div>
        </section>
    );
}
