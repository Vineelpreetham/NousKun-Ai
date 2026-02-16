import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import clsx from 'clsx';
import { Check } from 'lucide-react';

interface ServiceCardProps {
    index: number;
    title: string;
    description: string;
    features?: string[];
    className?: string;
}

export default function ServiceCard({ index, title, description, features, className }: ServiceCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
            whileHover={{ y: -5 }}
            className={clsx(
                "group relative p-8 rounded-2xl glass-panel overflow-hidden transition-all duration-300 hover:border-ai-blue/30 h-full flex flex-col",
                className
            )}
        >
            {/* Glow Effect */}
            <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-500 inset-0 bg-gradient-to-br from-ai-blue/10 to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6 flex justify-between items-start">
                    <span className="text-4xl font-light text-white/10 group-hover:text-ai-blue/50 transition-colors duration-300 font-mono">
                        0{index + 1}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-ai-blue/20 transition-colors">
                        <div className="w-2 h-2 rounded-full bg-ai-blue" />
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-ai-blue transition-colors duration-300">
                        {title}
                    </h3>
                    <p className="text-zinc-400 leading-relaxed text-sm md:text-base group-hover:text-zinc-300 transition-colors">
                        {description}
                    </p>
                </div>

                {features && features.length > 0 && (
                    <div className="mt-auto pt-6 border-t border-white/5">
                        <ul className="space-y-3">
                            {features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">
                                    <Check className="w-4 h-4 text-ai-blue shrink-0 mt-0.5" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
