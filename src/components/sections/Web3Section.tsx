'use client';

import { motion } from 'framer-motion';
import { Link as LinkIcon, Trophy, Coins, Clock } from 'lucide-react';
import { FEATURES } from '@/lib/constants';

export function Web3Section() {
  return (
    <section id="web3" className="py-32 px-6 max-w-7xl mx-auto relative bg-[#020205]">
      <Web3Content />
    </section>
  );
}

export function Web3Content() {
  const { web3 } = FEATURES;

  return (
    <div className="bg-gradient-to-br from-zinc-950 to-black border border-white/10 p-8 md:p-12 relative overflow-hidden">
      {/* Planned badge */}
      <div className="absolute top-4 right-4 px-3 py-1.5 bg-yellow-500/20 border border-yellow-500/50 rounded-full">
        <span className="text-[9px] font-bold uppercase tracking-widest text-yellow-500 flex items-center gap-1.5">
          <Clock className="w-3 h-3" />
          Coming Soon
        </span>
      </div>

      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-yellow-500/5 to-transparent" />
      
      <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
        {/* Left - Description */}
        <div>
          <LinkIcon className="text-yellow-500 w-8 h-8 mb-6" />
          <h3 className="text-3xl md:text-4xl font-black italic uppercase leading-tight mb-4">
            Blockchain <br />
            Rewards
          </h3>
          <p className="text-gray-400 text-base mb-3 leading-relaxed">
            Earn <span className="text-yellow-500 font-bold">AERO Tokens</span> for completing workouts. 
            Turn your fitness achievements into real rewards.
          </p>
          
          <div className="bg-yellow-500/10 border border-yellow-500/30 p-3 mb-6">
            <p className="text-xs text-yellow-500/80">
              <strong>Note:</strong> The token system is currently in development. 
              Points earned now will be convertible to AERO tokens upon launch.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-6">
            <TokenInfoCard label="Token" value={web3.token} icon={Coins} planned />
            <TokenInfoCard label="Network" value={web3.network} icon={LinkIcon} planned />
          </div>

          <div className="bg-white/5 border border-white/5 p-3">
            <h4 className="text-[10px] font-mono text-yellow-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              Planned Point System
              <span className="text-[8px] bg-yellow-500/20 px-1.5 py-0.5 rounded">IN DEV</span>
            </h4>
            <div className="space-y-1.5">
              {web3.earnings.map((item, i) => (
                <div key={i} className="flex justify-between text-xs">
                  <span className="text-gray-400">{item.activity}</span>
                  <span className="text-white/60 font-bold">{item.base} pts</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right - NFT Card */}
        <div className="flex justify-center">
          <NFTCard />
        </div>
      </div>
    </div>
  );
}

function TokenInfoCard({ 
  label, 
  value, 
  icon: Icon,
  planned = false
}: { 
  label: string; 
  value: string; 
  icon: typeof Coins;
  planned?: boolean;
}) {
  return (
    <div className="bg-white/5 p-3 border border-white/5 hover:border-yellow-500/30 transition-colors relative">
      {planned && (
        <span className="absolute top-1.5 right-1.5 text-[7px] bg-yellow-500/20 text-yellow-500 px-1 py-0.5 rounded">
          PLANNED
        </span>
      )}
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className="w-3 h-3 text-yellow-500" />
        <p className="text-[9px] text-yellow-500 font-mono uppercase">{label}</p>
      </div>
      <p className="text-base font-black text-white/70">{value}</p>
    </div>
  );
}

function NFTCard() {
  return (
    <motion.div 
      whileHover={{ rotateY: 10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-zinc-900 border-2 border-yellow-500/30 p-6 rounded-xl relative z-10 w-52 aspect-[3/4] flex flex-col justify-between shadow-2xl"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center z-20">
        <div className="text-center">
          <Clock className="w-6 h-6 text-yellow-500 mx-auto mb-1.5" />
          <p className="text-[10px] uppercase tracking-widest text-yellow-500">Coming Soon</p>
        </div>
      </div>

      <div className="flex justify-between items-start">
        <Trophy className="text-yellow-500/50 w-5 h-5" />
        <span className="text-[8px] font-bold uppercase text-yellow-500/50 tracking-widest">NFT BADGE</span>
      </div>
      
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-yellow-500/20 to-transparent flex items-center justify-center">
          <Trophy className="w-8 h-8 text-yellow-500/50" />
        </div>
        <h4 className="text-xl font-black italic uppercase text-white/50 mb-1">Iron Will</h4>
        <p className="text-[9px] text-gray-500">7-Day Workout Streak</p>
      </div>
      
      <div className="pt-3 border-t border-white/10 flex justify-between items-center font-mono text-[8px] text-gray-600">
        <span>ID: #----</span>
        <span>PLANNED</span>
      </div>
    </motion.div>
  );
}
