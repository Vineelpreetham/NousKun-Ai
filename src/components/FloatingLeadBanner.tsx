'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Loader2, CheckCircle2, Rocket } from 'lucide-react';

export default function FloatingLeadBanner() {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Check session storage for dismissal
        if (sessionStorage.getItem('nk_banner_dismissed') === 'true') {
            setIsDismissed(true);
            return;
        }

        const handleScroll = () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            if (scrollPercent >= 60 && !isDismissed) {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isDismissed]);

    const handleDismiss = () => {
        setIsDismissed(true);
        setIsVisible(false);
        sessionStorage.setItem('nk_banner_dismissed', 'true');
    };

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
                    source: 'floating-banner',
                    interest: 'AI Audit',
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed');

            setIsSuccess(true);
            setEmail('');
            setTimeout(() => {
                handleDismiss();
            }, 3000);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isDismissed) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="fixed bottom-24 left-4 right-4 md:left-8 md:right-auto md:max-w-md z-40"
                >
                    <div className="glass-panel rounded-xl p-4 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                        {/* Close */}
                        <button
                            onClick={handleDismiss}
                            className="absolute top-2 right-2 text-white hover:text-white transition-colors p-1"
                        >
                            <X size={16} />
                        </button>

                        <AnimatePresence mode="wait">
                            {isSuccess ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-center gap-3 py-1"
                                >
                                    <CheckCircle2 size={18} className="text-green-400 flex-shrink-0" />
                                    <span className="text-sm text-green-300">You&apos;re in! Check your email soon.</span>
                                </motion.div>
                            ) : (
                                <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <div className="flex items-center gap-2 mb-3 pr-6">
                                        <Rocket size={16} className="text-ai-blue flex-shrink-0" />
                                        <span className="text-sm font-semibold text-white">
                                            Get a free AI audit for your business
                                        </span>
                                    </div>

                                    <form onSubmit={handleSubmit} className="flex items-center gap-2">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            required
                                            className="flex-1 bg-ai-black/60 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/60 focus:outline-none focus:border-ai-blue/50 transition-colors"
                                        />
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="flex items-center gap-1.5 px-4 py-2.5 bg-ai-blue hover:bg-ai-blue-dim text-white text-xs font-bold rounded-lg transition-all disabled:opacity-70 whitespace-nowrap shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                                        >
                                            {isSubmitting ? (
                                                <Loader2 size={14} className="animate-spin" />
                                            ) : (
                                                <>
                                                    GET STARTED
                                                    <ArrowRight size={12} />
                                                </>
                                            )}
                                        </button>
                                    </form>

                                    {error && <p className="text-red-400 text-[10px] mt-1">{error}</p>}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
