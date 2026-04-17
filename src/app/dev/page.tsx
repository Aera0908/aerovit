'use client';

/**
 * STANDALONE DEV PAGE - Frame break carousel
 * Uses subject images from /dev/ folder (e.g. aera-avatar.png)
 * DIFFERENT from Summary Development Team boxes on main page, which use /assets/dev-team/
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Users, ChevronLeft, ChevronRight, ImagePlus, Zap, Shield, Cpu, Globe, Wrench, Code, Github, Linkedin, ExternalLink } from 'lucide-react';
import { Navbar } from '@/components/layout';

// Custom X (formerly Twitter) icon
function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// Custom Discord icon
function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

// Per-developer image layout — adjust individually
interface DevImageLayout {
  right: string;
  rightMd: string;
  bottom: string;
  width: string;
  widthMd: string;
  height: string;
}

type StatRank = 'S+' | 'S' | 'A' | 'B' | 'C';

interface StatEntry {
  label: string;
  rank: StatRank;
  icon: React.ComponentType<{ className?: string }>;
}

const RANK_WIDTHS: Record<StatRank, string> = {
  'S+': '100%', 'S': '90%', 'A': '75%', 'B': '60%', 'C': '45%',
};

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

interface DevTheme {
  accent: string;
  ranks: Record<StatRank, { gradient: string; color: string }>;
}

const DEV_THEMES: DevTheme[] = [
  // Aera — monochrome (gray / white / black)
  {
    accent: '#c0c0c0',
    ranks: {
      'S+': { gradient: 'linear-gradient(90deg, #ffffff, #e0e0e0, #f5f5f5)', color: '#ffffff' },
      'S':  { gradient: 'linear-gradient(90deg, #e0e0e0, #c0c0c0)', color: '#e0e0e0' },
      'A':  { gradient: 'linear-gradient(90deg, #c0c0c0, #909090)', color: '#b0b0b0' },
      'B':  { gradient: 'linear-gradient(90deg, #808080, #606060)', color: '#909090' },
      'C':  { gradient: 'linear-gradient(90deg, #555555, #444444)', color: '#777777' },
    },
  },
  // Crispychili — yellow / black / gold
  {
    accent: '#ffd700',
    ranks: {
      'S+': { gradient: 'linear-gradient(90deg, #ffd700, #ffec80, #fff4c0)', color: '#ffec80' },
      'S':  { gradient: 'linear-gradient(90deg, #ffd700, #ffcc00)', color: '#ffd700' },
      'A':  { gradient: 'linear-gradient(90deg, #daa520, #b8860b)', color: '#daa520' },
      'B':  { gradient: 'linear-gradient(90deg, #996515, #7a5010)', color: '#b8860b' },
      'C':  { gradient: 'linear-gradient(90deg, #665533, #554422)', color: '#998866' },
    },
  },
  // Supremo — black / purple
  {
    accent: '#a855f7',
    ranks: {
      'S+': { gradient: 'linear-gradient(90deg, #c084fc, #a855f7, #e0b0ff)', color: '#c084fc' },
      'S':  { gradient: 'linear-gradient(90deg, #a855f7, #9333ea)', color: '#a855f7' },
      'A':  { gradient: 'linear-gradient(90deg, #9333ea, #7c3aed)', color: '#9333ea' },
      'B':  { gradient: 'linear-gradient(90deg, #6b21a8, #581c87)', color: '#7c3aed' },
      'C':  { gradient: 'linear-gradient(90deg, #4a1d6e, #3b1556)', color: '#8b7099' },
    },
  },
  // Yonaka — pink / purple
  {
    accent: '#ec4899',
    ranks: {
      'S+': { gradient: 'linear-gradient(90deg, #f472b6, #ec4899, #f9a8d4)', color: '#f472b6' },
      'S':  { gradient: 'linear-gradient(90deg, #ec4899, #db2777)', color: '#ec4899' },
      'A':  { gradient: 'linear-gradient(90deg, #db2777, #a855f7)', color: '#db2777' },
      'B':  { gradient: 'linear-gradient(90deg, #9d174d, #7c2d6e)', color: '#be185d' },
      'C':  { gradient: 'linear-gradient(90deg, #6b3a5e, #5a2d4e)', color: '#9c7089' },
    },
  },
  // Hinode — blue (default, unchanged)
  {
    accent: '#00eeff',
    ranks: {
      'S+': { gradient: 'linear-gradient(90deg, #00eeff, #00ffcc, #aaffee)', color: '#00ffcc' },
      'S':  { gradient: 'linear-gradient(90deg, #00eeff, #00ffcc)', color: '#00eeff' },
      'A':  { gradient: 'linear-gradient(90deg, #00eeff, #0099cc)', color: '#00ccdd' },
      'B':  { gradient: 'linear-gradient(90deg, #0088aa, #006688)', color: '#0099aa' },
      'C':  { gradient: 'linear-gradient(90deg, #556677, #445566)', color: '#9ca3af' },
    },
  },
];

interface SocialLink {
  type: 'github' | 'x' | 'discord' | 'linkedin' | 'website';
  url: string;
}

interface Developer {
  name: string;
  role: string;
  title: string;
  subject: string;
  layout: DevImageLayout;
  stats: StatEntry[];
  directive: string;
  quote: string;
  socials: SocialLink[];
  /** When true, kept in DEVELOPERS but omitted from carousel and dots. */
  hidden?: boolean;
}

