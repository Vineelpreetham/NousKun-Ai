/* eslint-disable @next/next/no-img-element -- SVG wordmark; next/image adds nothing for vector files */

// Wordmark artwork is 5728 × 800 (≈ 7.16 : 1)
export const WORDMARK_RATIO = 5728 / 800;

export function LogoMark({ className = 'h-7 w-7' }: { className?: string }) {
    return <img src="/brand/nouskun-icon.svg" alt="" aria-hidden className={className} />;
}

/** The NOUSKŪN AI wordmark. Set the height; width follows the artwork's ratio. */
export default function Logo({
    height = 18,
    className = '',
    variant = 'light',
    priority = false,
}: {
    height?: number;
    className?: string;
    variant?: 'light' | 'dark';
    priority?: boolean;
}) {
    return (
        <img
            src={variant === 'light' ? '/brand/nouskun-wordmark.svg' : '/brand/nouskun-wordmark-dark.svg'}
            alt="NousKun AI"
            width={Math.round(height * WORDMARK_RATIO)}
            height={height}
            fetchPriority={priority ? 'high' : undefined}
            className={`block select-none ${className}`}
            draggable={false}
        />
    );
}
