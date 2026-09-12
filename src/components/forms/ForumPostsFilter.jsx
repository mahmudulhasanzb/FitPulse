import React from 'react';
import Link from 'next/link';
import { Search, ChevronDown, Plus } from 'lucide-react';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const ForumPostsFilter = async () => {
 const session = await auth.api.getSession({
   headers: await headers(),
 });
  const role = session?.user?.role;

  const categories = ['ALL PROTOCOLS', 'TRAINING', 'NUTRITION', 'RECOVERY', 'MINDSET'];

  return (
    <div className="space-y-6">
      {/* 1. Header Banner Title Section */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-6 border-b border-[#1C210E]">
        <div className="space-y-2">
          <span className="text-[10px] font-black text-[#D4FF00] tracking-widest uppercase block font-mono">
            — Protocol Exchange
          </span>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white font-mono leading-none">
            Community <span className="text-[#D4FF00]">Forum</span>
          </h1>
          <p className="text-xs md:text-sm text-[#A4A896]/65 font-medium max-w-xl leading-relaxed">
            Share knowledge, refine training protocols, and connect with elite
            athletes in our high-performance discussion hub.
          </p>
        </div>

        {/* Action Controls (Sort & Create) */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          {/* Static Sort dropdown indicator */}
          <button
            type="button"
            className="inline-flex items-center gap-2 bg-[#13160B] border border-[#1C210E] hover:border-[#D4FF00]/30 text-white font-black text-[10px] tracking-widest uppercase px-4 py-3 rounded-lg transition-all duration-200 select-none cursor-pointer"
          >
            <span>Latest</span>
            <ChevronDown className="h-3.5 w-3.5 text-[#A4A896]/60" />
          </button>
          {/* New Post Button */}
          <Link
            href={`/dashboard/${role}/add-forum`}
            className="inline-flex items-center justify-center gap-1.5 bg-[#D4FF00] hover:bg-[#c2eb00] text-[#121212] font-black text-[10px] tracking-widest uppercase px-5 py-3.5 rounded hover:shadow-lg hover:shadow-[#D4FF00]/10 transition-all duration-200 select-none cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5 stroke-[3px]" />
            <span>New Post</span>
          </Link>
        </div>
      </div>

      {/* 2. Search & Category Filters Bar */}
      <div className="flex flex-col xl:flex-row gap-4 justify-between items-stretch xl:items-center">
        {/* Search input box */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#A4A896]/40 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search protocols & articles..."
            className="w-full bg-[#13160B] border border-[#1C210E] focus:border-[#D4FF00]/50 text-white placeholder-[#A4A896]/20 rounded-xl pl-11 pr-4 py-3 text-xs md:text-sm focus:outline-none transition-colors duration-200 uppercase font-mono font-bold"
          />
        </div>

        {/* Category filtering tags (visual design representation) */}
        <div className="flex flex-wrap gap-2 items-center">
          {categories.map((category, idx) => {
            const isActive = idx === 0; // Highlight the first one as active by default
            return (
              <button
                key={category}
                type="button"
                className={`px-4 py-2.5 rounded-full text-[9px] font-black uppercase tracking-wider transition-all duration-200 cursor-pointer border ${
                  isActive
                    ? 'bg-[#D4FF00] text-black border-[#D4FF00] shadow-[0_4px_12px_rgba(212,255,0,0.15)]'
                    : 'bg-[#13160B] text-[#A4A896]/80 border-[#1C210E] hover:border-[#D4FF00]/40'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ForumPostsFilter;