// Subject images for STANDALONE dev page only - from /dev/ folder
const DEVELOPERS: Developer[] = [
  {
    name: 'Aera', role: 'Core', title: 'Operational Lead',
    subject: '/assets/dev-team/aera-avatar-half.png',
    layout: { right: 'right-[20%]', rightMd: 'md:right-[-20%]', bottom: 'bottom-[-92]', width: 'w-[400px]', widthMd: 'md:w-[560px]', height: '140%' },
    stats: [
      { label: 'SYS Integration', rank: 'A', icon: Cpu },
      { label: 'Infrastructure', rank: 'B', icon: Shield },
      { label: 'Optimization', rank: 'B', icon: Zap },
      { label: 'HW-SW Sync', rank: 'A', icon: Wrench },
    ],
    directive: 'Building and maintaining core systems — handling most of the technical stack across the AeroVit framework.',
    quote: '"Architecture is not about the pieces — it\'s about the silence between them."',
    socials: [
      { type: 'github', url: 'https://github.com/aera0908' },
      { type: 'x', url: 'https://x.com/aera0908' },
      { type: 'discord', url: 'https://discord.com/users/aeradynamics.' },
    ],
  },
  {
    name: 'Crispychili', role: 'Core', title: 'QA & Config Specialist',
    subject: '/assets/dev-team/crispychili-avatar-half.png',
    layout: { right: 'right-[5%]', rightMd: 'md:right-[-2%]', bottom: 'bottom-[-35]', width: 'w-[300px]', widthMd: 'md:w-[420px]', height: '140%' },
    stats: [
      { label: 'Debugging', rank: 'B', icon: Cpu },
      { label: 'Calibration', rank: 'B', icon: Shield },
      { label: 'Configuration', rank: 'C', icon: Wrench },
      { label: 'Verification', rank: 'B', icon: Zap },
    ],
    directive: 'Configurations, debugging, calibration, and double-checking — ensuring nothing slips through the cracks.',
    quote: '"Clean code is a side effect of caring deeply."',
    socials: [
      { type: 'github', url: 'https://github.com/crispychili' },
      { type: 'x', url: 'https://x.com/cuppateaa_' },
      { type: 'discord', url: 'https://discord.com/users/cuppateaa_' },
    ],
  },
  {
    name: 'Supremo', role: 'Data', title: 'Data Gathering Specialist',
    hidden: true,
    subject: '/assets/dev-team/supremo-avatar-half.png',
    layout: { right: 'right-[5%]', rightMd: 'md:right-[-12%]', bottom: 'bottom-[-57]', width: 'w-[300px]', widthMd: 'md:w-[420px]', height: '140%' },
    stats: [
      { label: 'Data Collection', rank: 'B', icon: Globe },
      { label: 'Data Cleaning', rank: 'C', icon: Shield },
      { label: 'Research', rank: 'B', icon: Cpu },
      { label: 'Documentation', rank: 'C', icon: Code },
    ],
    directive: 'Sourcing, gathering, and organizing datasets to fuel the AeroVit ecosystem.',
    quote: '"Trust is earned on-chain."',
    socials: [
      { type: 'github', url: 'https://github.com/christiannn26' },
      { type: 'x', url: 'https://x.com/supremo_cp26' },
      { type: 'discord', url: 'https://discord.com/users/supremo_cp26' },
    ],
  },
  {
    name: 'Yonaka', role: 'Business', title: 'Business Development',
    hidden: true,
    subject: '/assets/dev-team/yonaka-avatar-half.png',
    layout: { right: 'right-[5%]', rightMd: 'md:right-[-4%]', bottom: 'bottom-10', width: 'w-[250px]', widthMd: 'md:w-[350px]', height: '140%' },
    stats: [
      { label: 'Strategy', rank: 'B', icon: Globe },
      { label: 'Partnerships', rank: 'C', icon: Zap },
      { label: 'Market Analysis', rank: 'C', icon: Cpu },
      { label: 'Communications', rank: 'B', icon: Shield },
    ],
    directive: 'Driving business strategy and partnerships to expand the AeroVit market reach.',
    quote: '"If it feels right, it probably looks right too."',
    socials: [
      { type: 'github', url: 'https://github.com/yonaka-png' },
      { type: 'x', url: 'https://x.com/ynk2528' },
      { type: 'discord', url: 'https://discord.com/users/ynk_web3' },
    ],
  },
  {
    name: 'Hinode', role: 'Business', title: 'Operations & Planning',
    hidden: true,
    subject: '/assets/dev-team/hinode-avatar-half.png',
    layout: { right: 'right-[5%]', rightMd: 'md:right-[-10%]', bottom: 'bottom-[-20]', width: 'w-[350px]', widthMd: 'md:w-[490px]', height: '140%' },
    stats: [
      { label: 'Planning', rank: 'B', icon: Cpu },
      { label: 'Coordination', rank: 'C', icon: Shield },
      { label: 'Outreach', rank: 'C', icon: Globe },
      { label: 'Presentations', rank: 'B', icon: Zap },
    ],
    directive: 'Coordinating project timelines and operational planning across the AeroVit initiative.',
    quote: '"Data speaks — you just have to know which frequency to tune in to."',
    socials: [
      { type: 'x', url: 'https://x.com/hinode_web3' },
      { type: 'discord', url: 'https://discord.com/users/hinode_web3' },
    ],
  },
];

