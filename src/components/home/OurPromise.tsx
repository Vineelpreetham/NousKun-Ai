import { Reveal, WordsReveal } from '@/components/motion/Reveal';
import { promise } from '@/lib/content';
import { ShieldCheck, Activity, Gauge } from 'lucide-react';

const icons = [ShieldCheck, Activity, Gauge];

export default function OurPromise() {
    return (
        <section className="relative px-5 py-24 md:px-8 md:py-32">
            <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-line bg-surface/60 p-8 md:p-14">
                <p className="mb-6 flex items-center gap-3 text-sm text-muted">
                    <span className="h-px w-8 bg-brand" /> Our promise
                </p>
                <h2 className="max-w-3xl text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.02] tracking-[-0.04em] text-paper">
                    <WordsReveal text="Built for production." />{' '}
                    <WordsReveal text="Not for slide decks." className="serif text-brand-soft" delay={0.2} />
                </h2>
                <Reveal delay={0.2}>
                    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{promise.body}</p>
                </Reveal>
                <div className="mt-12 grid gap-4 md:grid-cols-3">
                    {promise.points.map((p, i) => {
                        const Icon = icons[i];
                        return (
                            <Reveal key={p.k} delay={0.1 + i * 0.08} className="rounded-2xl border border-line bg-ink/50 p-6">
                                <Icon size={20} className="mb-4 text-brand-soft" />
                                <p className="mb-1 font-medium text-paper">{p.k}</p>
                                <p className="text-sm leading-relaxed text-muted">{p.v}</p>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
