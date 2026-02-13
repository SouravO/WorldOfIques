import React, { useEffect, useMemo } from 'react';
import { Html } from '@react-three/drei';

// --- COMPONENT: Floating 3D Prism (Section 2) ---
const FloatingPrism = ({ scrollY, start, end }) => {
  const progress = Math.min(Math.max((scrollY - start) / (end - start), 0), 1);
  const xPos = Math.sin(progress * Math.PI * 4) * 35; // More oscillations
  
  return (
    <div 
      className="absolute w-72 h-72 border-4 border-cyan-400 shadow-[0_0_50px_rgba(34,211,238,0.5)] bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-md"
      style={{
        left: `calc(50% + ${xPos}%)`,
        top: '40%',
        transform: `translate(-50%, -50%) rotateX(${scrollY * 0.4}deg) rotateY(${scrollY * 0.7}deg) scale(${1 + Math.sin(progress * 10) * 0.2})`,
        clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
      }}
    />
  );
};

// --- COMPONENT: Falling Wealth (Section 4) ---
const FallingWealth = ({ scrollY, startScroll, endScroll }) => {
  const items = useMemo(() => {
    return Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, 
      speed: 0.8 + Math.random() * 2, 
      rotation: Math.random() * 360,
      type: Math.random() > 0.6 ? 'bill' : Math.random() > 0.3 ? 'coin' : 'diamond',
    }));
  }, []);

  const sectionProgress = Math.min(Math.max((scrollY - startScroll) / (endScroll - startScroll), 0), 1);
  if (sectionProgress <= 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {items.map((item) => {
        const fallDistance = (scrollY - startScroll) * item.speed;
        const yPos = (fallDistance % 140) - 20; 
        const sway = Math.sin(fallDistance / 30) * 6;

        return (
          <div
            key={item.id}
            className="absolute flex items-center justify-center transition-opacity duration-300"
            style={{
              left: `${item.x + sway}%`,
              top: `${yPos}%`,
              transform: `rotateX(${fallDistance * 0.5}deg) rotateY(${item.rotation + fallDistance * 0.2}deg)`,
              opacity: yPos > 100 ? 0 : 1,
            }}
          >
            {item.type === 'bill' ? (
              <div className="w-16 h-8 bg-emerald-400 border-2 border-white/50 rounded-sm shadow-[0_10px_20px_rgba(0,0,0,0.3)] flex items-center justify-center text-[10px] font-bold text-emerald-900">$</div>
            ) : item.type === 'coin' ? (
              <div className="w-8 h-8 bg-yellow-400 border-2 border-yellow-200 rounded-full shadow-[0_0_15px_rgba(250,204,21,0.6)]" />
            ) : (
              <div className="w-6 h-6 bg-pink-400 rotate-45 border border-white shadow-[0_0_20px_rgba(244,114,182,0.8)]" />
            )}
          </div>
        );
      })}
    </div>
  );
};

// --- COMPONENT: Letter-by-Letter Scroll ---
const ScrollingText = ({ text, scrollY, startScroll, endScroll }) => {
  const characters = text.split("");
  const totalChars = characters.length;

  return (
    <>
      {characters.map((char, i) => {
        const charStart = startScroll + (i / totalChars) * (endScroll - startScroll);
        const charEnd = charStart + 200; 
        const colorProgress = Math.min(Math.max((scrollY - charStart) / (charEnd - charStart), 0), 1);
        
        return (
          <span 
            key={i} 
            className="transition-transform duration-300"
            style={{ 
              color: colorProgress > 0.5 ? '#fff' : '#333',
              textShadow: colorProgress > 0.8 ? '0 0 20px rgba(255,255,255,0.8)' : 'none',
              filter: `blur(${Math.max(0, 15 - colorProgress * 15)}px)`,
              display: 'inline-block',
              transform: `translateY(${10 - colorProgress * 10}px)`,
              whiteSpace: char === " " ? "pre" : "normal"
            }}
          >
            {char}
          </span>
        );
      })}
    </>
  );
};

