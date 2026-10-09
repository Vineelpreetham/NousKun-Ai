'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Monitor, Database, ArrowRight, Loader2, CheckCircle2, Zap } from 'lucide-react';

const serviceLeadData = [
    {
        icon: Cpu,
        title: 'AI & Automation',
        benefit: 'Get a custom AI automation blueprint for your business',
        interest: 'AI & Automation',
        accent: 'from-blue-500/20 to-blue-600/5',
    },
    {
        icon: Monitor,
        title: 'Web & Growth',
        benefit: 'Receive a conversion-focused website audit report',
        interest: 'Intelligent Web & Growth Systems',
        accent: 'from-violet-500/20 to-violet-600/5',
    },
    {
        icon: Database,
        title: 'SaaS using AI',
        benefit: 'Get a free SaaS product architecture consultation',
        interest: 'SaaS using AI',
        accent: 'from-cyan-500/20 to-cyan-600/5',
    },
];

function ServiceLeadCard({ service }: { service: typeof serviceLeadData[0] }) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
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
                    name: name || undefined,
                    source: 'service-page',
                    interest: service.interest,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed');

            setIsSuccess(true);
            setEmail('');
            setName('');
            setTimeout(() => setIsSuccess(false), 5000);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`relative bg-gradient-to-br ${service.accent} bg-ai-card border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col overflow-hidden`}
        >
            {/* Icon */}
            <div className="w-10 h-10 bg-ai-blue/10 rounded-lg flex items-center justify-center text-ai-blue mb-4">
                <service.icon size={20} />
            </div>

            <h3 className="text-lg font-bold text-white mb-1">{service.title}</h3>
            <p className="text-white text-sm mb-6">{service.benefit}</p>

            <AnimatePresence mode="wait">
                {isSuccess ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-lg p-3"
                    >
                        <CheckCircle2 size={16} className="text-green-400" />
                        <span className="text-sm text-green-300">We&apos;ll be in touch soon!</span>
                    </motion.div>
                ) : (
                    <motion.form
                        key="form"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="space-y-3 mt-auto"
                    >
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                            className="w-full bg-ai-black/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/60 focus:outline-none focus:border-ai-blue/50 transition-colors"
                        />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your email"
                            required
                            className="w-full bg-ai-black/60 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/60 focus:outline-none focus:border-ai-blue/50 transition-colors"
                        />
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex items-center justify-center gap-2 py-2.5 bg-ai-blue hover:bg-ai-blue-dim text-white text-sm font-bold rounded-lg transition-all disabled:opacity-70 shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                        >
                            {isSubmitting ? (
                                <Loader2 size={14} className="animate-spin" />
                            ) : (
                                <>
                                    GET STARTED <ArrowRight size={14} />
                                </>
                            )}
                        </button>
                        {error && <p className="text-red-400 text-xs">{error}</p>}
                    </motion.form>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function ServiceLeadForm() {
    return (
        <section className="relative mt-20 z-10">
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
            >
                <div className="flex items-center justify-center gap-2 mb-4">
                    <Zap size={14} className="text-ai-blue" />
                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-white">
                        Choose Your Path
                    </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                    Get a <span className="text-ai-blue">Free Consultation</span> in Your Area
                </h2>
                <p className="text-white mt-3 max-w-xl mx-auto">
                    Tell us which service interests you, and we&apos;ll prepare a personalized strategy for your business.
                </p>
            </motion.div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {serviceLeadData.map((service) => (
                    <ServiceLeadCard key={service.title} service={service} />
                ))}
            </div>
        </section>
    );
}
