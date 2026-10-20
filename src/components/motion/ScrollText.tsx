'use client';

import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';

function Word({
    word,
    progress,
    range,
    highlighted,
}: {
    word: string;
    progress: MotionValue<number>;
    range: [number, number];
    highlighted: boolean;
}) {
    const opacity = useTransform(progress, range, [0.15, 1]);
    return (
        <motion.span style={{ opacity }} className={highlighted ? 'serif text-brand-soft' : undefined}>
            {word}{' '}
        </motion.span>
    );
}

/** Paragraph whose words light up one by one as it scrolls through the viewport. */
export default function ScrollText({
    text,
    className,
    highlight = [],
}: {
    text: string;
    className?: string;
    highlight?: string[];
}) {
    const ref = useRef<HTMLParagraphElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] });
    const words = text.split(' ');

    return (
        <p ref={ref} className={className}>
            {words.map((w, i) => {
                const start = i / words.length;
                return (
                    <Word
                        key={i}
                        word={w}
                        progress={scrollYProgress}
                        range={[start, start + 1 / words.length]}
                        highlighted={highlight.includes(w.replace(/[.,—]/g, ''))}
                    />
                );
            })}
        </p>
    );
}
