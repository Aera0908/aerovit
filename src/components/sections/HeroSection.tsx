'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function HeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Text fades out as you approach portal
  const textOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.9]);
  
  // Portal zooms toward you - immersive forward movement
  const portalScale = useTransform(scrollYProgress, [0, 0.5], [1, 50]);
  const portalOpacity = useTransform(scrollYProgress, [0.35, 0.5], [1, 0]);
  
  // Stars move toward you (parallax depth effect)
  const starsScale = useTransform(scrollYProgress, [0, 0.5], [1, 2]);
  
  // Background transitions from space to dark
  const spaceOpacity = useTransform(scrollYProgress, [0.4, 0.6], [1, 0]);
  
  // White flash when entering
  const flashOpacity = useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 1, 0]);
  
  // Scroll indicator
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.015], [1, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[400vh]"
    >
      {/* Fixed viewport that contains the entire experience */}
      <div className="fixed inset-0 overflow-hidden">
        
        {/* Layer 1: Deep space background */}
        <motion.div 
          style={{ opacity: spaceOpacity }}
          className="absolute inset-0 bg-[#030308]"
        >
          {/* Stars with depth movement */}
          <motion.div style={{ scale: starsScale }} className="absolute inset-0">
            <Stars />
          </motion.div>
          
          {/* Nebula ambient colors */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_25%,_rgba(60,30,100,0.2)_0%,_transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_75%,_rgba(30,60,100,0.2)_0%,_transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,_rgba(0,100,150,0.1)_0%,_transparent_60%)]" />
        </motion.div>

        {/* Layer 2: Portal - zooms toward viewer */}
        <motion.div 
          style={{ scale: portalScale, opacity: portalOpacity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Portal />
        </motion.div>

        {/* Layer 3: White flash transition */}
        <motion.div 
          style={{ opacity: flashOpacity }}
          className="absolute inset-0 bg-gradient-radial from-white via-cyan-100 to-white"
        />

        {/* Layer 4: Hero text - fades as you scroll */}
        <motion.div 
          style={{ opacity: textOpacity, scale: textScale }}
          className="absolute inset-0 flex flex-col items-center justify-center px-4"
        >
          <motion.p 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="text-cyan-400 font-mono text-[10px] md:text-xs tracking-[0.5em] uppercase mb-6"
          >
            Gamified AI Fitness Platform
          </motion.p>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[7rem] xl:text-[8rem] font-black italic uppercase tracking-tighter leading-[0.9] mb-1 text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]">
            Level up
          </h1>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[7rem] xl:text-[8rem] font-black italic uppercase tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 pb-2">
            Reality
          </h1>
          
          {/* Gate indicator */}
          <motion.div 
            animate={{ y: [0, -5, 0], opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="mt-10 md:mt-14"
          >
            <div className="px-5 py-2.5 bg-black/60 border border-cyan-500/40 backdrop-blur-sm">
              <p className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-cyan-400/50 mb-0.5">Gate Detected</p>
              <p className="text-base md:text-lg font-black italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                E-RANK DUNGEON
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Layer 5: Scroll indicator */}
        <motion.div 
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 text-center"
        >
          <p className="text-gray-500 text-[9px] md:text-[10px] tracking-[0.3em] uppercase mb-2">
            Scroll to enter
          </p>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-4 h-7 border border-white/30 rounded-full mx-auto flex justify-center"
          >
            <motion.div 
              animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-1.5 bg-cyan-400 rounded-full mt-1.5"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Stars() {
  return (
    <div className="absolute inset-[-50%] w-[200%] h-[200%]">
      {[...Array(150)].map((_, i) => {
        const size = 1 + Math.random() * 2;
        return (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: size,
              height: size,
              opacity: 0.2 + Math.random() * 0.6,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        );
      })}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}

function Portal() {
  return (
    <div className="relative w-[180px] h-[250px] sm:w-[220px] sm:h-[300px] md:w-[280px] md:h-[380px]">
      
      {/* Outer breathing aura */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute inset-[-80px] md:inset-[-100px] rounded-full blur-[60px] md:blur-[80px]"
        style={{ background: 'radial-gradient(ellipse, rgba(0,180,255,0.5) 0%, rgba(80,120,255,0.2) 50%, transparent 70%)' }}
      />
      
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute inset-[-40px] md:inset-[-60px] rounded-full blur-[40px] md:blur-[50px]"
        style={{ background: 'radial-gradient(ellipse, rgba(100,200,255,0.6) 0%, rgba(50,100,200,0.3) 50%, transparent 70%)' }}
      />

      {/* Energy wisps rising */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            y: [-5, -60 - i * 5],
            x: [0, (i % 2 === 0 ? 1 : -1) * (8 + i * 2)],
            opacity: [0, 0.6, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5 + i * 0.1,
            delay: i * 0.12,
            ease: "easeOut"
          }}
          className="absolute rounded-full blur-[2px]"
          style={{ 
            left: `${12 + i * 7.5}%`,
            bottom: '20%',
            width: 4 + (i % 3) * 2,
            height: 16 + (i % 4) * 5,
            background: `linear-gradient(to top, transparent, rgba(${100 + i * 10},${200 + i * 5},255,0.7))`,
          }}
        />
      ))}

      {/* Main portal surface */}
      <div 
        className="absolute inset-0 rounded-[50%] overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.98) 0%, rgba(200,245,255,0.92) 15%, rgba(120,210,255,0.85) 35%, rgba(60,160,230,0.7) 55%, rgba(30,100,180,0.5) 75%, rgba(15,50,120,0.3) 90%, transparent 100%)',
          boxShadow: '0 0 50px rgba(100,200,255,0.7), 0 0 100px rgba(50,150,255,0.5), inset 0 0 50px rgba(255,255,255,0.5)'
        }}
      >
        {/* Rotating swirl - outer */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          className="absolute inset-[3%] rounded-[50%]"
          style={{ background: 'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.4) 12%, transparent 25%, rgba(200,240,255,0.35) 40%, transparent 55%, rgba(255,255,255,0.45) 70%, transparent 85%)' }}
        />
        
        {/* Rotating swirl - middle */}
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          className="absolute inset-[12%] rounded-[50%]"
          style={{ background: 'conic-gradient(from 180deg, transparent, rgba(255,255,255,0.55) 18%, transparent 35%, rgba(220,250,255,0.45) 55%, transparent 75%, rgba(255,255,255,0.5) 90%)' }}
        />

        {/* Rotating swirl - inner */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
          className="absolute inset-[28%] rounded-[50%]"
          style={{ background: 'conic-gradient(from 90deg, transparent, rgba(255,255,255,0.75) 22%, transparent 45%, rgba(255,255,255,0.65) 70%, transparent 92%)' }}
        />

        {/* Core glow */}
        <div 
          className="absolute inset-[35%] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(235,250,255,0.95) 35%, rgba(180,235,255,0.7) 65%, transparent 100%)' }}
        />
        
        {/* Pulsing center */}
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute inset-[43%] rounded-full bg-white blur-[2px]"
        />
      </div>

      {/* Outer ring */}
      <motion.div
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="absolute inset-[-2px] rounded-[50%]"
        style={{
          border: '2px solid rgba(150,220,255,0.6)',
          boxShadow: '0 0 25px rgba(100,200,255,0.5), 0 0 50px rgba(50,150,255,0.3)'
        }}
      />
    </div>
  );
}
