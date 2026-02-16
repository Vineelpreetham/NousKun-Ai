import ServicesContent from '@/components/ServicesContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Services | NousKun Ai',
    description: 'Intelligent Web Systems, AI Automation, and Growth Intelligence.',
};

export default function ServicesPage() {
    return (
        <div className="bg-ai-black text-foreground min-h-screen">
            <ServicesContent />
        </div>
    );
}
