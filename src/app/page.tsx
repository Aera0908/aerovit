'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ChevronDown, Camera, Sword, Trophy, Cpu, Github, FileText, Mail, ExternalLink, Activity, Link as LinkIcon, Clock } from 'lucide-react';

// Social icons (Discord, Twitter not in lucide - inline SVGs)
function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}
function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
import { Navbar } from '@/components/layout';
import { SystemNotification } from '@/components/ui';

// Content panels positioned in 3D space (z depth, x offset, y offset)
const PANELS = [
  { z: -800, x: -220, y: -20 },    // 0: Intro
  { z: -2400, x: 200, y: 30 },     // 1: Vision
  { z: -4000, x: -200, y: -40 },   // 2: Gamification
  { z: -5600, x: -200, y: -20 },   // 3: App Demo - text + video side
  { z: -7200, x: 180, y: 20 },     // 4: Web3
  { z: -8800, x: -180, y: -30 },   // 5: Hardware
  { z: -10400, x: 0, y: 0 },       // 6: Watch 3D - center
];

const EXIT_PORTAL_Z = -13000;
const MAX_WORLD_Z = 13000;

const WATCH_3D_PANEL_INDEX = 6;  // Only center panel

// [stickStart, stickEnd, releaseEnd]
const STICK_RANGES: [number, number, number][] = [
  [800, 1600, 2000],     // 0: Intro
  [2400, 3200, 3600],    // 1: Vision
  [4000, 4800, 5200],    // 2: Gamification
  [5600, 6400, 6800],    // 3: App Demo
  [7200, 8000, 8400],    // 4: Web3
  [8800, 9600, 10000],   // 5: Hardware
  [10400, 11000, 11500], // 6: Watch 3D
];

const STICK_BLEND = 90;  // Wider blend zone for smoother 3D -> overlay transition
const PERSPECTIVE = 600;

function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }

// Project 3D position to screen space - matches Panel3D coordinate system
function projectPosition(worldZ: number, pos: { z: number; x: number; y: number }) {
  const depth = worldZ + pos.z;
  const scale = PERSPECTIVE / (PERSPECTIVE + depth);
  return { x: pos.x * scale, y: pos.y * scale };
}

function getStuckPanelIndex(worldZ: number): number {
  for (let i = STICK_RANGES.length - 1; i >= 0; i--) {
    const [start, end] = STICK_RANGES[i];
    if (worldZ >= start && worldZ <= end) return i;
  }
  return -1;
}

// Panel visible in 3D when approaching (before stick zone + blend)
function isPanelApproaching(worldZ: number, panelIndex: number): boolean {
  return worldZ < STICK_RANGES[panelIndex][0];
}

// Blend zone: overlay fades in before stick for smooth transition
function getBlendingPanel(worldZ: number): { index: number; opacity: number } | null {
  for (let i = 0; i < STICK_RANGES.length; i++) {
    const stickStart = STICK_RANGES[i][0];
    const blendStart = stickStart - STICK_BLEND;
    if (worldZ >= blendStart && worldZ < stickStart) {
      const linear = (worldZ - blendStart) / STICK_BLEND;
      return { index: i, opacity: easeOutCubic(linear) };
    }
  }
  return null;
}

// When releasing: which panel and progress 0-1 (slides sideways off)
function getReleasingPanel(worldZ: number): { index: number; progress: number } | null {
  for (let i = 0; i < STICK_RANGES.length; i++) {
    const [, stickEnd, releaseEnd] = STICK_RANGES[i];
    const effectiveReleaseEnd = Math.min(releaseEnd, MAX_WORLD_Z);
    if (worldZ > stickEnd && worldZ < effectiveReleaseEnd) {
      const progress = (worldZ - stickEnd) / (effectiveReleaseEnd - stickEnd);
      return { index: i, progress };
    }
  }
  return null;
}

const PANEL_SPRING = { stiffness: 180, damping: 28 };

