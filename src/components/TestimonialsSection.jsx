'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, CheckCircle2, Quote } from 'lucide-react';
import { TESTIMONIALS_DATA } from '@/data/testimonials';

const TestimonialCard = ({ item }) => {
  return (
    <div className="w-[280px] sm:w-[320px] shrink-0 bg-bg-card/85 border border-white/5 rounded-xl p-4 sm:p-5 flex flex-col justify-between hover:border-primary/40 hover:bg-bg-card transition-all duration-300 group">
      {/* Header: User Info & Star Rating */}
      <div className="flex items-center justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10 shrink-0 bg-neutral-800">
            <Image
              src={item.avatar}
              alt={item.name}
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-white group-hover:text-primary transition-colors truncate">
                {item.name}
              </span>
              {item.verified && (
                <CheckCircle2 className="w-3 h-3 text-blue-400 fill-blue-400/20 shrink-0" />
              )}
            </div>
            <span className="text-[10px] text-neutral-light/50 block truncate">
              {item.role}
            </span>
          </div>
        </div>

        {/* 5-Star Rating */}
        <div className="flex items-center gap-0.5 shrink-0">
          {[...Array(item.rating)].map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-primary text-primary" />
          ))}
        </div>
      </div>

      {/* Review Text */}
      <p className="text-xs text-neutral-light/80 leading-relaxed line-clamp-3">
        "{item.quote}"
      </p>
    </div>
  );
};

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
