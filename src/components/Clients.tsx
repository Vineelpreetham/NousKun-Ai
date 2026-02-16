'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const clients = [
    { name: 'Booking.com', url: 'https://logo.clearbit.com/booking.com' },
    { name: 'Swiss', url: 'https://logo.clearbit.com/swiss.com' },
    { name: 'Expedia', url: 'https://logo.clearbit.com/expedia.com' },
    { name: 'China Airlines', url: 'https://logo.clearbit.com/china-airlines.com' },
    { name: 'Spotify', url: 'https://logo.clearbit.com/spotify.com' },
    { name: 'Ray-Ban', url: 'https://logo.clearbit.com/ray-ban.com' },
    { name: 'Adidas', url: 'https://logo.clearbit.com/adidas.com' },
    { name: 'American Express', url: 'https://logo.clearbit.com/americanexpress.com' },
    { name: 'Amazon', url: 'https://logo.clearbit.com/amazon.com' },
    { name: 'Apple Music', url: 'https://logo.clearbit.com/music.apple.com' },
];

export default function Clients() {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax/Reveal effect
            // The white card covers the previous dark section
            gsap.fromTo(contentRef.current,
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        end: "top 40%",
                        scrub: 1
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative z-20 py-24 bg-white text-black min-h-[80vh] flex items-center justify-center">
            <div ref={contentRef} className="max-w-7xl mx-auto px-4 md:px-8 w-full">
                <div className="mb-24">
                    <p className="text-xs font-mono tracking-widest uppercase text-zinc-500 mb-4">
                        Committed to those who trust us.
                    </p>
                    <h2 className="text-4xl md:text-7xl font-bold tracking-tight max-w-4xl leading-[1.1]">
                        Our team has worked with a diverse range of clients
                    </h2>
                </div>

                <div className="flex md:grid md:grid-cols-5 gap-8 md:gap-20 items-center overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-6 md:pb-0 -mx-4 px-4 md:mx-auto md:px-0 grayscale opacity-80">
                    {clients.map((client, i) => (
                        <div key={i} className="flex-shrink-0 min-w-[140px] md:min-w-0 flex justify-center items-center h-20 md:w-full hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer group snap-center">
                            {/* Fallback to text if image fails or for SEO, but mainly using images here */}
                            <img
                                src={client.url}
                                alt={client.name}
                                className="max-h-12 max-w-[140px] object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                                onError={(e) => {
                                    // Fallback if generic image fails
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                }}
                            />
                            <span className="hidden text-xl font-bold text-black">{client.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
