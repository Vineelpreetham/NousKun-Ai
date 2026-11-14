import ScrollText from '@/components/motion/ScrollText';
import { Reveal } from '@/components/motion/Reveal';

export default function Statement() {
    return (
        <section className="relative px-5 py-28 md:px-8 md:py-44">
            <div className="mx-auto max-w-5xl">
                <Reveal>
                    <p className="mb-8 flex items-center gap-3 text-sm text-muted">
                        <span className="h-px w-8 bg-brand" /> Why NousKun
                    </p>
                </Reveal>
                <ScrollText
                    className="text-[clamp(1.75rem,4.2vw,3.5rem)] font-medium leading-[1.12] tracking-[-0.03em] text-paper"
                    highlight={['live', 'real']}
                    text="Most AI projects stall after the demo. Ours go live — agents, products and websites that do real work for real customers, and keep doing it long after launch."
                />
            </div>
        </section>
    );
}
