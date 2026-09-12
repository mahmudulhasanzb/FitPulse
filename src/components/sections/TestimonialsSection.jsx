'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS_DATA } from '@/data/testimonials';
import TestimonialCard from '@/components/cards/TestimonialCard';

const TestimonialsSection = () => {
  const row1 = TESTIMONIALS_DATA.slice(0, 4);
  const row2 = TESTIMONIALS_DATA.slice(4, 8);

  // Duplicate for seamless infinite loop
  const marqueeRow1 = [...row1, ...row1];
  const marqueeRow2 = [...row2, ...row2];

  return (
    <section className="relative bg-bg-dark border-t border-white/5 py-16 overflow-hidden z-10">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10 mb-10">
        {/* Clean, minimalist header matching Featured & Forum sections */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-[11px] font-mono tracking-[0.25em] text-primary uppercase font-bold">
            MEMBER STORIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-black italic tracking-tight uppercase text-white mt-1">
            Community Reviews
          </h2>
        </motion.div>
      </div>

      {/* Dual-Track Infinite Marquee */}
      <div
        className="pause-on-hover relative flex flex-col gap-5 overflow-hidden select-none"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
      >
        {/* Track 1: Moving Left */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee-left flex gap-5">
            {marqueeRow1.map((item, index) => (
              <TestimonialCard key={`row1-${item.id}-${index}`} item={item} />
            ))}
          </div>
        </div>

        {/* Track 2: Moving Right */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee-right flex gap-5">
            {marqueeRow2.map((item, index) => (
              <TestimonialCard key={`row2-${item.id}-${index}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
