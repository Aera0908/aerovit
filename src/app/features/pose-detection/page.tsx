'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, CheckCircle, Activity, Eye, Cpu, ArrowLeft, Brain, Layers, Zap } from 'lucide-react';
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

          {/* BlazePose Demo Media */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-12"
          >
            <BlazePoseDemo />
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

      {/* Technical Details — BlazePose Deep Dive */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-4">Technical Implementation</h2>
          <p className="text-gray-400 mb-12 max-w-3xl">
            A deep look at the ML model, inference pipeline, and signal processing that power Aerovit&apos;s real-time exercise tracking.
          </p>

          {/* BlazePose Architecture */}
          <div className="p-8 bg-white/5 border border-white/10 rounded-lg mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="w-8 h-8 text-[#00eeff]" />
              <h3 className="text-2xl font-bold text-white">MediaPipe BlazePose</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  BlazePose is a lightweight, on-device pose estimation model developed by Google Research.
                  It uses a two-step detector-tracker architecture: a fast <span className="text-[#00eeff]">person detector</span> localises
                  the body in the first frame, then a <span className="text-[#00eeff]">landmark regression network</span> tracks
                  33 keypoints across subsequent frames without re-running detection — keeping latency under 16 ms on modern mobile GPUs.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  The model outputs <span className="text-[#00eeff]">3D coordinates (x, y, z)</span> plus a per-landmark
                  visibility score, enabling depth-aware angle calculations even from a single monocular camera.
                  BlazePose Heavy (the variant Aerovit uses) maximises landmark accuracy at the cost of slightly
                  higher compute, which is an acceptable trade-off on modern phones.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Because inference runs entirely on-device via GPU delegates (TFLite on Android, CoreML on iOS),
                  no camera frames ever leave the user&apos;s phone — ensuring full privacy and zero-latency operation
                  regardless of network conditions.
                </p>
              </div>
              <div className="space-y-5">
                <h4 className="text-sm font-mono text-[#00eeff]/70 uppercase tracking-wider">Model Specifications</h4>
                <ul className="space-y-3">
                  {[
                    { label: '33 body landmarks per frame', detail: 'Full-body skeleton including face, hands, and feet' },
                    { label: '3D coordinates (x, y, z) + visibility', detail: 'Depth estimation from monocular camera input' },
                    { label: 'Two-step detector → tracker pipeline', detail: 'Detect once, track continuously for speed' },
                    { label: 'BlazePose Heavy variant', detail: 'Higher accuracy model optimised for fitness use' },
                    { label: 'On-device GPU-accelerated inference', detail: 'TFLite GPU delegate / CoreML — no cloud needed' },
                    { label: 'Front & back camera support', detail: 'Automatic coordinate mirroring for selfie mode' },
                  ].map((item) => (
                    <li key={item.label} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-gray-200 text-sm font-medium">{item.label}</p>
                        <p className="text-gray-500 text-xs">{item.detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Processing Pipeline + Signal Processing */}
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Layers className="w-6 h-6 text-[#00eeff]" />
                <h3 className="text-xl font-bold text-[#00eeff]">Processing Pipeline</h3>
              </div>
              <div className="space-y-4">
                {[
                  { step: '1', title: 'Frame Capture', desc: 'Camera streams NV21/BGRA frames at 30 FPS via CameraX / AVFoundation' },
                  { step: '2', title: 'Pose Estimation', desc: 'BlazePose Heavy extracts 33 landmarks with 3D coordinates per frame' },
                  { step: '3', title: 'EMA Smoothing', desc: 'Exponential moving average (α = 0.45) stabilises landmark positions across frames' },
                  { step: '4', title: 'Angle Calculation', desc: 'Joint angles computed via 3-point inverse tangent on key landmark triplets' },
                  { step: '5', title: 'State Machine', desc: 'Finite state machine detects exercise phases (up ↔ down) and increments reps' },
                  { step: '6', title: 'UI Feedback', desc: 'Skeleton overlay, colour-coded angles, audio cues, and rep counter update' },
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

            <div>
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-6 h-6 text-[#00eeff]" />
                <h3 className="text-xl font-bold text-[#00eeff]">Signal Processing</h3>
              </div>
              <div className="space-y-6">
                <div className="p-5 bg-white/5 border border-white/10 rounded">
                  <h4 className="text-white font-semibold mb-2">EMA Landmark Smoother</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Raw ML Kit landmarks jitter frame-to-frame. We apply an exponential moving average
                    (α&nbsp;=&nbsp;0.45) independently to each landmark&apos;s x and y coordinates, producing
                    a visually smooth skeleton while keeping responsiveness high enough for fast exercises.
                  </p>
                </div>
                <div className="p-5 bg-white/5 border border-white/10 rounded">
                  <h4 className="text-white font-semibold mb-2">Frame Throttling</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    The camera streams at 30 FPS, but running BlazePose Heavy on every frame is unnecessary.
                    A frame throttle limits inference to ~15 FPS, halving GPU load with no perceptible
                    difference in tracking quality — extending battery life during long workout sessions.
                  </p>
                </div>
                <div className="p-5 bg-white/5 border border-white/10 rounded">
                  <h4 className="text-white font-semibold mb-2">BoxFit.cover Coordinate Mapping</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    ML Kit returns landmarks in the raw camera sensor coordinate space. We compute the
                    correct scale factor and crop offset for the BoxFit.cover display mode, accounting
                    for sensor rotation and front-camera mirroring, so the skeleton aligns pixel-perfectly
                    with the user&apos;s body on screen.
                  </p>
                </div>
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

/* ── BlazePose Demo Media ─────────────────────────────── */
function BlazePoseDemo() {
  const [err, setErr] = useState(false);
  const src = 'https://1.bp.blogspot.com/-Q64KtZLWOT8/XzVxdkZDMgI/AAAAAAAAGYk/qj7mLsOL3AMcDkusMgYDGrSqauRAljR9gCLcBGAsYHQ/s924/image8.gif';
  return (
    <div className="rounded-lg overflow-hidden bg-black border border-[#00eeff]/20 inline-block max-w-full">
      {!err ? (
        <img
          src={src}
          alt="BlazePose real-time exercise tracking — squats and push-ups demo"
          className="block max-w-full h-auto"
          onError={() => setErr(true)}
        />
      ) : (
        <div className="w-80 h-48 flex items-center justify-center bg-gradient-to-b from-[#00eeff]/10 to-transparent">
          <span className="text-[#00eeff]/40 text-xs uppercase tracking-wider">BlazePose Demo</span>
        </div>
      )}
      <p className="px-4 py-2 text-[10px] text-gray-500">
        Source: <a href="https://research.google/blog/on-device-real-time-body-pose-tracking-with-mediapipe-blazepose/" target="_blank" rel="noopener noreferrer" className="text-[#00eeff]/50 hover:text-[#00eeff] transition-colors">Google Research — BlazePose</a>
      </p>
    </div>
  );
}
