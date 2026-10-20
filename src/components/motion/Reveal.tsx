'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

type RevealProps = HTMLMotionProps<'div'> & { delay?: number; y?: number };

/** Fades + un-blurs children up into place when scrolled into view. */
export function Reveal({ delay = 0, y = 24, children, ...rest }: RevealProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease, delay }}
            {...rest}
        >
            {children}
        </motion.div>
    );
}

const wordVariants = {
    hidden: { y: '110%' },
    show: (d: number) => ({ y: '0%', transition: { duration: 0.9, ease, delay: d } }),
};

/**
 * Splits text into words that rise in from a mask, one after another.
 * The in-view trigger lives on the (unclipped) wrapper; words follow via variants.
 */
export function WordsReveal({
    text,
    className,
    delay = 0,
    stagger = 0.06,
    animateOnMount = false,
}: {
    text: string;
    className?: string;
    delay?: number;
    stagger?: number;
    animateOnMount?: boolean;
}) {
    const words = text.split(' ');
    const trigger = animateOnMount
        ? { animate: 'show' }
        : { whileInView: 'show', viewport: { once: true, margin: '-40px' } };

    return (
        <motion.span className={className} initial="hidden" {...trigger}>
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em]">
                    <motion.span className="inline-block will-change-transform" variants={wordVariants} custom={delay + i * stagger}>
                        {word}
                        {i < words.length - 1 ? ' ' : ''}
                    </motion.span>
                </span>
            ))}
        </motion.span>
    );
}
