import React, { useState, useEffect } from 'react';

export default function LoadingScreen({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsComplete(true);
                        setTimeout(() => onComplete?.(), 500);
                    }, 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 30);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div
            className={`fixed inset-0 z-[1000] bg-black flex items-center justify-center transition-opacity duration-500 ${isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
        >
            <div className="text-center">
                {/* Logo */}
                <div className="mb-12">
                    <h1 className="text-6xl md:text-7xl font-black tracking-tighter uppercase mb-2">
                        <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">World Of</span>
                        <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-orange-500 bg-clip-text text-transparent ml-2 drop-shadow-[0_0_30px_rgba(233,30,140,0.5)]">iQue</span>
                    </h1>
                    <p className="text-sm uppercase tracking-[0.5em] text-pink-200/60">
                        Loading Experience
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="w-80 max-w-full mx-auto">
                    <div className="bg-white/5 h-1.5 rounded-full overflow-hidden border border-pink-500/20">
                        <div
                            className="h-full bg-gradient-to-r from-cyan-400 via-pink-500 to-orange-500 transition-all duration-300 ease-out shadow-[0_0_15px_rgba(233,30,140,0.6)]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <p className="text-pink-300/80 text-xs mt-3 tracking-wider font-semibold">
                        {progress}%
                    </p>
                </div>

                {/* Animated Dots */}
                <div className="flex gap-2 justify-center mt-8">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="w-2 h-2 rounded-full bg-pink-500 animate-pulse shadow-[0_0_8px_rgba(233,30,140,0.6)]"
                            style={{ animationDelay: `${i * 200}ms` }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
