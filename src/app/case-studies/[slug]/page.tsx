import { notFound } from 'next/navigation';
import { getCaseStudyBySlug, caseStudies } from '@/lib/case-studies';
import CaseStudyDetailClient from './CaseStudyDetailClient';

export async function generateStaticParams() {
    return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const study = getCaseStudyBySlug(slug);
    if (!study) notFound();
    return <CaseStudyDetailClient study={study} />;
}
