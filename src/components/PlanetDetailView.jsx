import React, { useRef, useState, useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Stars, Float, Html, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Satellite Component - represents individual projects
function Satellite({ project, color, angle, distance, onSatelliteClick }) {
    const groupRef = useRef();
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (groupRef.current) {
            // Orbit around the center  
            const time = state.clock.elapsedTime;
            const x = Math.cos(angle + time * 0.2) * distance;
            const z = Math.sin(angle + time * 0.2) * distance;
            groupRef.current.position.set(x, 0, z);
        }
    });

    useEffect(() => {
        if (hovered) {
            document.body.style.cursor = 'pointer';
        }
        return () => {
            document.body.style.cursor = 'auto';
        };
    }, [hovered]);

    return (
        <group ref={groupRef}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
                <Sphere
                    args={[0.5, 32, 32]}
                    onClick={(e) => {
                        e.stopPropagation();
                        onSatelliteClick?.(project);
                    }}
                    onPointerOver={(e) => {
                        e.stopPropagation();
                        setHovered(true);
                    }}
                    onPointerOut={(e) => {
                        e.stopPropagation();
                        setHovered(false);
                    }}
                >
                    <meshStandardMaterial
                        color={hovered ? '#ffffff' : color}
                        emissive={color}
                        emissiveIntensity={hovered ? 0.8 : 0.3}
                    />
                </Sphere>
            </Float>

            <Html distanceFactor={10} position={[0, -1, 0]} center>
                <div
                    className="text-center pointer-events-auto select-none cursor-pointer"
                    onClick={() => onSatelliteClick?.(project)}
                >
                    <div
                        className={`bg-black/60 backdrop-blur-md border rounded-xl px-4 py-2 shadow-lg transition-all duration-300 ${hovered ? 'border-white/50 scale-110 shadow-[0_0_20px_rgba(255,255,255,0.4)]' : 'border-white/20'
                            }`}
                    >
                        <h3 className="text-sm font-bold text-white whitespace-nowrap">
                            {project.name}
                        </h3>
                        <p className="text-xs text-white/70 mt-1">
                            {project.desc}
                        </p>
                    </div>
                </div>
            </Html>
        </group>
    );
}

// Helper component to load and render GLB model
function PlanetModel({ model, scale }) {
    const groupRef = useRef();
    const gltf = useGLTF(model);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.2;
        }
    });

    return (
        <primitive
            ref={groupRef}
            object={gltf.scene.clone()}
            scale={scale}
        />
    );
}

// Planet Detail View Component
export default function PlanetDetailView({ planetData }) {
    const navigate = useNavigate();

    const handleSatelliteClick = (project) => {
        window.open(project.url, '_blank', 'noopener,noreferrer');
    };

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div className="bg-black text-white min-h-screen w-full font-sans">
            {/* Back Button */}
            <button
                onClick={handleBackToHome}
                className="fixed top-6 left-6 z-50 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white text-sm uppercase tracking-wider font-semibold rounded-full transition-all duration-300 flex items-center gap-2 hover:border-white/40"
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                </svg>
                Back to Home
            </button>

            {/* Planet Info Header */}
            <div className="fixed top-6 right-6 z-50 text-right">
                <h1 className="text-4xl font-black tracking-tighter uppercase">
                    <span className="text-white">{planetData.name}</span>
                </h1>
                <p className="text-lg text-white/80 mt-1">{planetData.desc}</p>
                <p className="text-sm text-white/60 mt-2 max-w-md">
                    {planetData.tagline}
                </p>
            </div>

            {/* 3D Scene */}
            <div className="fixed inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
                    <color attach="background" args={['#000000']} />
                    <ambientLight intensity={1.5} />
                    <pointLight position={[10, 10, 10]} intensity={2} />
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                    <Suspense fallback={null}>
                        {/* Central Planet */}
                        {planetData.model ? (
                            <PlanetModel
                                model={planetData.model}
                                scale={planetData.scale * 1.2}
                            />
                        ) : (
                            <Sphere args={[2, 64, 64]}>
                                <meshStandardMaterial color={planetData.color} />
                            </Sphere>
                        )}

                        {/* Satellites (Projects) */}
                        {planetData.projects.map((project, index) => {
                            const angle = (index / planetData.projects.length) * Math.PI * 2;
                            const distance = 5;
                            return (
                                <Satellite
                                    key={project.name}
                                    project={project}
                                    color={planetData.color}
                                    angle={angle}
                                    distance={distance}
                                    onSatelliteClick={handleSatelliteClick}
                                />
                            );
                        })}
                    </Suspense>
                </Canvas>
            </div>

            {/* Instructions */}
            <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 text-center">
                <p className="text-white/60 text-sm uppercase tracking-wider">
                    Click on any satellite to visit the project
                </p>
            </div>
        </div>
    );
}
