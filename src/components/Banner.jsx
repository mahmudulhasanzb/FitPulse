"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Flame, ArrowRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import NumberTicker from './NumberTicker';
import Link from 'next/link';
import Image from 'next/image';

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
    <section className="relative bg-bg-dark flex items-center overflow-hidden px-6 md:px-16 py-12 md:py-16 lg:py-20 z-10">
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
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-bg-dark to-transparent pointer-events-none z-0" />

      {/* Content container */}
      <div className="relative w-full max-w-7xl mx-auto z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Side Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="order-2 lg:order-1 lg:col-span-7 xl:col-span-6 flex flex-col items-start"
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
                  'INNER ATHLETE',
                  'LIMITLESS POWER',
                  'TRUE POTENTIAL',
                  'ULTIMATE STRENGTH',
                  'FITPULSE BEAST',
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
            Join the world&apos;s most advanced fitness community. Track every
            rep, crush every goal, and train with elite coaches.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 mb-12 w-full sm:w-auto"
          >
            <motion.button
              whileHover={{
                scale: 1.03,
                boxShadow: '0 0 25px rgba(212,255,0,0.5)',
              }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-black hover:text-black font-extrabold uppercase tracking-wider rounded-full transition-all duration-300 transform cursor-pointer text-sm"
            >
              <Link href="/classes">Get Started</Link>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.03,
                borderColor: '#D4FF00',
                backgroundColor: 'rgba(212,255,0,0.05)',
              }}
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

        {/* Athlete Column: On Top for Small/Medium (order-1), On Side for Large (order-2) */}
        <div className="order-1 lg:order-2 lg:col-span-5 xl:col-span-6 flex relative w-full items-center justify-center select-none">
          {/* Neon Radial Spotlight */}
          <div className="absolute w-72 h-72 sm:w-80 sm:h-80 lg:w-[440px] lg:h-[440px] bg-primary/20 rounded-full blur-[110px] pointer-events-none" />

          {/* Futuristic Concentric Rings Behind Athlete (Static) */}
          <div className="absolute w-64 h-64 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px] rounded-full border border-primary/20 pointer-events-none" />
          <div className="absolute w-72 h-72 sm:w-96 sm:h-96 lg:w-[480px] lg:h-[480px] rounded-full border border-dashed border-white/10 pointer-events-none" />

          {/* Athlete Cutout Container with Smooth Bottom Dissolve Mask */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-[320px] sm:h-[400px] md:h-[460px] lg:h-[500px] xl:h-[540px] flex items-end justify-center"
            style={{
              maskImage: 'linear-gradient(to bottom, black 65%, transparent 95%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 65%, transparent 95%)',
            }}
          >
            <Image
              src="https://i.ibb.co.com/k2HhNjkr/shirtless-bodybuilder-holding-dumbbell-shoulder-removebg-preview-1.png"
              alt="FitPulse Elite Athlete"
              fill
              priority
              sizes="(max-width: 1024px) 440px, 580px"
              className="object-contain object-bottom transition-transform duration-700 hover:scale-[1.02]"
            />
          </motion.div>

          {/* Static Top Badge: Verified Trainer Rating */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="absolute top-4 sm:top-8 right-2 sm:right-6 px-3.5 py-2 bg-black/75 border border-white/10 rounded-2xl backdrop-blur-md flex items-center gap-2.5 shadow-2xl"
          >
            <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
              <Star className="w-3.5 h-3.5 fill-primary text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-xs font-black text-white">4.9</span>
                <span className="text-[10px] text-primary font-bold">(1.2k+ Reviews)</span>
              </div>
              <p className="text-[9px] font-bold uppercase tracking-wider text-neutral-light/70 mt-1 leading-none">
                VERIFIED TRAINER
              </p>
            </div>
          </motion.div>

          {/* Static Bottom Badge: High Intensity Calorie Burn */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="absolute bottom-6 sm:bottom-10 left-2 sm:left-4 px-3.5 py-2 bg-black/75 border border-white/10 rounded-2xl backdrop-blur-md shadow-2xl flex items-center gap-2.5"
          >
            <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
              <Flame className="w-3.5 h-3.5 fill-primary text-primary" />
            </div>
            <div>
              <p className="text-[11px] font-black uppercase text-white leading-none">850+ KCAL</p>
              <p className="text-[9px] font-bold uppercase tracking-wider text-neutral-light/70 mt-1 leading-none">
                HIGH INTENSITY BURN
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
