import { ImageResponse } from 'next/og';

export const alt = 'NousKun AI — AI agents, automation and websites that work 24/7';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
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
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <svg width="56" height="56" viewBox="0 0 100 100">
                        <g stroke="#4D8EFF" strokeWidth="16" strokeLinecap="round" fill="none">
                            <path d="M30 25 L30 75" />
                            <path d="M30 25 L70 75" />
                            <path d="M70 25 L70 75" />
                        </g>
                    </svg>
                    <span style={{ fontSize: 36, fontWeight: 600 }}>
                        NousKun<span style={{ color: '#4D8EFF' }}>&nbsp;AI</span>
                    </span>
                </div>
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
