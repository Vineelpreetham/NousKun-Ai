import type { Metadata } from 'next';
import PageHeader from '@/components/site/PageHeader';
import StackedServices from '@/components/home/StackedServices';
import Pricing from '@/components/Pricing';

export const metadata: Metadata = {
    title: 'Services — AI Agents, SaaS Products, Websites & Apps',
    description:
        'NousKun AI designs, builds and runs AI agents and RAG assistants (live in 3–5 weeks), SaaS products (6–10 weeks), and websites and apps (2–6 weeks).',
    alternates: { canonical: '/services' },
};

export default function ServicesPage() {
    return (
        <>
            <PageHeader
                eyebrow="Services"
                title="Three things."
                accent="Done properly."
                intro="AI agents, SaaS products, and websites and apps. We design them, build them and keep them running in production."
            />
            <StackedServices detailed />
            <Pricing />
        </>
    );
}
