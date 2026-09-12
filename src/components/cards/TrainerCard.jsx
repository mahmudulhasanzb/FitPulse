'use client';

import React from 'react';
import Image from 'next/image';
import { User } from 'lucide-react';

export default function TrainerCard({ trainer }) {
  const { name, email, image, role, experience } = trainer || {};

  return (
    <div className="bg-bg-card border border-white/10 hover:border-primary/50 rounded-2xl p-3.5 sm:p-4 flex flex-col transition-all duration-200 group">
      {/* Square/Portrait Photo with Rounded Corners */}
      <div className="relative w-full aspect-[4/4.2] rounded-xl overflow-hidden mb-3.5 bg-neutral-900 shrink-0">
        {image ? (
          <Image
            src={image}
            alt={name || 'Trainer'}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover group-hover:scale-103 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-light/30">
            <User className="w-12 h-12" />
          </div>
        )}
      </div>

      {/* Experience Pill */}
      {experience && (
        <span className="inline-block self-start px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20 text-primary text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider mb-2">
          {experience.toLowerCase().includes('exp') ? experience : `${experience} Exp`}
        </span>
      )}

      {/* Trainer Name */}
      <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-primary transition-colors line-clamp-1 mb-1">
        {name || 'Trainer'}
      </h3>

      {/* Email / Subtitle */}
      <p className="text-xs text-neutral-light/60 truncate">
        {email || 'Certified Instructor'}
      </p>
    </div>
  );
}
