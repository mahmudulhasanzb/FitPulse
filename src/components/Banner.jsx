"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Flame, ArrowRight, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import NumberTicker from './NumberTicker';
import Link from 'next/link';

// FlipWords component - splits words into letters and animates them with exit effects
export const FlipWords = ({
  words,
  duration = 3000,
  className
}) => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = useCallback(() => {
    const word = words[words.indexOf(currentWord) + 1] || words[0];
    setCurrentWord(word);
    setIsAnimating(true);
  }, [currentWord, words]);

  useEffect(() => {
    if (!isAnimating) {
      const timer = setTimeout(() => {
        startAnimation();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isAnimating, duration, startAnimation]);

  return (
    <AnimatePresence 
      onExitComplete={() => {
        setIsAnimating(false);
      }}
    >
      <motion.div 
        initial={{
          opacity: 0,
          y: 10
        }} 
        animate={{
          opacity: 1,
          y: 0
        }} 
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.8
        }} 
        exit={{
          opacity: 0,
          y: -40,
          x: 40,
          filter: "blur(8px)",
          scale: 2,
          position: "absolute",
          transition: {
            type: "spring",
            stiffness: 200,
            damping: 20,
            duration: 0.4
          }
        }} 
        className={"z-10 inline-block relative text-left px-0 " + (className || "")} 
        key={currentWord}
      >
        {currentWord.split(" ").map((word, wordIndex) => (
          <motion.span 
            key={word + wordIndex} 
            initial={{
              opacity: 0,
              y: 10,
              filter: "blur(8px)"
            }} 
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)"
            }} 
            transition={{
              delay: wordIndex * 0.3,
              duration: 0.4,
              type: "spring",
              stiffness: 120,
              damping: 12
            }} 
            className="inline-block whitespace-nowrap"
          >
            {word.split("").map((letter, letterIndex) => (
              <motion.span 
                key={word + letterIndex} 
                initial={{
                  opacity: 0,
                  y: 10,
                  filter: "blur(8px)"
                }} 
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)"
                }} 
                transition={{
                  delay: wordIndex * 0.3 + letterIndex * 0.05,
                  duration: 0.3,
                  type: "spring",
                  stiffness: 140,
                  damping: 14,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }} 
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
            <span className="inline-block">&nbsp;</span>
          </motion.span>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

const Banner = () => {
  // Stagger animation container for content elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  // Standard slide up transition for items
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 14,
      },
    },
  };

  // Diagonal ambient line animation
  const line1Variants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: '140%',
      opacity: 0.2,
      transition: { duration: 1.5, ease: 'easeOut', delay: 0.4 },
    },
  };

  const line2Variants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: '140%',
      opacity: 0.4,
      transition: { duration: 1.8, ease: 'easeOut', delay: 0.6 },
    },
  };

  return (
    <section className="relative min-h-[90vh] md:min-h-screen bg-bg-dark flex items-center overflow-hidden px-6 md:px-16 py-20 z-10">
      {/* Background elements */}
      <div className="absolute inset-0 bg-glow-radial pointer-events-none z-0" />
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none z-0 opacity-60" />

      {/* Ambient visual decorations */}
      <motion.div 
        variants={line1Variants}
        initial="hidden"
        animate="visible"
        className="absolute right-[20%] top-[-20%] w-[1px] bg-gradient-to-b from-transparent via-primary to-transparent rotate-[35deg] pointer-events-none z-0 hidden md:block" 
      />
      <motion.div 
        variants={line2Variants}
        initial="hidden"
        animate="visible"
        className="absolute right-[25%] top-[-20%] w-[2px] bg-gradient-to-b from-transparent via-primary to-transparent rotate-[35deg] pointer-events-none z-0 hidden md:block" 
      />

      {/* Giant vertical outline text */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 0.1, x: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.8 }}
        className="absolute right-[5%] top-[15%] text-[14vw] font-black uppercase text-transparent select-none pointer-events-none leading-none hidden md:block font-sans"
        style={{
          WebkitTextStroke: '2px var(--primary)',
          writingMode: 'vertical-rl',
        }}
      >
        PULSE
      </motion.div>

      {/* Bottom transition gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-dark to-transparent pointer-events-none z-0" />

      {/* Content container */}
      <div className="relative w-full max-w-7xl mx-auto z-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        
        {/* Left Side Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="md:col-span-8 lg:col-span-7 flex flex-col items-start"
        >
          {/* Badge */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full mb-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-primary/30"
          >
            <Flame className="w-3.5 h-3.5 text-primary fill-primary/20 animate-pulse" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-light">
              ELITE PERFORMANCE
            </span>
          </motion.div>

          {/* Title with FlipWords text animation */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[0.9] mb-6 uppercase flex flex-col items-start"
          >
            <span className="block text-white mb-2">UNLEASH YOUR</span>
            <span className="block text-primary relative min-h-[1.1em] overflow-visible">
              <FlipWords 
                words={[
                  "INNER ATHLETE", 
                  "LIMITLESS POWER", 
                  "TRUE POTENTIAL", 
                  "ULTIMATE STRENGTH", 
                  "FITPULSE BEAST"
                ]} 
                className="text-primary"
                duration={3000}
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="text-sm sm:text-base md:text-lg text-neutral-light/80 max-w-lg mb-8 leading-relaxed"
          >
            Join the world's most advanced fitness community. Track every rep,
            crush every goal, and train with elite coaches.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-4 mb-12 w-full sm:w-auto"
          >
            <motion.button 
              whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(212,255,0,0.5)' }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-black hover:text-black font-extrabold uppercase tracking-wider rounded-full transition-all duration-300 transform cursor-pointer text-sm"
            >
              <Link href='/classes'>Get Started</Link>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.03, borderColor: '#D4FF00', backgroundColor: 'rgba(212,255,0,0.05)' }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent border-2 border-primary/20 text-white font-extrabold uppercase tracking-wider rounded-full transition-all duration-300 transform cursor-pointer text-sm"
            >
              <Link href={'/forum-posts'}>View Communinty Post</Link>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            variants={itemVariants}
            className="flex gap-10 sm:gap-16 border-t border-white/15 pt-8 w-full max-w-md"
          >
            <div className="transition-transform duration-300 hover:translate-x-1">
              <div className="text-3xl md:text-4xl font-black text-white tracking-tight flex items-baseline gap-1">
                <NumberTicker value={2.4} decimalPlaces={1} suffix="M" />
                <span className="text-primary text-xl md:text-2xl">+</span>
              </div>
              <div className="text-[10px] md:text-xs font-semibold text-neutral-light uppercase tracking-widest mt-1">
                Active Athletes
              </div>
            </div>
            <div className="transition-transform duration-300 hover:translate-x-1">
              <div className="text-3xl md:text-4xl font-black text-white tracking-tight flex items-baseline gap-0.5">
                <NumberTicker value={98} />
                <span className="text-primary text-xl md:text-2xl">%</span>
              </div>
              <div className="text-[10px] md:text-xs font-semibold text-neutral-light uppercase tracking-widest mt-1">
                Goal Achievement
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Decorative Right Column */}
        <div className="hidden md:col-span-4 lg:col-span-5 relative h-full min-h-[400px] flex items-center justify-center">
          {/* Floating energetic badge/widget */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: [0, -12, 0] 
            }}
            transition={{
              opacity: { duration: 0.8, delay: 0.9 },
              scale: { duration: 0.8, delay: 0.9 },
              y: {
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1.7
              }
            }}
            whileHover={{ scale: 1.04, borderColor: 'rgba(212, 255, 0, 0.4)' }}
            className="absolute p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-2xl transition-colors duration-300 max-w-xs group cursor-default"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                <Activity className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Live Training
                </h4>
                <p className="text-[10px] text-neutral-light">
                  542 Active Users Now
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full w-3/4 animate-pulse" />
              </div>
              <p className="text-xs text-neutral-light/70 leading-normal">
                Elevate your performance. Join high-intensity live sessions led
                by master trainers.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
