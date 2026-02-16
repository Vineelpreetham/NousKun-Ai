'use client';

import { Home, Layers, CreditCard, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export default function MobileNav() {
    const [activeSection, setActiveSection] = useState('home');

    const navItems = [
        { id: 'home', label: 'Home', icon: Home, target: 'top' },
        { id: 'system', label: 'System', icon: Layers, target: 'about' },
        { id: 'pricing', label: 'Pricing', icon: CreditCard, target: 'pricing' },
        { id: 'contact', label: 'Contact', icon: Mail, target: 'contact' },
    ];

    const scrollToSection = (target: string) => {
        if (target === 'top') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const element = document.getElementById(target);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    // Intersection Observer to track active section
    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map(item => item.target);

            // Default to home if at top
            if (window.scrollY < 100) {
                setActiveSection('home');
                return;
            }

            // Check other sections
            for (const section of sections) {
                if (section === 'top') continue;
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // If section is in the middle of viewport
                    if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
                        setActiveSection(navItems.find(i => i.target === section)?.id || 'home');
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [navItems]);

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 md:hidden w-[90%] max-w-[320px]">
            <div className="bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 flex justify-between items-center shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => {
                            setActiveSection(item.id);
                            scrollToSection(item.target);
                        }}
                        className={cn(
                            "flex flex-col items-center gap-1.5 transition-all duration-300 relative",
                            activeSection === item.id ? "text-ai-blue scale-105" : "text-zinc-500 hover:text-zinc-300"
                        )}
                    >
                        <item.icon size={20} strokeWidth={activeSection === item.id ? 2.5 : 2} />
                        <span className="text-[10px] font-medium tracking-wide">{item.label}</span>

                        {/* Active Indicator Dot */}
                        {activeSection === item.id && (
                            <span className="absolute -bottom-2 w-1 h-1 bg-ai-blue rounded-full" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
