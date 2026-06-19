"use client";

import React from 'react';
import Image from 'next/image';
import { Clock, User } from 'lucide-react';
import { motion } from 'framer-motion';

const ClassCard = ({ classData }) => {
  const { className, trainerName, trainerRole, trainerAvatar, category, price, duration, level, image, status } = classData;

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
      default:
        return 'bg-neutral-dark text-white';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ type: 'spring', stiffness: 80, damping: 15 }}
      className="bg-bg-card border border-white/5 rounded-2xl overflow-hidden flex flex-col h-full shadow-lg hover:shadow-2xl hover:border-primary/20 transition-all duration-300 group cursor-pointer"
    >
      
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-custom/10">
        <Image 
          src={image} 
          alt={className} 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-102"
        />
        {/* Dark subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent opacity-60" />
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex gap-2 z-10">
          {status === 'Approved' && (
            <span className="bg-primary text-black font-extrabold text-[9px] md:text-[10px] tracking-wider px-2 py-0.5 rounded uppercase">
              APPROVED
            </span>
          )}
          <span className={`font-extrabold text-[9px] md:text-[10px] tracking-wider px-2 py-0.5 rounded uppercase ${getCategoryBg()}`}>
            {category}
          </span>
        </div>
      </div>

      {/* Details Container */}
      <div className="p-6 flex flex-col flex-1">
        
        {/* Title and Price */}
        <div className="flex justify-between items-start gap-4 mb-6">
          <h3 className="text-lg md:text-xl font-black text-white tracking-tight uppercase leading-tight group-hover:text-primary transition-colors duration-200 break-words flex-1">
            {className}
          </h3>
          <div className="flex-shrink-0 text-right">
            <span className="text-[9px] md:text-[10px] font-bold text-neutral-light uppercase tracking-wider block leading-none">
              PRICE
            </span>
            <span className="text-xl md:text-2xl font-black text-primary block mt-1 leading-none">
              ${price}
            </span>
          </div>
        </div>

        {/* Trainer Headshot & Metadata */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/10 flex-shrink-0 bg-neutral-custom/20">
            <Image 
              src={trainerAvatar} 
              alt={trainerName} 
              fill
              sizes="36px"
              className="object-cover"
            />
          </div>
          <div>
            <span className="block text-xs md:text-sm font-bold text-white leading-none">
              {trainerName}
            </span>
            <span className="block text-[9px] md:text-[10px] font-semibold text-neutral-light uppercase tracking-widest mt-1">
              {trainerRole}
            </span>
          </div>
        </div>

        {/* Duration & Class Level */}
        <div className="flex justify-between items-center border-t border-white/5 pt-4 mt-auto mb-6">
          <div className="flex items-center gap-1.5 text-neutral-light/95 text-xs font-bold">
            <Clock className="w-4 h-4 text-primary" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1.5 text-neutral-light/95 text-xs font-bold">
            <User className="w-4 h-4 text-primary" />
            <span>{level}</span>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full bg-primary hover:bg-primary/95 text-black font-extrabold py-3 rounded-lg text-xs md:text-sm uppercase tracking-wider transition-all duration-300 transform active:scale-[0.98] cursor-pointer text-center block shadow-[0_4px_12px_rgba(212,255,0,0.15)] group-hover:shadow-[0_4px_20px_rgba(212,255,0,0.3)]">
          View Details
        </button>

      </div>

    </motion.div>
  );
};

export default ClassCard;
