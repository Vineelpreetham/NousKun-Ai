import type { Metadata } from 'next';
import PageHeader from '@/components/site/PageHeader';
import Process from '@/components/home/Process';

export const metadata: Metadata = {
    title: 'How We Work — Scope, Build, Run',
    description:
        'How NousKun AI works: a free scoping call and fixed proposal, weekly working demos, then launch in weeks with monitoring and ongoing support.',
    alternates: { canonical: '/system' },
};

export default function SystemPage() {
    return (
        <>
            <PageHeader
                eyebrow="Process"
                title="Scope. Build."
                accent="Run."
                intro="Three steps from first call to production. Clear pricing up front, working demos every week, and a team that keeps your system running after launch."
            />
            <Process heading={false} />
        </>
    );
}
