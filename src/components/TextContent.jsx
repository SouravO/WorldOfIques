import React, { useEffect, useMemo } from 'react';
import { Html } from '@react-three/drei';

// --- COMPONENT: 3D Depth HUD (Section 2) ---
const DepthHUD = ({ scrollY, start, end }) => {
  const progress = Math.min(Math.max((scrollY - start) / (end - start), 0), 1);
  const buildNationsScale = 1 + progress * 5;
  const buildNationsOpacity = 1 - Math.pow(progress, 2);
  const throughVenturesScale = 0.5 + progress * 0.5;
  const throughVenturesOpacity = Math.max(0, (progress - 0.5) * 2);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden perspective-1000">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 w-full h-1/4 bg-[linear-gradient(to_bottom,rgba(34,211,238,0.1),transparent)] opacity-20" 
             style={{ transform: `perspective(500px) rotateX(-60deg) translateY(${progress * -100}px)` }} />
        <div className="absolute bottom-0 w-full h-1/4 bg-[linear-gradient(to_top,rgba(34,211,238,0.1),transparent)] opacity-20" 
             style={{ transform: `perspective(500px) rotateX(60deg) translateY(${progress * 100}px)` }} />
      </div>

      <div className="absolute transition-transform duration-100 ease-out flex flex-col items-center"
           style={{ 
             transform: `translateZ(${progress * 500}px) scale(${buildNationsScale})`,
             opacity: buildNationsOpacity,
             filter: `blur(${progress * 10}px)`
           }}>
        <p className="text-[10px] tracking-[1.5em] text-cyan-400 mb-4 font-mono">INITIATING_PROTOCOL</p>
        <h2 className="text-7xl md:text-9xl font-black tracking-tighter uppercase whitespace-nowrap">BUILD NATIONS</h2>
      </div>

      <div className="absolute transition-transform duration-100 ease-out flex flex-col items-center"
           style={{ 
             transform: `scale(${throughVenturesScale})`,
             opacity: throughVenturesOpacity,
             filter: `blur(${(1 - progress) * 10}px)`
           }}>
        <h2 className="text-7xl md:text-9xl font-black tracking-tighter uppercase whitespace-nowrap text-cyan-400">THROUGH VENTURES</h2>
      </div>
    </div>
  );
};

// --- COMPONENT: Structural Rain ---
const StructuralRain = ({ scrollY, startScroll, endScroll }) => {
  const sectors = ["ENTREPRENEURS", "STARTUPS", "INVESTORS", "GOVERNMENTS", "NATION BUILDING"];
  const items = useMemo(() => Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    x: Math.random() * 90,
    speed: 2 + Math.random() * 4,
    text: sectors[i % sectors.length]
  })), []);
  const progress = Math.min(Math.max((scrollY - startScroll) / (endScroll - startScroll), 0), 1);
  if (progress <= 0 || progress >= 1) return null;

  return (
    <div className="absolute inset-0 overflow-hidden opacity-30 font-mono text-[10px] tracking-[0.2em]">
      {items.map((item) => {
        const yPos = ((scrollY - startScroll) * item.speed * 0.1) % 120;
        return <div key={item.id} className="absolute whitespace-nowrap" style={{ left: `${item.x}%`, top: `${yPos - 10}%` }}>[ {item.text} ]</div>;
      })}
    </div>
  );
};

// --- COMPONENT: Scrolling Text Helper ---
const ScrollingText = ({ text, scrollY, startScroll, endScroll, className }) => {
  const characters = text.split("");
  return (
    <span className={className}>
      {characters.map((char, i) => {
        const charStart = startScroll + (i / characters.length) * (endScroll - startScroll);
        const colorProgress = Math.min(Math.max((scrollY - charStart) / 300, 0), 1);
        return (
          <span key={i} className="transition-all duration-500 inline-block"
            style={{ 
              opacity: colorProgress,
              filter: `blur(${(1 - colorProgress) * 10}px)`,
              transform: `translateY(${(1 - colorProgress) * 10}px)`,
              whiteSpace: char === " " ? "pre" : "normal"
            }}>{char}</span>
        );
      })}
    </span>
  );
};

