import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SpotlightCard from '@/components/motion/SpotlightCard';
import { Reveal, WordsReveal } from '@/components/motion/Reveal';
import { ChatVisual, FlowVisual, BrowserVisual, DashboardVisual } from './Visuals';
import { services } from '@/lib/content';

const layout = [
    { span: 'md:col-span-4', visual: <ChatVisual />, visualH: 'h-56' },
    { span: 'md:col-span-2', visual: <FlowVisual />, visualH: 'h-40' },
    { span: 'md:col-span-2', visual: <BrowserVisual />, visualH: 'h-44' },
    { span: 'md:col-span-4', visual: <DashboardVisual />, visualH: 'h-44' },
];

export default function ServicesBento() {
    return (
        <section id="services" className="relative px-5 py-24 md:px-8 md:py-32">
            <div className="mx-auto max-w-6xl">
                <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <h2 className="max-w-2xl text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1] tracking-[-0.04em] text-paper">
                        <WordsReveal text="Everything your business needs to" />{' '}
                        <WordsReveal text="run on autopilot." className="serif text-brand-soft" delay={0.25} />
                    </h2>
                    <Reveal delay={0.2}>
                        <Link href="/services" className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-paper">
                            All services
                            <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </Link>
                    </Reveal>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
                    {services.map((s, i) => (
                        <Reveal key={s.id} delay={i * 0.08} className={layout[i].span}>
                            <SpotlightCard className="h-full">
                                <Link href={`/services#${s.id}`} className="relative z-10 flex h-full flex-col p-6 md:p-7">
                                    <div className={`mb-6 ${layout[i].visualH}`}>{layout[i].visual}</div>
                                    <div className="mt-auto flex items-end justify-between gap-4">
                                        <div>
                                            <p className="mb-1 font-mono text-xs text-muted">0{i + 1}</p>
                                            <h3 className="text-xl font-medium tracking-tight text-paper md:text-2xl">{s.title}</h3>
                                            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{s.short}</p>
                                        </div>
                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                                            <ArrowUpRight size={18} />
                                        </span>
                                    </div>
                                </Link>
                            </SpotlightCard>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
