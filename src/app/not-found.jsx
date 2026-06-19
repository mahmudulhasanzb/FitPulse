"use client";

import React from 'react';
import Link from 'next/link';
import { Dumbbell, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] bg-bg-dark flex flex-col items-center justify-center text-center px-6 py-24 relative overflow-hidden z-10">
      
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-glow-radial pointer-events-none z-0" />
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none z-0 opacity-40" />

      {/* Floating decoration barbell watermark */}
      <div className="absolute right-[-10%] bottom-[-10%] w-[350px] h-[350px] opacity-[0.03] text-primary rotate-[15deg] pointer-events-none z-0 select-none">
        <Dumbbell className="w-full h-full" />
      </div>

      {/* Content Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 80, damping: 15 }}
        className="max-w-md w-full relative z-10 flex flex-col items-center"
      >
        
        {/* Animated Dumbbell Icon */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="p-4 bg-white/5 border border-white/10 rounded-2xl text-primary mb-8"
        >
          <Dumbbell className="w-12 h-12" />
        </motion.div>

        {/* 404 Heading */}
        <h1 className="text-8xl font-black text-primary tracking-tight leading-none mb-4 select-none">
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl font-black uppercase text-white tracking-wide mb-4">
          Lost Your Routine?
        </h2>

        {/* Description */}
        <p className="text-sm text-neutral-light/70 mb-10 leading-relaxed">
          The page you are looking for has been moved, deleted, or never existed in our training program. Let's get you back to the gym.
        </p>

        {/* Action Button */}
        <Link href="/" passHref legacyBehavior>
          <motion.a
            whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(212,255,0,0.5)' }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-black font-extrabold uppercase tracking-wider rounded-full transition-all duration-300 transform cursor-pointer text-sm"
          >
            <ArrowLeft className="w-4 h-4 stroke-[3]" />
            <span>Back to Training</span>
          </motion.a>
        </Link>

      </motion.div>

    </div>
  );
}
