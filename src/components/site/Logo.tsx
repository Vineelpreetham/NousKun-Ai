export function LogoMark({ className = 'h-7 w-7' }: { className?: string }) {
    return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden>
            <g stroke="#4D8EFF" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" fill="none">
                <path d="M30 25 L30 75" />
                <path d="M30 25 L70 75" />
                <path d="M70 25 L70 75" />
            </g>
            <circle cx="30" cy="25" r="4.5" fill="#08090b" />
            <circle cx="70" cy="75" r="4.5" fill="#08090b" />
        </svg>
    );
}

export default function Logo({ className = '' }: { className?: string }) {
    return (
        <span className={`inline-flex items-center gap-2 text-[17px] font-semibold tracking-tight text-paper ${className}`}>
            <LogoMark />
            <span>
                NousKun<span className="text-brand"> AI</span>
            </span>
        </span>
    );
}
