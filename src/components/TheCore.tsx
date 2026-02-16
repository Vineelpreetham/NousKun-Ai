'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const team = [
    { name: 'Sarah Jin', role: 'Lead Architect', src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600&h=800' },
    { name: 'David Chen', role: 'Neural Engineer', src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600&h=800' },
    { name: 'Elena V.', role: 'UX Futurist', src: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600&h=800' },
    { name: 'Marcus R.', role: 'Systems Opps', src: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600&h=800' },
    { name: 'AI Model 01', role: 'Generative Core', src: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600&h=800' },
];

export default function TheCore() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const container = sectionRef.current;
            const scrollWidth = container!.scrollWidth;
            const viewportWidth = window.innerWidth;

            gsap.to(container, {
                x: -(scrollWidth - viewportWidth),
                ease: 'none',
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: 'top top',
                    end: `+=${scrollWidth}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                },
            });
        }, triggerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={triggerRef} className="h-screen overflow-hidden bg-ai-black relative flex flex-col justify-center">
            <div className="absolute top-12 left-8 md:left-24 z-10">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-2">The Core</h2>
                <p className="text-zinc-500 font-mono text-sm">Meet the intelligence behind the system.</p>
            </div>

            <div ref={sectionRef} className="flex gap-12 px-8 md:px-24 w-max items-center h-full pt-20">
                {team.map((member, i) => (
                    <div key={i} className="group relative w-[300px] h-[450px] md:w-[400px] md:h-[600px] flex-shrink-0 overflow-hidden bg-zinc-900 border border-white/5 grayscale hover:grayscale-0 transition-all duration-700 ease-out">
                        {/* Image Placeholder */}
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            style={{ backgroundImage: `url(${member.src})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-60" />

                        <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                            <p className="text-ai-blue font-mono text-xs tracking-widest uppercase">{member.role}</p>
                        </div>
                    </div>
                ))}

                {/* End Card */}
                <div className="w-[300px] h-[450px] md:w-[400px] md:h-[600px] flex-shrink-0 flex items-center justify-center border border-white/10 bg-white/5">
                    <p className="text-2xl text-zinc-500 font-light">Join the Network {`->`}</p>
                </div>
            </div>
        </section>
    );
}
