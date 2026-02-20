'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type NotificationType = 'info' | 'warning' | 'success';

interface SystemNotificationProps {
  message: string;
  delay?: number;
  type?: NotificationType;
  duration?: number;
}

const typeStyles: Record<NotificationType, string> = {
  info: "border-cyan-400 text-cyan-400",
  warning: "border-red-500 text-red-500",
  success: "border-green-400 text-green-400"
};

export function SystemNotification({ 
  message, 
  delay = 0, 
  type = "info",
  duration = 5000 
}: SystemNotificationProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), delay);
    const hideTimer = setTimeout(() => setVisible(false), delay + duration);
    
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [delay, duration]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 50, skewX: -10 }}
          animate={{ opacity: 1, x: 0, skewX: -10 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className={`fixed top-24 right-6 z-50 bg-black/90 border-r-2 ${typeStyles[type]} p-3 backdrop-blur-xl shadow-lg min-w-[240px] border border-white/5`}
        >
          <div className="skew-x-[10deg]">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] mb-0.5 opacity-60">
              System Alert
            </p>
            <p className="text-white text-xs font-medium tracking-wide">{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
