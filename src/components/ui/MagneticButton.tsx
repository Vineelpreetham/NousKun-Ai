'use client';

import { useRef, useEffect, ReactElement } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface MagneticButtonProps {
    children: ReactElement;
    strength?: number; // How strong the magnetic pull is (default: 0.5)
}

export default function MagneticButton({
    children,
    strength = 0.5,
}: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const element = ref.current;
        if (!element) return;

        const xTo = gsap.quickTo(element, 'x', {
            duration: 1,
            ease: 'elastic.out(1, 0.3)',
        });
        const yTo = gsap.quickTo(element, 'y', {
            duration: 1,
            ease: 'elastic.out(1, 0.3)',
        });

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = element.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            xTo(x * strength);
            yTo(y * strength);
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, { scope: ref });

    return (
        <div ref={ref} className="inline-block cursor-pointer">
            {children}
        </div>
    );
}