// --- NEW COMPONENT: THE SOVEREIGN CORE (Section 6) ---
const SovereignCore = ({ scrollY, start, end }) => {
  const progress = Math.min(Math.max((scrollY - start) / (end - start), 0), 1);
  
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* 3D Rotating Typography Ring */}
      <div 
        className="absolute w-[800px] h-[800px] border border-cyan-400/20 rounded-full flex items-center justify-center"
        style={{ 
          transform: `perspective(1000px) rotateX(70deg) rotateZ(${scrollY * 0.05}deg) scale(${1 + progress})`,
          opacity: 0.3
        }}
      >
        <div className="absolute inset-0 border-4 border-dashed border-cyan-400/10 rounded-full animate-spin-slow" />
      </div>

      {/* Central Monolith Text */}
      <div className="relative z-10 flex flex-col items-center">
        <h2 className="text-[12vw] font-black tracking-tighter italic transition-transform duration-700"
            style={{ 
              transform: `scale(${1 - progress * 0.5})`,
              filter: `drop-shadow(0 0 20px rgba(34,211,238,${progress}))`
            }}>
          IQUE
        </h2>
        <div className="h-[1px] bg-cyan-400 transition-all duration-1000" style={{ width: `${progress * 300}px` }} />
        <p className="mt-4 font-mono text-[10px] tracking-[1.5em] text-cyan-400 opacity-60">SOVEREIGN_SYSTEM_ONLINE</p>
      </div>

      {/* Floating Data Nodes Passing the Camera */}
      {[...Array(20)].map((_, i) => (
        <div key={i} className="absolute font-mono text-[9px] text-white/40"
             style={{ 
               left: `${(i * 137) % 100}%`, 
               top: `${(i * 113) % 100}%`,
               transform: `translateZ(${progress * 1000}px)`,
               opacity: progress > 0.5 ? 1 - progress : progress
             }}>
          {`>> CORE_VAL_0${i}`}
        </div>
      ))}
    </div>
  );
};

// --- NEW COMPONENT: THE DATA HORIZON FOOTER (Section 7) ---
const DataHorizonFooter = ({ scrollY, start }) => {
  const progress = Math.min(Math.max((scrollY - start) / 1000, 0), 1);
  
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black overflow-hidden px-10">
      {/* Background Perspective Grid */}
      <div className="absolute bottom-0 w-full h-full opacity-20 pointer-events-none"
           style={{ 
             background: `linear-gradient(to top, #22d3ee 1px, transparent 1px), linear-gradient(to right, #22d3ee 1px, transparent 1px)`,
             backgroundSize: '100px 100px',
             transform: `perspective(500px) rotateX(60deg) translateY(${progress * 200}px)`,
             maskImage: 'linear-gradient(to bottom, transparent, black)'
           }} />

      {/* Interactive Outward Links */}
      <div className="relative z-20 flex flex-col items-center gap-6">
        {['INSTAGRAM', 'LINKEDIN', 'X-TWITTER', 'MANIFESTO'].map((link, i) => (
          <a key={link} href="#" 
             className="group pointer-events-auto overflow-hidden"
             style={{ 
               transform: `translateY(${(1 - progress) * (100 * (i + 1))}px)`,
               opacity: progress 
             }}>
            <span className="block text-5xl md:text-8xl font-black tracking-tight transition-all duration-500 group-hover:tracking-[0.1em] group-hover:text-cyan-400">
              {link}
            </span>
            <div className="h-[2px] w-full bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 group-hover:bg-cyan-400" />
          </a>
        ))}
      </div>

      {/* Exit Meta Data */}
      <div className="absolute bottom-10 w-full px-10 md:px-20 flex justify-between items-end font-mono text-[8px] tracking-widest opacity-40 uppercase">
        <div className="space-y-2">
          <p>Location: Dubai / 25.2048° N</p>
          <p>Protocol: WOI_SECURE_v4</p>
        </div>
        <div className="text-right">
          <p>Created by Architect 01</p>
          <p>©️ 2026 WORLD OF IQUE</p>
        </div>
      </div>

      {/* Massive Background "IQUE" */}
      <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black opacity-[0.02] pointer-events-none transition-transform duration-1000"
          style={{ transform: `translate(-50%, -50%) scale(${0.5 + progress * 0.5})` }}>
        IQUE
      </h2>
    </div>
  );
};

