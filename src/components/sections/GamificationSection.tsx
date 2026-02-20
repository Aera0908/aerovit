'use client';

import { motion } from 'framer-motion';
import { Sword, TrendingUp, Trophy } from 'lucide-react';
import { StatBar } from '@/components/ui';
import { FEATURES } from '@/lib/constants';

export function GamificationSection() {
  return (
    <section id="gamification" className="py-32 px-6 max-w-7xl mx-auto relative bg-[#020205]">
      <GamificationContent />
    </section>
  );
}

export function GamificationContent() {
  const { gamification } = FEATURES;

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sword className="text-purple-400 w-6 h-6" />
          <h2 className="text-xs font-mono text-purple-400 uppercase tracking-[0.4em]">
            Solo Leveling Inspired
          </h2>
        </div>
        <h3 className="text-4xl md:text-5xl font-black italic uppercase">
          Rank Up System
        </h3>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Rank table */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-zinc-950/50 border border-white/5 p-6"
        >
          <h4 className="text-base font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
            <Trophy className="text-yellow-500 w-4 h-4" />
            Hunter Ranks
          </h4>
          
          <div className="space-y-2">
            {gamification.ranks.map((rank, i) => (
              <div 
                key={i}
                className="flex items-center justify-between p-2.5 bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[9px] font-mono text-gray-500 w-10">
                    Lv {rank.level}
                  </span>
                  <span className={`text-lg font-black italic ${rank.color}`}>
                    {rank.rank}
                  </span>
                </div>
                <span className="text-[10px] text-gray-400">{rank.status}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* XP & Progress */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* Player card mockup */}
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                <span className="text-lg font-black italic">A</span>
              </div>
              <div>
                <p className="text-lg font-black italic uppercase">Hunter Aira</p>
                <p className="text-xs text-purple-400">B-Rank • Level 18</p>
              </div>
            </div>
            
            <StatBar label="XP to A-Rank" value={78} color="bg-purple-500" />
            <StatBar label="Weekly Goal" value={65} color="bg-cyan-500" />
            <StatBar label="Form Accuracy" value={94} color="bg-green-500" />
          </div>

          {/* XP Sources */}
          <div className="bg-zinc-950/50 border border-white/5 p-4">
            <h4 className="text-xs font-mono text-cyan-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <TrendingUp className="w-3 h-3" />
              XP Sources
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {gamification.xpSources.map((source, i) => (
                <div key={i} className="p-2.5 bg-white/5 border border-white/5">
                  <p className="text-[9px] text-gray-500 uppercase">{source.source}</p>
                  <p className="text-base font-bold text-white">{source.xp}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
