export const FEATURES = {
  ai: {
    title: "Adaptive Coaching",
    subtitle: "Reinforcement Learning",
    description: "Our RL model adjusts coaching based on your workout state, providing personalized encouragement and workout modifications.",
    stats: [
      { label: "Coaching Actions", value: "6", detail: "Different coaching responses" },
      { label: "State Analysis", value: "18D", detail: "Combines engagement and biometric data" },
      { label: "Training Samples", value: "749", detail: "Balanced RL training samples" },
    ],
    intervention: {
      type: "ADAPTIVE COACHING",
      message: "Adjusting workout intensity based on your current state."
    }
  },
  vision: {
    title: "33 Landmark Tracking",
    subtitle: "Vision Synchronization",
    exercises: 22,
    features: [
      "Automatic Rep Counting",
      "Real-Time Form Validation", 
      "Color-Coded Angle Display",
      "One Euro Filter for smooth tracking"
    ]
  },
  hardware: [
    { label: "Processor", value: "ESP32-S3 Dual-Core", desc: "240 MHz edge computing" },
    { label: "Biometrics", value: "MAX30102", desc: "HR and SpO2 precision sensing" },
    { label: "Motion", value: "QMI8658 6-Axis", desc: "Sub-ms IMU data streaming" },
    { label: "Display", value: "1.69\" LCD", desc: "240x280 High-Density UI" },
  ],
  gamification: {
    ranks: [
      { level: "1-5", rank: "E-Rank", status: "Awakened", color: "text-blue-400" },
      { level: "6-10", rank: "D-Rank", status: "Rising", color: "text-blue-400" },
      { level: "11-15", rank: "C-Rank", status: "Intermediate", color: "text-purple-400" },
      { level: "16-20", rank: "B-Rank", status: "Advanced", color: "text-purple-400" },
      { level: "21-25", rank: "A-Rank", status: "Elite", color: "text-yellow-400" },
      { level: "26-50", rank: "S-Rank", status: "Master", color: "text-yellow-400" },
      { level: "51+", rank: "National", status: "Legend", color: "text-white" },
    ],
    xpSources: [
      { source: "Base Workout", xp: "50 XP" },
      { source: "Per Rep", xp: "2 XP" },
      { source: "Form Accuracy Bonus", xp: "Up to 100 XP" },
      { source: "Streak Multiplier", xp: "Consecutive days" },
    ]
  },
  web3: {
    token: "AERO (ERC-20)",
    network: "Sepolia Testnet",
    status: "PLANNED",
    earnings: [
      { activity: "Complete Workout", base: 50, bonus: "+10 per perfect form" },
      { activity: "Quest Completion", base: "100-500", bonus: "Based on difficulty" },
      { activity: "Daily Login", base: 10, bonus: "+5 per streak day" },
      { activity: "Level Up", base: "Level × 50", bonus: "—" },
    ],
    nftRarities: ["Common", "Rare", "Epic", "Legendary"]
  },
  differentiators: [
    { icon: "Trophy", text: "First fitness watch with Web3 rewards" },
    { icon: "Crosshair", text: "Motion-based form coaching (IMU + Vision)" },
    { icon: "Activity", text: "Multi-modal biometric fusion (6+ sensors)" },
    { icon: "Link", text: "Decentralized fitness tracking (blockchain)" },
    { icon: "Sword", text: "Solo Leveling-style progression" },
    { icon: "BrainCircuit", text: "Adaptive RL coaching that learns from you" },
  ]
};

export const NAV_LINKS = [
  { href: "/features/pose-detection", label: "Pose Detection" },
  { href: "/features/progression", label: "Progression" },
  { href: "/features/hardware", label: "Hardware" },
  { href: "/features/rewards", label: "Rewards" },
];