const VISIBLE_DEVELOPERS = DEVELOPERS.filter((d) => !d.hidden);

function SubjectImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    if (img.complete) {
      setLoaded(true);
    }
  }, [src]);

  if (errored) {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center bg-white/5 border border-dashed"
        style={{ borderColor: 'var(--accent-30)', color: 'var(--accent-50)' }}
      >
        <ImagePlus className="w-12 h-12 mb-2" />
        <span className="text-xs font-mono uppercase">Upload image</span>
      </div>
    );
  }

  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-8 h-8 rounded-full animate-spin"
            style={{ border: '2px solid var(--accent-20)', borderTopColor: 'var(--accent-60)' }}
          />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-contain object-bottom transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
      />
    </>
  );
}

function StatBar({ stat, delay, theme }: { stat: StatEntry; delay: number; theme: DevTheme }) {
  const Icon = stat.icon;
  const rankCfg = theme.ranks[stat.rank];
  const width = RANK_WIDTHS[stat.rank];
  return (
    <motion.div
      className="flex items-center gap-3 group"
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center" style={{ color: 'var(--accent-60)' }}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400">{stat.label}</span>
          <span className="text-[11px] font-black font-mono tracking-wider" style={{ color: rankCfg.color }}>{stat.rank}</span>
        </div>
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: rankCfg.gradient }}
            initial={{ width: 0 }}
            animate={{ width }}
            transition={{ duration: 0.8, delay: delay + 0.1, ease: 'easeOut' }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function DevPage() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const dev = VISIBLE_DEVELOPERS[index];
  const theme = DEV_THEMES[DEVELOPERS.indexOf(dev)];

  // Slide variants with direction support
  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  const goNext = () => {
    setDirection(1);
    setIndex((i) => (i + 1) % VISIBLE_DEVELOPERS.length);
  };
  const goPrev = () => {
    setDirection(-1);
    setIndex((i) => (i - 1 + VISIBLE_DEVELOPERS.length) % VISIBLE_DEVELOPERS.length);
  };

  return (
    <div
      className="min-h-screen bg-[#010810]"
      style={{
        '--accent': theme.accent,
        '--accent-80': hexToRgba(theme.accent, 0.8),
        '--accent-60': hexToRgba(theme.accent, 0.6),
        '--accent-50': hexToRgba(theme.accent, 0.5),
        '--accent-40': hexToRgba(theme.accent, 0.4),
        '--accent-30': hexToRgba(theme.accent, 0.3),
        '--accent-20': hexToRgba(theme.accent, 0.2),
        '--accent-15': hexToRgba(theme.accent, 0.15),
        '--accent-10': hexToRgba(theme.accent, 0.1),
        '--accent-04': hexToRgba(theme.accent, 0.04),
      } as React.CSSProperties}
    >
      <Navbar />
      
      <section className="pt-24 pb-20 px-6 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 opacity-60 hover:opacity-100 transition-all duration-500 mb-8" style={{ color: 'var(--accent)' }}>
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Home</span>
          </Link>
          
          <div className="flex items-center gap-4 mb-12">
            <div className="w-16 h-16 rounded-lg flex items-center justify-center transition-all duration-500" style={{ backgroundColor: 'var(--accent-10)', border: '1px solid var(--accent-30)' }}>
              <Users className="w-8 h-8 transition-colors duration-500" style={{ color: 'var(--accent)' }} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-white">Developers</h1>
              <p className="text-gray-500 mt-1">The hunters behind Aerovit</p>
            </div>
          </div>

          {/* Carousel */}
          <div className="relative max-w-4xl mx-auto mt-16">
            {/* Left arrows - triple chevron */}
            <button
              onClick={goPrev}
              className="absolute -left-16 md:-left-48 lg:-left-56 top-1/2 -translate-y-1/2 z-30 p-4 group"
              aria-label="Previous developer"
            >
              <div className="flex items-center animate-pulse-left">
                <svg className="w-10 h-20 md:w-12 md:h-28 arrow-left-3 transition-colors duration-500" style={{ color: 'var(--accent)' }} viewBox="0 0 24 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8 L8 24 L18 40" />
                </svg>
                <svg className="w-10 h-20 md:w-12 md:h-28 -ml-6 md:-ml-7 arrow-left-2 transition-colors duration-500" style={{ color: 'var(--accent)' }} viewBox="0 0 24 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8 L8 24 L18 40" />
                </svg>
                <svg className="w-10 h-20 md:w-12 md:h-28 -ml-6 md:-ml-7 arrow-left-1 transition-colors duration-500" style={{ color: 'var(--accent)' }} viewBox="0 0 24 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8 L8 24 L18 40" />
                </svg>
              </div>
            </button>

            {/* Right arrows - triple chevron */}
            <button
              onClick={goNext}
              className="absolute -right-16 md:-right-48 lg:-right-56 top-1/2 -translate-y-1/2 z-30 p-4 group"
              aria-label="Next developer"
            >
              <div className="flex items-center animate-pulse-right">
                <svg className="w-10 h-20 md:w-12 md:h-28 arrow-right-1 transition-colors duration-500" style={{ color: 'var(--accent)' }} viewBox="0 0 24 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 8 L16 24 L6 40" />
                </svg>
                <svg className="w-10 h-20 md:w-12 md:h-28 -ml-6 md:-ml-7 arrow-right-2 transition-colors duration-500" style={{ color: 'var(--accent)' }} viewBox="0 0 24 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 8 L16 24 L6 40" />
                </svg>
                <svg className="w-10 h-20 md:w-12 md:h-28 -ml-6 md:-ml-7 arrow-right-3 transition-colors duration-500" style={{ color: 'var(--accent)' }} viewBox="0 0 24 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 8 L16 24 L6 40" />
                </svg>
              </div>
            </button>

            {/* Card */}
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={index}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                className="relative overflow-visible"
              >
                  {/* The frame */}
                  <div
                    className="relative rounded-2xl min-h-[340px] md:min-h-[400px]"
                    style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.07) 0%, var(--accent-04) 100%)` }}
                  >
                    <div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{ zIndex: 1, border: '1px solid var(--accent-15)' }}
                    />

                    {/* Game stats content */}
                    <div className="relative p-6 md:p-8 pr-[200px] md:pr-[340px] z-[1]">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="inline-block px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest rounded"
                          style={{ color: 'var(--accent-80)', border: '1px solid var(--accent-30)' }}
                        >
                          {dev.role}
                        </span>
                        <div className="h-px flex-1" style={{ backgroundColor: 'var(--accent-10)' }} />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider mb-0.5">{dev.name}</h2>
                      <div className="flex items-center gap-3 mb-4">
                        <p className="text-[11px] font-mono uppercase tracking-widest" style={{ color: 'var(--accent-50)' }}>{dev.title}</p>
                        <div className="flex items-center gap-1.5">
                          {dev.socials.map((s) => {
                            const Icon = s.type === 'github' ? Github : s.type === 'x' ? XIcon : s.type === 'discord' ? DiscordIcon : s.type === 'linkedin' ? Linkedin : ExternalLink;
                            return (
                              <a
                                key={s.type}
                                href={s.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-5 h-5 flex items-center justify-center rounded bg-white/5 opacity-50 hover:opacity-100 transition-all"
                                style={{ border: '1px solid var(--accent-30)', color: 'var(--accent)' }}
                              >
                                <Icon className="w-3 h-3" />
                              </a>
                            );
                          })}
                        </div>
                      </div>

                      {/* Stat bars */}
                      <div className="space-y-2.5 mb-5">
                        {dev.stats.map((stat, i) => (
                          <StatBar key={stat.label} stat={stat} delay={i * 0.08} theme={theme} />
                        ))}
                      </div>

                      {/* Divider */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--accent-40)' }} />
                        <span className="text-[9px] font-mono uppercase tracking-widest" style={{ color: 'var(--accent-40)' }}>Current Directive</span>
                        <div className="h-px flex-1" style={{ backgroundColor: 'var(--accent-10)' }} />
                      </div>

                      {/* Directive */}
                      <p className="text-[11px] leading-relaxed text-gray-400 font-mono mb-0">
                        {dev.directive}
                      </p>
                    </div>
                  </div>

                  {/* Quote — below the frame */}
                  <div className="mt-5 pl-4" style={{ borderLeft: '2px solid var(--accent-20)' }}>
                    <p className="text-sm italic text-gray-500 font-light">{dev.quote}</p>
                  </div>

                  {/* Subject image — breaks OUT of the frame */}
                  <div
                    className={`absolute ${dev.layout.right} ${dev.layout.rightMd} ${dev.layout.bottom} ${dev.layout.width} ${dev.layout.widthMd} pointer-events-none`}
                    style={{
                      height: dev.layout.height,
                      zIndex: 20,
                      filter: `drop-shadow(0 0 24px var(--accent-20))`,
                    }}
                  >
                    <SubjectImage src={dev.subject} alt={dev.name} />
                  </div>
                </motion.div>
            </AnimatePresence>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {VISIBLE_DEVELOPERS.map((d, i) => (
                <button
                  key={d.name}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === index ? 'w-6' : 'bg-white/40 w-2 hover:bg-white/60'
                  }`}
                  style={i === index ? { backgroundColor: 'var(--accent)' } : undefined}
                  aria-label={`Select ${d.name}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
