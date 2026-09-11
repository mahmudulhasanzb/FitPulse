import React from 'react';

export default function TrainerCardSkeleton() {
  return (
    <div className="bg-bg-card border border-white/10 rounded-2xl p-3.5 sm:p-4 flex flex-col animate-pulse">
      {/* Photo skeleton */}
      <div className="w-full aspect-[4/4.2] rounded-xl bg-white/10 mb-3.5 shrink-0" />

      {/* Experience pill skeleton */}
      <div className="h-4 w-16 bg-white/10 rounded-md mb-2" />

      {/* Name skeleton */}
      <div className="h-4 w-3/4 bg-white/10 rounded mb-1.5" />

      {/* Subtitle skeleton */}
      <div className="h-3 w-1/2 bg-white/5 rounded" />
    </div>
  );
}
