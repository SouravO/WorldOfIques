import React, { useState, useEffect } from 'react';

export default function Navigation({ scrollY }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        setIsScrolled(scrollY > 50);
    }, [scrollY]);

    const navItems = [
        { label: 'Home', href: '#home' },
        { label: 'About', href: '#about' },
        { label: 'Solutions', href: '#solutions' },
        { label: 'Team', href: '#team' },
        { label: 'Contact', href: '#contact' },
    ];

    const scrollToSection = (href) => {
        setIsMobileMenuOpen(false);
        // Smooth scroll implementation would go here
    };

    return (
        <>
            {/* Navigation Bar */}
            <nav
                className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-500 ${isScrolled
                    ? 'bg-black/40 backdrop-blur-xl border-b border-white/10 shadow-lg'
                    : 'bg-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <a
                            href="#home"
                            className="text-2xl font-bold tracking-wider uppercase z-50 relative"
                        >
                            <span className="text-white drop-shadow-lg">World Of</span>
                            <span className="text-amber-400 ml-2 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]">iQue</span>
                        </a>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection(item.href);
                                    }}
                                    className="text-sm uppercase tracking-widest text-white/90 hover:text-amber-300 transition-colors duration-300 relative group"
                                >
                                    {item.label}
                                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-amber-400 to-yellow-500 group-hover:w-full transition-all duration-300" />
                                </a>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <button className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-500 hover:via-yellow-600 hover:to-amber-700 text-black text-sm uppercase tracking-wider font-bold rounded-full transition-all duration-300 hover:shadow-[0_0_25px_rgba(251,191,36,0.6)] hover:scale-105">
                            Get Started
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden z-50 relative w-8 h-8 flex flex-col justify-center items-center"
                            aria-label="Toggle menu"
                        >
                            <span
                                className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen
                                    ? 'rotate-45 translate-y-1.5'
                                    : 'rotate-0 translate-y-0'
                                    }`}
                            />
                            <span
                                className={`w-6 h-0.5 bg-white my-1.5 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                                    }`}
                            />
                            <span
                                className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen
                                    ? '-rotate-45 -translate-y-1.5'
                                    : 'rotate-0 translate-y-0'
                                    }`}
                            />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden fixed inset-0 bg-black/95 backdrop-blur-xl transition-all duration-500 ${isMobileMenuOpen
                        ? 'opacity-100 pointer-events-auto'
                        : 'opacity-0 pointer-events-none'
                        }`}
                >
                    <div className="flex flex-col items-center justify-center h-full space-y-8">
                        {navItems.map((item, index) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection(item.href);
                                }}
                                className="text-2xl uppercase tracking-widest text-white/80 hover:text-white transition-all duration-300"
                                style={{
                                    transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                                }}
                            >
                                {item.label}
                            </a>
                        ))}
                        <button className="mt-4 px-8 py-3 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black text-sm uppercase tracking-wider font-bold rounded-full hover:shadow-[0_0_25px_rgba(251,191,36,0.6)] hover:scale-105 transition-all duration-300">
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            {/* Scroll Progress Bar */}
            <div className="fixed top-0 left-0 right-0 h-1 bg-transparent z-[201] pointer-events-none">
                <div
                    className="h-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 transition-all duration-100 shadow-[0_0_10px_rgba(251,191,36,0.5)]"
                    style={{ width: `${Math.min((scrollY / 10000) * 100, 100)}%` }}
                />
            </div>
        </>
    );
}
