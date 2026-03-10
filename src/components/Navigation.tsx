'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import clsx from 'clsx';
import MagneticButton from './ui/MagneticButton';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Story', path: '/story' },
    { name: 'Work', path: '/case-studies' },
    { name: 'Services', path: '/services' },
    { name: 'System', path: '/system' },
];

export default function Navigation() {
    const pathname = usePathname();
    const navRef = useRef<HTMLElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial state: Logo is visible
            gsap.set(logoRef.current, { opacity: 1, scale: 1 });
            gsap.set(navRef.current, { backgroundColor: "transparent", borderColor: "transparent" });

            // Navbar background animation on scroll
            ScrollTrigger.create({
                start: "top -100px",
                onUpdate: (self) => {
                    if (self.scroll() > 100) {
                        gsap.to(navRef.current, { backgroundColor: "rgba(5,5,5,0.8)", borderColor: "rgba(255,255,255,0.05)", duration: 0.5 });
                    } else {
                        gsap.to(navRef.current, { backgroundColor: "transparent", borderColor: "transparent", duration: 0.3 });
                    }
                }
            });

        }, navRef);

        return () => ctx.revert();
    }, []);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    const scrollToContact = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };

    return (
        <>
            <nav
                ref={navRef}
                className="fixed top-0 left-0 w-full z-[110] px-6 md:px-8 py-6 flex items-center justify-between border-b border-transparent transition-colors duration-500 backdrop-blur-sm"
            >
                <Link href="/" className="z-[110]">
                    <div ref={logoRef} className="text-xl font-bold tracking-tighter text-white cursor-pointer">
                        NOUSKŪN <span className="text-ai-blue">AI</span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="glass-panel rounded-full px-8 py-3 hidden md:flex items-center gap-8 shadow-lg shadow-black/20">
                    <ul className="flex items-center gap-6">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <MagneticButton>
                                    <Link
                                        href={item.path}
                                        className={clsx(
                                            'relative block px-2 py-1 text-xs font-mono tracking-widest uppercase transition-colors duration-300 hover:text-ai-blue',
                                            pathname === item.path ? 'text-white' : 'text-zinc-500'
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                </MagneticButton>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="hidden md:block">
                    <button
                        onClick={scrollToContact}
                        className="px-6 py-2 rounded-sm border border-ai-blue/50 text-ai-blue text-xs font-mono tracking-widest hover:bg-ai-blue hover:text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                    >
                        INITIATE
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden z-[110] text-white p-2 focus:outline-none"
                    aria-label="Toggle Menu"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="fixed inset-0 z-[100] bg-zinc-950 flex flex-col items-center justify-center md:hidden"
                    >
                        {/* Background Elements */}
                        <div className="absolute inset-0 pointer-events-none opacity-20">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-ai-blue/10 rounded-full blur-[80px]" />
                        </div>

                        {/* Content Wrapper offset upwards to account for visual weight */}
                        <div className="flex flex-col items-center gap-8 relative z-10 -mt-20">
                            <ul className="flex flex-col items-center gap-8">
                                {navItems.map((item, i) => (
                                    <motion.li
                                        key={item.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + i * 0.1 }}
                                    >
                                        <Link
                                            href={item.path}
                                            onClick={() => setIsMenuOpen(false)}
                                            className={clsx(
                                                'text-3xl font-bold tracking-tighter hover:text-ai-blue transition-colors',
                                                pathname === item.path ? 'text-ai-blue' : 'text-white'
                                            )}
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>

                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                onClick={scrollToContact}
                                className="px-8 py-3 rounded-sm border border-ai-blue text-ai-blue tracking-widest uppercase font-mono text-sm hover:bg-ai-blue hover:text-white transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                            >
                                INITIATE SYSTEM
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
