'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Logo from './Logo';
import { navItems } from '@/lib/site';
import { cn } from '@/lib/utils';

export function scrollToContact() {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else window.location.href = '/#contact';
}

export default function Nav() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [hovered, setHovered] = useState<string | null>(null);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, 'change', (y) => {
        const prev = scrollY.getPrevious() ?? 0;
        setScrolled(y > 24);
        setHidden(y > 400 && y > prev && !open);
    });

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
    }, [open]);

    return (
        <>
            <motion.header
                animate={{ y: hidden ? -100 : 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-x-0 top-0 z-[110] px-4 pt-4 md:px-6"
            >
                <nav
                    aria-label="Main"
                    className={cn(
                        'mx-auto flex max-w-6xl items-center justify-between rounded-full py-2 pl-4 pr-2 transition-all duration-500',
                        scrolled || open ? 'glass-panel shadow-[0_8px_30px_rgba(0,0,0,0.35)]' : 'border border-transparent'
                    )}
                >
                    <Link href="/" aria-label="NousKun AI home" className="relative z-[110]">
                        <Logo />
                    </Link>

                    <ul className="hidden items-center md:flex" onMouseLeave={() => setHovered(null)}>
                        {navItems.map((item) => {
                            const active = pathname === item.path || pathname.startsWith(item.path + '/');
                            return (
                                <li key={item.path} className="relative">
                                    <Link
                                        href={item.path}
                                        onMouseEnter={() => setHovered(item.path)}
                                        className={cn(
                                            'relative z-10 block px-4 py-2 text-sm transition-colors',
                                            active ? 'text-paper' : 'text-muted hover:text-paper'
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                    {hovered === item.path && (
                                        <motion.span
                                            layoutId="nav-hover"
                                            className="absolute inset-0 rounded-full bg-white/[0.06]"
                                            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                                        />
                                    )}
                                    {active && <span className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand" />}
                                </li>
                            );
                        })}
                    </ul>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={scrollToContact}
                            className="group hidden items-center gap-1.5 rounded-full bg-paper px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-white md:inline-flex"
                        >
                            Book a call
                            <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </button>
                        <button
                            onClick={() => setOpen((o) => !o)}
                            aria-label={open ? 'Close menu' : 'Open menu'}
                            aria-expanded={open}
                            className="relative z-[110] flex h-10 w-10 items-center justify-center rounded-full md:hidden"
                        >
                            <span className="relative block h-3 w-5">
                                <span className={cn('absolute left-0 h-[1.5px] w-5 bg-paper transition-all duration-300', open ? 'top-1.5 rotate-45' : 'top-0')} />
                                <span className={cn('absolute left-0 h-[1.5px] w-5 bg-paper transition-all duration-300', open ? 'top-1.5 -rotate-45' : 'top-3')} />
                            </span>
                        </button>
                    </div>
                </nav>
            </motion.header>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ clipPath: 'circle(0% at calc(100% - 44px) 40px)' }}
                        animate={{ clipPath: 'circle(150% at calc(100% - 44px) 40px)' }}
                        exit={{ clipPath: 'circle(0% at calc(100% - 44px) 40px)' }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink-2 px-6 pb-10 pt-28 md:hidden"
                    >
                        <ul className="space-y-2">
                            {[{ name: 'Home', path: '/' }, ...navItems].map((item, i) => (
                                <motion.li
                                    key={item.path}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.15 + i * 0.06, duration: 0.5 }}
                                >
                                    <Link
                                        href={item.path}
                                        onClick={() => setOpen(false)}
                                        className={cn(
                                            'flex items-baseline gap-3 text-5xl font-medium tracking-tight',
                                            pathname === item.path ? 'text-brand' : 'text-paper'
                                        )}
                                    >
                                        <span className="font-mono text-xs text-muted">0{i + 1}</span>
                                        {item.name}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            onClick={() => {
                                setOpen(false);
                                setTimeout(scrollToContact, 350);
                            }}
                            className="flex w-full items-center justify-center gap-2 rounded-full bg-brand py-4 text-base font-medium text-white"
                        >
                            Book a free call <ArrowUpRight size={18} />
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
