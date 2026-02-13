import React from 'react';

export default function Hero({ scrollY }) {
    const opacity = Math.max(1 - (scrollY / 800), 0);
    const scale = Math.max(1 - (scrollY / 2000), 0.8);

    return (
        <div
            className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none"
            style={{ opacity, transform: `scale(${scale})` }}
        >
            <div className="text-center px-6 max-w-5xl">
                {/* Main Headline */}
                <h1 className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase mb-6 leading-none">
                    <span className="block text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">World Of</span>
                    <span className="block bg-gradient-to-r from-cyan-400 via-pink-500 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(233,30,140,0.5)]">
                        iQue
                    </span>
                </h1>

                {/* Tagline */}
                <p className="text-xl md:text-2xl lg:text-3xl font-light tracking-wide text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed">
                    Navigating the Future of{' '}
                    <span className="text-pink-400 font-medium">Innovation</span>
                </p>

                {/* CTA Buttons */}
                {/* <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pointer-events-auto">
                    <button className="group px-8 py-4 bg-gradient-to-r from-cyan-500 via-pink-500 to-orange-500 hover:from-cyan-600 hover:via-pink-600 hover:to-orange-600 text-white text-sm uppercase tracking-wider font-bold rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(233,30,140,0.8)] hover:scale-105 flex items-center gap-2">
                        Explore Our Universe
                        <svg
                            className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </button>

                    <button className="px-8 py-4 bg-white/5 backdrop-blur-md border-2 border-pink-500/30 hover:bg-white/10 hover:border-pink-500/60 text-white text-sm uppercase tracking-wider font-semibold rounded-full transition-all duration-300">
                        Learn More
                    </button>
                </div> */}

                {/* Scroll Indicator */}
                <div className="mt-16 flex flex-col items-center animate-bounce">
                    <p className="text-xs uppercase tracking-widest text-cyan-200/60 mb-2">
                        Scroll to Begin
                    </p>
                    <svg
                        className="w-6 h-6 text-pink-300/60"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}
