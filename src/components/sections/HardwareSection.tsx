'use client';

import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';
import { SpecCard } from '@/components/ui';
import { FEATURES } from '@/lib/constants';

export function HardwareSection() {
  return (
    <section id="hardware" className="py-32 px-6 max-w-7xl mx-auto relative bg-[#020205]">
      <HardwareContent />
    </section>
  );
}

export function HardwareContent() {
  const { hardware } = FEATURES;

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Cpu className="text-cyan-400 w-6 h-6" />
          <h2 className="text-xs font-mono text-cyan-500 uppercase tracking-[0.4em]">
            Core Engine
          </h2>
        </div>
        <h3 className="text-4xl md:text-5xl font-black italic uppercase">
          Hardware Specs
        </h3>
        <p className="text-gray-400 mt-4 max-w-xl mx-auto text-sm">
          Purpose-built AeroVit smartwatch with premium biometric sensors designed specifically for fitness tracking.
        </p>
      </div>

      {/* Specs grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3"
      >
        {hardware.map((spec, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <SpecCard 
              label={spec.label}
              value={spec.value}
              desc={spec.desc}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Additional features */}
      <div className="grid grid-cols-3 gap-3 mt-6">
        <AdditionalSpec label="Battery Life" value="24-48 hrs" detail="Ultra-low power" />
        <AdditionalSpec label="Connectivity" value="BLE 5.0" detail="Encrypted data" />
        <AdditionalSpec label="Touch" value="CST816S" detail="Capacitive interface" />
      </div>
    </div>
  );
}

function AdditionalSpec({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="p-4 bg-cyan-500/5 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
      <p className="text-[9px] text-cyan-400 font-mono uppercase tracking-[0.2em] mb-1">{label}</p>
      <p className="text-lg font-bold text-white mb-0.5">{value}</p>
      <p className="text-[10px] text-gray-500">{detail}</p>
    </div>
  );
}
