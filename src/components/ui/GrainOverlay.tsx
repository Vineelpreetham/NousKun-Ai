export default function GrainOverlay() {
    return (
        <div className='pointer-events-none fixed inset-0 z-50 h-full w-full overflow-hidden opacity-[0.05] mix-blend-overlay will-change-transform'>
            <svg className='h-full w-full'>
                <filter id='noiseFilter'>
                    <feTurbulence
                        type='fractalNoise'
                        baseFrequency='0.8' // Higher frequency = finer grain
                        numOctaves='3'
                        stitchTiles='stitch'
                    />
                </filter>
                <rect width='100%' height='100%' filter='url(#noiseFilter)' />
            </svg>
        </div>
    );
}
