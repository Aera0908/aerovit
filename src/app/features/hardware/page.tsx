'use client';

import { motion } from 'framer-motion';
import { Cpu, Activity, Gauge, Wifi, Battery, Monitor, Vibrate, ArrowLeft, CheckCircle, Clock, Shield } from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '@/components/layout';

export default function HardwarePage() {
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
                <Cpu className="w-8 h-8 text-[#00eeff]" />
              </div>
              <div>
                <p className="text-[#00eeff] text-sm font-mono uppercase tracking-wider">Custom IoT Device</p>
                <h1 className="text-4xl md:text-5xl font-black text-white">Aerovit Smartwatch</h1>
              </div>
            </div>
            <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
              Purpose-built wearable device based on the ESP32-S3 platform with premium biometric sensors
              for real-time fitness tracking, heart rate monitoring, and seamless app integration.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Specs */}
      <section className="py-20 px-6 bg-white/[0.02] border-y border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-12">Core Specifications</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Cpu, label: 'Processor', value: 'ESP32-S3', desc: 'Dual-Core @ 240 MHz', color: 'text-[#00eeff]' },
              { icon: Activity, label: 'Biometrics', value: 'MAX30102', desc: 'HR + SpO2 Sensor', color: 'text-red-400' },
              { icon: Gauge, label: 'Motion', value: 'QMI8658', desc: '6-Axis IMU', color: 'text-purple-400' },
              { icon: Monitor, label: 'Display', value: '1.69" LCD', desc: '240x280 Touch', color: 'text-green-400' },
            ].map((spec, i) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-white/5 border border-white/10"
              >
                <spec.icon className={`w-10 h-10 ${spec.color} mb-4`} />
                <p className="text-gray-500 text-sm uppercase tracking-wider">{spec.label}</p>
                <p className="text-2xl font-black text-white mt-1">{spec.value}</p>
                <p className="text-gray-400 text-sm mt-1">{spec.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Specs */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-12">Detailed Specifications</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Processing */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-[#00eeff] flex items-center gap-3">
                <Cpu className="w-6 h-6" />
                Processing & Memory
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Chip', value: 'ESP32-S3-WROOM-1-N16R8' },
                  { label: 'CPU', value: 'Xtensa LX7 Dual-Core @ 240 MHz' },
                  { label: 'Flash', value: '16 MB' },
                  { label: 'PSRAM', value: '8 MB' },
                  { label: 'SRAM', value: '512 KB' },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between p-3 bg-white/5 border border-white/10">
                    <span className="text-gray-400">{item.label}</span>
                    <span className="text-white font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Connectivity */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-[#00eeff] flex items-center gap-3">
                <Wifi className="w-6 h-6" />
                Connectivity
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Bluetooth', value: 'BLE 5.0' },
                  { label: 'WiFi', value: '2.4 GHz 802.11 b/g/n' },
                  { label: 'BLE Latency', value: '<100ms' },
                  { label: 'Range', value: 'Up to 10m (BLE)' },
                  { label: 'Data Rate', value: '115200 baud (UART)' },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between p-3 bg-white/5 border border-white/10">
                    <span className="text-gray-400">{item.label}</span>
                    <span className="text-white font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sensors */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-red-400 flex items-center gap-3">
                <Activity className="w-6 h-6" />
                Biometric Sensors
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Heart Rate', value: 'MAX30102 PPG Sensor' },
                  { label: 'SpO2', value: 'Blood Oxygen Saturation' },
                  { label: 'Sampling Rate', value: 'Up to 400 samples/sec' },
                  { label: 'LED Wavelengths', value: 'Red (660nm) + IR (880nm)' },
                  { label: 'Resolution', value: '18-bit ADC' },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between p-3 bg-white/5 border border-white/10">
                    <span className="text-gray-400">{item.label}</span>
                    <span className="text-white font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* IMU */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-purple-400 flex items-center gap-3">
                <Gauge className="w-6 h-6" />
                Motion Tracking
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Sensor', value: 'QMI8658 6-Axis IMU' },
                  { label: 'Accelerometer', value: '±2g to ±16g Range' },
                  { label: 'Gyroscope', value: '±16 to ±2048 dps' },
                  { label: 'Output Rate', value: 'Up to 8000 Hz' },
                  { label: 'Interface', value: 'I2C / SPI' },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between p-3 bg-white/5 border border-white/10">
                    <span className="text-gray-400">{item.label}</span>
                    <span className="text-white font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-4">Unique Features</h2>
          <p className="text-gray-400 mb-12">Software innovations that make the hardware truly unique.</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: 'Hardware Wallet Ledger',
                desc: 'Secure on-device key storage turns your watch into a crypto hardware wallet for signing AERO transactions.',
                status: 'Planned',
                statusColor: 'text-yellow-400 bg-yellow-500/10',
              },
              {
                icon: Gauge,
                title: 'IMU Form Validation',
                desc: 'Compare watch motion patterns to expected exercise movements for real-time form feedback.',
                status: 'In Progress',
                statusColor: 'text-blue-400 bg-blue-500/10',
              },
              {
                icon: Vibrate,
                title: 'Haptic Feedback',
                desc: 'Vibration patterns for rep validation, achievements, and workout cues without looking at screen.',
                status: 'Planned',
                statusColor: 'text-yellow-400 bg-yellow-500/10',
              },
              {
                icon: Activity,
                title: 'Activity Detection',
                desc: 'Automatically detect exercise type from motion patterns - running, cycling, weightlifting.',
                status: 'Planned',
                statusColor: 'text-yellow-400 bg-yellow-500/10',
              },
              {
                icon: Wifi,
                title: 'Direct Web3 Connection',
                desc: 'WiFi connectivity for direct blockchain API calls without requiring phone.',
                status: 'Planned',
                statusColor: 'text-yellow-400 bg-yellow-500/10',
              },
              {
                icon: Battery,
                title: 'OTA Updates',
                desc: 'Over-the-air firmware updates for new features and improvements.',
                status: 'Planned',
                statusColor: 'text-yellow-400 bg-yellow-500/10',
              },
              {
                icon: Monitor,
                title: 'Animated UI',
                desc: 'LVGL-powered animated watch faces and gamified visual feedback.',
                status: 'Implemented',
                statusColor: 'text-green-400 bg-green-500/10',
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="p-6 bg-white/5 border border-white/10"
              >
                <div className="flex items-start justify-between mb-4">
                  <feature.icon className="w-8 h-8 text-[#00eeff]" />
                  <span className={`text-xs px-2 py-1 rounded ${feature.statusColor}`}>
                    {feature.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BLE Protocol */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-4">BLE Data Protocol</h2>
          <p className="text-gray-400 mb-12">Real-time biometric data streaming over Bluetooth Low Energy.</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-white/5 border border-[#00eeff]/30">
              <h3 className="text-xl font-bold text-[#00eeff] mb-6">Data Characteristics</h3>
              <div className="space-y-3 font-mono text-sm">
                {[
                  { char: 'Heart Rate', uuid: '0x2A37', unit: 'BPM' },
                  { char: 'SpO2', uuid: '0x2A5F', unit: '%' },
                  { char: 'Accelerometer', uuid: 'Custom', unit: 'g' },
                  { char: 'Gyroscope', uuid: 'Custom', unit: 'dps' },
                  { char: 'Temperature', uuid: '0x2A6E', unit: '°C' },
                ].map((c) => (
                  <div key={c.char} className="flex justify-between p-2 bg-black/30">
                    <span className="text-gray-400">{c.char}</span>
                    <span className="text-[#00eeff]">{c.uuid} ({c.unit})</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-6 bg-white/5 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">Performance</h3>
              <div className="space-y-4">
                {[
                  { metric: 'Update Rate', value: '10 Hz', desc: 'Biometric data refresh' },
                  { metric: 'Latency', value: '<100ms', desc: 'End-to-end delay' },
                  { metric: 'Connection', value: 'Stable', desc: 'Auto-reconnect enabled' },
                  { metric: 'Power', value: 'Low', desc: 'BLE 5.0 optimized' },
                ].map((p) => (
                  <div key={p.metric} className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">{p.metric}</p>
                      <p className="text-gray-500 text-xs">{p.desc}</p>
                    </div>
                    <span className="text-[#00eeff] font-bold">{p.value}</span>
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
              <p className="text-white font-bold">Hardware Implemented</p>
              <p className="text-gray-400 text-sm">Watch firmware and BLE communication functional</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-400 text-sm">Advanced features in development</span>
          </div>
        </div>
      </section>
    </div>
  );
}
