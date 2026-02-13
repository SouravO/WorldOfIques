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

            >
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <a
                            href="#home"
                            className="text-2xl font-bold tracking-wider uppercase z-50 relative"
                        >
                            <img src="public/logos.png" alt="logo" width={200} />
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
                                    className="text-sm uppercase tracking-widest text-white/90 hover:text-pink-400 transition-colors duration-300 relative group"
                                >
                                    {item.label}
                                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-400 via-pink-500 to-orange-500 group-hover:w-full transition-all duration-300" />
                                </a>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <button className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-cyan-500 via-pink-500 to-orange-500 hover:from-cyan-600 hover:via-pink-600 hover:to-orange-600 text-white text-sm uppercase tracking-wider font-bold rounded-full transition-all duration-300 hover:shadow-[0_0_25px_rgba(233,30,140,0.6)] hover:scale-105">
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
                        <button className="mt-4 px-8 py-3 bg-gradient-to-r from-cyan-500 via-pink-500 to-orange-500 text-white text-sm uppercase tracking-wider font-bold rounded-full hover:shadow-[0_0_25px_rgba(233,30,140,0.6)] hover:scale-105 transition-all duration-300">
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
}
