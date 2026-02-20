'use client';

import { motion } from 'framer-motion';
import { Sword, Activity, Camera, Trophy } from 'lucide-react';

export function PortalTransition() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-[#020205]">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[1px] h-[1px] bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.2 + Math.random() * 0.3,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_center,_rgba(0,150,200,0.08)_0%,_transparent_70%)]" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <PortalTransitionContent />
      </div>
    </section>
  );
}

export function PortalTransitionContent() {
  return (
    <div className="text-center">
      {/* System message */}
      <div className="mb-10">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block px-8 py-5 bg-black/50 border border-cyan-500/30 backdrop-blur-sm"
        >
          <motion.p 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-[10px] uppercase tracking-[0.3em] text-cyan-400 mb-2"
          >
            ― System Message ―
          </motion.p>
          <p className="text-xl md:text-2xl font-bold text-white">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">AEROVIT</span>, Hunter.
          </p>
        </motion.div>
      </div>

      {/* Feature icons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
      >
        <FeatureIcon icon={Camera} label="Pose Detection" />
        <FeatureIcon icon={Activity} label="Biometrics" />
        <FeatureIcon icon={Sword} label="Rank System" />
        <FeatureIcon icon={Trophy} label="Rewards" />
      </motion.div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
      >
        A gamified fitness platform combining{' '}
        <span className="text-cyan-400">real-time pose detection</span>,{' '}
        <span className="text-purple-400">custom wearable technology</span>, and{' '}
        <span className="text-yellow-400">Solo Leveling-inspired progression</span>.
      </motion.p>
    </div>
  );
}

function FeatureIcon({ icon: Icon, label }: { icon: typeof Camera; label: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, borderColor: 'rgba(6, 182, 212, 0.5)' }}
      className="flex flex-col items-center gap-2 p-4 bg-white/5 border border-white/10 rounded transition-colors"
    >
      <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
        <Icon className="w-5 h-5 text-cyan-400" />
      </div>
      <p className="text-[10px] uppercase tracking-wider text-gray-500">{label}</p>
    </motion.div>
  );
}
