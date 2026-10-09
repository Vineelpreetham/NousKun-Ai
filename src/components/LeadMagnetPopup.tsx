'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Loader2, CheckCircle2, Calculator, TrendingUp, Clock, DollarSign, Users } from 'lucide-react';

const STORAGE_KEY = 'nk_roi_popup_last';
const THROTTLE_HOURS = 24;
const SHOW_DELAY_MS = 20000; // 20 seconds

export default function LeadMagnetPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [step, setStep] = useState<'calculator' | 'capture' | 'success'>('calculator');

    // Calculator values
    const [hoursPerWeek, setHoursPerWeek] = useState(15);
    const [hourlyRate, setHourlyRate] = useState(1500);
    const [monthlyLeads, setMonthlyLeads] = useState(50);

    // Form values
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    // Calculations
    const weeklySavings = hoursPerWeek * hourlyRate * 0.7; // assume 70% automation
    const monthlySavings = weeklySavings * 4;
    const yearlySavings = monthlySavings * 12;
    const leadConversionBoost = Math.round(monthlyLeads * 0.35); // 35% more leads captured

    const isThrottled = useCallback(() => {
        if (typeof window === 'undefined') return true;
        const last = localStorage.getItem(STORAGE_KEY);
        if (!last) return false;
        return Date.now() - parseInt(last, 10) < THROTTLE_HOURS * 60 * 60 * 1000;
    }, []);

    useEffect(() => {
        if (isThrottled()) return;

        const timer = setTimeout(() => {
            setIsVisible(true);
            localStorage.setItem(STORAGE_KEY, Date.now().toString());
        }, SHOW_DELAY_MS);

        return () => clearTimeout(timer);
    }, [isThrottled]);

    const handleClose = () => {
        setIsVisible(false);
        setStep('calculator');
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
                    source: 'roi-calculator',
                    interest: 'AI ROI Report',
                    extra: `Hours/week: ${hoursPerWeek}, Rate: ₹${hourlyRate}, Monthly Leads: ${monthlyLeads}, Projected Monthly Savings: ₹${monthlySavings.toLocaleString('en-IN')}`,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed');

            setStep('success');
            setTimeout(() => {
                setIsVisible(false);
                setStep('calculator');
            }, 4000);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatCurrency = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;

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
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-lg z-[101]"
                    >
                        <div className="relative bg-ai-card rounded-2xl shadow-[0_0_80px_rgba(59,130,246,0.1)] overflow-hidden">

                            {/* Gradient border effect */}
                            <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-ai-blue/40 via-transparent to-ai-violet/40 pointer-events-none" />

                            <div className="relative bg-ai-card rounded-2xl p-6 md:p-8">

                                {/* Glow */}
                                <div className="absolute -top-20 right-0 w-40 h-40 bg-ai-blue/8 rounded-full blur-[60px] pointer-events-none" />

                                {/* Close */}
                                <button
                                    onClick={handleClose}
                                    className="absolute top-4 right-4 text-white hover:text-white transition-colors p-1 z-10"
                                >
                                    <X size={20} />
                                </button>

                                <AnimatePresence mode="wait">
                                    {step === 'calculator' && (
                                        <motion.div
                                            key="calculator"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                        >
                                            {/* Header */}
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="w-10 h-10 bg-ai-blue/10 rounded-lg flex items-center justify-center border border-ai-blue/30">
                                                    <Calculator size={20} className="text-ai-blue" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-white">AI ROI Calculator</h3>
                                                    <p className="text-xs text-white">See how much AI can save your business</p>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                {/* Slider 1: Hours/week */}
                                                <div>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <label className="flex items-center gap-2 text-sm text-white">
                                                            <Clock size={14} className="text-ai-blue" />
                                                            Hours on repetitive tasks/week
                                                        </label>
                                                        <span className="text-sm font-bold text-white bg-white/5 px-3 py-1 rounded-md">{hoursPerWeek}h</span>
                                                    </div>
                                                    <input
                                                        type="range"
                                                        min={5}
                                                        max={40}
                                                        value={hoursPerWeek}
                                                        onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
                                                        className="w-full accent-ai-blue h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer"
                                                    />
                                                    <div className="flex justify-between text-[10px] text-white mt-1">
                                                        <span>5h</span><span>40h</span>
                                                    </div>
                                                </div>

                                                {/* Slider 2: Hourly Rate */}
                                                <div>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <label className="flex items-center gap-2 text-sm text-white">
                                                            <DollarSign size={14} className="text-ai-blue" />
                                                            Average hourly rate
                                                        </label>
                                                        <span className="text-sm font-bold text-white bg-white/5 px-3 py-1 rounded-md">{formatCurrency(hourlyRate)}</span>
                                                    </div>
                                                    <input
                                                        type="range"
                                                        min={500}
                                                        max={5000}
                                                        step={100}
                                                        value={hourlyRate}
                                                        onChange={(e) => setHourlyRate(parseInt(e.target.value))}
                                                        className="w-full accent-ai-blue h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer"
                                                    />
                                                    <div className="flex justify-between text-[10px] text-white mt-1">
                                                        <span>₹500</span><span>₹5,000</span>
                                                    </div>
                                                </div>

                                                {/* Slider 3: Monthly Leads */}
                                                <div>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <label className="flex items-center gap-2 text-sm text-white">
                                                            <Users size={14} className="text-ai-blue" />
                                                            Monthly leads handled
                                                        </label>
                                                        <span className="text-sm font-bold text-white bg-white/5 px-3 py-1 rounded-md">{monthlyLeads}</span>
                                                    </div>
                                                    <input
                                                        type="range"
                                                        min={10}
                                                        max={500}
                                                        step={10}
                                                        value={monthlyLeads}
                                                        onChange={(e) => setMonthlyLeads(parseInt(e.target.value))}
                                                        className="w-full accent-ai-blue h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer"
                                                    />
                                                    <div className="flex justify-between text-[10px] text-white mt-1">
                                                        <span>10</span><span>500</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Results Preview */}
                                            <div className="mt-6 p-4 bg-ai-blue/5 border border-ai-blue/20 rounded-xl space-y-3">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <TrendingUp size={14} className="text-ai-blue" />
                                                    <span className="text-xs font-mono uppercase tracking-wider text-white">Projected Savings with AI</span>
                                                </div>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div>
                                                        <p className="text-[10px] text-white uppercase">Monthly</p>
                                                        <p className="text-xl font-bold text-white">{formatCurrency(monthlySavings)}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] text-white uppercase">Yearly</p>
                                                        <p className="text-xl font-bold text-ai-blue">{formatCurrency(yearlySavings)}</p>
                                                    </div>
                                                </div>
                                                <p className="text-xs text-white">
                                                    + <span className="text-white font-semibold">{leadConversionBoost} extra leads/month</span> captured via AI automation
                                                </p>
                                            </div>

                                            <button
                                                onClick={() => setStep('capture')}
                                                className="w-full mt-6 flex items-center justify-center gap-2 py-3.5 bg-ai-blue hover:bg-ai-blue-dim text-white font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                                            >
                                                GET FULL REPORT <ArrowRight size={16} />
                                            </button>
                                        </motion.div>
                                    )}

                                    {step === 'capture' && (
                                        <motion.div
                                            key="capture"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                        >
                                            <div className="text-center mb-6">
                                                <div className="w-14 h-14 bg-ai-blue/10 rounded-xl flex items-center justify-center border border-ai-blue/30 mx-auto mb-4">
                                                    <TrendingUp size={28} className="text-ai-blue" />
                                                </div>
                                                <h3 className="text-xl font-bold text-white mb-2">
                                                    Your business could save up to
                                                </h3>
                                                <p className="text-3xl font-bold text-ai-blue">{formatCurrency(yearlySavings)}/year</p>
                                                <p className="text-white text-sm mt-2">
                                                    Enter your email to receive the full AI ROI breakdown.
                                                </p>
                                            </div>

                                            <form onSubmit={handleSubmit} className="space-y-3">
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="Your email address"
                                                    required
                                                    className="w-full bg-ai-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/60 focus:outline-none focus:border-ai-blue/50 transition-colors"
                                                />

                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-ai-blue hover:bg-ai-blue-dim text-white font-bold rounded-lg transition-all disabled:opacity-70 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                                                >
                                                    {isSubmitting ? (
                                                        <Loader2 size={16} className="animate-spin" />
                                                    ) : (
                                                        <>
                                                            SEND MY FREE REPORT
                                                            <ArrowRight size={16} />
                                                        </>
                                                    )}
                                                </button>

                                                {error && <p className="text-red-400 text-xs text-center">{error}</p>}

                                                <button
                                                    type="button"
                                                    onClick={() => setStep('calculator')}
                                                    className="w-full text-xs text-white hover:text-white transition-colors py-2"
                                                >
                                                    ← Back to calculator
                                                </button>
                                            </form>
                                        </motion.div>
                                    )}

                                    {step === 'success' && (
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
                                            <h3 className="text-xl font-bold text-white mb-2">Report on its way! 📊</h3>
                                            <p className="text-white text-sm">
                                                Your personalized AI ROI report will arrive in your inbox shortly.
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
