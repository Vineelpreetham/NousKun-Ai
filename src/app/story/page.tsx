import StoryContent from '@/components/StoryContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Our Story | NousKun Ai',
    description: 'The origin of autonomous digital systems. Bridging human creativity with machine intelligence.',
};

export default function StoryPage() {
    return (
        <div className="bg-ai-black text-foreground min-h-screen">
            <StoryContent />
        </div>
    );
}
