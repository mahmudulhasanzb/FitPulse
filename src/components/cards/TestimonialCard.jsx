'use client';

import React from 'react';
import Image from 'next/image';
import { Star, CheckCircle2 } from 'lucide-react';

const TestimonialCard = ({ item }) => {
  return (
    <div className="w-[280px] sm:w-[320px] shrink-0 bg-bg-card/85 border border-white/5 rounded-xl p-4 sm:p-5 flex flex-col justify-between hover:border-primary/40 hover:bg-bg-card transition-all duration-300 group cursor-pointer">
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

export default TestimonialCard;
