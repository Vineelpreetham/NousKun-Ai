import { Reveal, WordsReveal } from '@/components/motion/Reveal';

export default function PageHeader({
    eyebrow,
    title,
    accent,
    intro,
}: {
    eyebrow: string;
    title: string;
    accent: string;
    intro: string;
}) {
    return (
        <section className="relative overflow-hidden px-5 pb-16 pt-40 md:px-8 md:pb-24 md:pt-48">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
            <div className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-brand/15 blur-[130px]" />
            <div className="relative mx-auto max-w-6xl">
                <Reveal>
                    <p className="mb-6 flex items-center gap-3 text-sm text-muted">
                        <span className="h-px w-8 bg-brand" /> {eyebrow}
                    </p>
                </Reveal>
                <h1 className="max-w-4xl text-[clamp(2.75rem,7.5vw,6rem)] font-medium leading-[0.95] tracking-[-0.045em] text-paper">
                    <WordsReveal text={title} animateOnMount />{' '}
                    <WordsReveal text={accent} className="serif text-brand-soft" animateOnMount delay={0.25} />
                </h1>
                <Reveal delay={0.35}>
                    <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">{intro}</p>
                </Reveal>
            </div>
        </section>
    );
}
