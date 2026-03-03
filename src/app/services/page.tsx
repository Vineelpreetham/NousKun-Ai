import ServicesContent from '@/components/ServicesContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Services | NousKun Ai',
    description: 'Intelligent Web Systems, AI Automation, and SaaS using AI.',
};

export default function ServicesPage() {
    return (
        <div className="bg-ai-black text-foreground min-h-screen">
            <ServicesContent />
        </div>
    );
}
