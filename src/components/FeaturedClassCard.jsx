'use client';

import React from 'react';
import { Zap, Sprout, Dumbbell } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const FeaturedClassCard = ({ classData }) => {
  const {
    className,
    description,
    duration,
    image,
    coverImage,
    badge,
    badgeType,
    capacity,
    totalEnrolment,
    bookingCount,
    category,
    icon,
  } = classData;
console.log('class data:',classData);
// console.log('class data detals:',);

  const derivedIcon = icon || (category?.toLowerCase() === 'yoga' || category?.toLowerCase() === 'mindfulness' ? 'sprout' : category?.toLowerCase()?.includes('strength') || category?.toLowerCase()?.includes('power') ? 'dumbbell' : 'lightning');
  const slots = Math.max(0, (capacity || 0) - (totalEnrolment || classData.totalEnrollment || 0));

  return (
    <motion.div className="bg-bg-card border border-white/5 rounded-2xl overflow-hidden flex flex-col h-full shadow-lg hover:shadow-2xl hover:border-primary/20 transition-all duration-300 group cursor-pointer">
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-custom/10">
        <Image
          src={coverImage}
          alt={className}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover"
        />
        {/* Dark vignette overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent opacity-60" />

        {/* Status badges */}
        {badge &&
          (badgeType === 'highlight' ? (
            <span className="absolute top-4 right-4 bg-primary text-black font-extrabold text-[10px] tracking-wider px-2.5 py-1 rounded uppercase">
              {badge}
            </span>
          ) : (
            <span className="absolute top-4 right-4 bg-black/60 border border-white/10 text-white font-extrabold text-[10px] tracking-wider px-2.5 py-1 rounded backdrop-blur-sm uppercase">
              {badge}
            </span>
          ))}
      </div>

      {/* Card Details */}
      <div className="p-6 flex flex-col flex-1">
        {/* Duration Meta */}
        <div className="flex items-center gap-2 mb-3">
          {(() => {
            switch (derivedIcon) {
              case 'lightning':
                return <Zap className="w-4 h-4 text-primary fill-primary/10" />;
              case 'sprout':
                return <Sprout className="w-4 h-4 text-primary" />;
              case 'dumbbell':
                return <Dumbbell className="w-4 h-4 text-primary" />;
              default:
                return <Zap className="w-4 h-4 text-primary animate-pulse" />;
            }
          })()}
          <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-primary">
            {duration}
          </span>
        </div>

        {/* Class Name Title */}
        <h3 className="text-xl font-bold text-white tracking-tight mb-2 group-hover:text-primary transition-colors duration-200">
          {className}
        </h3>

        {/* Class Short Description */}
        <p className="text-sm text-neutral-light/75 leading-relaxed mb-6 flex-1">
          {description}
        </p>

        {/* Footer info (Users & Booking slots) */}
        <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
          {/* Overlapping avatars representation */}
          <div className="flex -space-x-1.5">
            <div className="w-5 h-5 rounded-full border border-bg-card bg-neutral-light/40" />
            <div className="w-5 h-5 rounded-full border border-bg-card bg-neutral-custom/60" />
            <div className="w-5 h-5 rounded-full border border-bg-card bg-neutral-dark/80" />
          </div>

          {/* Slots Availability */}
          <span
            className={`text-[10px] md:text-xs font-bold tracking-wider uppercase ${slots === 0 ? 'text-neutral-light/40' : 'text-neutral-light'}`}
          >
            {slots === 0 ? 'Sold Out' : `${slots} Slots Left`}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedClassCard;
