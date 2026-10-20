import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { caseStudies } from '@/lib/case-studies';

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();
    const pages: { path: string; priority: number }[] = [
        { path: '', priority: 1 },
        { path: '/services', priority: 0.9 },
        { path: '/case-studies', priority: 0.8 },
        { path: '/system', priority: 0.7 },
        { path: '/story', priority: 0.6 },
        { path: '/terms', priority: 0.2 },
    ];

    return [
        ...pages.map((p) => ({
            url: `${site.url}${p.path}`,
            lastModified: now,
            changeFrequency: 'monthly' as const,
            priority: p.priority,
        })),
        ...caseStudies.map((cs) => ({
            url: `${site.url}/case-studies/${cs.slug}`,
            lastModified: now,
            changeFrequency: 'yearly' as const,
            priority: 0.6,
        })),
    ];
}
