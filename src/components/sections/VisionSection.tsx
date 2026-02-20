'use client';

import { motion } from 'framer-motion';
import { Camera, Crosshair } from 'lucide-react';
import { FEATURES } from '@/lib/constants';

export function VisionSection() {
  return (
    <section id="vision" className="py-32 relative overflow-hidden bg-[#020205]">
      <div className="max-w-7xl mx-auto px-6">
        <VisionContent />
      </div>
    </section>
  );
}

export function VisionContent() {
  const { vision } = FEATURES;

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-cyan-500 font-mono text-xs uppercase tracking-[0.5em] mb-4">
          {vision.subtitle}
        </h2>
        <h3 className="text-4xl md:text-5xl font-black italic uppercase">
          {vision.title}
        </h3>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main preview */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 relative aspect-video bg-black border border-white/10 flex items-center justify-center"
        >
          <div className="absolute top-3 left-3 flex gap-2">
            <div className="px-2 py-1 bg-red-600 text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> 
              Live Tracking
            </div>
          </div>
          
          <Crosshair className="text-cyan-500 w-12 h-12 opacity-30" />
          <PoseVisualization />
          
          <div className="absolute bottom-3 right-3 bg-black/80 p-3 border border-white/5 backdrop-blur-md">
            <p className="text-[9px] text-gray-500 font-mono mb-1 uppercase">Exercise: Squats</p>
            <p className="text-xl font-black italic text-cyan-400">REP: 08/12</p>
          </div>
        </motion.div>

        {/* Feature sidebar */}
        <div className="space-y-4">
          <FeatureBlock 
            icon={Camera}
            title="MediaPipe BlazePose"
            description="Scientific precision form validation using One Euro Filters for smooth skeletal tracking."
          />
          
          <div className="p-4 bg-white/5 border border-white/5">
            <h4 className="text-sm font-bold uppercase tracking-wider text-cyan-400 mb-3">
              {vision.exercises} Exercises Supported
            </h4>
            <ul className="space-y-1.5">
              {vision.features.map((feature, i) => (
                <li key={i} className="text-xs text-gray-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureBlock({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: typeof Camera; 
  title: string; 
  description: string; 
}) {
  return (
    <div className="p-4 bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-colors">
      <Icon className="text-cyan-400 mb-3 w-5 h-5" />
      <h4 className="text-lg font-bold uppercase italic mb-2">{title}</h4>
      <p className="text-xs text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}

function PoseVisualization() {
  return (
    <svg 
      className="absolute inset-0 w-full h-full opacity-20" 
      viewBox="0 0 400 300"
    >
      <g stroke="currentColor" strokeWidth="2" fill="none" className="text-cyan-400">
        <circle cx="200" cy="60" r="20" />
        <line x1="200" y1="80" x2="200" y2="160" />
        <line x1="200" y1="100" x2="150" y2="140" />
        <line x1="200" y1="100" x2="250" y2="140" />
        <line x1="200" y1="160" x2="170" y2="240" />
        <line x1="200" y1="160" x2="230" y2="240" />
        <circle cx="200" cy="100" r="4" fill="currentColor" />
        <circle cx="150" cy="140" r="4" fill="currentColor" />
        <circle cx="250" cy="140" r="4" fill="currentColor" />
        <circle cx="200" cy="160" r="4" fill="currentColor" />
        <circle cx="170" cy="240" r="4" fill="currentColor" />
        <circle cx="230" cy="240" r="4" fill="currentColor" />
      </g>
    </svg>
  );
}
