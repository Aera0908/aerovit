'use client';

import { motion } from 'framer-motion';
import { 
  Trophy, 
  Crosshair, 
  Activity, 
  Link as LinkIcon, 
  Sword, 
  Camera,
  Clock
} from 'lucide-react';

const DIFFERENTIATORS = [
  { icon: Camera, text: "Real-time pose detection with 33 landmarks", color: "text-cyan-400", implemented: true },
  { icon: Activity, text: "Custom smartwatch with biometric sensors", color: "text-green-400", implemented: true },
  { icon: Sword, text: "Solo Leveling-style progression system", color: "text-purple-400", implemented: true },
  { icon: Crosshair, text: "Automatic rep counting & form validation", color: "text-cyan-400", implemented: true },
  { icon: Trophy, text: "Web3 token rewards for workouts", color: "text-yellow-500", implemented: false },
  { icon: LinkIcon, text: "NFT achievement badges", color: "text-orange-400", implemented: false },
];

export function DifferentiatorsSection() {
  return (
    <section className="py-32 px-6 bg-[#020205] relative">
      <div className="max-w-7xl mx-auto">
        <DifferentiatorsContent />
      </div>
    </section>
  );
}

export function DifferentiatorsContent() {
  return (
    <div>
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-xs font-mono text-cyan-500 uppercase tracking-[0.5em] mb-4">
          What Sets Us Apart
        </h2>
        <h3 className="text-4xl md:text-5xl font-black italic uppercase">
          Key Features
        </h3>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {DIFFERENTIATORS.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02, x: 3 }}
            className={`flex items-center gap-4 p-4 bg-white/5 border transition-all relative ${
              item.implemented 
                ? 'border-white/5 hover:border-white/20' 
                : 'border-yellow-500/20 hover:border-yellow-500/40'
            }`}
          >
            {!item.implemented && (
              <div className="absolute top-1.5 right-1.5 flex items-center gap-1 text-[7px] bg-yellow-500/20 text-yellow-500 px-1.5 py-0.5 rounded">
                <Clock className="w-2 h-2" />
                PLANNED
              </div>
            )}
            
            <div className={`p-2 bg-white/5 rounded-lg ${item.color} ${!item.implemented ? 'opacity-50' : ''}`}>
              <item.icon className="w-5 h-5" />
            </div>
            <p className={`text-sm font-medium ${item.implemented ? 'text-white' : 'text-white/60'}`}>
              {item.text}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12">
        <StatHighlight value="22" label="Exercises supported" />
        <StatHighlight value="30+ FPS" label="Pose tracking speed" />
        <StatHighlight value="33" label="Body landmarks tracked" />
        <StatHighlight value="<100ms" label="BLE data latency" />
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-6 text-[10px] text-gray-500">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 bg-white/10 border border-white/20 rounded" />
          <span>Implemented</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 bg-yellow-500/10 border border-yellow-500/30 rounded" />
          <span>Coming Soon</span>
        </div>
      </div>
    </div>
  );
}

function StatHighlight({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center p-4 bg-white/5 border border-white/5">
      <p className="text-2xl md:text-3xl font-black italic text-cyan-400 mb-1">{value}</p>
      <p className="text-[9px] text-gray-500 uppercase tracking-wider">{label}</p>
    </div>
  );
}
