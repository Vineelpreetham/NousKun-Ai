import type { Metadata } from 'next';
import PageHeader from '@/components/site/PageHeader';
import ScrollText from '@/components/motion/ScrollText';
import { Reveal } from '@/components/motion/Reveal';
import SpotlightCard from '@/components/motion/SpotlightCard';

export const metadata: Metadata = {
    title: 'Our Story — Why We Started NousKun AI',
    description:
        'NousKun AI was founded to help businesses operate smarter and faster with AI agents and automation that do the repetitive work, so people can focus on growth.',
    alternates: { canonical: '/story' },
};

const principles = [
    { title: 'Systems, not tools', body: 'We design how everything connects before we write a line of code. One system beats ten disconnected apps.' },
    { title: 'Outcomes over output', body: 'If it doesn’t save time, win leads or grow revenue, we don’t build it.' },
    { title: 'Humans stay in charge', body: 'AI handles the repetitive, data-heavy work. Your team keeps the judgement, relationships and creativity.' },
    { title: 'No lock-in', body: 'We pick the best model and tool for each job, and you own everything we build.' },
];

export default function StoryPage() {
    return (
        <>
            <PageHeader
                eyebrow="Our story"
                title="The future of business is"
                accent="autonomous."
                intro="For too long, businesses have run on fragile manual processes and websites that just sit there. We started NousKun AI to change that."
            />

            <section className="px-5 py-20 md:px-8 md:py-32">
                <div className="mx-auto max-w-5xl">
                    <ScrollText
                        className="text-[clamp(1.6rem,3.6vw,3rem)] font-medium leading-[1.15] tracking-[-0.03em] text-paper"
                        highlight={['machine', 'growth']}
                        text="Our mission is to bridge human strategy and machine execution. We build AI agents and automations that take on the repetitive, the data-heavy and the operational — so you can focus on growth and the people you serve."
                    />
                </div>
            </section>

            <section className="px-5 pb-24 md:px-8 md:pb-32">
                <div className="mx-auto max-w-6xl">
                    <Reveal>
                        <h2 className="mb-10 text-3xl font-medium tracking-[-0.03em] text-paper md:text-4xl">What we believe</h2>
                    </Reveal>
                    <div className="grid gap-4 md:grid-cols-2">
                        {principles.map((p, i) => (
                            <Reveal key={p.title} delay={i * 0.08}>
                                <SpotlightCard className="h-full">
                                    <div className="relative z-10 p-7 md:p-9">
                                        <p className="mb-6 font-mono text-xs text-brand-soft">0{i + 1}</p>
                                        <h3 className="mb-3 text-2xl font-medium tracking-tight text-paper">{p.title}</h3>
                                        <p className="leading-relaxed text-muted">{p.body}</p>
                                    </div>
                                </SpotlightCard>
                            </Reveal>
                        ))}
                    </div>

                    <Reveal className="mt-16 grid grid-cols-2 gap-8 border-t border-line pt-10 md:grid-cols-3">
                        {[
                            { k: 'Founded', v: '2026' },
                            { k: 'Company', v: 'NousKun Pvt. Ltd.' },
                            { k: 'Clients', v: 'Worldwide' },
                        ].map((s) => (
                            <div key={s.k}>
                                <p className="text-2xl font-medium tracking-tight text-paper md:text-3xl">{s.v}</p>
                                <p className="mt-1 text-sm text-muted">{s.k}</p>
                            </div>
                        ))}
                    </Reveal>
                </div>
            </section>
        </>
    );
}
