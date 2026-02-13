import React from 'react';

export default function Footer({ scrollY }) {
    // Footer appears only when scrolled far enough
    const opacity = Math.min(Math.max((scrollY - 20000) / 1000, 0), 1);

    if (opacity === 0) return null;

    return (
        <footer
            className="fixed bottom-0 left-0 right-0 z-10 bg-black/80 backdrop-blur-xl border-t border-white/10"
            style={{ opacity }}
        >
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md://grid-cols-4 gap-8 mb-8">
                    {/* Company Info */}
                    <div className="mb-6">
                        <a href="#home" className="text-3xl font-bold tracking-wider uppercase">
                            <span className="text-white drop-shadow-lg">World Of</span>
                            <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-orange-500 bg-clip-text text-transparent ml-2 drop-shadow-[0_0_10px_rgba(233,30,140,0.5)]">iQue</span>
                        </a>
                        <p className="text-white/60 text-sm leading-relaxed">
                            Navigating Tomorrow's Innovation Today
                        </p>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="text-white font-semibold uppercase tracking-wider text-sm mb-4">
                            Company
                        </h4>
                        <ul className="space-y-2">
                            {['About', 'Team', 'Careers', 'Contact'].map((item) => (
                                <li key={item}>
                                    <a
                                        href={`#${item.toLowerCase()}`}
                                        className="text-white/60 hover:text-white text-sm transition-colors duration-300"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-white font-semibold uppercase tracking-wider text-sm mb-4">
                            Resources
                        </h4>
                        <ul className="space-y-2">
                            {['Documentation', 'Blog', 'Support', 'FAQs'].map((item) => (
                                <li key={item}>
                                    <a
                                        href={`#${item.toLowerCase()}`}
                                        className="text-white/60 hover:text-white text-sm transition-colors duration-300"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social & Legal */}
                    <div>
                        <h4 className="text-white font-semibold uppercase tracking-wider text-sm mb-4">
                            Connect
                        </h4>
                        <div className="flex gap-4 mb-4">
                            {/* Social Icons */}
                            {['twitter', 'linkedin', 'github'].map((social) => (
                                <a
                                    key={social}
                                    href={`https://${social}.com`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 rounded-full bg-white/5 border border-pink-500/20 hover:bg-gradient-to-r hover:from-cyan-500 hover:via-pink-500 hover:to-orange-500 hover:border-pink-500 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(233,30,140,0.5)]"
                                    aria-label={social}
                                >
                                    <span className="text-white text-xs">
                                        {social.charAt(0).toUpperCase()}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/40 text-sm">
                        © {new Date().getFullYear()} World Of iQue. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a
                            href="#privacy"
                            className="text-white/40 hover:text-white text-sm transition-colors duration-300"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="#terms"
                            className="text-white/40 hover:text-white text-sm transition-colors duration-300"
                        >
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
