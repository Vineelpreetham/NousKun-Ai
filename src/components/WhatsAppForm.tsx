'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ArrowRight, Loader2, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

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
    const [prefilledInterest, setPrefilledInterest] = useState<string | null>(null);

    useEffect(() => {
        // Read ?interest= from URL — supports both /?interest=X and /#contact?interest=X
        const searchParams = new URLSearchParams(window.location.search);
        const hashParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
        const interest = searchParams.get('interest') || hashParams.get('interest');
        if (interest) setPrefilledInterest(decodeURIComponent(interest.replace(/\+/g, ' ')));
    }, []);

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


    const field =
        'peer w-full rounded-xl border border-line bg-ink/60 px-4 pb-2.5 pt-6 text-[15px] text-paper outline-none transition-colors placeholder:text-transparent focus:border-brand/60 focus:bg-ink';
    const label =
        'pointer-events-none absolute left-4 top-2 text-[11px] font-medium uppercase tracking-wider text-muted transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-brand-soft';

    return (
        <div className="relative w-full overflow-hidden rounded-3xl border border-line bg-surface/80 p-6 backdrop-blur-xl md:p-8">
            <AnimatePresence>
                {isSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-surface p-8 text-center"
                    >
                        <motion.div
                            initial={{ scale: 0, rotate: -45 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: 'spring', stiffness: 220, damping: 14 }}
                            className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-400"
                        >
                            <CheckCircle2 size={32} strokeWidth={1.5} />
                        </motion.div>
                        <h3 className="mb-2 text-2xl font-medium tracking-tight text-paper">Got it — talk soon.</h3>
                        <p className="max-w-xs text-sm leading-relaxed text-muted">
                            We&apos;ve sent a confirmation to your WhatsApp. The NousKun team will reach out shortly.
                        </p>
                        <button
                            onClick={() => setIsSuccess(false)}
                            className="mt-6 text-sm text-brand-soft underline-offset-4 hover:underline"
                        >
                            Send another request
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-medium tracking-tight text-paper">Book a free consultation</h3>
                    <p className="mt-1 text-sm text-muted">30 minutes. No pitch deck. Just your problem.</p>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-400">
                    <MessageCircle size={18} />
                </span>
            </div>

            {prefilledInterest && (
                <div className="mb-5 flex items-center gap-2 rounded-xl border border-brand/20 bg-brand/10 px-4 py-2.5">
                    <Sparkles size={13} className="shrink-0 text-brand-soft" />
                    <span className="text-xs text-paper/80">
                        Interested in: <span className="font-semibold text-paper">{prefilledInterest}</span>
                    </span>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
                <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                        <div className="relative">
                            <input id="f-name" {...register('name')} placeholder="Your name" autoComplete="name" className={field} />
                            <label htmlFor="f-name" className={label}>Your name</label>
                        </div>
                        {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
                    </div>
                    <div>
                        <div className="relative">
                            <input id="f-biz" {...register('businessName')} placeholder="Business name" autoComplete="organization" className={field} />
                            <label htmlFor="f-biz" className={label}>Business name</label>
                        </div>
                        {errors.businessName && <p className="mt-1 text-xs text-red-400">{errors.businessName.message}</p>}
                    </div>
                </div>

                <div>
                    <div className="relative">
                        <select id="f-type" {...register('businessType')} defaultValue="" className={`${field} appearance-none pt-6`}>
                            <option value="" disabled>Select…</option>
                            <option value="e-commerce">E-Commerce</option>
                            <option value="agency">Agency / Service</option>
                            <option value="saas">SaaS / Tech</option>
                            <option value="education">Education / Coaching</option>
                            <option value="real-estate">Real Estate</option>
                            <option value="other">Other</option>
                        </select>
                        <label htmlFor="f-type" className="pointer-events-none absolute left-4 top-2 text-[11px] font-medium uppercase tracking-wider text-muted">
                            Business type
                        </label>
                        <ArrowRight size={14} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-muted" />
                    </div>
                    {errors.businessType && <p className="mt-1 text-xs text-red-400">{errors.businessType.message}</p>}
                </div>

                <div>
                    <div className="relative">
                        <input id="f-wa" {...register('whatsappNumber')} type="tel" placeholder="WhatsApp number" autoComplete="tel" className={field} />
                        <label htmlFor="f-wa" className={label}>WhatsApp number (with country code)</label>
                    </div>
                    {errors.whatsappNumber && <p className="mt-1 text-xs text-red-400">{errors.whatsappNumber.message}</p>}
                </div>

                {error && (
                    <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400">
                        <AlertCircle size={14} />
                        <span>{error}</span>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative mt-2 flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-brand py-4 font-medium text-white transition-all hover:shadow-[0_0_40px_-6px_rgba(77,142,255,0.7)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    {isSubmitting ? (
                        <Loader2 className="animate-spin" size={20} />
                    ) : (
                        <>
                            Book my call
                            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                        </>
                    )}
                </button>

                <p className="pt-1 text-center text-xs text-muted/80">We&apos;ll reply on WhatsApp. No spam, ever.</p>
            </form>
        </div>
    );
}
