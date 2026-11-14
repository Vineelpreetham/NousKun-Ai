import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal, WordsReveal } from '@/components/motion/Reveal';
import StackedServices from './StackedServices';


export default function ServicesBento() {
    return (
        <section id="services" className="relative">
          <div className="px-5 pb-16 pt-24 md:px-8 md:pb-20 md:pt-32">
            <div className="mx-auto max-w-6xl">
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <h2 className="max-w-2xl text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1] tracking-[-0.04em] text-paper">
                        <WordsReveal text="Three things." />{' '}
                        <WordsReveal text="Done properly." className="serif text-brand-soft" delay={0.2} />
                    </h2>
                    <Reveal delay={0.2}>
                        <Link href="/services" className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-paper">
                            All services
                            <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </Link>
                    </Reveal>
                </div>

            </div>
          </div>
          <StackedServices />
        </section>
    );
}
