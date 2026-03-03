'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ValueProposition() {
    const containerRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(contentRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 80%',
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative py-20 md:py-32 px-4 md:px-8 w-full bg-ai-black z-20 flex flex-col items-center justify-center min-h-[60vh] md:min-h-[80vh]">
            <div ref={contentRef} className="relative z-10 text-center flex flex-col items-center max-w-5xl mx-auto">
                {/* Badge */}
                <div className="mb-8">
                    <span className="inline-block py-2 px-6 rounded-full border border-ai-blue/30 bg-ai-blue/10 text-xs md:text-sm tracking-[0.2em] text-ai-blue uppercase font-mono backdrop-blur-md">
                        Autonomous Revenue Systems
                    </span>
                </div>

                {/* Main Heading */}
                <h2 className="text-4xl md:text-6xl lg:text-[5.5rem] font-bold tracking-normal leading-[1.15] text-white mb-8 w-full">
                    Deploy AI to Automate, <br className="hidden md:block" />
                    Scale, and <span className="text-ai-blue">Dominate.</span>
                </h2>

                {/* Subtext */}
                <p className="text-lg md:text-xl text-zinc-400 max-w-3xl leading-relaxed mb-10">
                    We build AI agents, automate complex workflows, and integrate intelligent web systems to replace repetitive tasks with relentless efficiency.
                </p>

                {/* Additional Supporting Line */}
                <p className="text-sm md:text-base text-zinc-500 font-mono tracking-wide uppercase mb-12">
                    Not just websites. Not just software. <br className="hidden md:block" />
                    Autonomous infrastructure for the modern enterprise.
                </p>

                {/* CTAs */}
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center w-full md:w-auto px-4 md:px-0">
                    <button
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="w-full md:w-auto px-8 py-4 bg-ai-blue text-white font-bold tracking-wide uppercase rounded-sm hover:bg-blue-600 transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                    >
                        Build My AI System
                    </button>
                    <a
                        href="/case-studies"
                        className="w-full md:w-auto px-8 py-4 border border-zinc-700 text-zinc-300 font-mono text-sm tracking-widest uppercase rounded-sm hover:border-white hover:text-white transition-all duration-300 group text-center"
                    >
                        See Our Work <span className="inline-block transition-transform group-hover:translate-x-1">-&gt;</span>
                    </a>
                </div>

            </div>
        </section>
    );
}
