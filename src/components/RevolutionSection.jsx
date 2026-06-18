"use client";

import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import NumberTicker from './NumberTicker';

const RevolutionSection = () => {
  // Stagger animation container
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -35 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 75,
        damping: 14,
      },
    },
  };

  return (
    <section className="relative bg-bg-dark border-t border-white/5 px-6 md:px-16 py-24 overflow-hidden z-10">
      
      {/* Detailed Dumbbell & Heavy Chains Watermark */}
      <div className="absolute right-[-8%] top-[5%] w-[500px] h-[500px] opacity-[0.04] text-primary pointer-events-none select-none z-0 hidden lg:block">
        <svg viewBox="0 0 400 400" fill="none" stroke="currentColor" className="w-full h-full rotate-[30deg]">
          {/* Detailed Dumbbell */}
          {/* Barbell handle */}
          <rect x="100" y="190" width="200" height="20" rx="4" fill="currentColor" />
          {/* Handle grip texture lines */}
          <line x1="130" y1="193" x2="130" y2="207" stroke="currentColor" strokeWidth="2" />
          <line x1="150" y1="193" x2="150" y2="207" stroke="currentColor" strokeWidth="2" />
          <line x1="170" y1="193" x2="170" y2="207" stroke="currentColor" strokeWidth="2" />
          <line x1="190" y1="193" x2="190" y2="207" stroke="currentColor" strokeWidth="2" />
          <line x1="210" y1="193" x2="210" y2="207" stroke="currentColor" strokeWidth="2" />
          <line x1="230" y1="193" x2="230" y2="207" stroke="currentColor" strokeWidth="2" />
          <line x1="250" y1="193" x2="250" y2="207" stroke="currentColor" strokeWidth="2" />
          <line x1="270" y1="193" x2="270" y2="207" stroke="currentColor" strokeWidth="2" />
          
          {/* Left Weight Plates */}
          <rect x="75" y="110" width="25" height="180" rx="8" stroke="currentColor" strokeWidth="4" />
          <rect x="50" y="125" width="25" height="150" rx="6" stroke="currentColor" strokeWidth="4" />
          <rect x="25" y="145" width="25" height="110" rx="4" stroke="currentColor" strokeWidth="4" />
          <circle cx="12" cy="200" r="10" stroke="currentColor" strokeWidth="3" />

          {/* Right Weight Plates */}
          <rect x="300" y="110" width="25" height="180" rx="8" stroke="currentColor" strokeWidth="4" />
          <rect x="325" y="125" width="25" height="150" rx="6" stroke="currentColor" strokeWidth="4" />
          <rect x="350" y="145" width="25" height="110" rx="4" stroke="currentColor" strokeWidth="4" />
          <circle cx="388" cy="200" r="10" stroke="currentColor" strokeWidth="3" />

          {/* Heavy Chain Links crossing behind */}
          <g opacity="0.6">
            {/* Chain Link 1 */}
            <rect x="60" y="40" width="60" height="30" rx="15" stroke="currentColor" strokeWidth="5" transform="rotate(-15 60 40)" />
            {/* Chain Link 2 (interlocked) */}
            <rect x="105" y="30" width="60" height="30" rx="15" stroke="currentColor" strokeWidth="5" transform="rotate(10 105 30)" />
            {/* Chain Link 3 */}
            <rect x="155" y="45" width="60" height="30" rx="15" stroke="currentColor" strokeWidth="5" transform="rotate(-5 155 45)" />
            {/* Chain Link 4 */}
            <rect x="205" y="40" width="60" height="30" rx="15" stroke="currentColor" strokeWidth="5" transform="rotate(15 205 40)" />
            {/* Chain Link 5 */}
            <rect x="255" y="55" width="60" height="30" rx="15" stroke="currentColor" strokeWidth="5" transform="rotate(-10 255 55)" />
          </g>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* Left Side Content Column */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="lg:col-span-6 flex flex-col items-start"
        >
          {/* Heading */}
          <motion.h2 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-black italic tracking-tight leading-[0.95] text-white uppercase mb-6"
          >
            Not Just A<br />Gym.<br /><span className="text-primary">A Revolution.</span>
          </motion.h2>

          {/* Description Paragraph */}
          <motion.p 
            variants={itemVariants}
            className="text-sm sm:text-base text-neutral-light/85 max-w-lg mb-10 leading-relaxed font-semibold"
          >
            We believe fitness should be accessible, data-driven, and community-focused. Our platform connects you with the best minds in the industry to ensure every drop of sweat counts.
          </motion.p>

          {/* Metrics */}
          <motion.div 
            variants={itemVariants}
            className="flex gap-16 border-t border-white/10 pt-8 w-full max-w-md"
          >
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
                <NumberTicker value={500} />
                <span className="text-primary">+</span>
              </div>
              <div className="text-[10px] md:text-xs font-bold text-neutral-light/60 uppercase tracking-widest mt-1">Active Classes</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
                <NumberTicker value={12} suffix="k" />
              </div>
              <div className="text-[10px] md:text-xs font-bold text-neutral-light/60 uppercase tracking-widest mt-1">Members</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side Visual Image Column */}
        <div className="lg:col-span-6 relative w-full flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[500px]">
            
            {/* Image Wrapper */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, x: 40 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ type: 'spring', stiffness: 60, damping: 14 }}
              className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl z-10 bg-neutral-dark/10"
            >
              <Image 
                src="/gym_treadmills.png" 
                alt="Gym Treadmills Revolution" 
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover"
              />
            </motion.div>

            {/* Testimonial Floating Widget */}
            <motion.div 
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ type: 'spring', stiffness: 85, damping: 15, delay: 0.35 }}
              className="absolute -bottom-6 -left-4 md:-left-8 p-6 bg-black border border-white/10 rounded-2xl max-w-[280px] shadow-2xl z-20"
            >
              <Star className="w-5 h-5 text-primary fill-primary mb-3" />
              <p className="text-white text-xs sm:text-sm font-bold italic leading-relaxed mb-3">
                "The best fitness platform I've ever used. The community is unmatched."
              </p>
              <span className="block text-neutral-400 text-[10px] sm:text-xs font-semibold">
                — James Wilson, Pro Athlete
              </span>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default RevolutionSection;
