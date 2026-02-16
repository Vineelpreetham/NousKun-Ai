'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);



export default function Story() {
    return (
        <section className="relative py-20 md:py-32 px-6 md:px-8 w-full bg-zinc-900 border-y border-white/5 overflow-hidden">
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
                <div className="mb-12">
                    <h2 className="text-sm font-mono tracking-[0.3em] text-ai-blue uppercase mb-6">
                        What We Actually Do
                    </h2>
                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
                        NousKūn AI designs and installs <span className="text-ai-blue">intelligent digital systems</span> that work 24/7 for your business.
                    </h3>
                    <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto">
                        Every website, form, and interaction is engineered to think, respond, and convert automatically.
                    </p>
                </div>

                <div className="p-8 border border-white/10 bg-white/5 rounded-2xl backdrop-blur-sm max-w-xl">
                    <p className="text-white font-medium text-lg mb-2">
                        We don’t add tools — we design systems.
                    </p>
                    <div className="w-12 h-1 bg-ai-blue mx-auto mt-6 rounded-full" />
                </div>
            </div>
        </section>
    );
}
