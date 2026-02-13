import React, { useEffect, useMemo, useState } from 'react';
import { Html } from '@react-three/drei';

// --- COMPONENT: Falling Wealth (Bills and Coins) ---
const FallingWealth = ({ scrollY, startScroll, endScroll }) => {
  const items = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, 
      delay: Math.random() * 2000,
      speed: 0.6 + Math.random() * 1.4, 
      rotation: Math.random() * 360,
      type: Math.random() > 0.4 ? 'bill' : 'coin',
    }));
  }, []);

  const sectionProgress = Math.min(Math.max((scrollY - startScroll) / (endScroll - startScroll), 0), 1);
  if (sectionProgress <= 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {items.map((item) => {
        const fallDistance = (scrollY - startScroll) * item.speed;
        const yPos = (fallDistance % 130) - 20; 
        const sway = Math.sin(fallDistance / 40) * 4;

        return (
          <div
            key={item.id}
            className="absolute flex items-center justify-center"
            style={{
              left: `${item.x + sway}%`,
              top: `${yPos}%`,
              transform: `rotateX(${fallDistance * 0.3}deg) rotateY(${item.rotation + fallDistance * 0.1}deg) scale(${0.8 + sectionProgress * 0.4})`,
              opacity: yPos > 90 ? 1 - (yPos - 90) / 10 : 1,
              transition: 'transform 0.1s linear',
            }}
          >
            {item.type === 'bill' ? (
              <div className="w-14 h-7 bg-emerald-500 border border-emerald-300 rounded-sm flex items-center justify-center shadow-2xl">
                <div className="w-8 h-3 border border-emerald-200/40 rounded-full flex items-center justify-center text-[10px] font-bold text-emerald-50">$</div>
              </div>
            ) : (
              <div className="w-7 h-7 bg-gradient-to-tr from-yellow-600 via-yellow-400 to-yellow-200 rounded-full shadow-xl flex items-center justify-center text-yellow-900 font-bold text-[10px] border border-yellow-300">
                $
              </div>
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
        const charEnd = charStart + 150; 
        const colorProgress = Math.min(Math.max((scrollY - charStart) / (charEnd - charStart), 0), 1);
        
        return (
          <span 
            key={i} 
            style={{ 
              color: `rgba(255, 255, 255, ${0.15 + (colorProgress * 0.85)})`,
              filter: `blur(${Math.max(0, 10 - colorProgress * 10)}px)`,
              transition: 'all 0.2s ease-out',
              display: 'inline-block',
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
  const steps = [
    { id: 1, title: "Strategy", desc: "Defining the blueprint for digital transformation.", position: "right", color: "from-blue-600 to-indigo-900" },
    { id: 2, title: "Development", desc: "Engineering robust solutions with scalable code.", position: "left", color: "from-emerald-500 to-teal-800" },
    { id: 3, title: "Deployment", desc: "Launching products that define the market standard.", position: "right", color: "from-rose-600 to-orange-700" }
  ];

  // --- SCROLL CALCULATIONS ---
  const sec1Opacity = Math.min(Math.max((scrollY - 4000) / 500, 0), 1) * Math.min(Math.max((7800 - scrollY) / 500, 0), 1);
  const sec2Opacity = Math.min(Math.max((scrollY - 7800) / 700, 0), 1) * Math.min(Math.max((12500 - scrollY) / 500, 0), 1);
  const activeIndex = Math.min(Math.max(Math.floor((scrollY - 8500) / 1200), 0), steps.length - 1);
  const currentStep = steps[activeIndex];

  const sec3Start = 12500;
  const sec3Opacity = Math.min(Math.max((scrollY - sec3Start) / 800, 0), 1) * Math.min(Math.max((16000 - scrollY) / 500, 0), 1);
  const zoomFactor = Math.max(0, (scrollY - sec3Start) / 2000);

  const sec4Start = 16500;
  const sec4End = 20000;
  const sec4Opacity = Math.min(Math.max((scrollY - sec4Start) / 800, 0), 1) * Math.min(Math.max((21000 - scrollY) / 800, 0), 1);

  // NEW SECTION 5: THE SINGULARITY (21k - 25k)
  const sec5Start = 21000;
  const sec5Opacity = Math.min(Math.max((scrollY - sec5Start) / 800, 0), 1);
  const singProgress = Math.max(0, (scrollY - sec5Start) / 3000);

  useEffect(() => {
    document.body.style.height = "26000px"; 
    return () => { document.body.style.height = "auto"; };
  }, []);

  return (
    <Html fullscreen style={{ pointerEvents: 'none' }}>
      <div className="w-full h-full font-sans text-white overflow-hidden bg-black">

        {/* SECTION 1: COSMIC JOURNEY */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ opacity: sec1Opacity, display: sec1Opacity <= 0 ? 'none' : 'flex' }}>
          <div className="max-w-5xl px-12 text-center">
            <h2 className="text-sm tracking-[1em] uppercase mb-12 opacity-50 font-bold">Initiating Sequence</h2>
            <p className="text-5xl md:text-7xl leading-tight font-extralight italic">
              <ScrollingText text="The universe is built on logic and light." scrollY={scrollY} startScroll={4500} endScroll={6500} />
            </p>
          </div>
        </div>

        {/* SECTION 2: THE PROCESS */}
        <div className="absolute inset-0 flex items-center justify-center transition-all duration-700" style={{ opacity: sec2Opacity, display: sec2Opacity <= 0 ? 'none' : 'flex' }}>
          <div className="relative w-full max-w-7xl h-full flex items-center justify-center overflow-hidden">
            <div className={`absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-30 transition-all duration-1000 bg-gradient-to-br ${currentStep.color} ${currentStep.position === 'right' ? 'translate-x-[50%]' : '-translate-x-[50%]'}`} />
            <div className="z-20 text-center px-6">
              <h1 key={currentStep.title} className="text-7xl md:text-9xl font-black uppercase tracking-tighter mb-8 animate-reveal-text">{currentStep.title}</h1>
              <p key={currentStep.desc} className="text-xl md:text-2xl text-gray-400 font-light max-w-xl mx-auto animate-fade-in-up">{currentStep.desc}</p>
            </div>
          </div>
        </div>

        {/* SECTION 3: THE HORIZON */}
        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ opacity: sec3Opacity, display: sec3Opacity <= 0 ? 'none' : 'flex' }}>
          <div style={{ transform: `scale(${1 + zoomFactor * 5})`, opacity: 1 - zoomFactor }} className="text-center transition-transform duration-100 ease-out">
            <h2 className="text-[12vw] font-black leading-none tracking-tighter outline-text">BEYOND</h2>
            <h2 className="text-[12vw] font-black leading-none tracking-tighter">LIMITS</h2>
          </div>
        </div>

        {/* SECTION 4: THE WEALTH RAIN */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950" style={{ opacity: sec4Opacity, display: (scrollY < sec4Start - 500 || scrollY > sec5Start + 500) ? 'none' : 'flex' }}>
          <FallingWealth scrollY={scrollY} startScroll={sec4Start} endScroll={sec4End} />
          <div className="z-50 text-center">
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter mb-2">UNLIMITED</h2>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-emerald-400 to-emerald-900 italic">REWARDS</h2>
          </div>
        </div>

        {/* SECTION 5: THE SINGULARITY (THE ULTIMATE ENTREPRENEUR) */}
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black overflow-hidden"
          style={{ opacity: sec5Opacity, display: scrollY < sec5Start - 500 ? 'none' : 'flex' }}
        >
          {/* Liquid Core */}
          <div 
            className="absolute rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${200 + singProgress * 600}px`,
              height: `${200 + singProgress * 600}px`,
              background: 'radial-gradient(circle, #fff 0%, #3b82f6 30%, #000 70%)',
              filter: `blur(${20 - singProgress * 15}px) contrast(200%)`,
              boxShadow: `0 0 ${singProgress * 100}px #3b82f6`,
              animation: 'blob 10s infinite alternate',
            }}
          />

          {/* Floating UI Bits */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
               <div 
                key={i}
                className="absolute border border-white/20 px-4 py-2 font-mono text-[10px] tracking-widest text-white/40"
                style={{
                    top: `${20 + i * 12}%`,
                    left: i % 2 === 0 ? '10%' : '75%',
                    transform: `translateY(${Math.sin((scrollY + (i * 500)) / 400) * 50}px)`,
                    opacity: sec5Opacity - 0.2
                }}
               >
                [ SYSTEM_STABILITY: {(99 + Math.random()).toFixed(2)}% ]
               </div>
            ))}
          </div>

          {/* Main Content */}
          <div className="relative z-50 text-center mix-blend-difference">
            <h4 className="text-blue-400 font-mono tracking-[0.5em] uppercase text-xs mb-6 opacity-80">Final Evolution</h4>
            <h2 className="text-7xl md:text-[10vw] font-black leading-none tracking-tighter uppercase italic">
              Become <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-t from-white to-gray-500">Inevitable</span>
            </h2>
            <div className="mt-12 flex flex-col items-center">
              <p className="text-lg md:text-2xl font-light tracking-wide text-gray-300 max-w-2xl mb-8">
                The entrepreneur is the one who dares to stand at the edge of the void and build a bridge.
              </p>
              <button 
                className="group relative px-12 py-4 bg-white text-black font-bold uppercase tracking-[0.2em] overflow-hidden transition-all hover:scale-110 pointer-events-auto"
                style={{ transform: `translateY(${Math.max(0, 100 - singProgress * 200)}px)`, opacity: singProgress * 2 }}
              >
                <span className="relative z-10">Ascend Now</span>
                <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes blob {
          0% { border-radius: 40% 60% 60% 40% / 40% 40% 60% 60%; transform: rotate(0deg); }
          100% { border-radius: 60% 40% 40% 60% / 60% 60% 40% 40%; transform: rotate(360deg); }
        }
        @keyframes revealText {
          from { clip-path: inset(0 0 100% 0); transform: translateY(50px); }
          to { clip-path: inset(0 0 0% 0); transform: translateY(0); }
        }
        .animate-reveal-text { animation: revealText 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards; }
        .animate-fade-in-up { animation: fadeInUp 1s ease-out forwards; }
        .outline-text {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.3);
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Html>
  );
}