export default function TextContent({ scrollY }) {
  // --- SECTION TIMINGS ---
  const sec1Opacity = Math.min(Math.max((scrollY - 4000) / 500, 0), 1) * Math.min(Math.max((7800 - scrollY) / 500, 0), 1);
  
  const sec2Start = 8000;
  const sec2End = 15000;
  const sec2Opacity = Math.min(Math.max((scrollY - sec2Start) / 800, 0), 1) * Math.min(Math.max((16000 - scrollY) / 800, 0), 1);
  
  const sec4Start = 16500;
  const sec4End = 20500;
  const sec4Opacity = Math.min(Math.max((scrollY - sec4Start) / 800, 0), 1) * Math.min(Math.max((21000 - scrollY) / 800, 0), 1);
  
  const sec5Start = 21500;
  const sec5Opacity = Math.min(Math.max((scrollY - sec5Start) / 800, 0), 1);
  const singProgress = Math.max(0, (scrollY - sec5Start) / 3000);

  useEffect(() => {
    document.body.style.height = "28000px"; 
    return () => { document.body.style.height = "auto"; };
  }, []);

  const getSec2Text = () => {
    if (scrollY < 10500) return "DOPAMINE HIT";
    if (scrollY < 13000) return "LIQUID ASSETS";
    return "CHASE THE GLOW";
  };

  return (
    <Html fullscreen>
      <div className="w-screen h-screen font-sans text-white overflow-hidden pointer-events-none select-none">
        
        {/* SECTION 1: Minimalist Glitch */}
        <div className="absolute inset-0 flex items-center justify-center bg-black" style={{ opacity: sec1Opacity, display: sec1Opacity <= 0 ? 'none' : 'flex' }}>
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px]" />
            <p className="text-6xl md:text-8xl text-center px-10 font-black tracking-tighter uppercase italic">
              <ScrollingText text="LOGIC IS A GHOST." scrollY={scrollY} startScroll={4500} endScroll={6500} />
            </p>
        </div>

        {/* SECTION 2: The Funky Prism */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-indigo-950" style={{ opacity: sec2Opacity, display: sec2Opacity <= 0 ? 'none' : 'flex' }}>
          {/* Background scanlines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
          
          <FloatingPrism scrollY={scrollY} start={sec2Start} end={sec2End} />
          
          <h2 className="relative z-20 text-8xl font-black tracking-[10px] uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 animate-pulse">
            {getSec2Text()}
          </h2>
        </div>

        {/* SECTION 4: The Rain */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050505]" style={{ opacity: sec4Opacity, display: sec4Opacity <= 0 ? 'none' : 'flex' }}>
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 to-transparent" />
          <FallingWealth scrollY={scrollY} startScroll={sec4Start} endScroll={sec4End} />
          <h2 className="text-[15vw] font-black italic tracking-tighter mix-blend-overlay opacity-50">GET PAID</h2>
          <h2 className="absolute text-8xl font-black italic skew-x-12 border-4 border-white px-8 py-2">REWARDS</h2>
        </div>

        {/* SECTION 5: The Singularity */}
        <div className="absolute inset-0 flex items-center justify-center bg-white" style={{ opacity: sec5Opacity, display: sec5Opacity <= 0 ? 'none' : 'flex' }}>
          <div 
            className="absolute rounded-full transition-all duration-100 ease-out"
            style={{
              width: `${100 + singProgress * 1500}px`,
              height: `${100 + singProgress * 1500}px`,
              background: 'radial-gradient(circle, #000 0%, #ff0055 40%, #5500ff 80%, #fff 100%)',
              filter: `blur(${10 + singProgress * 40}px)`,
              transform: `rotate(${scrollY * 0.1}deg)`,
            }}
          />
          <h2 className="relative z-10 text-[12vw] font-black italic mix-blend-difference uppercase tracking-tighter leading-none text-center">
            END <br/> GAME
          </h2>
        </div>

      </div>
    </Html>
  );
}