import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCaseStudyBySlug, caseStudies } from '@/lib/case-studies';
import CaseStudyDetailClient from './CaseStudyDetailClient';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
    return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const study = getCaseStudyBySlug(slug);
    if (!study) return {};
    return {
        title: study.title,
        description: `${study.tagline}. ${study.challenge.slice(0, 110)}…`,
        alternates: { canonical: `/case-studies/${study.slug}` },
        openGraph: { title: study.title, description: study.tagline, type: 'article' },
    };
}

export default async function CaseStudyPage({ params }: Props) {
    const { slug } = await params;
    const study = getCaseStudyBySlug(slug);
    if (!study) notFound();
    return <CaseStudyDetailClient study={study} />;
}
