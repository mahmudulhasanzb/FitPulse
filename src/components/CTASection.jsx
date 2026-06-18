'use client';

import React from 'react';
import { motion } from 'framer-motion';

// BlurInText helper to animate characters on viewport enter
const BlurInText = ({ text, className = '', style = {}, delayOffset = 0 }) => {
  return (
    <>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{
            opacity: 0,
            filter: 'blur(10px)',
            y: 5,
          }}
          whileInView={{
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            delay: delayOffset + i * 0.03,
            duration: 0.5,
            ease: 'easeOut',
          }}
          className={'inline-block ' + className}
          style={style}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </>
  );
};

const CTASection = () => {
  return (
    <section className="relative bg-bg-dark px-6 md:px-16 py-20 z-10 border-t border-white/5">
      {/* Centered CTA Card Wrapper (Handles animating border glow) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ type: 'spring', stiffness: 60, damping: 14 }}
        className="max-w-5xl mx-auto rounded-[32px] p-[1.5px] relative overflow-hidden bg-white/5 shadow-2xl z-10 group"
      >
        {/* Rotating border glow (Laser line sweep) */}
        <div
          className="absolute inset-[-1000%] bg-[conic-gradient(from_0deg,transparent_30%,rgba(212,255,0,0.1)_70%,rgba(212,255,0,0.3)_90%,transparent_100%)] pointer-events-none opacity-30 group-hover:opacity-100 transition-opacity duration-700"
          style={{ animation: 'spin 20s linear infinite' }}
        />

        {/* Inner Content Card */}
        <div className="w-full h-full bg-gradient-to-br from-bg-card via-[#171A0E] to-bg-dark rounded-[31px] px-8 py-16 md:py-20 text-center relative overflow-hidden z-10">
          {/* Ambient top halo glow inside the card */}
          <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

          {/* Heading with character-by-character blur-in animation */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black italic tracking-tight uppercase text-white mb-6 leading-tight relative z-10 select-none">
            <span className="block mb-2">
              <BlurInText text="READY TO START YOUR" delayOffset={0.1} />
            </span>
            <span
              style={{
                textDecoration: 'underline wavy var(--primary)',
                textUnderlineOffset: '12px',
                textDecorationThickness: '3px',
                display: 'inline-block',
              }}
              className="text-primary mt-1"
            >
              <BlurInText text="TRANSFORMATION?" delayOffset={0.6} />
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-neutral-light/70 max-w-2xl mx-auto mb-10 leading-relaxed relative z-10">
            Join thousands of others who have already taken the first step
            towards
            <br className="hidden sm:inline" />a healthier, stronger version of
            themselves.
          </p>

          {/* CTA Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10 w-full sm:w-auto">
            <motion.button
              whileHover={{
                scale: 1.03,
                boxShadow: '0 0 25px rgba(212,255,0,0.5)',
              }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-8 py-3.5 bg-primary text-black font-extrabold uppercase tracking-wider rounded-full transition-all duration-300 transform cursor-pointer text-sm"
            >
              Create Free Account
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, backgroundColor: '#f3f4f6' }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-8 py-3.5 bg-white text-black font-extrabold uppercase tracking-wider rounded-full transition-all duration-300 transform cursor-pointer text-sm"
            >
              Browse Classes
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
