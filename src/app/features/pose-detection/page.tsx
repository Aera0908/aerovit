'use client';

import { motion } from 'framer-motion';
import { Camera, CheckCircle, Activity, Eye, Cpu, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '@/components/layout';

export default function PoseDetectionPage() {
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
              <div className="w-16 h-16 bg-[#00eeff]/10 border border-[#00eeff]/30 rounded-lg flex items-center justify-center">
                <Camera className="w-8 h-8 text-[#00eeff]" />
              </div>
              <div>
                <p className="text-[#00eeff] text-sm font-mono uppercase tracking-wider">AI Vision System</p>
                <h1 className="text-4xl md:text-5xl font-black text-white">Pose Detection</h1>
              </div>
            </div>
            <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
              Real-time skeletal tracking powered by MediaPipe BlazePose. Track 33 body landmarks, 
              validate exercise form, and count reps automatically with sub-frame precision.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6 bg-white/[0.02] border-y border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '33', label: 'Body Landmarks', desc: 'Full skeletal tracking' },
              { value: '22+', label: 'Exercises', desc: 'Supported movements' },
              { value: '30+', label: 'FPS', desc: 'Real-time processing' },
              { value: '<16ms', label: 'Latency', desc: 'Frame processing time' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-black text-[#00eeff]">{stat.value}</p>
                <p className="text-white font-bold mt-2">{stat.label}</p>
                <p className="text-gray-500 text-sm">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-12">Core Capabilities</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Eye,
                title: 'Automatic Rep Counting',
                description: 'State machine-based rep detection that identifies exercise phases (up/down, contracted/extended) and counts reps with high accuracy.',
                features: ['Phase detection algorithm', 'Noise filtering', 'Multi-exercise support'],
              },
              {
                icon: CheckCircle,
                title: 'Real-Time Form Validation',
                description: 'Continuous analysis of joint angles and body positioning to ensure proper exercise form and prevent injury.',
                features: ['Angle threshold checking', 'Posture analysis', 'Instant feedback'],
              },
              {
                icon: Activity,
                title: 'Color-Coded Angle Display',
                description: 'Visual feedback system that shows joint angles in real-time with color coding (green/yellow/red) for form quality.',
                features: ['Dynamic color mapping', 'Target angle ranges', 'Visual overlays'],
              },
              {
                icon: Cpu,
                title: 'One Euro Filter Smoothing',
                description: 'Advanced signal processing to eliminate jitter while maintaining responsiveness for smooth landmark tracking.',
                features: ['Adaptive filtering', 'Low latency', 'High precision'],
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="p-6 bg-white/5 border border-white/10 hover:border-[#00eeff]/30 transition-colors"
              >
                <feature.icon className="w-10 h-10 text-[#00eeff] mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="w-1.5 h-1.5 bg-[#00eeff] rounded-full" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Exercises */}
      <section className="py-20 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-4">Supported Exercises</h2>
          <p className="text-gray-400 mb-12 max-w-2xl">
            Our pose detection system supports a wide range of exercises across different muscle groups and movement patterns.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[
              'Push-ups', 'Squats', 'Lunges', 'Planks', 'Burpees',
              'Jumping Jacks', 'Mountain Climbers', 'Deadlifts', 'Bicep Curls', 'Shoulder Press',
              'Tricep Dips', 'Leg Raises', 'Crunches', 'Russian Twists', 'High Knees',
              'Box Jumps', 'Pull-ups', 'Rows', 'Lateral Raises', 'Calf Raises',
              'Hip Thrusts', 'Glute Bridges',
            ].map((exercise, i) => (
              <motion.div
                key={exercise}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
                className="p-4 bg-white/5 border border-white/10 text-center hover:border-[#00eeff]/30 transition-colors"
              >
                <span className="text-sm text-gray-300">{exercise}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-12">Technical Implementation</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-[#00eeff] mb-4">MediaPipe BlazePose</h3>
              <p className="text-gray-400 mb-6">
                We use Google&apos;s MediaPipe BlazePose model for real-time pose estimation. 
                The model runs on-device for privacy and low latency.
              </p>
              <ul className="space-y-3">
                {[
                  '33 body landmarks per frame',
                  '3D coordinates (x, y, z) + visibility',
                  'Works with front and back camera',
                  'Optimized for mobile devices',
                  'No cloud processing required',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-[#00eeff] mb-4">Processing Pipeline</h3>
              <div className="space-y-4">
                {[
                  { step: '1', title: 'Frame Capture', desc: 'Camera captures video at 30+ FPS' },
                  { step: '2', title: 'Pose Estimation', desc: 'BlazePose extracts 33 landmarks' },
                  { step: '3', title: 'Filtering', desc: 'One Euro Filter smooths coordinates' },
                  { step: '4', title: 'Angle Calculation', desc: 'Joint angles computed in real-time' },
                  { step: '5', title: 'State Machine', desc: 'Rep counting and form validation' },
                  { step: '6', title: 'UI Feedback', desc: 'Visual overlays and audio cues' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-8 h-8 bg-[#00eeff]/20 border border-[#00eeff]/40 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-[#00eeff] font-bold text-sm">{item.step}</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{item.title}</p>
                      <p className="text-gray-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
              <p className="text-gray-400 text-sm">This feature is live and functional in the app</p>
            </div>
          </div>
          <Link 
            href="/"
            className="px-6 py-3 bg-[#00eeff] text-black font-bold uppercase tracking-wider hover:bg-[#00eeff]/80 transition-colors"
          >
            Explore Demo
          </Link>
        </div>
      </section>
    </div>
  );
}
