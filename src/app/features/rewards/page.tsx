'use client';

import { motion } from 'framer-motion';
import { Trophy, Coins, Wallet, Award, Gift, TrendingUp, ArrowLeft, Clock, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '@/components/layout';

export default function RewardsPage() {
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
              <div className="w-16 h-16 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-center justify-center">
                <Trophy className="w-8 h-8 text-yellow-500" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <p className="text-yellow-500 text-sm font-mono uppercase tracking-wider">Web3 Integration</p>
                  <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs rounded">Coming Soon</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white">Blockchain Rewards</h1>
              </div>
            </div>
            <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
              Earn AERO tokens for your workouts. Convert fitness achievements into real blockchain rewards 
              with our ERC-20 token system on the Polygon network.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Token Info */}
      <section className="py-20 px-6 bg-white/[0.02] border-y border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black text-white mb-6">AERO Token</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                The native utility token of the Aerovit ecosystem. Earn AERO through workouts, 
                trade on decentralized exchanges, or use for premium features.
              </p>
              
              <div className="space-y-4">
                {[
                  { label: 'Token Standard', value: 'ERC-20' },
                  { label: 'Network', value: 'Polygon (Sepolia Testnet)' },
                  { label: 'Conversion Rate', value: '100 Points = 1 AERO' },
                  { label: 'Min. Conversion', value: '1,000 Points (10 AERO)' },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between p-4 bg-white/5 border border-white/10">
                    <span className="text-gray-400">{item.label}</span>
                    <span className="text-yellow-400 font-bold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-8 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg text-center">
              <div className="w-24 h-24 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Coins className="w-12 h-12 text-yellow-500" />
              </div>
              <h3 className="text-4xl font-black text-yellow-400 mb-2">AERO</h3>
              <p className="text-gray-400">Aerovit Token</p>
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-gray-500 text-sm">Deployment Status</p>
                <p className="text-yellow-400 font-bold">Sepolia Testnet</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Earning Points */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-4">Earning Points</h2>
          <p className="text-gray-400 mb-12">Multiple ways to accumulate points that convert to AERO tokens.</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { activity: 'Complete Workout', base: '50', bonus: '+10 per perfect form', icon: Trophy },
              { activity: 'Per Rep Completed', base: '10', bonus: 'Form quality multiplier', icon: TrendingUp },
              { activity: 'Quest Completion', base: '100-500', bonus: 'Based on difficulty', icon: Award },
              { activity: 'Daily Login', base: '10', bonus: '+5 per streak day', icon: Gift },
              { activity: 'Level Up Bonus', base: 'Level × 50', bonus: 'Scales with level', icon: TrendingUp },
              { activity: 'Achievement Unlock', base: 'Varies', bonus: 'Rarity-based', icon: Award },
            ].map((earn, i) => (
              <motion.div
                key={earn.activity}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="p-6 bg-white/5 border border-white/10 hover:border-yellow-500/30 transition-colors"
              >
                <earn.icon className="w-8 h-8 text-yellow-500 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">{earn.activity}</h3>
                <div className="flex justify-between items-baseline">
                  <span className="text-yellow-400 font-black text-xl">{earn.base} pts</span>
                  <span className="text-gray-500 text-sm">{earn.bonus}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Points Formula */}
      <section className="py-20 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-8">Points Calculation</h2>
          
          <div className="p-6 bg-black/50 border border-[#00eeff]/30 rounded-lg font-mono">
            <p className="text-gray-500 text-sm mb-4">// Total Points Formula</p>
            <p className="text-[#00eeff] text-lg leading-relaxed">
              Total Points = (Reps × 10) + (Form Score × 0.5) + (Streak Days × 20) + (Avg HR / 100 × 30) + Completion Bonus
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {[
              { component: 'Rep Points', formula: 'Reps × 10', example: '50 reps = 500 pts' },
              { component: 'Form Bonus', formula: 'Score × 0.5', example: '90% form = 45 pts' },
              { component: 'Streak Bonus', formula: 'Days × 20', example: '7 days = 140 pts' },
              { component: 'Intensity', formula: 'HR/100 × 30', example: '150 bpm = 45 pts' },
            ].map((calc) => (
              <div key={calc.component} className="p-4 bg-white/5 border border-white/10">
                <p className="text-white font-bold mb-2">{calc.component}</p>
                <p className="text-[#00eeff] font-mono text-sm mb-1">{calc.formula}</p>
                <p className="text-gray-500 text-xs">{calc.example}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievement NFTs */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-4">Achievement NFTs</h2>
          <p className="text-gray-400 mb-12">Unique ERC-721 badges for special milestones. Tradeable on NFT marketplaces.</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { rarity: 'Common', color: 'border-gray-500 bg-gray-500/10', examples: ['First Workout', 'First 100 Reps', '3-Day Streak'] },
              { rarity: 'Rare', color: 'border-blue-500 bg-blue-500/10', examples: ['7-Day Streak', '1000 Reps', 'Perfect Form (10x)'] },
              { rarity: 'Epic', color: 'border-purple-500 bg-purple-500/10', examples: ['30-Day Streak', 'Level 25', 'A-Rank Hunter'] },
              { rarity: 'Legendary', color: 'border-yellow-500 bg-yellow-500/10', examples: ['100-Day Streak', 'S-Rank Hunter', '10K Reps'] },
            ].map((tier, i) => (
              <motion.div
                key={tier.rarity}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className={`p-6 border ${tier.color}`}
              >
                <h3 className="text-xl font-bold text-white mb-4">{tier.rarity}</h3>
                <ul className="space-y-2">
                  {tier.examples.map((ex) => (
                    <li key={ex} className="flex items-center gap-2 text-gray-400 text-sm">
                      <Award className="w-4 h-4" />
                      {ex}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Wallet Integration */}
      <section className="py-20 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-4">Wallet Integration</h2>
          <p className="text-gray-400 mb-12">Connect your crypto wallet to claim tokens and manage rewards.</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Supported Wallets</h3>
              <div className="space-y-4">
                {[
                  { name: 'MetaMask', status: 'Primary', desc: 'Browser extension wallet' },
                  { name: 'WalletConnect', status: 'Supported', desc: 'Mobile wallet connection' },
                  { name: 'Trust Wallet', status: 'Supported', desc: 'Mobile crypto wallet' },
                  { name: 'Coinbase Wallet', status: 'Supported', desc: 'Coinbase integration' },
                ].map((wallet) => (
                  <div key={wallet.name} className="flex items-center justify-between p-4 bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3">
                      <Wallet className="w-6 h-6 text-[#00eeff]" />
                      <div>
                        <p className="text-white font-medium">{wallet.name}</p>
                        <p className="text-gray-500 text-xs">{wallet.desc}</p>
                      </div>
                    </div>
                    <span className="text-[#00eeff] text-sm">{wallet.status}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Token Actions</h3>
              <div className="space-y-4">
                {[
                  { action: 'Convert Points', desc: 'Exchange earned points for AERO tokens' },
                  { action: 'Transfer Tokens', desc: 'Send AERO to friends and family' },
                  { action: 'View Balance', desc: 'Check your token and NFT holdings' },
                  { action: 'Trade on DEX', desc: 'Exchange on Uniswap/QuickSwap' },
                ].map((act) => (
                  <div key={act.action} className="p-4 bg-white/5 border border-white/10">
                    <p className="text-white font-medium mb-1">{act.action}</p>
                    <p className="text-gray-500 text-sm">{act.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-8">System Architecture</h2>
          
          <div className="p-6 bg-white/5 border border-white/10 overflow-x-auto">
            <div className="flex items-center justify-between min-w-[600px] gap-4">
              {[
                { label: 'Watch', icon: '⌚', desc: 'Track workout' },
                { label: 'App', icon: '📱', desc: 'Calculate points' },
                { label: 'Backend', icon: '🖥️', desc: 'Store & verify' },
                { label: 'Smart Contract', icon: '📜', desc: 'Mint tokens' },
                { label: 'Wallet', icon: '👛', desc: 'Receive AERO' },
              ].map((step, i) => (
                <div key={step.label} className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#00eeff]/10 border border-[#00eeff]/30 rounded-lg flex items-center justify-center mb-2">
                      <span className="text-2xl">{step.icon}</span>
                    </div>
                    <p className="text-white font-bold text-sm">{step.label}</p>
                    <p className="text-gray-500 text-xs">{step.desc}</p>
                  </div>
                  {i < 4 && (
                    <div className="flex items-center gap-1 text-[#00eeff]">
                      <div className="w-8 h-px bg-[#00eeff]" />
                      <span>→</span>
                      <div className="w-8 h-px bg-[#00eeff]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Status */}
      <section className="py-12 px-6 bg-yellow-500/10 border-y border-yellow-500/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Clock className="w-8 h-8 text-yellow-500" />
            <div>
              <p className="text-white font-bold">Coming Soon</p>
              <p className="text-gray-400 text-sm">Web3 rewards system is planned for future release</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <LinkIcon className="w-4 h-4" />
            <span>Testnet deployment in progress</span>
          </div>
        </div>
      </section>
    </div>
  );
}
