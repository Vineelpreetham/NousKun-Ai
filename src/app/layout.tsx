import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google';
import './globals.css';
import Nav from '@/components/site/Nav';
import Footer from '@/components/site/Footer';
import Preloader from '@/components/site/Preloader';
import SmoothScroll from '@/components/SmoothScroll';
import AiStrategistWidget from '@/components/AiStrategistWidget';
import MotionProvider from '@/components/motion/MotionProvider';
import { site } from '@/lib/site';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' });
const instrument = Instrument_Serif({
    subsets: ['latin'],
    weight: '400',
    style: ['normal', 'italic'],
    variable: '--font-instrument',
    display: 'swap',
});

export const metadata: Metadata = {
    metadataBase: new URL(site.url),
    title: { default: site.title, template: `%s | ${site.shortTitle}` },
    description: site.description,
    applicationName: site.name,
    keywords: site.keywords,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    publisher: site.legalName,
    alternates: { canonical: '/' },
    openGraph: {
        type: 'website',
        url: site.url,
        siteName: site.name,
        title: site.title,
        description: site.description,
        locale: 'en_IN',
    },
    twitter: {
        card: 'summary_large_image',
        title: site.title,
        description: site.description,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION in Vercel to verify in Google Search Console
    verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
        ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
        : undefined,
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#08090b',
};

const orgJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Organization',
            '@id': `${site.url}/#organization`,
            name: site.name,
            alternateName: ['NousKūn AI', 'Nouskun', 'Nouskun AI', site.legalName],
            legalName: site.legalName,
            url: site.url,
            logo: `${site.url}/icon.svg`,
            email: site.email,
            description: site.description,
        },
        {
            '@type': 'WebSite',
            '@id': `${site.url}/#website`,
            url: site.url,
            name: site.name,
            alternateName: ['NousKūn AI', 'Nouskun AI'],
            publisher: { '@id': `${site.url}/#organization` },
        },
        {
            '@type': 'ProfessionalService',
            '@id': `${site.url}/#service`,
            name: site.name,
            url: site.url,
            description: site.description,
            areaServed: 'Worldwide',
            priceRange: '₹₹₹',
            provider: { '@id': `${site.url}/#organization` },
            knowsAbout: [
                'AI agents',
                'AI chatbots',
                'WhatsApp Business API automation',
                'Workflow automation',
                'Retrieval-augmented generation',
                'Next.js web development',
                'SaaS development',
            ],
        },
    ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html
            lang="en"
            className={`dark ${geist.variable} ${geistMono.variable} ${instrument.variable}`}
            suppressHydrationWarning
        >
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: "try{if(sessionStorage.getItem('nk-intro-seen')==='1')document.documentElement.classList.add('nk-seen')}catch(e){}",
                    }}
                />
            </head>
            <body suppressHydrationWarning className="grain font-sans antialiased bg-ink text-paper">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
                />
                <MotionProvider>
                    <Preloader />
                    <Nav />
                    <SmoothScroll>
                        <main className="min-h-screen flex flex-col w-full">{children}</main>
                        <Footer />
                    </SmoothScroll>
                    <AiStrategistWidget />
                </MotionProvider>
            </body>
        </html>
    );
}
