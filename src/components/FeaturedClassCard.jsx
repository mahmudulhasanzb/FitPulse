'use client';

import React from 'react';
import { Users, Clock, Tag, ArrowRight, User, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const FeaturedClassCard = ({ classData }) => {
  const {
    _id,
    className,
    authorName,
    description,
    duration,
    coverImage,
    category,
    price,
    totalEnrollment,
  } = classData;

  const displayImage = coverImage || 'https://images.unsplash.com/photo-1483721310020-03333e577078';
  const displayPrice = typeof price === 'number' ? `$${price.toFixed(2)}` : price;
  const displayDuration = typeof duration === 'number' ? `${duration} min` : duration;

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
        <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent opacity-60" />

        {/* Category Badge */}
        {category && (
          <div className="absolute top-4 left-4 z-10">
            <span className="font-extrabold text-[9px] md:text-[10px] tracking-wider px-2.5 py-1 rounded uppercase bg-[#0038FF] text-white border border-[#0038FF]/20 flex items-center gap-1">
              <Tag className="w-2.5 h-2.5" />
              {category}
            </span>
          </div>
        )}
      </div>

      {/* Details Container */}
      <div className="p-6 flex flex-col flex-1">
        {/* Class Name Title */}
        <h3 className="text-lg md:text-xl font-black text-white tracking-tight uppercase leading-tight group-hover:text-primary transition-colors duration-200 mb-2 line-clamp-1">
          {className}
        </h3>

        {/* Trainer Name */}
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-neutral-light/70 uppercase tracking-widest mb-4">
          <User className="w-3.5 h-3.5 text-primary" />
          <span>BY {authorName || 'ELITE TRAINER'}</span>
        </div>

        {/* Price/Duration & Booking Count Grid */}
        <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-4 mb-4">
          <div className="flex flex-col items-start">
            <span className="text-[9px] font-bold text-neutral-light/75 uppercase tracking-wider mb-1 flex items-center gap-0.5">
              <DollarSign className="w-3 h-3 text-primary" />
              Price
            </span>
            <span className="text-xs md:text-sm font-extrabold text-white">
              {displayPrice}
            </span>
          </div>

          <div className="flex flex-col items-start border-l border-white/5 pl-3">
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
              <Users className="w-3 h-3 text-primary" />
              Booked
            </span>
            <span className="text-xs md:text-sm font-extrabold text-white">
              {totalEnrollment || 0}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-neutral-light text-xs md:text-sm line-clamp-2 mb-6 leading-relaxed flex-1">
          {description}
        </p>

        {/* Details Button */}
        <Link
          href={`/classes/${_id}`}
          className="w-full bg-primary hover:bg-primary/95 text-black font-extrabold py-3 rounded-lg text-xs md:text-sm uppercase tracking-wider transition-all duration-300 transform active:scale-[0.98] cursor-pointer text-center flex items-center justify-center gap-1.5 shadow-[0_4px_12px_rgba(212,255,0,0.15)] group-hover:shadow-[0_4px_20px_rgba(212,255,0,0.3)]"
        >
          View Details
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.div>
  );
};

export default FeaturedClassCard;
