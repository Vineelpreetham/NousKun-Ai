import type { Metadata } from 'next';
import PageHeader from '@/components/site/PageHeader';
import Process from '@/components/home/Process';

export const metadata: Metadata = {
    title: 'Our Process — How We Build AI Automation Systems',
    description:
        'How NousKun AI plans, builds, connects and improves AI automation systems: blueprint, build, connect and evolve.',
    alternates: { canonical: '/system' },
};

export default function SystemPage() {
    return (
        <>
            <PageHeader
                eyebrow="Process"
                title="How we build"
                accent="systems that last."
                intro="From the first call to continuous improvement — four phases that turn scattered tools and manual work into one system that runs itself."
            />
            <Process heading={false} />
        </>
    );
}
