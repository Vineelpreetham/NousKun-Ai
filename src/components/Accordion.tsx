'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { Plus, Minus, Check } from 'lucide-react';

interface AccordionItemProps {
    title: string;
    description: string;
    features?: string[];
    isOpen: boolean;
    onToggle: () => void;
    index: number;
}

function AccordionItem({ title, description, features, isOpen, onToggle, index }: AccordionItemProps) {
    return (
        <div className="border-b border-white/10 last:border-b-0">
            <button
                onClick={onToggle}
                className="w-full py-8 px-4 md:px-8 flex items-center justify-between group hover:bg-white/5 transition-colors text-left"
            >
                <div className="flex items-center gap-6 md:gap-12">
                    <span className="text-sm font-mono text-zinc-600 group-hover:text-ai-blue transition-colors">
                        0{index + 1}
                    </span>
                    <h3 className={clsx(
                        "text-xl md:text-3xl font-bold transition-colors duration-300",
                        isOpen ? "text-ai-blue" : "text-white group-hover:text-zinc-200"
                    )}>
                        {title}
                    </h3>
                </div>

                <div className={clsx(
                    "w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-full border transition-all duration-300",
                    isOpen ? "border-ai-blue bg-ai-blue text-white" : "border-white/20 text-white/50 group-hover:border-white/50 group-hover:text-white"
                )}>
                    {isOpen ? <Minus className="w-4 h-4 md:w-5 md:h-5" /> : <Plus className="w-4 h-4 md:w-5 md:h-5" />}
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="pb-8 px-4 md:px-8 pl-12 md:pl-32 pr-4 md:pr-12">
                            <p className="text-zinc-400 text-lg leading-relaxed mb-8 max-w-3xl">
                                {description}
                            </p>

                            {features && features.length > 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-3 text-sm font-mono text-zinc-500">
                                            <div className="w-1.5 h-1.5 rounded-full bg-ai-blue/50" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

interface AccordionProps {
    items: {
        title: string;
        description: string;
        features?: string[];
    }[];
}

export default function Accordion({ items }: AccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="w-full border-t border-white/10">
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    index={index}
                    title={item.title}
                    description={item.description}
                    features={item.features}
                    isOpen={openIndex === index}
                    onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                />
            ))}
        </div>
    );
}
