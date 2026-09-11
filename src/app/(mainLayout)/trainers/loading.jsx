import React from 'react';
import TrainerCardSkeleton from '@/components/TrainerCardSkeleton';

export default function Loading() {
  return (
    <div className="bg-bg-dark min-h-screen px-6 md:px-16 py-12 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-10 space-y-3">
          <div className="h-4 w-28 bg-white/10 rounded animate-pulse" />
          <div className="h-10 w-64 bg-white/10 rounded animate-pulse" />
          <div className="h-4 w-80 max-w-full bg-white/5 rounded animate-pulse" />
        </div>

        {/* Trainers Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
            <TrainerCardSkeleton key={n} />
          ))}
        </div>
      </div>
    </div>
  );
}
