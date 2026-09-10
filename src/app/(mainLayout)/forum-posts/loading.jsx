import React from 'react';

function ForumPostListSkeleton() {
  return (
    <div className="flex flex-col md:flex-row bg-[#13160B] border border-[#1C210E] rounded-3xl overflow-hidden animate-pulse">
      {/* Thumbnail */}
      <div className="w-full md:w-56 h-48 md:h-auto bg-white/5" />

      {/* Content */}
      <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
        <div className="space-y-2.5">
          <div className="h-3 w-32 bg-white/5 rounded" />
          <div className="h-5 w-3/4 bg-white/10 rounded" />
          <div className="h-3 w-full bg-white/5 rounded" />
          <div className="h-3 w-4/5 bg-white/5 rounded" />
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-[#1C210E]">
          <div className="h-3 w-20 bg-white/5 rounded" />
          <div className="h-3 w-12 bg-white/10 rounded" />
        </div>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="bg-[#0A0D02] min-h-screen text-white px-6 py-10 md:px-12 md:py-16 font-sans">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Filter Bar Skeleton */}
        <div className="h-14 w-full bg-[#13160B] border border-[#1C210E] rounded-2xl animate-pulse" />

        {/* List of Post Skeletons */}
        <div className="flex flex-col gap-6">
          {[1, 2, 3, 4].map(n => (
            <ForumPostListSkeleton key={n} />
          ))}
        </div>
      </div>
    </div>
  );
}
