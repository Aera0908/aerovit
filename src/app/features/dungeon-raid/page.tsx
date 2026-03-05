'use client';

import { motion } from 'framer-motion';
import { Sword, Shield, Skull, Heart, Zap, Star, ArrowLeft, CheckCircle, Flame, Music, Sparkles, Target, Package, FlaskConical } from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '@/components/layout';

export default function DungeonRaidPage() {
  return (
    <div className="min-h-screen bg-[#010810]">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-[#00eeff]/60 hover:text-[#00eeff] transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Home</span>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-purple-500/10 border border-purple-500/30 rounded-lg flex items-center justify-center">
                <Sword className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <p className="text-purple-400 text-sm font-mono uppercase tracking-wider">Gamified Fitness</p>
                  <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded">Implemented</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white">Dungeon Raid</h1>
              </div>
            </div>
            <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
              Turn-based dungeon crawler where your workout progress powers your in-game character.
              20-floor dungeon with 10 enemy species, 23 skills, full equipment system, and AERO token rewards.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview Stats */}
      <section className="py-20 px-6 bg-white/[0.02] border-y border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { value: '20', label: 'Floors', color: 'text-purple-400' },
              { value: '10', label: 'Enemy Species', color: 'text-red-400' },
              { value: '23', label: 'Skills', color: 'text-[#00eeff]' },
              { value: '22', label: 'Equipment', color: 'text-yellow-400' },
              { value: '9', label: 'Consumables', color: 'text-green-400' },
              { value: '44', label: 'VFX Classes', color: 'text-orange-400' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 bg-white/5 border border-white/10 text-center"
              >
                <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
                <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Combat System */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-4">Turn-Based Combat</h2>
          <p className="text-gray-400 mb-12">Speed-based turn order with strategic skill and item selection.</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Skills */}
            <div className="p-6 bg-white/5 border border-purple-500/30">
              <h3 className="text-xl font-bold text-purple-400 flex items-center gap-3 mb-6">
                <Zap className="w-6 h-6" />
                23 Combat Skills
              </h3>
              <div className="space-y-3">
                {[
                  { category: 'Physical (9)', desc: 'Slash, Power Strike, Whirlwind, etc.', color: 'text-red-400' },
                  { category: 'Magic (6)', desc: 'Fireball, Ice Shard, Lightning, etc.', color: 'text-blue-400' },
                  { category: 'Heal (3)', desc: 'Minor/Major Heal, Full Restore', color: 'text-green-400' },
                  { category: 'Buff (2)', desc: 'Attack Up, Defense Up', color: 'text-yellow-400' },
                  { category: 'Status (3)', desc: 'Poison Strike, Stun Bash, Weaken', color: 'text-purple-400' },
                ].map((skill) => (
                  <div key={skill.category} className="p-3 bg-black/30 border border-white/5">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-bold text-sm ${skill.color}`}>{skill.category}</span>
                    </div>
                    <p className="text-gray-500 text-xs">{skill.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Status Effects */}
            <div className="p-6 bg-white/5 border border-white/10">
              <h3 className="text-xl font-bold text-white flex items-center gap-3 mb-6">
                <Flame className="w-6 h-6 text-orange-400" />
                10 Status Effects
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: 'Poison', color: 'text-green-400' },
                  { name: 'Burn', color: 'text-orange-400' },
                  { name: 'Freeze', color: 'text-cyan-300' },
                  { name: 'Paralysis', color: 'text-yellow-400' },
                  { name: 'Bleed', color: 'text-red-400' },
                  { name: 'Stun', color: 'text-yellow-300' },
                  { name: 'Weaken', color: 'text-gray-400' },
                  { name: 'Slow', color: 'text-blue-300' },
                  { name: 'Blind', color: 'text-gray-500' },
                  { name: 'Curse', color: 'text-purple-400' },
                ].map((effect) => (
                  <div key={effect.name} className="p-2 bg-black/30 border border-white/5">
                    <span className={`text-sm font-medium ${effect.color}`}>{effect.name}</span>
                  </div>
                ))}
              </div>
              <p className="text-gray-500 text-xs mt-4">Applied to both enemies and player — strategic use is key to survival.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enemies */}
      <section className="py-20 px-6 bg-white/[0.02] border-y border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-4">Enemies & Bosses</h2>
          <p className="text-gray-400 mb-12">10 species across 20 floors with progressive difficulty scaling.</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { name: 'Slime', floors: '1-4', color: 'border-green-500/30 bg-green-500/5' },
              { name: 'Goblin', floors: '3-8', color: 'border-yellow-500/30 bg-yellow-500/5' },
              { name: 'Skeleton', floors: '5-10', color: 'border-gray-500/30 bg-gray-500/5' },
              { name: 'Spider', floors: '6-12', color: 'border-purple-500/30 bg-purple-500/5' },
              { name: 'Toxic Slime', floors: '8-14', color: 'border-lime-500/30 bg-lime-500/5' },
              { name: 'Wraith', floors: '10-16', color: 'border-blue-500/30 bg-blue-500/5' },
              { name: 'Golem', floors: '12-18', color: 'border-orange-500/30 bg-orange-500/5' },
              { name: 'Drake', floors: '14-20', color: 'border-red-500/30 bg-red-500/5' },
            ].map((enemy, i) => (
              <motion.div
                key={enemy.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className={`p-4 border ${enemy.color}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Skull className="w-4 h-4 text-gray-500" />
                  <span className="text-white font-bold text-sm">{enemy.name}</span>
                </div>
                <p className="text-gray-500 text-xs">Floors {enemy.floors}</p>
              </motion.div>
            ))}
          </div>

          {/* Boss Fights */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-gradient-to-br from-purple-500/10 to-red-500/10 border border-purple-500/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Skull className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-purple-400 text-xs font-mono">FLOOR 10 — MINI BOSS</p>
                  <h3 className="text-xl font-black text-white">Venom Widow</h3>
                </div>
              </div>
              <p className="text-gray-400 text-sm">Poison-focused boss with high evasion and DOT attacks.</p>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <Skull className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <p className="text-red-400 text-xs font-mono">FLOOR 20 — FINAL BOSS</p>
                  <h3 className="text-xl font-black text-white">Demon Lord</h3>
                </div>
              </div>
              <p className="text-gray-400 text-sm">3-phase boss fight with escalating mechanics and AoE attacks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment & Shop */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-4">Equipment & Shop</h2>
          <p className="text-gray-400 mb-12">Loot, purchase, and equip gear across 5 rarity tiers.</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Weapons */}
            <div className="p-6 bg-white/5 border border-red-500/30">
              <h3 className="text-lg font-bold text-red-400 flex items-center gap-2 mb-4">
                <Sword className="w-5 h-5" />
                11 Weapons
              </h3>
              <p className="text-gray-500 text-sm mb-3">Common to Legendary with special on-hit effects:</p>
              <div className="space-y-1 text-xs">
                {['Poison on-hit', 'Bleed on-hit', 'Lifesteal on-hit'].map((e) => (
                  <p key={e} className="text-gray-400">• {e}</p>
                ))}
              </div>
            </div>
            
            {/* Armor */}
            <div className="p-6 bg-white/5 border border-blue-500/30">
              <h3 className="text-lg font-bold text-blue-400 flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5" />
                11 Armors
              </h3>
              <p className="text-gray-500 text-sm mb-3">Common to Legendary with defensive effects:</p>
              <div className="space-y-1 text-xs">
                {['Damage deflect', 'Poison attacker', 'Lifesteal on block'].map((e) => (
                  <p key={e} className="text-gray-400">• {e}</p>
                ))}
              </div>
            </div>
            
            {/* Consumables */}
            <div className="p-6 bg-white/5 border border-green-500/30">
              <h3 className="text-lg font-bold text-green-400 flex items-center gap-2 mb-4">
                <FlaskConical className="w-5 h-5" />
                9 Consumables
              </h3>
              <div className="space-y-1 text-xs">
                {[
                  'Health Potion', 'Stamina Potion', 'Antidote', 'Burn Salve',
                  'Smelling Salts', 'Holy Water', 'Elixir', 'Power Crystal', 'Shield Charm'
                ].map((item) => (
                  <p key={item} className="text-gray-400">• {item}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Rarity Tiers */}
          <div className="flex flex-wrap gap-3 mt-8 justify-center">
            {[
              { tier: 'Common', color: 'border-gray-500 text-gray-400' },
              { tier: 'Uncommon', color: 'border-green-500 text-green-400' },
              { tier: 'Rare', color: 'border-blue-500 text-blue-400' },
              { tier: 'Epic', color: 'border-purple-500 text-purple-400' },
              { tier: 'Legendary', color: 'border-yellow-500 text-yellow-400' },
            ].map((r) => (
              <span key={r.tier} className={`px-4 py-2 border ${r.color} text-sm font-bold`}>
                {r.tier}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Character Stats */}
      <section className="py-20 px-6 bg-white/[0.02] border-y border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-8">Character Stats</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { stat: 'STR', name: 'Strength', desc: 'Physical damage and carry weight', color: 'text-red-400', icon: Sword },
              { stat: 'VIT', name: 'Vitality', desc: 'Max HP and defense', color: 'text-green-400', icon: Heart },
              { stat: 'AGI', name: 'Agility', desc: 'Speed, dodge chance, and crit chance', color: 'text-yellow-400', icon: Zap },
              { stat: 'INT', name: 'Intelligence', desc: 'Magic damage and max mana', color: 'text-blue-400', icon: Sparkles },
              { stat: 'END', name: 'Endurance', desc: 'Stamina regen and status resistance', color: 'text-orange-400', icon: Shield },
              { stat: 'LUK', name: 'Luck', desc: 'Drop rates and crit damage', color: 'text-purple-400', icon: Star },
            ].map((s, i) => (
              <motion.div
                key={s.stat}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="flex items-start gap-4 p-4 bg-white/5 border border-white/10"
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-white/5 border border-white/10`}>
                  <span className={`text-lg font-black ${s.color}`}>{s.stat}</span>
                </div>
                <div>
                  <p className="text-white font-bold">{s.name}</p>
                  <p className="text-gray-500 text-sm">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Audio & VFX */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-4">Audio & Visual Polish</h2>
          <p className="text-gray-400 mb-12">Full audiovisual feedback for immersive dungeon combat.</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-white/5 border border-orange-500/30">
              <h3 className="text-xl font-bold text-orange-400 flex items-center gap-3 mb-6">
                <Sparkles className="w-6 h-6" />
                44 VFX Classes
              </h3>
              <div className="space-y-3 text-sm">
                {[
                  'Per-skill visual effects for all player and enemy abilities',
                  'Block animations: strong block (perfect) and weak block with distinct effects',
                  'Death sequence: body fall + weapon drop layered effects',
                  'Status effect visual indicators on affected characters',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 bg-black/30">
                    <Target className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-400 text-xs">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-6 bg-white/5 border border-[#00eeff]/30">
              <h3 className="text-xl font-bold text-[#00eeff] flex items-center gap-3 mb-6">
                <Music className="w-6 h-6" />
                43 SFX + BGM System
              </h3>
              <div className="space-y-3 text-sm">
                {[
                  'Unique sounds for skills, enemy attacks, hits, blocks, UI, and death',
                  'BGM: Intro → seamless loop → outro with victory fanfare',
                  'SFX timing: VFX → delay → hit impact (500ms magic, 300ms physical)',
                  'Volume ducking: 0.10 BGM under SFX for clear feedback',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 bg-black/30">
                    <Music className="w-4 h-4 text-[#00eeff] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-400 text-xs">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rewards */}
      <section className="py-20 px-6 bg-white/[0.02] border-y border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-8">Dungeon Rewards</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { reward: 'Floor Clear', value: '5-20 AERO', desc: 'Per floor completed', color: 'text-yellow-400' },
              { reward: 'Boss Defeat', value: '50-200 AERO', desc: 'Per boss killed', color: 'text-red-400' },
              { reward: 'Full Clear', value: 'Bonus AERO', desc: 'Performance-based', color: 'text-purple-400' },
              { reward: 'First Clear', value: '2x Rewards', desc: 'On first completion', color: 'text-[#00eeff]' },
            ].map((r, i) => (
              <motion.div
                key={r.reward}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="p-6 bg-white/5 border border-white/10 text-center"
              >
                <p className={`text-2xl font-black ${r.color} mb-2`}>{r.value}</p>
                <p className="text-white font-bold text-sm">{r.reward}</p>
                <p className="text-gray-500 text-xs mt-1">{r.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-white/5 border border-white/10 text-center">
            <p className="text-gray-400 text-sm">
              <span className="text-white font-bold">Save & Resume:</span> Exit mid-run and resume from your current floor. Consumable state persisted.
            </p>
          </div>
        </div>
      </section>

      {/* Dungeon Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-8">Game Features</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Sword, title: 'Turn-Based Combat', desc: 'Speed-based turn order with strategic skill and item selection' },
              { icon: Package, title: 'Loot Drops', desc: 'Floor-scaled drops — Potions, Antidotes (floor 3+), Holy Water (floor 10+ rare)' },
              { icon: Star, title: 'Skill Tree', desc: 'Unlock new skills with skill points earned from dungeon runs' },
              { icon: Target, title: 'Multi-Enemy Encounters', desc: 'Up to 5 enemies per floor with progressive difficulty' },
              { icon: Shield, title: 'Block System', desc: 'Strong block (perfect, nullifies damage) and weak block with distinct mechanics' },
              { icon: Heart, title: 'Workout-Powered', desc: 'Your real fitness progress directly powers your in-game character stats' },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="p-6 bg-white/5 border border-white/10"
              >
                <feature.icon className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Status */}
      <section className="py-12 px-6 bg-green-500/10 border-y border-green-500/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-white font-bold">Dungeon Raid Implemented</p>
              <p className="text-gray-400 text-sm">Full combat system, 20 floors, 10 enemies, equipment, audio/VFX complete</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-green-400 text-sm font-bold">92% Complete</span>
          </div>
        </div>
      </section>
    </div>
  );
}
