'use client';

import { useRef, type ReactNode, type MouseEvent } from 'react';
import { cn } from '@/lib/utils';

/** Card with a soft light that follows the cursor and a glowing border on hover. */
export default function SpotlightCard({ children, className }: { children: ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);

    const onMove = (e: MouseEvent<HTMLDivElement>) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${e.clientX - r.left}px`);
        el.style.setProperty('--my', `${e.clientY - r.top}px`);
    };

    return (
        <div
            ref={ref}
            onMouseMove={onMove}
            className={cn(
                'group relative overflow-hidden rounded-3xl border border-line bg-surface/70',
                'before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100',
                'before:[background:radial-gradient(420px_circle_at_var(--mx)_var(--my),rgba(77,142,255,0.14),transparent_60%)]',
                'after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:p-px after:opacity-0 after:transition-opacity after:duration-500 hover:after:opacity-100',
                'after:[background:radial-gradient(300px_circle_at_var(--mx)_var(--my),rgba(156,192,255,0.55),transparent_60%)]',
                'after:[mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)]',
                className
            )}
        >
            {children}
        </div>
    );
}
