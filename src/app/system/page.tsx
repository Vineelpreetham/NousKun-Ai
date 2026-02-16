import SystemContent from '@/components/SystemContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'The System | NousKun Ai',
    description: 'From blueprint to evolution. See how we architect intelligent digital ecosystems.',
};

export default function SystemPage() {
    return (
        <div className="bg-ai-black text-foreground min-h-screen">
            <SystemContent />
        </div>
    );
}
