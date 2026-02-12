import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, Stars, Float, Text, Html, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { Sun, Wind, Circle, Globe, Zap, Compass } from 'lucide-react';

const PLANETS = [
  { name: "Mercury", color: "#A5A5A5", distance: 20, desc: "The Swift Messenger", x: -5, y: 2 },
  { name: "Venus", color: "#E3BB76", distance: 45, desc: "The Veiled Sister", x: 6, y: -3 },
  { name: "Earth", color: "#2271B3", distance: 75, desc: "The Cradle of Life", x: -7, y: -2 },
  { name: "Mars", color: "#E27B58", distance: 105, desc: "The Red Frontier", x: 5, y: 4 },
  { name: "Jupiter", color: "#D39C7E", distance: 150, desc: "The Gas Giant", x: -10, y: 0 },
];

// This component handles moving the camera based on scroll
function Rig({ scrollY }) {
  const { camera } = useThree();
  useFrame(() => {
    // Smoothly interpolate camera Z position based on scroll
    // Higher scroll = deeper into the scene
    const targetZ = 50 - (scrollY * 0.05); 
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.1);
  });
  return null;
}

function Planet({ planet }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005; // Slow spin
    }
  });

  return (
    <group position={[planet.x, planet.y, -planet.distance]}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere ref={meshRef} args={[1.5, 32, 32]}>
          <meshStandardMaterial 
            color={planet.color} 
            roughness={0.7} 
            metalness={0.2} 
            emissive={planet.color}
            emissiveIntensity={0.1}
          />
        </Sphere>
      </Float>

      {/* 3D UI Label that faces the camera */}
      <Html distanceFactor={15} position={[0, -2.5, 0]} center>
        <div className="text-center pointer-events-none select-none">
          <h2 className="text-2xl font-thin tracking-tighter uppercase italic text-white whitespace-nowrap">
            {planet.name}
          </h2>
          <p className="text-orange-500 tracking-[0.3em] text-[8px] uppercase mt-1">
            {planet.desc}
          </p>
        </div>
      </Html>
    </group>
  );
}

function GiantSun() {
  return (
    <group position={[0, 0, -250]}>
      {/* The visible Sun */}
      <Sphere args={[20, 64, 64]}>
        <MeshDistortMaterial
          color="#ffaa00"
          speed={3}
          distort={0.3}
          radius={1}
          emissive="#ff4400"
          emissiveIntensity={2}
        />
      </Sphere>
      {/* The Light Source */}
      <pointLight intensity={5} color="#ffcc00" />
    </group>
  );
}

export default function SolarSystem3D() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-black text-white h-[1000vh] w-full font-sans">
      {/* HUD Fixed UI */}
      <div className="fixed top-10 left-10 z-[100] pointer-events-none">
        <h1 className="text-4xl font-thin tracking-[0.3em] uppercase">
          Ique <span className="font-bold text-orange-500">Cosmos</span>
        </h1>
        <div className="h-[1px] w-32 bg-white/30 mt-2" />
        <p className="text-[10px] uppercase tracking-widest mt-4 opacity-50">
          Velocity: {Math.round(scrollY * 0.1)} KM/S
        </p>
      </div>

      {/* 3D STAGE */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 50], fov: 60 }}>
          <color attach="background" args={['#000000']} />
          <fog attach="fog" args={['#000000', 10, 200]} />
          
          <ambientLight intensity={0.3} />
          <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={1} />
          
          <Suspense fallback={null}>
            <Rig scrollY={scrollY} />
            <GiantSun />
            {PLANETS.map((planet) => (
              <Planet key={planet.name} planet={planet} />
            ))}
          </Suspense>
        </Canvas>
      </div>

      {/* INSTRUCTIONS */}
      <div className="fixed bottom-10 right-10 z-[100] text-right pointer-events-none">
        <p className="text-xs uppercase tracking-widest opacity-40 italic">
          Scroll to navigate the void
        </p>
      </div>
    </div>
  );
}