export default function TextContent({ scrollY }) {
  const getAlpha = (s, e) => Math.min(Math.max((scrollY - s) / 600, 0), 1) * Math.min(Math.max((e - scrollY) / 600, 0), 1);

  useEffect(() => {
    document.body.style.height = "32000px";
    document.body.style.backgroundColor = "#080808";
    return () => { document.body.style.height = "auto"; };
  }, []);

  return (
    <Html fullscreen>
      <div className="w-screen h-screen text-white overflow-hidden pointer-events-none select-none font-light">
        
        {/* SECTION 1: THE MANIFESTO */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black" 
             style={{ opacity: getAlpha(4000, 8000) }}>
          <p className="text-6xl md:text-8xl text-center px-10 tracking-tighter uppercase italic font-normal">
            <ScrollingText text="LOGIC IS A GHOST." scrollY={scrollY} startScroll={4500} endScroll={6500} />
          </p>
          <p className="mt-8 text-cyan-400 font-mono text-xs tracking-[0.5em] opacity-50">WORLD OF IQUE // 2026</p>
        </div>

        {/* SECTION 2: THE 3D TUNNEL */}
        <div className="absolute inset-0 bg-black" 
             style={{ opacity: getAlpha(8500, 16000) }}>
          <DepthHUD scrollY={scrollY} start={8500} end={16000} />
        </div>

        {/* SECTION 4: THE FOUR PILLARS */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a]" 
             style={{ opacity: getAlpha(17000, 22000) }}>
          <StructuralRain scrollY={scrollY} startScroll={17000} endScroll={22000} />
          <div className="grid grid-cols-2 gap-20 max-w-4xl z-20 opacity-80">
            <div className="border-l border-cyan-400/30 pl-6 pointer-events-auto cursor-pointer group">
              <h3 className="text-cyan-400 text-xs tracking-widest mb-2 transition-transform group-hover:translate-x-2">01 / LEADERS</h3>
              <p className="text-3xl font-black italic uppercase tracking-tighter">CEO Square</p>
            </div>
            <div className="border-l border-white/30 pl-6 pointer-events-auto cursor-pointer group">
              <h3 className="text-white text-xs tracking-widest mb-2 transition-transform group-hover:translate-x-2">02 / CAPITAL</h3>
              <p className="text-3xl font-black italic uppercase tracking-tighter">VC Circle</p>
            </div>
          </div>
        </div>

        {/* SECTION 5: PHILOSOPHY */}
        <div className="absolute inset-0 flex items-center px-20 bg-black" 
             style={{ opacity: getAlpha(23000, 26500) }}>
          <div className="max-w-4xl">
            <p className="text-cyan-400 font-mono text-xs tracking-[1em] mb-10 opacity-50">/ ARCHITECTURE</p>
            <p className="text-4xl md:text-6xl font-light leading-tight tracking-tight italic">
              “Entrepreneurs are the architects who <span className="text-cyan-400 font-bold not-italic">redraw sovereign borders</span> through innovation.”
            </p>
          </div>
        </div>

        {/* SECTION 6: THE SOVEREIGN CORE (REPLACED SCANNER) */}
        <div className="absolute inset-0 bg-[#050505]" 
             style={{ opacity: getAlpha(27000, 30500) }}>
          <SovereignCore scrollY={scrollY} start={27000} end={30500} />
        </div>

        {/* SECTION 7: THE DATA HORIZON FOOTER (REPLACED) */}
        <div className="absolute inset-0" 
             style={{ opacity: Math.min(Math.max((scrollY - 30500) / 500, 0), 1) }}>
          <DataHorizonFooter scrollY={scrollY} start={30500} />
        </div>

      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </Html>
  );
}