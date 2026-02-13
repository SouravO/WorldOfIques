import React, { useRef, useState, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, Stars, Float, Html, MeshDistortMaterial, useTexture, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import TextContent from '../components/TextContent';

const PLANETS = [
  { name: "Mercury", color: "#A5A5A5", distance: 20, desc: "The Swift Messenger", x: -5, y: 2, model: "/mercury.glb", scale: 0.3 },
  { name: "Venus", color: "#E3BB76", distance: 45, desc: "The Veiled Sister", x: 6, y: -3, model: "/venus.glb", scale: 1.5 },
  { name: "Earth", color: "#2271B3", distance: 75, desc: "The Cradle of Life", x: -7, y: -2, model: "/eart.glb", scale: 4.5 },
  { name: "Mars", color: "#E27B58", distance: 105, desc: "The Red Frontier", x: 5, y: 4, model: "/mars.glb", scale: 1.5 },
  { name: "Jupiter", color: "#D39C7E", distance: 150, desc: "The Gas Giant", x: -10, y: 0, model: "/jupiter.glb", scale: 1.5 },
];

function Rig({ scrollY }) {
  const { camera } = useThree();
  useFrame(() => {
    const targetZ = 50 - (scrollY * 0.1);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
  });
  return null;
}

function Planet({ planet }) {
  const meshRef = useRef();
  const groupRef = useRef();

  // Load texture if planet has texture property
  const texture = planet.texture ? useTexture(planet.texture) : null;

  // Load GLB model if planet has model property
  const gltf = planet.model ? useGLTF(planet.model) : null;

  if (texture) {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
    texture.offset.set(0, 0);
  }

  useFrame((state, delta) => {
    // Rotate the entire group for GLB models, or just the sphere for textures
    if (planet.model && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    } else if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group position={[planet.x, planet.y, -planet.distance]}>
      <Float speed={1.5} rotationIntensity={0} floatIntensity={0.5}>
        {planet.model && gltf ? (
          // Render GLB model
          <primitive
            ref={groupRef}
            object={gltf.scene.clone()}
            scale={planet.scale || 1.5}
          />
        ) : (
          // Render sphere with texture or color
          <Sphere ref={meshRef} args={[1.5, 64, 64]}>
            {texture ? (
              <meshBasicMaterial
                map={texture}
                side={THREE.DoubleSide}
                transparent={true}
              />
            ) : (
              <meshStandardMaterial color={planet.color} />
            )}
          </Sphere>
        )}
      </Float>

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

function GiantSun({ scrollY }) {
  // Cinematic fade-in: starts faded (0.15) and becomes brighter as you scroll
  // Fully visible around 2000px scroll
  const opacity = Math.min(0.15 + (scrollY / 2000) * 0.85, 1);
  const intensity = Math.min(2 + (scrollY / 2000) * 8, 10);

  const gltf = useGLTF('/sun.glb');
  const groupRef = useRef();

  // Clone scene only once
  const sunScene = useMemo(() => {
    return gltf.scene.clone();
  }, [gltf.scene]);

  // Update rotation
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1; // Slow rotation
    }
  });

  return (
    <group position={[0, 0, -400]}>
      <primitive
        ref={groupRef}
        object={sunScene}
        scale={15}
      />
      <pointLight intensity={intensity} distance={1000} color="#ffcc00" />
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
    <div className="bg-black text-white h-[600vh] w-full font-sans">
      <div className="fixed top-10 left-10 z-[100] pointer-events-none">
        <h1 className="text-4xl font-thin tracking-[0.3em] uppercase">
          Ique <span className="font-bold text-orange-500">Cosmos</span>
        </h1>
        <div className="h-[1px] w-32 bg-white/30 mt-2" />
        <p className="text-[10px] uppercase tracking-widest mt-4 opacity-50">
          Velocity: {Math.round(scrollY * 0.1)} KM/S
        </p>
      </div>

      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 50], fov: 60 }}>
          <color attach="background" args={['#000000']} />
          <fog attach="fog" args={['#000000', 50, 600]} />
          <ambientLight intensity={1.5} />
          <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={1} />
          <Suspense fallback={null}>
            <Rig scrollY={scrollY} />
            <GiantSun scrollY={scrollY} />
            <TextContent scrollY={scrollY} />
            {PLANETS.map((planet) => (
              <Planet key={planet.name} planet={planet} />
            ))}
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}