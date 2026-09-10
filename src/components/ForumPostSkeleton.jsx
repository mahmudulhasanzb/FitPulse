import React from 'react';

export default function ForumPostSkeleton() {
  return (
    <div className="bg-[#13160B] border border-[#1C210E] rounded-2xl overflow-hidden flex flex-col sm:flex-row h-full animate-pulse">
      {/* Thumbnail box */}
      <div className="w-full sm:w-40 h-40 flex-shrink-0 bg-white/5 relative p-2">
        <div className="h-4 w-12 bg-white/10 rounded" />
      </div>

      {/* Content box */}
      <div className="p-4 flex flex-col justify-between flex-1 min-w-0 space-y-3">
        <div className="space-y-2">
          {/* Author / Role */}
          <div className="h-3 w-1/3 bg-white/5 rounded" />
          {/* Title */}
          <div className="h-4 w-4/5 bg-white/10 rounded" />
          <div className="h-4 w-1/2 bg-white/10 rounded" />
          {/* Description */}
          <div className="h-3 w-full bg-white/5 rounded mt-2" />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-[#1C210E]/60">
          <div className="flex gap-3">
            <div className="h-3 w-8 bg-white/5 rounded" />
            <div className="h-3 w-8 bg-white/5 rounded" />
          </div>
          <div className="h-3 w-10 bg-white/10 rounded" />
        </div>
      </div>
    </div>
  );
}
