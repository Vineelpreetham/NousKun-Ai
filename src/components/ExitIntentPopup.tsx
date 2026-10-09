'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Loader2, CheckCircle2, BrainCircuit, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'nk_exit_intent_last';
const THROTTLE_HOURS = 24;

export default function ExitIntentPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [businessType, setBusinessType] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const isThrottled = useCallback(() => {
        if (typeof window === 'undefined') return true;
        const last = localStorage.getItem(STORAGE_KEY);
        if (!last) return false;
        const diff = Date.now() - parseInt(last, 10);
        return diff < THROTTLE_HOURS * 60 * 60 * 1000;
    }, []);

    const markShown = () => {
        localStorage.setItem(STORAGE_KEY, Date.now().toString());
    };

    useEffect(() => {
        if (isThrottled()) return;

        let triggered = false;

        // Desktop: detect mouse leaving viewport at top
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 5 && !triggered) {
                triggered = true;
                setIsVisible(true);
                markShown();
            }
        };

        // Mobile fallback: 45s inactivity timer
        let mobileTimer: ReturnType<typeof setTimeout> | null = null;
        const isMobile = window.innerWidth < 768;

        if (isMobile) {
            mobileTimer = setTimeout(() => {
                if (!triggered) {
                    triggered = true;
                    setIsVisible(true);
                    markShown();
                }
            }, 45000);
        }

        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.removeEventListener('mouseleave', handleMouseLeave);
            if (mobileTimer) clearTimeout(mobileTimer);
        };
    }, [isThrottled]);

    const handleClose = () => setIsVisible(false);

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
                    name: name || undefined,
                    source: 'exit-intent',
                    interest: 'AI Strategy Blueprint',
                    extra: businessType || undefined,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed');

            setIsSuccess(true);
            setTimeout(() => {
                setIsVisible(false);
                setIsSuccess(false);
            }, 3000);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md z-[101]"
                    >
                        <div className="relative bg-ai-card border border-white/10 rounded-2xl p-8 shadow-[0_0_80px_rgba(59,130,246,0.1)] overflow-hidden">

                            {/* Glow accent */}
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-ai-blue/10 rounded-full blur-[60px] pointer-events-none" />
                            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-ai-violet/10 rounded-full blur-[60px] pointer-events-none" />

                            {/* Close */}
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 text-white hover:text-white transition-colors p-1"
                            >
                                <X size={20} />
                            </button>

                            <AnimatePresence mode="wait">
                                {isSuccess ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-8"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', stiffness: 200 }}
                                            className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center text-green-400 mx-auto mb-4"
                                        >
                                            <CheckCircle2 size={32} />
                                        </motion.div>
                                        <h3 className="text-xl font-bold text-white mb-2">Blueprint on its way! 🚀</h3>
                                        <p className="text-white text-sm">Check your email for your free AI Strategy Blueprint.</p>
                                    </motion.div>
                                ) : (
                                    <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                        {/* Header */}
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-12 h-12 bg-ai-blue/10 rounded-xl flex items-center justify-center border border-ai-blue/30">
                                                <BrainCircuit size={24} className="text-ai-blue" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-white">Wait — Don&apos;t Leave Empty-Handed</h3>
                                            </div>
                                        </div>

                                        <p className="text-white text-sm mb-6 leading-relaxed">
                                            Get a <span className="text-white font-semibold">Free AI Strategy Blueprint</span> customized for your business — including automation opportunities, cost savings projections, and a 90-day implementation roadmap.
                                        </p>

                                        <div className="flex items-center gap-2 mb-6 bg-ai-blue/5 border border-ai-blue/20 rounded-lg px-4 py-2.5">
                                            <Sparkles size={14} className="text-ai-blue flex-shrink-0" />
                                            <span className="text-xs text-white">
                                                Delivered to your inbox in <span className="text-white font-semibold">under 24 hours</span>
                                            </span>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-3">
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Your name"
                                                className="w-full bg-ai-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/60 focus:outline-none focus:border-ai-blue/50 transition-colors"
                                            />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Your email"
                                                required
                                                className="w-full bg-ai-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/60 focus:outline-none focus:border-ai-blue/50 transition-colors"
                                            />
                                            <select
                                                value={businessType}
                                                onChange={(e) => setBusinessType(e.target.value)}
                                                className="w-full bg-ai-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-ai-blue/50 transition-colors appearance-none"
                                            >
                                                <option value="">Select Business Type...</option>
                                                <option value="e-commerce">E-Commerce</option>
                                                <option value="agency">Agency / Service</option>
                                                <option value="saas">SaaS / Tech</option>
                                                <option value="education">Education / Coaching</option>
                                                <option value="real-estate">Real Estate</option>
                                                <option value="other">Other</option>
                                            </select>

                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full flex items-center justify-center gap-2 py-3.5 bg-ai-blue hover:bg-ai-blue-dim text-white font-bold rounded-lg transition-all disabled:opacity-70 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                                            >
                                                {isSubmitting ? (
                                                    <Loader2 size={16} className="animate-spin" />
                                                ) : (
                                                    <>
                                                        GET MY FREE BLUEPRINT
                                                        <ArrowRight size={16} />
                                                    </>
                                                )}
                                            </button>

                                            {error && (
                                                <p className="text-red-400 text-xs text-center">{error}</p>
                                            )}
                                        </form>

                                        <p className="text-[10px] text-white text-center mt-4">
                                            No spam. Just value. Unsubscribe anytime.
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
