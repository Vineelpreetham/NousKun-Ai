'use client';

import { useEffect, useRef } from 'react';

/**
 * Animated dot matrix. A slow wave ripples through the grid, and dots near the
 * cursor swell and turn brand blue. Pauses off-screen; static when reduced motion is on.
 */
export default function DotField({ className = '' }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const gap = window.innerWidth < 768 ? 22 : 26;
        const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
        let w = 0;
        let h = 0;
        let raf = 0;
        let visible = true;
        let t = 0;

        const resize = () => {
            const r = canvas.getBoundingClientRect();
            w = r.width;
            h = r.height;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const draw = () => {
            ctx.clearRect(0, 0, w, h);
            mouse.x += (mouse.tx - mouse.x) * 0.12;
            mouse.y += (mouse.ty - mouse.y) * 0.12;
            const cx = w / 2;
            const cy = h * 0.45;
            const maxD = Math.hypot(cx, cy);

            for (let x = gap / 2; x < w; x += gap) {
                for (let y = gap / 2; y < h; y += gap) {
                    // radial wave from centre + a slow diagonal swell
                    const d = Math.hypot(x - cx, y - cy);
                    const wave = Math.sin(d * 0.018 - t * 1.4) * 0.5 + 0.5;
                    const swell = Math.sin((x + y) * 0.004 + t * 0.6) * 0.5 + 0.5;
                    const fade = 1 - Math.min(d / maxD, 1);
                    let a = (0.05 + wave * 0.16 * swell) * (0.35 + fade * 0.9);
                    let r = 0.8 + wave * 0.5;

                    const md = Math.hypot(x - mouse.x, y - mouse.y);
                    const lens = Math.max(0, 1 - md / 170);
                    let ox = 0;
                    let oy = 0;
                    if (lens > 0) {
                        a += lens * 0.75;
                        r += lens * 1.8;
                        ox = ((x - mouse.x) / (md || 1)) * lens * 8;
                        oy = ((y - mouse.y) / (md || 1)) * lens * 8;
                    }

                    ctx.fillStyle = lens > 0.05 ? `rgba(120,170,255,${Math.min(a, 1)})` : `rgba(243,241,236,${a})`;
                    ctx.beginPath();
                    ctx.arc(x + ox, y + oy, r, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        };

        const loop = () => {
            t += 0.016;
            draw();
            if (visible) raf = requestAnimationFrame(loop);
        };

        const onMove = (e: PointerEvent) => {
            const r = canvas.getBoundingClientRect();
            mouse.tx = e.clientX - r.left;
            mouse.ty = e.clientY - r.top;
        };
        const onLeave = () => {
            mouse.tx = -9999;
            mouse.ty = -9999;
        };

        resize();
        window.addEventListener('resize', resize);

        if (reduce) {
            draw();
        } else {
            window.addEventListener('pointermove', onMove, { passive: true });
            document.addEventListener('pointerleave', onLeave);
            const io = new IntersectionObserver(([entry]) => {
                const was = visible;
                visible = entry.isIntersecting;
                if (visible && !was) raf = requestAnimationFrame(loop);
            });
            io.observe(canvas);
            raf = requestAnimationFrame(loop);
            return () => {
                cancelAnimationFrame(raf);
                io.disconnect();
                window.removeEventListener('resize', resize);
                window.removeEventListener('pointermove', onMove);
                document.removeEventListener('pointerleave', onLeave);
            };
        }

        return () => window.removeEventListener('resize', resize);
    }, []);

    return <canvas ref={canvasRef} aria-hidden className={`absolute inset-0 h-full w-full ${className}`} />;
}
