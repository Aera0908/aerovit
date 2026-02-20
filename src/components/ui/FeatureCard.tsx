'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  detail: string;
}

export function FeatureCard({ icon: Icon, title, subtitle, detail }: FeatureCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="relative group p-8 bg-zinc-950/50 border border-white/5 hover:border-cyan-500/50 transition-all duration-500"
    >
      <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity">
        <Icon size={64} />
      </div>
      <Icon className="text-cyan-400 mb-6 h-10 w-10 group-hover:scale-110 transition-transform" />
      <h3 className="text-2xl font-black italic uppercase mb-2 tracking-tighter text-white">
        {title}
      </h3>
      <p className="text-cyan-500 font-mono text-[10px] uppercase tracking-widest mb-4">
        {subtitle}
      </p>
      <p className="text-gray-400 text-sm leading-relaxed">{detail}</p>
    </motion.div>
  );
}
