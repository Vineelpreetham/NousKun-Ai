'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ArrowRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useState } from 'react';

// Validation Schema
const formSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    businessName: z.string().min(2, 'Business name is required'),
    businessType: z.string().min(2, 'Business type is required'),
    whatsappNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'),
});

type FormData = z.infer<typeof formSchema>;

export default function WhatsAppForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            let result;
            try {
                result = await response.json();
            } catch (jsonError) {
                console.error('Failed to parse JSON response:', jsonError);
                throw new Error(`Server Error: ${response.status} ${response.statusText}. Check Vercel logs.`);
            }

            if (!response.ok) {
                throw new Error(result.error || 'Failed to submit form');
            }

            setIsSuccess(true);
            reset();

            // Revert success state after 5 seconds to allow new submissions
            setTimeout(() => setIsSuccess(false), 5000);

        } catch (err: any) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto bg-ai-card border border-white/5 p-8 rounded-2xl shadow-[0_0_50px_rgba(59,130,246,0.05)] backdrop-blur-sm relative overflow-hidden">

            {/* Success Overlay */}
            <AnimatePresence>
                {isSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-ai-card z-20 flex flex-col items-center justify-center text-center p-8"
                    >
                        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-4">
                            <CheckCircle2 size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Request Received!</h3>
                        <p className="text-zinc-400">
                            We've received your details and will be in touch shortly.
                        </p>
                        <button
                            onClick={() => setIsSuccess(false)}
                            className="mt-6 text-ai-blue text-sm hover:underline"
                        >
                            Send another request
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                    <MessageCircle size={20} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white">Book a Free Consultation</h3>
                    <p className="text-xs text-zinc-500 font-mono uppercase tracking-wider">Connect Your Systems</p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name Field */}
                <div className="space-y-1">
                    <label className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Your Name</label>
                    <input
                        {...register('name')}
                        className="w-full bg-ai-black border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ai-blue/50 transition-colors placeholder:text-zinc-700"
                        placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
                </div>

                {/* Business Name Field */}
                <div className="space-y-1">
                    <label className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Business Name</label>
                    <input
                        {...register('businessName')}
                        className="w-full bg-ai-black border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ai-blue/50 transition-colors placeholder:text-zinc-700"
                        placeholder="Acme Corp"
                    />
                    {errors.businessName && <p className="text-red-400 text-xs">{errors.businessName.message}</p>}
                </div>

                {/* Business Type Field */}
                <div className="space-y-1">
                    <label className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Business Type</label>
                    <select
                        {...register('businessType')}
                        className="w-full bg-ai-black border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ai-blue/50 transition-colors appearance-none"
                    >
                        <option value="">Select Type...</option>
                        <option value="e-commerce">E-Commerce</option>
                        <option value="agency">Agency / Service</option>
                        <option value="saas">SaaS / Tech</option>
                        <option value="education">Education / Coaching</option>
                        <option value="real-estate">Real Estate</option>
                        <option value="other">Other</option>
                    </select>
                    {errors.businessType && <p className="text-red-400 text-xs">{errors.businessType.message}</p>}
                </div>

                {/* WhatsApp Number Field */}
                <div className="space-y-1">
                    <label className="text-xs font-mono text-zinc-400 uppercase tracking-widest">WhatsApp Number</label>
                    <input
                        {...register('whatsappNumber')}
                        type="tel"
                        className="w-full bg-ai-black border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ai-blue/50 transition-colors placeholder:text-zinc-700"
                        placeholder="+1 234 567 8900"
                    />
                    {errors.whatsappNumber && <p className="text-red-400 text-xs">{errors.whatsappNumber.message}</p>}
                </div>

                {error && (
                    <div className="flex items-center gap-2 text-red-400 text-xs bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                        <AlertCircle size={14} />
                        <span>{error}</span>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-6 bg-ai-blue hover:bg-ai-blue-dim text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed group shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]"
                >
                    {isSubmitting ? (
                        <Loader2 className="animate-spin" size={20} />
                    ) : (
                        <>
                            <span>BOOK NOW</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>

                <p className="text-[10px] text-zinc-600 text-center leading-relaxed">
                    By submitting, you agree to be contacted via WhatsApp. <br />
                    We build systems, not spam.
                </p>
            </form>
        </div>
    );
}
