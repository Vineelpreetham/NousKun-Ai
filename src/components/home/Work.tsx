import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import CaseStudyCard from '@/components/CaseStudyCard';
import { Reveal, WordsReveal } from '@/components/motion/Reveal';
import { caseStudies } from '@/lib/case-studies';

export default function Work() {
    return (
        <section className="relative px-5 py-24 md:px-8 md:py-32">
            <div className="mx-auto max-w-6xl">
                <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <h2 className="max-w-2xl text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1] tracking-[-0.04em] text-paper">
                        <WordsReveal text="Systems in the" />{' '}
                        <WordsReveal text="real world." className="serif text-brand-soft" delay={0.2} />
                    </h2>
                    <Reveal delay={0.2}>
                        <Link href="/case-studies" className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-paper">
                            All case studies
                            <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </Link>
                    </Reveal>
                </div>
                <div className="grid min-h-[420px] grid-cols-1 gap-4 md:grid-cols-3">
                    {caseStudies.map((s, i) => (
                        <CaseStudyCard key={s.slug} study={s} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
