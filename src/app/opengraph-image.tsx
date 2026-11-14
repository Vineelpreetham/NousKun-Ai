import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'NousKun AI — AI agents, automation and websites that work 24/7';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
    const wordmark = await readFile(join(process.cwd(), 'public/brand/nouskun-wordmark-3000.png'));
    const wordmarkSrc = `data:image/png;base64,${wordmark.toString('base64')}`;

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: 72,
                    background: 'radial-gradient(ellipse at 50% 0%, rgba(77,142,255,0.35), #08090b 60%)',
                    color: '#f3f1ec',
                    fontFamily: 'sans-serif',
                }}
            >
                {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
                <img src={wordmarkSrc} width={430} height={60} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: 76, fontWeight: 600, letterSpacing: -3, lineHeight: 1.02 }}>AI systems that</div>
                    <div style={{ fontSize: 76, fontWeight: 600, letterSpacing: -3, lineHeight: 1.02, color: '#9cc0ff' }}>
                        capture every lead.
                    </div>
                    <div style={{ fontSize: 28, color: '#8b8f98', marginTop: 28 }}>
                        AI agents · WhatsApp automation · Websites · AI SaaS
                    </div>
                </div>
            </div>
        ),
        size
    );
}