function PanelOverlay({ worldZ, stuckPanel, blending, releasing }: {
  worldZ: number;
  stuckPanel: number;
  blending: { index: number; opacity: number } | null;
  releasing: { index: number; progress: number } | null;
}) {
  const idx = blending?.index ?? stuckPanel >= 0 ? stuckPanel : releasing?.index ?? -1;
  const isCenterPanel = idx === WATCH_3D_PANEL_INDEX;
  const pos = idx >= 0 ? PANELS[idx] : { z: 0, x: 0, y: 0 };

  const projected = projectPosition(worldZ, pos);
  const stickStart = idx >= 0 ? STICK_RANGES[idx][0] : 0;
  const stuckProjected = projectPosition(stickStart, pos);
  const baseScale = blending ? 0.98 + 0.52 * blending.opacity : 1.5;
  const slideAmount = 500 * (pos.x < 0 ? -1 : 1);
  
  // Direct position values (no spring) to avoid teleport-to-center effect
  const baseX = isCenterPanel
    ? (releasing ? slideAmount * releasing.progress : 0)
    : (blending ? projected.x : (releasing ? stuckProjected.x + slideAmount * releasing.progress : stuckProjected.x));
  const baseY = blending ? projected.y : stuckProjected.y;

  // Only spring scale for smooth ease in/out
  const scale = useSpring(baseScale, PANEL_SPRING);

  useEffect(() => {
    scale.set(baseScale);
  }, [baseScale, scale]);

  if (idx < 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-[5]">
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
        <motion.div style={{ x: baseX, y: baseY, scale }}>
          {idx === 0 && <IntroPanel />}
          {idx === 1 && <VisionPanel />}
          {idx === 2 && <GamificationPanel />}
          {idx === 3 && <AppDemoPanel />}
          {idx === 4 && <Web3Panel />}
          {idx === 5 && <HardwarePanel />}
          {idx === 6 && <Watch3DPanel />}
        </motion.div>
      </div>
    </div>
  );
}

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: scrollRef });
  const [depth, setDepth] = useState(0);
  const [worldZ, setWorldZ] = useState(0);
  const [stuckPanel, setStuckPanel] = useState(-1);

  const [releasing, setReleasing] = useState<{ index: number; progress: number } | null>(null);
  const [blending, setBlending] = useState<{ index: number; opacity: number } | null>(null);

  useEffect(() => {
    const sync = (v: number) => {
      const dungeonProgress = Math.min(1, Math.max(0, (v - 0.08) / 0.62));
      const z = dungeonProgress * MAX_WORLD_Z;
      setWorldZ(z);
      setDepth(Math.floor(z));
      setStuckPanel(getStuckPanelIndex(z));
      setReleasing(getReleasingPanel(z));
      setBlending(getBlendingPanel(z));
    };
    sync(scrollYProgress.get());
    return scrollYProgress.on('change', sync);
  }, [scrollYProgress]);

  // Phase 1: Entry Portal (0% - 8%)
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0]);
  const heroTextScale = useTransform(scrollYProgress, [0, 0.04], [1, 0.85]);
  const portalScale = useTransform(scrollYProgress, [0, 0.07], [1, 50]);
  const portalOpacity = useTransform(scrollYProgress, [0.04, 0.07], [1, 0]);
  const flashOpacity = useTransform(scrollYProgress, [0.055, 0.07, 0.085], [0, 0.9, 0]);
  const enterPromptOpacity = useTransform(scrollYProgress, [0, 0.008], [1, 0]);

  // Phase 2: Dungeon (8% - 78%) - must fully fade before summary appears
  const dungeonOpacity = useTransform(scrollYProgress, [0.07, 0.10, 0.70, 0.78], [0, 1, 1, 0]);
  const forwardPromptOpacity = useTransform(scrollYProgress, [0.09, 0.12, 0.68, 0.72], [0, 0.5, 0.5, 0]);
  
  // Phase 3: Exit Portal zoom (70% - 78%) + flash
  const exitPortalScale = useTransform(scrollYProgress, [0.70, 0.76], [1, 50]);
  const exitFlashOpacity = useTransform(scrollYProgress, [0.76, 0.78, 0.84], [0, 1, 0]);
  
  // Phase 4: Summary section - only after portal & flash are gone (84%+)
  const summaryOpacity = useTransform(scrollYProgress, [0.84, 0.90], [0, 1]);
  // Block scroll capture until portal fully gone - user must scroll outer page first
  const summaryPointerEvents = useTransform(scrollYProgress, (v) => (v >= 0.90 ? 'auto' : 'none'));

  return (
    <div ref={scrollRef} className="relative h-[1200vh] bg-[#010810]">
      <SystemNotification message="Hunter detected. System Synced." delay={1000} type="info" duration={4000} />
      <SystemNotification message="QUEST: Explore the Aerovit showcase." delay={3500} type="warning" duration={4000} />
      <Navbar />

      {/* ═══════ FIXED VIEWPORT ═══════ */}
      <div className="fixed inset-0 overflow-hidden">

        {/* ── PHASE 1: HERO ── */}
        <div className="absolute inset-0 bg-[#010810]">
          <motion.div
            style={{ scale: portalScale, opacity: portalOpacity }}
            className="absolute inset-0 flex items-center justify-center z-0 pt-24"
          >
            <Portal />
          </motion.div>

          <motion.div
            style={{ opacity: flashOpacity }}
            className="absolute inset-0 bg-white pointer-events-none"
          />

          <motion.div
            style={{ opacity: heroTextOpacity, scale: heroTextScale }}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4 z-10"
          >
            <motion.p
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="text-[#00eeff] font-mono text-[10px] md:text-xs tracking-[0.5em] uppercase mb-6"
            >
              Gamified AI Fitness Platform
            </motion.p>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[7rem] font-black italic uppercase tracking-tighter leading-[0.9] mb-1 text-white drop-shadow-[0_0_60px_rgba(0,238,255,0.3)]">
              Level up
            </h1>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[7rem] font-black italic uppercase tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-[#00eeff] via-cyan-300 to-blue-400 pb-6 pr-4">
              Reality
            </h1>
            <motion.div
              animate={{ y: [0, -5, 0], opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="mt-10"
            >
              <div className="px-5 py-2.5 bg-black/50 border border-[#00eeff]/30 backdrop-blur-sm">
                <p className="text-[8px] uppercase tracking-[0.3em] text-[#00eeff]/40 mb-0.5">Gate Detected</p>
                <p className="text-base font-black italic text-transparent bg-clip-text bg-gradient-to-r from-[#00eeff] to-blue-400">
                  E-RANK DUNGEON
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ opacity: enterPromptOpacity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
          >
            <p className="text-gray-500 text-[10px] tracking-[0.3em] uppercase mb-2">Scroll to enter</p>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-5 h-8 border border-white/20 rounded-full mx-auto flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-1 h-2 bg-[#00eeff] rounded-full mt-1.5"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* ── PHASE 2: DUNGEON ── */}
        <motion.div style={{ opacity: dungeonOpacity }} className="absolute inset-0">
          {/* 3D Scene */}
          <div
            className="absolute inset-0"
            style={{
              perspective: '600px',
              perspectiveOrigin: '50% 45%',
            }}
          >
            {/* 3D World */}
            <div
              className="absolute inset-0"
              style={{
                transformStyle: 'preserve-3d',
                transform: `translateZ(${worldZ}px)`,
                zIndex: 1,
              }}
            >
              {/* Neon blue floor - solid with gradient to horizon */}
              <div
                style={{
                  position: 'absolute',
                  width: '10000px',
                  height: `${Math.abs(EXIT_PORTAL_Z) + 8000}px`,
                  left: 'calc(50% - 5000px)',
                  bottom: '0',
                  background: 'linear-gradient(to top, rgba(0,238,255,0.35) 0%, rgba(0,238,255,0.15) 40%, rgba(0,238,255,0.04) 70%, transparent 100%)',
                  transform: 'rotateX(90deg) translateY(50%)',
                  transformOrigin: 'center bottom',
                }}
              />

              {/* Content Panels - in 3D when approaching; stuck/releasing = overlay */}
              {isPanelApproaching(worldZ, 0) && <Panel3D pos={PANELS[0]}><IntroPanel /></Panel3D>}
              {isPanelApproaching(worldZ, 1) && <Panel3D pos={PANELS[1]}><VisionPanel /></Panel3D>}
              {isPanelApproaching(worldZ, 2) && <Panel3D pos={PANELS[2]}><GamificationPanel /></Panel3D>}
              {isPanelApproaching(worldZ, 3) && <Panel3D pos={PANELS[3]}><AppDemoPanel /></Panel3D>}
              {isPanelApproaching(worldZ, 4) && <Panel3D pos={PANELS[4]}><Web3Panel /></Panel3D>}
              {isPanelApproaching(worldZ, 5) && <Panel3D pos={PANELS[5]}><HardwarePanel /></Panel3D>}
              {isPanelApproaching(worldZ, 6) && <Panel3D pos={PANELS[6]}><Watch3DPanel /></Panel3D>}

              {/* Exit Portal at the end */}
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: `translateZ(${EXIT_PORTAL_Z}px) translateX(-50%) translateY(-50%)`,
                }}
              >
                <motion.div style={{ scale: exitPortalScale }}>
                  <ExitPortal />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Stuck / Blending / Releasing Panel Overlay - smooth spring transition */}
          {(stuckPanel >= 0 || blending || releasing) && (
            <PanelOverlay worldZ={worldZ} stuckPanel={stuckPanel} blending={blending} releasing={releasing} />
          )}

          {/* HUD */}
          <div className="absolute inset-0 pointer-events-none p-6 md:p-10 flex flex-col justify-between z-10">
            <div className="flex justify-between">
              <div className="space-y-0.5">
                <HudLine>STATUS: ADVANCING</HudLine>
                <HudLine>DATA_RECEPTION: ACTIVE</HudLine>
              </div>
              <div className="text-right space-y-0.5">
                <HudLine>TRAVEL_DEPTH</HudLine>
                <HudLine>{depth.toString().padStart(5, '0')}u</HudLine>
              </div>
            </div>
            <div className="flex justify-between items-end">
              <HudLine>GRID_RELIANCE_PROTOCOL</HudLine>
              <HudLine>COORD_Z_LOCKED</HudLine>
            </div>
          </div>

          {/* Scroll prompt */}
          <motion.div
            style={{ opacity: forwardPromptOpacity }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center z-20"
          >
            <motion.p
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="text-[#00eeff] text-[9px] tracking-[5px] uppercase mb-1"
            >
              Scroll to move forward
            </motion.p>
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <ChevronDown className="w-4 h-4 text-[#00eeff]/40 mx-auto" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Exit flash */}
        <motion.div
          style={{ opacity: exitFlashOpacity }}
          className="absolute inset-0 bg-white pointer-events-none z-40"
        />

        {/* ── PHASE 4: SUMMARY SECTION ── */}
        <motion.div 
          style={{ opacity: summaryOpacity, pointerEvents: summaryPointerEvents }}
          className="absolute inset-0 z-50 bg-[#010810] overflow-y-auto"
        >
          <SummarySection />
        </motion.div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
//  3D PANEL WRAPPER
// ═══════════════════════════════════════════
function Panel3D({ pos, children }: { pos: { z: number; x: number; y: number }; children: React.ReactNode }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `translateZ(${pos.z}px) translateX(calc(-50% + ${pos.x}px)) translateY(calc(-50% + ${pos.y}px))`,
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
      }}
    >
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════
//  MEDIA COMPONENTS
// ═══════════════════════════════════════════

// Video slot for panel side - compact playback
function PanelVideo({ src, poster }: { src?: string; poster?: string }) {
  const [err, setErr] = useState(false);
  return (
    <div className="rounded-lg overflow-hidden bg-black aspect-[9/16] border border-[#00eeff]/20">
      {src && !err ? (
        <video src={src} poster={poster} autoPlay loop muted playsInline className="w-full h-full object-cover" onError={() => setErr(true)} />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-[#00eeff]/10 to-transparent">
          <span className="text-[#00eeff]/40 text-[8px] uppercase">Video</span>
        </div>
      )}
    </div>
  );
}

// Standalone floating 3D watch render - hero visual for hardware section
function Floating3DWatch({ src }: { src?: string }) {
  const [imgError, setImgError] = useState(false);
  const showImg = src && !imgError;
  return (
    <div className="flex items-center justify-center" style={{ perspective: 1000 }}>
      <div
        className="relative"
        style={{
          width: 280,
          transform: 'rotateY(-12deg) rotateX(8deg)',
          transformStyle: 'preserve-3d',
          filter: 'drop-shadow(0 40px 50px rgba(0,0,0,0.5)) drop-shadow(0 0 80px rgba(0,238,255,0.12))',
        }}
      >
        <div className="rounded-2xl overflow-hidden bg-white/5 border border-[#00eeff]/20 aspect-square">
          {showImg ? (
            <img
              src={src}
              alt="Aerovit Smartwatch"
              className="w-full h-full object-contain p-6"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-[#00eeff]/10 to-transparent">
              <Cpu className="w-16 h-16 text-[#00eeff]/30" />
              <span className="absolute text-[8px] text-[#00eeff]/40 uppercase tracking-widest">Watch 3D</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function HardwareImage({ src, alt }: { src?: string; alt: string }) {
  const [imgError, setImgError] = useState(false);
  const showImg = src && !imgError;
  return (
    <div className="relative aspect-square rounded-lg overflow-hidden bg-white/5 border border-[#00eeff]/20 mb-3 min-h-[100px]">
      {showImg ? (
        <img src={src} alt={alt} className="w-full h-full object-contain p-2" onError={() => setImgError(true)} />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Cpu className="w-12 h-12 text-[#00eeff]/30" />
          <span className="absolute text-[8px] text-[#00eeff]/40 uppercase">Hardware</span>
        </div>
      )}
    </div>
  );
}

function PanelFrame({ id, title, children, media, mediaSide = 'right' }: {
  id: string; title: string; children: React.ReactNode;
  media?: React.ReactNode; mediaSide?: 'left' | 'right';
}) {
  const content = (
    <div className="flex-1 min-w-0">
      <span className="block font-mono text-[8px] text-[#00eeff]/40 mb-1 uppercase tracking-[0.2em]">
        DATA_STREAM_{id}
      </span>
      <h2 className="text-base font-black uppercase tracking-wider text-[#00eeff] mb-2">
        {title}
      </h2>
      {children}
    </div>
  );
  const mediaSlot = media && (
    <div className="flex-shrink-0 w-[140px] md:w-[160px]">{media}</div>
  );
  return (
    <div
      className="w-[380px] max-w-[85vw] p-4 backdrop-blur-md flex gap-4"
      style={{
        backgroundColor: 'rgba(1,8,16,0.92)',
        borderLeft: '3px solid #00eeff',
        borderTop: '1px solid rgba(0,238,255,0.2)',
        boxShadow: '0 0 30px rgba(0,238,255,0.1)',
      }}
    >
      {mediaSide === 'left' && mediaSlot}
      {content}
      {mediaSide === 'right' && mediaSlot}
    </div>
  );
}

function IntroPanel() {
  return (
    <PanelFrame id="01" title="System Online" media={<PanelVideo src="/media/app-overview.mp4" poster="/media/app-overview-poster.jpg" />} mediaSide="right">
      <p className="text-sm text-gray-300 leading-relaxed mb-3">
        Welcome to <span className="text-[#00eeff] font-bold">AEROVIT</span>, Hunter. 
        A gamified fitness platform combining AI, custom hardware, and blockchain rewards.
      </p>
      <div className="grid grid-cols-2 gap-2">
        {[
          { icon: Camera, label: 'Pose Detection' },
          { icon: Activity, label: 'Biometrics' },
          { icon: Sword, label: 'Rank System' },
          { icon: Trophy, label: 'Rewards' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2 p-2 bg-white/5 border border-white/10">
            <item.icon className="w-4 h-4 text-[#00eeff]" />
            <span className="text-[10px] text-gray-400 uppercase">{item.label}</span>
          </div>
        ))}
      </div>
    </PanelFrame>
  );
}

function VisionPanel() {
  return (
    <PanelFrame id="02" title="Pose Detection" media={<PanelVideo src="/media/pose-demo.mp4" poster="/media/pose-demo-poster.jpg" />} mediaSide="left">
      <p className="text-sm text-gray-300 leading-relaxed mb-2">
        Real-time skeletal tracking with <span className="text-[#00eeff]">33 body landmarks</span> using MediaPipe BlazePose.
      </p>
      <div className="space-y-2 mb-3">
        {['Automatic Rep Counting', 'Real-Time Form Validation', 'Color-Coded Angle Display'].map((f) => (
          <div key={f} className="flex items-center gap-2 text-xs text-gray-400">
            <span className="w-1.5 h-1.5 bg-[#00eeff] rounded-full" />
            {f}
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <StatBox label="Exercises" value="22" />
        <StatBox label="FPS" value="30+" />
        <StatBox label="Landmarks" value="33" />
      </div>
    </PanelFrame>
  );
}

function GamificationPanel() {
  return (
    <PanelFrame id="03" title="Rank System" media={<PanelVideo src="/media/rank-ui.mp4" poster="/media/rank-ui-poster.jpg" />} mediaSide="right">
      <p className="text-sm text-gray-300 leading-relaxed mb-2">
        Solo Leveling-inspired progression. Earn XP, level up, and climb the ranks.
      </p>
      <div className="space-y-1.5 mb-3">
        {[
          { rank: 'E-Rank', lvl: '1-5', color: 'text-blue-400' },
          { rank: 'D-Rank', lvl: '6-10', color: 'text-blue-400' },
          { rank: 'C-Rank', lvl: '11-15', color: 'text-purple-400' },
          { rank: 'B-Rank', lvl: '16-20', color: 'text-purple-400' },
          { rank: 'A-Rank', lvl: '21-25', color: 'text-yellow-400' },
          { rank: 'S-Rank', lvl: '26+', color: 'text-yellow-400' },
        ].map((r) => (
          <div key={r.rank} className="flex justify-between text-xs p-1.5 bg-white/5">
            <span className={`font-bold ${r.color}`}>{r.rank}</span>
            <span className="text-gray-500">Lv {r.lvl}</span>
          </div>
        ))}
      </div>
    </PanelFrame>
  );
}

function Web3Panel() {
  return (
    <PanelFrame id="04" title="Blockchain Rewards" media={<HardwareImage src="/media/token-rewards.png" alt="AERO Token" />} mediaSide="left">
      <div className="flex items-center gap-2 mb-2">
        <Clock className="w-3 h-3 text-yellow-500" />
        <span className="text-[9px] uppercase tracking-wider text-yellow-500">Coming Soon</span>
      </div>
      <p className="text-sm text-gray-300 leading-relaxed mb-3">
        Earn <span className="text-yellow-400 font-bold">AERO tokens</span> for workouts. 
        Turn fitness achievements into real rewards.
      </p>
      <div className="space-y-1.5 text-xs">
        {[
          { act: 'Complete Workout', pts: '50 pts' },
          { act: 'Quest Completion', pts: '100-500 pts' },
          { act: 'Daily Login', pts: '10 pts' },
        ].map((e) => (
          <div key={e.act} className="flex justify-between p-1.5 bg-yellow-500/5 border border-yellow-500/20">
            <span className="text-gray-400">{e.act}</span>
            <span className="text-yellow-400">{e.pts}</span>
          </div>
        ))}
      </div>
    </PanelFrame>
  );
}

function AppDemoPanel() {
  return (
    <PanelFrame id="03b" title="App Demo" media={<PanelVideo src="/media/app-overview.mp4" poster="/media/app-overview-poster.jpg" />} mediaSide="right">
      <p className="text-sm text-gray-300 leading-relaxed mb-2">
        See the app in action — pose detection, ranks, and rewards.
      </p>
      <div className="space-y-1.5 text-xs text-gray-400">
        <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#00eeff] rounded-full" />Real-time form validation</div>
        <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#00eeff] rounded-full" />Rank progression</div>
        <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#00eeff] rounded-full" />Biometric sync</div>
      </div>
    </PanelFrame>
  );
}

function HardwarePanel() {
  return (
    <PanelFrame id="05" title="Custom Smartwatch" media={<HardwareImage src="/media/smartwatch.png" alt="Aerovit Smartwatch" />} mediaSide="right">
      <p className="text-sm text-gray-300 leading-relaxed mb-2">
        Purpose-built wearable with premium biometric sensors for real-time fitness tracking.
      </p>
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: 'Processor', value: 'ESP32-S3' },
          { label: 'Biometrics', value: 'MAX30102' },
          { label: 'IMU', value: 'QMI8658' },
          { label: 'Display', value: '1.69" LCD' },
        ].map((s) => (
          <div key={s.label} className="p-2 bg-[#00eeff]/5 border border-[#00eeff]/20">
            <p className="text-[8px] text-[#00eeff]/60 uppercase">{s.label}</p>
            <p className="text-sm font-bold text-white">{s.value}</p>
          </div>
        ))}
      </div>
    </PanelFrame>
  );
}

function Watch3DPanel() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Floating3DWatch src="/media/watch-3d.png" />
      <p className="text-xs text-[#00eeff]/60 uppercase tracking-widest max-w-[280px] text-center">
        Purpose-built wearable — premium biometric sensors
      </p>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex-1 p-2 bg-[#00eeff]/5 border border-[#00eeff]/20 text-center">
      <p className="text-lg font-black text-white">{value}</p>
      <p className="text-[8px] text-[#00eeff]/60 uppercase">{label}</p>
    </div>
  );
}

function TeamMemberCard({ member }: { member: { name: string; discord: string; twitter: string; github: string; avatar: string } }) {
  const initials = member.name.slice(0, 2).toUpperCase();
  const [imgError, setImgError] = useState(false);
  return (
    <div className="p-6 bg-white/5 border border-white/10 hover:border-[#00eeff]/30 transition-colors">
      <div className="flex flex-col items-center text-center">
        <div className="relative w-20 h-20 rounded-full overflow-hidden bg-white/10 border-2 border-[#00eeff]/30 mb-4 flex items-center justify-center">
          {!imgError ? (
            <img
              src={member.avatar}
              alt={member.name}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : null}
          {(imgError || member.avatar === '') && (
            <span className="text-[#00eeff] font-black text-xl">{initials}</span>
          )}
        </div>
        <h3 className="text-lg font-bold text-white mb-3">{member.name}</h3>
        <div className="flex gap-3 justify-center">
          {member.discord !== 'placeholder' ? (
            <a href={`https://discord.com/users/${member.discord}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-[#5865F2]/20 text-[#5865F2] hover:bg-[#5865F2]/40 transition-colors" title="Discord">
              <DiscordIcon className="w-5 h-5" />
            </a>
          ) : (
            <span className="p-2 rounded bg-white/5 text-gray-600 cursor-not-allowed" title="Discord (placeholder)">
              <DiscordIcon className="w-5 h-5" />
            </span>
          )}
          {member.twitter !== 'placeholder' ? (
            <a href={`https://x.com/${member.twitter}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-white/10 text-gray-300 hover:text-white transition-colors" title="Twitter / X">
              <TwitterIcon className="w-5 h-5" />
            </a>
          ) : (
            <span className="p-2 rounded bg-white/5 text-gray-600 cursor-not-allowed" title="Twitter (placeholder)">
              <TwitterIcon className="w-5 h-5" />
            </span>
          )}
          {member.github !== 'placeholder' ? (
            <a href={`https://github.com/${member.github}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-white/10 text-gray-300 hover:text-white transition-colors" title="GitHub">
              <Github className="w-5 h-5" />
            </a>
          ) : (
            <span className="p-2 rounded bg-white/5 text-gray-600 cursor-not-allowed" title="GitHub (placeholder)">
              <Github className="w-5 h-5" />
            </span>
          )}
        </div>
        <div className="mt-3 text-xs text-gray-500 space-y-1">
          <p className="truncate" title={member.discord}>Discord: {member.discord}</p>
          <p className="truncate" title={member.twitter}>@{member.twitter}</p>
          <p className="truncate" title={member.github}>github.com/{member.github}</p>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
//  EXIT PORTAL (at end of dungeon)
// ═══════════════════════════════════════════
function ExitPortal() {
  return (
    <div className="relative w-[200px] h-[280px] md:w-[280px] md:h-[380px]">
      {/* Outer glow */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="absolute inset-[-100px] rounded-full blur-[100px]"
        style={{ background: 'radial-gradient(ellipse, rgba(0,238,255,0.6) 0%, transparent 70%)' }}
      />
      {/* Inner glow */}
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        className="absolute inset-[-60px] rounded-full blur-[60px]"
        style={{ background: 'radial-gradient(ellipse, rgba(150,230,255,0.5) 0%, transparent 70%)' }}
      />
      {/* Portal body */}
      <div
        className="absolute inset-0 rounded-[50%] overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.98) 0%, rgba(220,250,255,0.95) 20%, rgba(0,238,255,0.85) 40%, rgba(0,180,220,0.6) 60%, rgba(0,100,180,0.3) 80%, transparent 100%)',
          boxShadow: '0 0 80px rgba(0,238,255,0.7), 0 0 150px rgba(0,238,255,0.4), inset 0 0 50px rgba(255,255,255,0.5)',
        }}
      >
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 12, ease: 'linear' }} className="absolute inset-[5%] rounded-[50%]" style={{ background: 'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.4) 15%, transparent 30%, rgba(200,245,255,0.35) 50%, transparent 65%, rgba(255,255,255,0.45) 80%, transparent 95%)' }} />
        <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 8, ease: 'linear' }} className="absolute inset-[15%] rounded-[50%]" style={{ background: 'conic-gradient(from 180deg, transparent, rgba(255,255,255,0.5) 20%, transparent 40%, rgba(230,250,255,0.4) 60%, transparent 80%, rgba(255,255,255,0.5) 95%)' }} />
        <div className="absolute inset-[35%] rounded-full" style={{ background: 'radial-gradient(circle, white 0%, rgba(240,252,255,0.95) 50%, rgba(200,245,255,0.7) 80%, transparent 100%)' }} />
        <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }} transition={{ repeat: Infinity, duration: 1.5 }} className="absolute inset-[45%] rounded-full bg-white blur-[4px]" />
      </div>
      {/* Border ring */}
      <motion.div animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-[-3px] rounded-[50%]" style={{ border: '3px solid rgba(0,238,255,0.6)', boxShadow: '0 0 30px rgba(0,238,255,0.5)' }} />
      {/* "EXIT" label */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-center">
        <p className="text-[#00eeff] text-xs font-mono uppercase tracking-[0.4em]">Exit Gate</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
//  SUMMARY SECTION (after exiting dungeon)
// ═══════════════════════════════════════════
function SummarySection() {
  return (
    <div className="min-h-screen bg-[#010810]">
      {/* Hero Summary */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl"
        >
          <p className="font-mono text-sm uppercase tracking-[0.5em] text-[#00eeff]/60 mb-4">
            Quest Complete
          </p>
          <h1 className="text-5xl md:text-7xl font-black italic uppercase text-white mb-4">
            Dungeon <span className="text-[#00eeff]">Cleared</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            You&apos;ve explored the Aerovit platform — a gamified AI fitness system that turns every workout into an adventure.
          </p>
          
          {/* Quick Stats */}
          <div className="flex justify-center gap-8 mb-12">
            {[
              { v: '33', l: 'Body Landmarks' },
              { v: '22+', l: 'Exercises' },
              { v: '30+', l: 'FPS Tracking' },
              { v: '<100ms', l: 'BLE Latency' },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <p className="text-3xl md:text-4xl font-black text-[#00eeff]">{s.v}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">{s.l}</p>
              </div>
            ))}
          </div>

          <ChevronDown className="w-6 h-6 text-gray-600 mx-auto animate-bounce" />
        </motion.div>
      </section>

      {/* Features Summary */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-black text-white text-center mb-12">Platform Features</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* AI Vision */}
          <div className="p-6 bg-white/5 border border-[#00eeff]/20 hover:border-[#00eeff]/40 transition-colors">
            <Camera className="w-8 h-8 text-[#00eeff] mb-4" />
            <h3 className="text-lg font-bold text-[#00eeff] mb-3">AI Pose Detection</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• MediaPipe BlazePose (33 landmarks)</li>
              <li>• Real-time form validation</li>
              <li>• Automatic rep counting</li>
              <li>• Color-coded angle feedback</li>
              <li>• One Euro Filter smoothing</li>
            </ul>
            <div className="mt-4 pt-4 border-t border-white/10">
              <span className="text-xs text-green-400 uppercase">✓ Implemented</span>
            </div>
          </div>

          {/* Hardware */}
          <div className="p-6 bg-white/5 border border-[#00eeff]/20 hover:border-[#00eeff]/40 transition-colors">
            <Cpu className="w-8 h-8 text-[#00eeff] mb-4" />
            <h3 className="text-lg font-bold text-[#00eeff] mb-3">Custom Smartwatch</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• ESP32-S3 dual-core @ 240MHz</li>
              <li>• MAX30102 HR & SpO2 sensor</li>
              <li>• QMI8658 6-axis IMU</li>
              <li>• 1.69&quot; touch LCD display</li>
              <li>• BLE 5.0 connectivity</li>
            </ul>
            <div className="mt-4 pt-4 border-t border-white/10">
              <span className="text-xs text-green-400 uppercase">✓ Implemented</span>
            </div>
          </div>

          {/* Gamification */}
          <div className="p-6 bg-white/5 border border-purple-500/20 hover:border-purple-500/40 transition-colors">
            <Sword className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-lg font-bold text-purple-400 mb-3">Solo Leveling System</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Hunter rank progression (E → S)</li>
              <li>• XP from workouts & form</li>
              <li>• Daily quests & streaks</li>
              <li>• Achievement badges</li>
              <li>• Global leaderboards</li>
            </ul>
            <div className="mt-4 pt-4 border-t border-white/10">
              <span className="text-xs text-green-400 uppercase">✓ Implemented</span>
            </div>
          </div>

          {/* Web3 */}
          <div className="p-6 bg-white/5 border border-yellow-500/20 hover:border-yellow-500/40 transition-colors">
            <Trophy className="w-8 h-8 text-yellow-500 mb-4" />
            <h3 className="text-lg font-bold text-yellow-500 mb-3">Web3 Rewards</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• AERO Token (ERC-20)</li>
              <li>• Achievement NFTs (ERC-721)</li>
              <li>• Points-to-token conversion</li>
              <li>• MetaMask integration</li>
              <li>• Sepolia testnet deployment</li>
            </ul>
            <div className="mt-4 pt-4 border-t border-white/10">
              <span className="text-xs text-yellow-400 uppercase">◐ Planned</span>
            </div>
          </div>
        </div>
      </section>

      {/* Planned Features */}
      <section className="px-6 py-20 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-white text-center mb-4">Roadmap</h2>
          <p className="text-gray-500 text-center mb-12">Features in development and planned for future releases</p>
          
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { t: 'IMU-based exercise form validation', s: 'In Progress' },
              { t: 'Gesture controls (shake, tap, rotate)', s: 'Planned' },
              { t: 'Activity auto-detection', s: 'Planned' },
              { t: 'Haptic feedback patterns', s: 'Planned' },
              { t: 'WiFi direct blockchain connectivity', s: 'Planned' },
              { t: 'OTA firmware updates', s: 'Planned' },
              { t: 'Stress & recovery scoring', s: 'Planned' },
              { t: 'Social challenges & referrals', s: 'Planned' },
            ].map((f) => (
              <div key={f.t} className="flex items-center justify-between p-4 bg-white/5 border border-white/10">
                <span className="text-gray-300">{f.t}</span>
                <span className={`text-xs px-2 py-1 ${f.s === 'In Progress' ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'}`}>
                  {f.s}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-20 max-w-4xl mx-auto">
        <h2 className="text-3xl font-black text-white text-center mb-12">FAQ</h2>
        
        <div className="space-y-4">
          {[
            { q: 'What is Aerovit?', a: 'Aerovit is a gamified AI fitness platform that combines computer vision pose detection, custom smartwatch hardware, and blockchain rewards to make workouts engaging and rewarding.' },
            { q: 'How does the pose detection work?', a: 'We use MediaPipe BlazePose to track 33 body landmarks in real-time through your device camera. The AI validates your exercise form, counts reps automatically, and provides feedback on your technique.' },
            { q: 'What smartwatch do I need?', a: 'Aerovit uses a custom-built smartwatch based on the ESP32-S3 microcontroller with heart rate, SpO2, and motion sensors. The watch streams biometric data to the app via Bluetooth Low Energy.' },
            { q: 'How do I earn rewards?', a: 'You earn points through completing workouts, maintaining good form, keeping streaks, and finishing daily quests. Points can be converted to AERO tokens on the blockchain (coming soon).' },
            { q: 'Is this a real product?', a: 'Aerovit is a gamified AI fitness platform combining computer vision, custom IoT hardware, and blockchain rewards. Core features are implemented and functional.' },
          ].map((faq) => (
            <details key={faq.q} className="group p-4 bg-white/5 border border-white/10">
              <summary className="flex items-center justify-between cursor-pointer text-white font-medium">
                {faq.q}
                <ChevronDown className="w-4 h-4 text-gray-500 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-3 text-gray-400 text-sm">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Links & Documentation */}
      <section className="px-6 py-20 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-black text-white mb-8">Documentation & Links</h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/20 hover:border-[#00eeff]/50 transition-colors text-white">
              <Github className="w-5 h-5" />
              <span>GitHub Repository</span>
              <ExternalLink className="w-4 h-4 text-gray-500" />
            </a>
            <a href="#" className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/20 hover:border-[#00eeff]/50 transition-colors text-white">
              <FileText className="w-5 h-5" />
              <span>Technical Documentation</span>
              <ExternalLink className="w-4 h-4 text-gray-500" />
            </a>
            <a href="#" className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/20 hover:border-[#00eeff]/50 transition-colors text-white">
              <FileText className="w-5 h-5" />
              <span>API Reference</span>
              <ExternalLink className="w-4 h-4 text-gray-500" />
            </a>
          </div>
        </div>
      </section>

      {/* Development Team */}
      <section className="px-6 py-20 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-white text-center mb-4">Development Team</h2>
          <p className="text-gray-500 text-center mb-12">The hunters behind Aerovit</p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Aera', discord: 'aeradynamics.', twitter: 'aera0908', github: 'aera0908', avatar: '/team/aera.png' },
              { name: 'Crispychili', discord: 'placeholder', twitter: 'placeholder', github: 'placeholder', avatar: '/team/crispychili.png' },
              { name: 'Supremo', discord: 'placeholder', twitter: 'placeholder', github: 'placeholder', avatar: '/team/supremo.png' },
              { name: 'Yonaka', discord: 'placeholder', twitter: 'placeholder', github: 'placeholder', avatar: '/team/yonaka.png' },
              { name: 'Hinode', discord: 'placeholder', twitter: 'placeholder', github: 'placeholder', avatar: '/team/hinode.png' },
            ].map((member) => (
              <TeamMemberCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Credits */}
      <section className="px-6 py-20 max-w-4xl mx-auto">
        <h2 className="text-3xl font-black text-white text-center mb-8">Credits</h2>
        
        <div className="text-center mb-12">
          <div className="inline-block p-6 bg-white/5 border border-white/10">
            <p className="text-lg text-white font-medium mb-2">Development Team</p>
            <p className="text-gray-500 text-sm">Aerovit © 2026</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 text-center text-sm text-gray-500">
          <div>
            <p className="text-gray-400 font-medium mb-2">Technologies</p>
            <p>Flutter • Firebase • MediaPipe</p>
            <p>ESP32 • Solidity • Next.js</p>
          </div>
          <div>
            <p className="text-gray-400 font-medium mb-2">Inspired By</p>
            <p>Solo Leveling (Manhwa)</p>
            <p>Gamified Fitness Apps</p>
          </div>
          <div>
            <p className="text-gray-400 font-medium mb-2">Special Thanks</p>
            <p>Open Source Community</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#00eeff] flex items-center justify-center">
                <span className="text-[#010810] font-black text-xl italic">A</span>
              </div>
              <div>
                <span className="text-xl font-black tracking-tighter uppercase italic text-white">Aerovit</span>
                <p className="text-xs text-gray-500">Where Every Rep Earns Rewards</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-gray-600 text-sm">
              © 2026 Aerovit. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ═══════════════════════════════════════════
//  HUD & PORTAL
// ═══════════════════════════════════════════
function HudLine({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-[10px] uppercase tracking-[2px] text-[#00eeff] opacity-40">{children}</p>;
}

function Portal() {
  return (
    <div className="relative w-[180px] h-[250px] sm:w-[220px] sm:h-[300px] md:w-[280px] md:h-[380px]">
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.35, 0.15] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="absolute inset-[-80px] rounded-full blur-[80px]"
        style={{ background: 'radial-gradient(ellipse, rgba(0,238,255,0.5) 0%, transparent 70%)' }}
      />
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute inset-[-50px] rounded-full blur-[50px]"
        style={{ background: 'radial-gradient(ellipse, rgba(100,200,255,0.5) 0%, transparent 70%)' }}
      />
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -50 - i * 6], x: [0, (i % 2 === 0 ? 1 : -1) * (6 + i * 2)], opacity: [0, 0.5, 0] }}
          transition={{ repeat: Infinity, duration: 1.4 + i * 0.12, delay: i * 0.15, ease: 'easeOut' }}
          className="absolute rounded-full blur-[2px]"
          style={{ left: `${15 + i * 8.5}%`, bottom: '22%', width: 3 + (i % 3) * 2, height: 14 + (i % 4) * 4, background: 'linear-gradient(to top, transparent, rgba(0,238,255,0.6))' }}
        />
      ))}
      <div
        className="absolute inset-0 rounded-[50%] overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.97) 0%, rgba(200,245,255,0.9) 15%, rgba(0,238,255,0.8) 35%, rgba(0,160,210,0.6) 55%, rgba(0,80,160,0.4) 75%, transparent 100%)',
          boxShadow: '0 0 60px rgba(0,238,255,0.6), 0 0 120px rgba(0,238,255,0.35), inset 0 0 40px rgba(255,255,255,0.4)',
        }}
      >
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 14, ease: 'linear' }} className="absolute inset-[4%] rounded-[50%]" style={{ background: 'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.35) 12%, transparent 25%, rgba(200,240,255,0.3) 40%, transparent 55%, rgba(255,255,255,0.4) 72%, transparent 88%)' }} />
        <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 9, ease: 'linear' }} className="absolute inset-[14%] rounded-[50%]" style={{ background: 'conic-gradient(from 180deg, transparent, rgba(255,255,255,0.5) 16%, transparent 33%, rgba(220,250,255,0.4) 55%, transparent 75%, rgba(255,255,255,0.45) 90%)' }} />
        <div className="absolute inset-[36%] rounded-full" style={{ background: 'radial-gradient(circle, white 0%, rgba(235,250,255,0.9) 40%, rgba(180,235,255,0.6) 70%, transparent 100%)' }} />
        <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-[44%] rounded-full bg-white blur-[3px]" />
      </div>
      <motion.div animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ repeat: Infinity, duration: 2.5 }} className="absolute inset-[-2px] rounded-[50%]" style={{ border: '2px solid rgba(0,238,255,0.5)', boxShadow: '0 0 20px rgba(0,238,255,0.4)' }} />
    </div>
  );
}
