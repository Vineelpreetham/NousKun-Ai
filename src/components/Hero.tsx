'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial entrance animation
            const tlEntrance = gsap.timeline();

            tlEntrance.to('.hero-char', {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.1,
                ease: "power4.out",
                delay: 0.2
            })
                .to('.hero-subtitle', {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out"
                }, "-=0.5")
                .to('.hero-scroll', {
                    opacity: 1,
                    duration: 1,
                    delay: 0.5
                });

            // Scroll exit animation
            const tlScroll = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1,
                }
            });

            tlScroll.to(textRef.current, {
                opacity: 0,
                // scale: 1.1, // Removed zoom effect per user request
                filter: 'blur(20px)',
                ease: 'power1.in',
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-ai-black z-20">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-ai-blue/5 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
            </div>

            <div ref={textRef} className="relative z-10 text-center flex flex-col items-center w-full px-4">
                <h1 className="flex items-center justify-center text-[clamp(2.5rem,12vw,9rem)] font-bold tracking-tighter leading-none text-white mix-blend-difference overflow-hidden w-full">
                    {"NOUSKŪN".split('').map((char, i) => (
                        <span key={i} className="hero-char inline-block translate-y-full opacity-0">
                            {char}
                        </span>
                    ))}
                    <span className="w-[0.2em]" /> {/* Spacer */}
                    <span className="text-ai-blue flex">
                        {"AI".split('').map((char, i) => (
                            <span key={`ai-${i}`} className="hero-char inline-block translate-y-full opacity-0">
                                {char}
                            </span>
                        ))}
                    </span>
                </h1>
                <p className="mt-6 text-sm uppercase tracking-[0.2em] text-zinc-400 opacity-0 hero-subtitle">
                    Intelligence Established
                </p>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 flex flex-col items-center gap-2 opacity-0 hero-scroll">
                <span className="text-[10px] font-mono tracking-widest text-zinc-600">SCROLL TO ENTER</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-ai-blue to-transparent" />
            </div>
        </section>
    );
}
