export function Footer() {
  return (
    <footer className="relative py-20 border-t border-white/5 px-6 mt-16 bg-[#020205]">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <FooterContent />
      </div>
    </footer>
  );
}

export function FooterContent() {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-white flex items-center justify-center clip-path-polygon">
          <span className="text-black font-black text-xs italic">A</span>
        </div>
        <span className="text-xl font-black tracking-tighter uppercase italic text-white">
          Aerovit
        </span>
      </div>

      {/* Tagline */}
      <p className="text-gray-400 mb-6 max-w-md text-sm">
        AI-Powered • Blockchain-Enabled • Hardware-Integrated
        <br />
        <span className="text-cyan-400">Where Every Rep Earns Rewards</span>
      </p>

      {/* Copyright */}
      <p className="text-gray-600 text-[9px] uppercase font-bold tracking-[0.5em]">
        Aerovit © 2026
      </p>
    </div>
  );
}
