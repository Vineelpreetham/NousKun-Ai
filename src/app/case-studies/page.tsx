import type { Metadata } from 'next';
import PageHeader from '@/components/site/PageHeader';
import CaseStudyGrid from '@/components/work/CaseStudyGrid';

export const metadata: Metadata = {
    title: 'Case Studies — AI Automation Results',
    description:
        'See how NousKun AI builds AI agents, WhatsApp automation and AI SaaS products that recover revenue, cut manual work and ship fast.',
    alternates: { canonical: '/case-studies' },
};

export default function CaseStudiesPage() {
    return (
        <>
            <PageHeader
                eyebrow="Work"
                title="Proof, not"
                accent="promises."
                intro="Real systems with measurable outcomes. Every engagement is engineered around a number that matters to the business."
            />
            <CaseStudyGrid />
        </>
    );
}
