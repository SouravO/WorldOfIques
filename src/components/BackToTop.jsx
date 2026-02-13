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
            className="fixed bottom-8 right-8 z-[150] w-14 h-14 bg-gradient-to-r from-cyan-500 via-pink-500 to-orange-500 hover:from-cyan-600 hover:via-pink-600 hover:to-orange-600 rounded-full shadow-lg hover:shadow-[0_0_35px_rgba(233,30,140,0.8)] transition-all duration-300 hover:scale-110 flex items-center justify-center group"
            aria-label="Back to top"
        >
            <svg
                className="w-6 h-6 text-white group-hover:-translate-y-1 transition-transform"
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
