import React from 'react';

export default function ValuesOverlay({ scrollY }) {
    // Show values section between hero fade and first planet
    const opacity = Math.min(Math.max((scrollY - 800) / 400, 0), 1) *
        Math.max(1 - ((scrollY - 2000) / 400), 0);

    if (opacity === 0) return null;

    const values = [
        {
            title: 'Innovation',
            description: 'Pushing boundaries beyond the known universe',
            icon: '🚀',
        },
        {
            title: 'Excellence',
            description: 'Precision in every orbit and trajectory',
            icon: '⭐',
        },
        {
            title: 'Vision',
            description: 'Seeing possibilities across the cosmos',
            icon: '🔭',
        },
    ];

    return (
        <div
            className="fixed inset-0 z-[5] flex items-center justify-center pointer-events-none"
            style={{ opacity }}
        >
            <div className="text-center px-6 max-w-6xl">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight uppercase mb-4 text-white">
                    Our Values
                </h2>
                <p className="text-white/60 text-lg mb-12 max-w-2xl mx-auto">
                    Guiding principles that navigate our journey through innovation
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {values.map((value, index) => (
                        <div
                            key={value.title}
                            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
                            style={{
                                transitionDelay: `${index * 100}ms`,
                                transform: `translateY(${Math.max(0, 50 - scrollY + 800)}px)`,
                            }}
                        >
                            <div className="text-5xl mb-4">{value.icon}</div>
                            <h3 className="text-2xl font-bold text-white mb-3">
                                {value.title}
                            </h3>
                            <p className="text-white/70 text-sm leading-relaxed">
                                {value.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
