import React, { useRef, useState, useEffect, Suspense, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, Stars, Float, Html, MeshDistortMaterial, useTexture, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import LoadingScreen from '../components/LoadingScreen';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import TextContent from '../components/TextContent';

const PLANETS = [
  {
    name: "Entrepreneurs",
    color: "#FFD700",
    distance: 45,
    desc: "Create Leaders",
    tagline: "Founder grooming, mindset development, leadership networks",
    x: 6, y: -3,
    model: "/venus.glb", // Reusing existing model for now
    scale: 1.8,
    route: "/entrepreneurs",
    projects: [
      { name: "CEO Square", desc: "Executive Leadership Platform", url: "https://example.com" },
      { name: "YEP", desc: "Young Entrepreneur Programme", url: "https://example.com" },
      { name: "Next Leader Programme", desc: "Leadership Development", url: "https://example.com" },
      { name: "StartupTV", desc: "Entrepreneurial Content Network", url: "https://example.com" },
    ]
  },
  {
    name: "Startups",
    color: "#2271B3",
    distance: 75,
    desc: "Build Scalable Companies",
    tagline: "Incubation, growth acceleration, franchise expansion",
    x: -7, y: -2,
    model: "/eart.glb",
    scale: 2.2,
    route: "/startups",
    projects: [
      { name: "Incubenation", desc: "Startup Incubation Hub", url: "https://example.com" },
      { name: "Franchisify", desc: "Franchise Expansion Platform", url: "https://example.com" },
      { name: "Perform100X", desc: "Growth Acceleration Program", url: "https://example.com" },
    ]
  },
  {
    name: "Investors",
    color: "#00D9A0",
    distance: 105,
    desc: "Structure Capital",
    tagline: "Deal flow access, investor networking, structured capital",
    x: 5, y: 4,
    model: "/mars.glb",
    scale: 1.8,
    route: "/investors",
    projects: [
      { name: "Investor Cafe", desc: "Deal Flow Network", url: "https://example.com" },
      { name: "VC Circle", desc: "Investor Networking Hub", url: "https://example.com" },
      { name: "X9 Club", desc: "Structured Capital Syndication", url: "https://example.com" },
    ]
  },
  {
    name: "Governments",
    color: "#9D4EDD",
    distance: 150,
    desc: "Build Infrastructure",
    tagline: "Innovation zones, infrastructure design, public-private partnerships",
    x: -10, y: 0,
    model: "/jupiter.glb",
    scale: 2.5,
    route: "/governments",
    projects: [
      { name: "Startup Park", desc: "Innovation Zones", url: "https://example.com" },
      { name: "Vision by iQue", desc: "Infrastructure Design", url: "https://example.com" },
      { name: "iQue Infra", desc: "Public-Private Partnerships", url: "https://example.com" },
    ]
  },
];

function Rig({ scrollY }) {
  const { camera } = useThree();
  useFrame(() => {
    const targetZ = 50 - (scrollY * 0.1);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
  });
  return null;
}

function Planet({ planet, onPlanetClick }) {
  const meshRef = useRef();
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);

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
      // Add hover scale effect
      const targetScale = hovered ? planet.scale * 1.1 : planet.scale;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    } else if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
    return () => { document.body.style.cursor = 'auto'; };
  }, [hovered]);

  return (
    <group position={[planet.x, planet.y, -planet.distance]}>
      <Float speed={1.5} rotationIntensity={0} floatIntensity={0.5}>
        <group
          onClick={(e) => {
            e.stopPropagation();
            onPlanetClick?.(planet);
          }}
          onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
          onPointerOut={(e) => { e.stopPropagation(); setHovered(false); }}
        >
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
        </group>
      </Float>

      <Html distanceFactor={15} position={[0, -2.5, 0]} center>
        <div
          className="text-center pointer-events-auto select-none cursor-pointer"
          onClick={() => onPlanetClick?.(planet)}
        >
          <div
            className={`bg-black/40 backdrop-blur-md border rounded-2xl px-6 py-3 shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-300 ${hovered ? 'border-white/40 scale-110 shadow-[0_0_40px_rgba(255,255,255,0.3)]' : 'border-white/20'
              }`}
          >
            <h2 className="text-3xl font-bold tracking-tight uppercase text-white whitespace-nowrap mb-1">
              {planet.name}
            </h2>
            <p className="text-orange-400 tracking-[0.4em] text-xs uppercase font-semibold">
              {planet.desc}
            </p>
          </div>
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
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePlanetClick = (planet) => {
    navigate(planet.route);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="bg-black text-white h-[600vh] w-full font-sans">
      {/* Navigation Bar */}
      <Navigation scrollY={scrollY} />

      {/* Hero Section */}
      <Hero scrollY={scrollY} />

      {/* Footer */}
      {/* <Footer scrollY={scrollY} /> */}

      {/* Back to Top Button */}
      <BackToTop scrollY={scrollY} />

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
              <Planet key={planet.name} planet={planet} onPlanetClick={handlePlanetClick} />
            ))}
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}