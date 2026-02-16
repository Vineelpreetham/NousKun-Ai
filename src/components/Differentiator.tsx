'use client';

export default function Differentiator() {
    return (
        <section className="relative py-32 px-4 md:px-8 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">

                {/* Left Content */}
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-none">
                        We don’t sell services. <br />
                        <span className="text-zinc-600">We build systems.</span>
                    </h2>

                    <p className="text-xl text-zinc-400 mb-12 max-w-md mx-auto md:mx-0">
                        Everything is designed to scale intelligently.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            'No manual chaos',
                            'No disconnected tools',
                            'No wasted leads',
                            'No guesswork decisions'
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 border border-white/5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                <div className="w-2 h-2 bg-red-500 rounded-full shrink-0" />
                                <span className="text-zinc-300 text-sm font-mono uppercase tracking-wider text-left">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Visual (Abstract Representation of Order vs Chaos) */}
                <div className="flex-1 w-full flex justify-center">
                    <div className="relative w-full max-w-sm aspect-square bg-gradient-to-tr from-ai-blue/20 to-purple-500/5 rounded-full blur-[80px] animate-pulse" />
                    <div className="absolute border border-white/10 w-full max-w-md aspect-square rounded-full flex items-center justify-center">
                        <div className="w-[80%] h-[80%] border border-ai-blue/20 rounded-full flex items-center justify-center">
                            <div className="w-[60%] h-[60%] bg-ai-blue/10 rounded-full backdrop-blur-md flex items-center justify-center">
                                <span className="text-ai-blue font-bold tracking-widest text-xs">NOUSKŪN SYSTEM</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
