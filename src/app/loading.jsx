'use client';

import React from 'react';
import { Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="min-h-[85vh] bg-bg-dark flex flex-col items-center justify-center text-center px-6 relative overflow-hidden z-10">
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-glow-radial pointer-events-none z-0" />
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none z-0 opacity-40" />

      {/* Loading Widget */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Pulse Animation Ring */}
        <div className="relative w-20 h-20 flex items-center justify-center mb-6">
          {/* Beating outer halo */}
          <motion.div
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 border-2 border-primary rounded-full"
          />
          {/* Second offset beating halo */}
          <motion.div
            animate={{
              scale: [1, 1.6, 1],
              opacity: [0.2, 0, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
            className="absolute inset-0 border border-primary rounded-full"
          />

          {/* Centered pulse icon */}
          <motion.div
            animate={{ scale: [0.95, 1.1, 0.95] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary"
          >
            <Activity className="w-6 h-6 animate-pulse" />
          </motion.div>
        </div>

        {/* Text indicators */}
        <motion.span
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-xs md:text-sm font-black uppercase tracking-[0.25em] text-primary select-none"
        >
          Calibrating Performance...
        </motion.span>
      </div>
    </div>
  );
}
