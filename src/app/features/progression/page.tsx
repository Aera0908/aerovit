'use client';

import { motion } from 'framer-motion';
import { Sword, Trophy, Flame, Star, Target, Zap, ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '@/components/layout';

export default function ProgressionPage() {
  const ranks = [
    { level: '1-5', rank: 'E-Rank', status: 'Awakened', color: 'bg-blue-500', textColor: 'text-blue-400', xpRange: '0-500' },
    { level: '6-10', rank: 'D-Rank', status: 'Rising', color: 'bg-blue-500', textColor: 'text-blue-400', xpRange: '500-1,500' },
    { level: '11-15', rank: 'C-Rank', status: 'Intermediate', color: 'bg-purple-500', textColor: 'text-purple-400', xpRange: '1,500-3,500' },
    { level: '16-20', rank: 'B-Rank', status: 'Advanced', color: 'bg-purple-500', textColor: 'text-purple-400', xpRange: '3,500-7,000' },
    { level: '21-25', rank: 'A-Rank', status: 'Elite', color: 'bg-yellow-500', textColor: 'text-yellow-400', xpRange: '7,000-12,000' },
    { level: '26-50', rank: 'S-Rank', status: 'Master', color: 'bg-yellow-500', textColor: 'text-yellow-400', xpRange: '12,000-50,000' },
    { level: '51+', rank: 'National', status: 'Legend', color: 'bg-white', textColor: 'text-white', xpRange: '50,000+' },
  ];

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
                <p className="text-purple-400 text-sm font-mono uppercase tracking-wider">Solo Leveling Inspired</p>
                <h1 className="text-4xl md:text-5xl font-black text-white">Rank Progression</h1>
              </div>
            </div>
            <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
              Inspired by Solo Leveling&apos;s hunter ranking system. Level up through workouts, 
              climb the ranks from E-Rank to National Level, and become the strongest hunter.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Rank Tiers */}
      <section className="py-20 px-6 bg-white/[0.02] border-y border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-4">Hunter Ranks</h2>
          <p className="text-gray-400 mb-12">Progress through 7 tiers as you complete workouts and earn XP.</p>
          
          <div className="space-y-4">
            {ranks.map((rank, i) => (
              <motion.div
                key={rank.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-6 p-4 bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
              >
                <div className={`w-3 h-12 ${rank.color} rounded-full`} />
                <div className="flex-1 grid grid-cols-4 gap-4 items-center">
                  <div>
                    <p className={`text-2xl font-black ${rank.textColor}`}>{rank.rank}</p>
                    <p className="text-gray-500 text-sm">Level {rank.level}</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">{rank.status}</p>
                    <p className="text-gray-500 text-sm">Title</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">{rank.xpRange} XP</p>
                    <p className="text-gray-500 text-sm">Required</p>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded">
                      <Star className={`w-4 h-4 ${rank.textColor}`} />
                      <span className="text-gray-400 text-sm">Tier {7 - i}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* XP Sources */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-4">Earning XP</h2>
          <p className="text-gray-400 mb-12">Multiple ways to earn experience points and level up faster.</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Target, title: 'Base Workout XP', value: '50 XP', desc: 'Earned for completing any workout session', color: 'text-[#00eeff]' },
              { icon: Zap, title: 'Per Rep', value: '2 XP', desc: 'Every rep you complete adds to your total', color: 'text-yellow-400' },
              { icon: CheckCircle, title: 'Form Accuracy', value: 'Up to 100 XP', desc: 'Bonus XP based on your form quality score', color: 'text-green-400' },
              { icon: Flame, title: 'Streak Multiplier', value: '1.5x - 3x', desc: 'Consecutive workout days multiply your XP', color: 'text-orange-400' },
              { icon: Trophy, title: 'Quest Completion', value: '100-500 XP', desc: 'Daily and weekly quest rewards', color: 'text-purple-400' },
              { icon: Star, title: 'Achievements', value: 'Varies', desc: 'Special milestones and challenges', color: 'text-yellow-400' },
            ].map((source, i) => (
              <motion.div
                key={source.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="p-6 bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
              >
                <source.icon className={`w-10 h-10 ${source.color} mb-4`} />
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-lg font-bold text-white">{source.title}</h3>
                  <span className={`font-black ${source.color}`}>{source.value}</span>
                </div>
                <p className="text-gray-500 text-sm">{source.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Quests */}
      <section className="py-20 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-4">Daily Quest System</h2>
          <p className="text-gray-400 mb-12">Complete daily challenges to earn bonus XP and maintain your streak.</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-white/5 border border-purple-500/30">
              <h3 className="text-xl font-bold text-purple-400 mb-6">Sample Daily Quests</h3>
              <div className="space-y-4">
                {[
                  { quest: 'Complete Morning Workout', xp: 100, difficulty: 'Easy' },
                  { quest: 'Do 50 Push-ups', xp: 150, difficulty: 'Medium' },
                  { quest: 'Maintain 90%+ Form Accuracy', xp: 200, difficulty: 'Hard' },
                  { quest: 'Complete 3 Different Exercises', xp: 120, difficulty: 'Easy' },
                  { quest: 'Burn 300 Calories', xp: 180, difficulty: 'Medium' },
                ].map((q) => (
                  <div key={q.quest} className="flex items-center justify-between p-3 bg-white/5 border border-white/10">
                    <div>
                      <p className="text-white font-medium">{q.quest}</p>
                      <p className="text-gray-500 text-xs">{q.difficulty}</p>
                    </div>
                    <span className="text-purple-400 font-bold">+{q.xp} XP</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-6 bg-white/5 border border-orange-500/30">
              <h3 className="text-xl font-bold text-orange-400 mb-6">Streak Bonuses</h3>
              <div className="space-y-4">
                {[
                  { days: '3 Days', multiplier: '1.25x', bonus: '+25% XP' },
                  { days: '7 Days', multiplier: '1.5x', bonus: '+50% XP' },
                  { days: '14 Days', multiplier: '2x', bonus: '+100% XP' },
                  { days: '30 Days', multiplier: '2.5x', bonus: '+150% XP' },
                  { days: '100 Days', multiplier: '3x', bonus: '+200% XP' },
                ].map((s) => (
                  <div key={s.days} className="flex items-center justify-between p-3 bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3">
                      <Flame className="w-5 h-5 text-orange-400" />
                      <span className="text-white font-medium">{s.days}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-orange-400 font-bold">{s.multiplier}</p>
                      <p className="text-gray-500 text-xs">{s.bonus}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboards */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-4">Global Leaderboards</h2>
          <p className="text-gray-400 mb-12">Compete with hunters worldwide across multiple categories.</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Weekly XP', desc: 'Top XP earners this week', icon: Zap },
              { title: 'Longest Streak', desc: 'Most consecutive workout days', icon: Flame },
              { title: 'Total Level', desc: 'Highest level hunters globally', icon: Star },
            ].map((board, i) => (
              <motion.div
                key={board.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="p-6 bg-white/5 border border-white/10 text-center"
              >
                <board.icon className="w-12 h-12 text-[#00eeff] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{board.title}</h3>
                <p className="text-gray-500">{board.desc}</p>
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
              <p className="text-white font-bold">Fully Implemented</p>
              <p className="text-gray-400 text-sm">Rank system is live in the app</p>
            </div>
          </div>
          <Link 
            href="/"
            className="px-6 py-3 bg-purple-500 text-white font-bold uppercase tracking-wider hover:bg-purple-600 transition-colors"
          >
            Start Leveling
          </Link>
        </div>
      </section>
    </div>
  );
}
