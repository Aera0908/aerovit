'use client';

import { motion } from 'framer-motion';

interface StatBarProps {
  label: string;
  value: number;
  color?: string;
}

export function StatBar({ label, value, color = "bg-cyan-500" }: StatBarProps) {
  return (
    <div className="mb-6">
      <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-500 mb-2 font-bold">
        <span>{label}</span>
        <span className="text-white">{value}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 overflow-hidden rounded-full">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className={`h-full ${color} shadow-[0_0_15px_rgba(0,242,255,0.4)]`}
        />
      </div>
    </div>
  );
}
