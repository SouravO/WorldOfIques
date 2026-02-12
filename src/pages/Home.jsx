import React, { useState, useEffect, useRef } from 'react';
import { Globe, Zap, Command, Sparkles, Target, Fingerprint, Rocket } from 'lucide-react';

const contentData = [
  { quote: "To know yourself is to be the master of your own destiny.", icon: <Fingerprint size={150} />, color: "#F6982F" },
  { quote: "The only way to do great work is to love what you do.", icon: <Target size={150} />, color: "#6B66E1" },
  { quote: "Action is the foundational key to all success.", icon: <Rocket size={150} />, color: "#EC3B2E" },
  { quote: "Creativity is intelligence having fun.", icon: <Sparkles size={150} />, color: "#C67CB8" },
];

export default function FunkyPortal() {
  const [active, setActive] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollFraction, setScrollFraction] = useState(0);
  const quoteRef = useRef(null);

  const quoteText = "To fly, you must first be willing to fall. Risk is the only bridge to the extraordinary.";

  useEffect(() => {
    const timer = setTimeout(() => setActive(true), 400);
    const handleMouse = (e) => {
      setMousePos({ x: (e.clientX / window.innerWidth) - 0.5, y: (e.clientY / window.innerHeight) - 0.5 });
    };
    const handleScroll = () => {
      if (quoteRef.current) {
        const rect = quoteRef.current.getBoundingClientRect();
        const progress = -rect.top / (rect.height - window.innerHeight);
        setScrollFraction(Math.max(0, Math.min(1, progress)));
      }
    };
    window.addEventListener('mousemove', handleMouse);
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    /* Changed font-black to font-thin and ensured bg-black */
    <div className="bg-black text-white font-thin min-h-screen w-full relative selection:bg-[#F6982F] font-poppins overflow-x-hidden">
      
      {/* INITIAL LOAD SHUTTERS - Kept as brand accent or can be changed to black if preferred */}
      {[...Array(5)].map((_, i) => (
        <div 
          key={i} 
          className="fixed left-0 w-full bg-[#6B66E1] z-[100] transition-all duration-700 pointer-events-none"
          style={{ 
            height: '20vh', 
            top: `${i * 20}vh`, 
            transform: active ? (i % 2 === 0 ? 'translateX(100%)' : 'translateX(-100%)') : 'translateX(0%)', 
            transitionDelay: `${i * 50}ms` 
          }}
        />
      ))}

      {/* HERO SECTION */}
      <section className="h-screen flex flex-col items-center justify-center relative bg-black z-10">
        <h1 
          className="text-[12vw] leading-none tracking-tighter text-center italic font-thin" 
          style={{ transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)` }}
        >
          THE <br /> <span className="text-[#F6982F] not-italic">IQUE</span> WORLD
        </h1>
        <div className="mt-8 flex gap-4 animate-bounce">
            <Zap size={32} className="text-[#F6982F]" />
            <span className="uppercase tracking-widest text-sm self-center font-light">Scroll to Explore</span>
        </div>
      </section>

      {/* WORD REVEAL SECTION - Changed from bg-white to bg-black */}
      <section ref={quoteRef} className="relative h-[200vh] bg-black text-white z-20">
        <div className="sticky top-0 h-screen flex items-center justify-center px-10">
          <h3 className="text-5xl md:text-8xl font-thin text-center uppercase tracking-tighter max-w-6xl">
            {quoteText.split(" ").map((word, i) => {
              const start = i / 15;
              const activeWord = scrollFraction > start;
              return (
                <span key={i} style={{ color: activeWord ? 'white' : '#333333', transition: 'color 0.3s' }}>
                  {word}{" "}
                </span>
              );
            })}
          </h3>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="relative bg-black">
        {contentData.map((item, idx) => (
          <ScrollContentLayer key={idx} item={item} index={idx} />
        ))}
      </section>

      {/* FINAL SPACER */}
      <div className="h-screen bg-black flex items-center justify-center">
         <h2 className="text-white text-4xl opacity-20 uppercase tracking-[2em] font-thin">Fin</h2>
      </div>

      {/* FOOTER MARQUEE */}
      <div className="fixed bottom-0 w-full z-[90] bg-[#6B66E1] py-2 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee text-white font-light text-[10px] uppercase italic">
          {[...Array(20)].map((_, i) => (
            <span key={i} className="mx-8">Innovation • Design • Reality • Performance • </span>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,300;1,100&display=swap');
        .animate-marquee { animation: marquee 25s linear infinite; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}} />
    </div>
  );
}

function ScrollContentLayer({ item, index }) {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const prog = -rect.top / (rect.height - viewportHeight);
      setProgress(Math.max(0, Math.min(1, prog)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div ref={containerRef} className="relative h-[150vh] w-full bg-black">
      <div 
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
        style={{ zIndex: index + 5 }}
      >
        
        {/* PARALLAX ICON */}
        <div 
          className="absolute opacity-40 pointer-events-none transition-transform duration-75"
          style={{ 
            color: item.color,
            [isEven ? 'left' : 'right']: '5%',
            transform: `
                translateY(-50%) 
                translateX(${isEven ? (progress * 500 - 150) : -(progress * 500 - 150)}px) 
                rotate(${progress * 120}deg)
                scale(${0.8 + progress * 0.4})
            `,
            top: '50%'
          }}
        >
          {item.icon}
        </div>

        {/* TEXT CONTENT - Changed font-black to font-thin */}
        <div className={`relative z-10 px-10 w-full max-w-6xl ${isEven ? 'text-left' : 'text-right'}`}>
          <div 
            className="mb-4 text-xs tracking-[0.5em] font-light opacity-50 uppercase"
            style={{ color: item.color }}
          >
            Sequence / 0{index + 1}
          </div>
          
          <h2 
            className="text-4xl md:text-8xl font-thin uppercase leading-[0.85] tracking-tighter"
            style={{ 
                transform: `translateY(${(1 - progress) * 50}px)`,
                opacity: progress > 0.1 ? 1 : progress * 10
            }}
          >
            {item.quote}
          </h2>

          <div 
            className={`h-1 mt-12 transition-all duration-500 ${!isEven && 'ml-auto'}`}
            style={{ 
                backgroundColor: item.color,
                width: `${progress * 200}px` 
            }} 
          />
        </div>

        {/* LARGE GHOST NUMBER */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-thin opacity-[0.05] pointer-events-none select-none text-white">
          0{index + 1}
        </div>
      </div>
    </div>
  );
}