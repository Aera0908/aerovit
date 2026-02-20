interface SpecCardProps {
  label: string;
  value: string;
  desc: string;
}

export function SpecCard({ label, value, desc }: SpecCardProps) {
  return (
    <div className="p-8 bg-zinc-950 border border-white/5 hover:border-cyan-500/30 transition-colors">
      <p className="text-[10px] text-cyan-500 font-mono uppercase tracking-[0.2em] mb-4">
        {label}
      </p>
      <p className="text-xl font-bold text-white mb-2">{value}</p>
      <p className="text-xs text-gray-500">{desc}</p>
    </div>
  );
}
