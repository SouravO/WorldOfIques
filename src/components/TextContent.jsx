import React from 'react';
import { Html } from '@react-three/drei';

export default function TextContent({ scrollY }) {
    // Text appears after scrolling past the sun (around 4000px)
    const opacity = Math.min(Math.max((scrollY - 4000) / 500, 0), 1);

    return (
        <Html fullscreen>
            <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{
                    opacity: opacity,
                    transform: `translateY(${Math.max(0, 4500 - scrollY)}px)`
                }}
            >
                <div className="max-w-4xl px-8 text-center">
                    <h2 className="text-6xl font-thin tracking-widest uppercase mb-8 text-orange-500">
                        The Cosmic Journey
                    </h2>
                    <p className="text-xl leading-relaxed text-white/80 mb-6">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p className="text-xl leading-relaxed text-white/80 mb-6">
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <p className="text-xl leading-relaxed text-white/80">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                        laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                        architecto beatae vitae dicta sunt explicabo.
                    </p>
                </div>
            </div>
        </Html>
    );
}
