"use client";

import React from 'react';
import Image from 'next/image';
import { Clock, Users, Award, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const ClassCard = ({ classData }) => {
  const {
    className,
    authorRole,
    coverImage,
    category,
    difficulty,
    duration,
    price,
    description,
    totalEnrollment
  } = classData;

  // Set category badge background color
  const getCategoryBg = () => {
    switch (category?.toUpperCase()) {
      case 'HIIT':
        return 'bg-[#0038FF] text-white';
      case 'YOGA':
        return 'bg-[#0085FF] text-white';
      case 'WEIGHTS':
        return 'bg-[#0029FF] text-white';
      case 'CARDIO':
        return 'bg-[#7000FF] text-white';
      case 'PILATES':
        return 'bg-[#B000FF] text-white';
      case 'RUNNING':
        return 'bg-[#E11D48] text-white';
      default:
        return 'bg-neutral-dark text-white';
    }
  };

  const displayImage = coverImage || 'https://images.unsplash.com/photo-1483721310020-03333e577078';
  const displayDuration = typeof duration === 'number' ? `${duration} Weeks` : duration;
  const displayPrice = typeof price === 'number' ? `$${price.toFixed(2)}` : price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ type: 'spring', stiffness: 80, damping: 15 }}
      className="bg-bg-card border border-white/5 rounded-2xl overflow-hidden flex flex-col h-full shadow-lg hover:shadow-2xl hover:border-primary/20 transition-all duration-300 group cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-custom/10">
        <Image
          src={displayImage}
          alt={className || 'Class Image'}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-102"
        />
        {/* Dark subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent opacity-60" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex gap-2 z-10">
          {category && (
            <span
              className={`font-extrabold text-[9px] md:text-[10px] tracking-wider px-2 py-0.5 rounded uppercase ${getCategoryBg()}`}
            >
              {category}
            </span>
          )}
        </div>
      </div>

      {/* Details Container */}
      <div className="p-6 flex flex-col flex-1">
        {/* Title and Price */}
        <div className="flex justify-between items-start gap-4 mb-2">
          <h3 className="text-lg md:text-xl font-black text-white tracking-tight uppercase leading-tight group-hover:text-primary transition-colors duration-200 break-words flex-1">
            {className}
          </h3>
          <div className="flex-shrink-0 text-right">
            <span className="text-[9px] md:text-[10px] font-bold text-neutral-light uppercase tracking-wider block leading-none">
              PRICE
            </span>
            <span className="text-xl md:text-2xl font-black text-primary block mt-1 leading-none">
              {displayPrice}
            </span>
          </div>
        </div>

        {/* Author Role */}
        {authorRole && (
          <div className="flex items-center gap-1.5 text-[9px] md:text-[10px] font-bold text-neutral-light/70 uppercase tracking-widest mb-3.5">
            <Shield className="w-3.5 h-3.5 text-primary" />
            <span>BY {authorRole}</span>
          </div>
        )}

        {/* Duration, Difficulty & Enrollment Grid */}
        <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-4 mb-6">
          <div className="flex flex-col items-start">
            <span className="text-[9px] font-bold text-neutral-light/75 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Clock className="w-3 h-3 text-primary" />
              Duration
            </span>
            <span className="text-xs md:text-sm font-extrabold text-white">
              {displayDuration}
            </span>
          </div>

          <div className="flex flex-col items-start border-l border-white/5 pl-3">
            <span className="text-[9px] font-bold text-neutral-light/75 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Award className="w-3 h-3 text-primary" />
              Difficulty
            </span>
            <span className="text-xs md:text-sm font-extrabold text-white capitalize">
              {difficulty || 'all levels'}
            </span>
          </div>

          <div className="flex flex-col items-start border-l border-white/5 pl-3">
            <span className="text-[9px] font-bold text-neutral-light/75 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Users className="w-3 h-3 text-primary" />
              Enrolled
            </span>
            <span className="text-xs md:text-sm font-extrabold text-white">
              {totalEnrollment || 0}
            </span>
          </div>
        </div>

        {/* Horizontal Rule */}
        <hr className="border-t border-white/10 mb-4" />

        {/* Description */}
        <p className="text-neutral-light text-xs md:text-sm line-clamp-3 mb-6 leading-relaxed flex-1">
          {description}
        </p>

        {/* Action Button */}
        <Link
          href={`/classes/${classData._id}`}
          className="w-full bg-primary hover:bg-primary/95 text-black font-extrabold py-3 rounded-lg text-xs md:text-sm uppercase tracking-wider transition-all duration-300 transform active:scale-[0.98] cursor-pointer text-center block shadow-[0_4px_12px_rgba(212,255,0,0.15)] group-hover:shadow-[0_4px_20px_rgba(212,255,0,0.3)]"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default ClassCard;
