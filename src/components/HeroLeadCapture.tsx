'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Loader2, CheckCircle2, Sparkles } from 'lucide-react';

export default function HeroLeadCapture() {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim() || isSubmitting) return;

        setIsSubmitting(true);
        setError('');

        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    source: 'hero',
                    interest: 'AI Audit',
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to submit');

            setIsSuccess(true);
            setEmail('');
            setTimeout(() => setIsSuccess(false), 5000);
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="hero-lead-capture mt-10 w-full max-w-lg mx-auto"
        >
            <AnimatePresence mode="wait">
                {isSuccess ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex items-center justify-center gap-3 py-3 px-6 rounded-full bg-green-500/10 border border-green-500/20"
                    >
                        <CheckCircle2 size={18} className="text-green-400" />
                        <span className="text-sm text-green-300 font-medium">We&apos;ll send your free AI audit shortly!</span>
                    </motion.div>
                ) : (
                    <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        {/* Label */}
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Sparkles size={14} className="text-ai-blue" />
                            <span className="text-xs font-mono uppercase tracking-[0.2em] text-white">
                                Free AI Audit for Your Business
                            </span>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
                            <div className="relative flex-1">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-full py-3.5 pl-5 pr-4 text-sm text-white focus:outline-none focus:border-ai-blue/50 transition-colors placeholder:text-white/60 backdrop-blur-sm"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex items-center gap-2 px-6 py-3.5 bg-ai-blue hover:bg-ai-blue-dim text-white text-sm font-bold rounded-full transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] whitespace-nowrap"
                            >
                                {isSubmitting ? (
                                    <Loader2 size={16} className="animate-spin" />
                                ) : (
                                    <>
                                        GET AUDIT
                                        <ArrowRight size={14} />
                                    </>
                                )}
                            </button>
                        </form>

                        {error && (
                            <p className="text-red-400 text-xs text-center mt-2">{error}</p>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
