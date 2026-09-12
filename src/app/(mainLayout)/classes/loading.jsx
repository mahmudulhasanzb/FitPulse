import React from 'react';
import FeaturedClassCardSkeleton from '@/components/cards/FeaturedClassCardSkeleton';

export default function Loading() {
  return (
    <div className="bg-bg-dark min-h-screen px-6 md:px-16 py-12 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-12 space-y-3">
          <div className="h-10 w-64 bg-white/10 rounded animate-pulse" />
          <div className="h-4 w-96 max-w-full bg-white/5 rounded animate-pulse" />
        </div>

        {/* Filter Bar Skeleton */}
        <div className="flex flex-col md:flex-row gap-6 justify-between mb-10">
          <div className="h-11 w-full max-w-md bg-bg-card border border-white/5 rounded-xl animate-pulse" />
          <div className="h-11 w-full md:w-64 bg-bg-card border border-white/5 rounded-xl animate-pulse" />
        </div>

        {/* Classes Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(n => (
            <FeaturedClassCardSkeleton key={n} />
          ))}
        </div>
      </div>
    </div>
  );
}
