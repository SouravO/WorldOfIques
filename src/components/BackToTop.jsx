import React, { useState, useEffect } from 'react';

export default function BackToTop({ scrollY }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(scrollY > 1000);
    }, [scrollY]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!isVisible) return null;

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-[150] w-14 h-14 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-500 hover:via-yellow-600 hover:to-amber-700 rounded-full shadow-lg hover:shadow-[0_0_35px_rgba(251,191,36,0.8)] transition-all duration-300 hover:scale-110 flex items-center justify-center group"
            aria-label="Back to top"
        >
            <svg
                className="w-6 h-6 text-black group-hover:-translate-y-1 transition-transform font-bold"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
            </svg>
        </button>
    );
}
