import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import MobileNav from '@/components/MobileNav';
import GrainOverlay from '@/components/ui/GrainOverlay';
import SmoothScroll from '@/components/SmoothScroll';
import AiStrategistWidget from '@/components/AiStrategistWidget';
import LaunchScreen from '@/components/LaunchScreen';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NousKun Ai | Intelligence Established',
  description: 'Immersive AI experiences, automation, and SaaS platforms.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#050505',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${jetbrainsMono.variable} ${playfairDisplay.variable}`} suppressHydrationWarning>
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&display=swap" rel="stylesheet" />
        {/* Fallback for Clash Display if CDN fails or while loading */}
        <style dangerouslySetInnerHTML={{
          __html: `
          :root { --font-sans: 'Clash Display', sans-serif; }
        `}} />
      </head>
      <body
        suppressHydrationWarning
        className={`font-sans antialiased bg-ai-black text-foreground selection:bg-ai-blue selection:text-white`}
      >
        <LaunchScreen>
          <GrainOverlay />
          <Navigation />
          {/* <MobileNav /> */}
          <SmoothScroll>
            <main className="min-h-screen flex flex-col overflow-x-hidden w-full max-w-[100vw]">
              {children}
              <AiStrategistWidget />
            </main>
          </SmoothScroll>
        </LaunchScreen>
      </body>
    </html>
  );
}
