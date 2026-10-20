'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import WhatsAppForm from '@/components/WhatsAppForm';
import { WordsReveal, Reveal } from '@/components/motion/Reveal';
import { navItems, site } from '@/lib/site';

export default function Footer() {
    const wordRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: wordRef, offset: ['start end', 'end end'] });
    const y = useTransform(scrollYProgress, [0, 1], ['40%', '0%']);
    const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);

    return (
        <footer id="contact" className="relative scroll-mt-20 overflow-hidden border-t border-line bg-ink">
            {/* glow */}
            <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-brand/15 blur-[140px]" />
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />

            <div className="relative mx-auto grid max-w-[76rem] gap-14 px-5 pb-20 pt-24 md:grid-cols-[1.1fr_1fr] md:gap-20 md:px-8 md:pt-32">
                <div>
                    <Reveal>
                        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3 py-1 text-xs text-muted">
                            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emerald-400" />
                            Taking new projects
                        </span>
                    </Reveal>
                    <h2 className="mt-6 text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[0.98] tracking-[-0.035em] text-paper">
                        <WordsReveal text="Let's build the system" />{' '}
                        <WordsReveal text="your business runs on." className="serif text-brand-soft" delay={0.2} />
                    </h2>
                    <Reveal delay={0.2}>
                        <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
                            Tell us where time and leads are leaking. We&apos;ll map out what to automate first, and what it&apos;s worth — on a free 30-minute call.
                        </p>
                    </Reveal>

                    <Reveal delay={0.3} className="mt-10 grid grid-cols-2 gap-8 text-sm">
                        <div>
                            <p className="mb-3 text-xs uppercase tracking-wider text-muted/70">Explore</p>
                            <ul className="space-y-2">
                                {navItems.map((n) => (
                                    <li key={n.path}>
                                        <Link href={n.path} className="text-paper/80 transition-colors hover:text-brand-soft">
                                            {n.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p className="mb-3 text-xs uppercase tracking-wider text-muted/70">Contact</p>
                            <ul className="space-y-2">
                                <li>
                                    <a href={`mailto:${site.email}`} className="text-paper/80 transition-colors hover:text-brand-soft">
                                        {site.email}
                                    </a>
                                </li>
                                <li>
                                    <Link href="/terms" className="text-paper/80 transition-colors hover:text-brand-soft">
                                        Terms &amp; Conditions
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </Reveal>
                </div>

                <Reveal delay={0.15}>
                    <WhatsAppForm />
                </Reveal>
            </div>

            <div ref={wordRef} className="relative mx-auto max-w-[1400px] select-none px-4" aria-hidden>
                <motion.div
                    style={{ y, opacity }}
                    className="bg-gradient-to-b from-paper/90 via-paper/30 to-transparent bg-clip-text text-center text-[21vw] font-semibold leading-[0.8] tracking-[-0.06em] text-transparent"
                >
                    nouskun
                </motion.div>
            </div>

            <div className="relative border-t border-line">
                <div className="mx-auto flex max-w-[76rem] flex-col items-center justify-between gap-2 px-5 py-6 text-xs text-muted md:flex-row md:px-8">
                    <span>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</span>
                    <span>AI agents · Automation · Web · SaaS</span>
                </div>
            </div>
        </footer>
    );
}
