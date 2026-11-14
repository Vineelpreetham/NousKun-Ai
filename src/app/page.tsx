import Hero from '@/components/home/Hero';
import Statement from '@/components/home/Statement';
import ServicesBento from '@/components/home/ServicesBento';
import Process from '@/components/home/Process';
import Work from '@/components/home/Work';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/home/FAQ';
import Workforce from '@/components/home/Workforce';
import OurPromise from '@/components/home/OurPromise';
import { faqs } from '@/lib/content';

const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
};

export default function Home() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <Hero />
            <Statement />
            <ServicesBento />
            <Workforce />
            <Process />
            <OurPromise />
            <Work />
            <Pricing />
            <FAQ />
        </>
    );
}
