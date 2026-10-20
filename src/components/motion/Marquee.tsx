import type { ReactNode } from 'react';

/** Infinite horizontal ticker. Content is rendered twice so the loop is seamless. */
export default function Marquee({
    children,
    duration = 40,
    reverse = false,
    className = '',
}: {
    children: ReactNode;
    duration?: number;
    reverse?: boolean;
    className?: string;
}) {
    return (
        <div className={`group relative flex overflow-hidden mask-fade-x ${className}`}>
            <div
                className="flex w-max shrink-0 animate-marquee group-hover:[animation-play-state:paused]"
                style={{
                    ['--marquee-duration' as string]: `${duration}s`,
                    animationDirection: reverse ? 'reverse' : 'normal',
                }}
            >
                <div className="flex shrink-0 items-center">{children}</div>
                <div className="flex shrink-0 items-center" aria-hidden>
                    {children}
                </div>
            </div>
        </div>
    );
}
