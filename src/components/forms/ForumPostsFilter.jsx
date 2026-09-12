'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Search, ChevronDown, Plus, X } from 'lucide-react';

const CATEGORIES = ['ALL PROTOCOLS', 'TRAINING', 'NUTRITION', 'RECOVERY', 'MINDSET'];

const SORT_OPTIONS = [
  { label: 'Latest', value: 'latest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Popular', value: 'popular' },
];

export default function ForumPostsFilter({ session, role }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get('search') || '';
  const currentCategory =
    searchParams.get('category')?.toUpperCase() || 'ALL PROTOCOLS';
  const currentSort = searchParams.get('sort') || 'latest';

  const [searchTerm, setSearchTerm] = useState(currentSearch);
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef(null);

  // Sync input if URL searchParam changes externally
  useEffect(() => {
    setSearchTerm(currentSearch);
  }, [currentSearch]);

  // Close sort dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const updateFilters = useCallback(
    updates => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (
          !value ||
          value === 'ALL PROTOCOLS' ||
          (value === 'latest' && key === 'sort')
        ) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      // Always reset to page 1 on filter/search change
      params.delete('page');

      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname);
    },
    [router, pathname, searchParams],
  );

  // Debounced search update
  useEffect(() => {
    if (searchTerm === currentSearch) return;

    const timer = setTimeout(() => {
      updateFilters({ search: searchTerm.trim() });
    }, 350);

    return () => clearTimeout(timer);
  }, [searchTerm, currentSearch, updateFilters]);

  const handleCategorySelect = cat => {
    const categoryParam = cat === 'ALL PROTOCOLS' ? '' : cat.toLowerCase();
    updateFilters({ category: categoryParam });
  };

  const handleSortSelect = sortVal => {
    updateFilters({ sort: sortVal });
    setSortOpen(false);
  };

  const activeSortLabel =
    SORT_OPTIONS.find(s => s.value === currentSort)?.label || 'Latest';

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
          {/* Sort dropdown */}
          <div className="relative" ref={sortRef}>
            <button
              type="button"
              onClick={() => setSortOpen(!sortOpen)}
              className="inline-flex items-center gap-2 bg-[#13160B] border border-[#1C210E] hover:border-[#D4FF00]/30 text-white font-black text-[10px] tracking-widest uppercase px-4 py-3 rounded-lg transition-all duration-200 select-none cursor-pointer"
            >
              <span>{activeSortLabel}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 text-[#A4A896]/60 transition-transform duration-200 ${
                  sortOpen ? 'rotate-180 text-[#D4FF00]' : ''
                }`}
              />
            </button>

            {sortOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-[#13160B] border border-[#1C210E] rounded-xl shadow-2xl py-1.5 z-50 backdrop-blur-xl">
                {SORT_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleSortSelect(opt.value)}
                    className={`w-full text-left px-4 py-2 text-[10px] font-black tracking-widest uppercase transition-colors cursor-pointer ${
                      currentSort === opt.value
                        ? 'text-[#D4FF00] bg-[#1C210E]/60'
                        : 'text-[#A4A896] hover:text-white hover:bg-[#1A1F0F]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* New Post Button - User role condition kept exactly as specified */}
          {session && (role == 'admin' || role == 'trainer') && (
            <Link
              href={`/dashboard/${role}/add-forum`}
              className="inline-flex items-center justify-center gap-1.5 bg-[#D4FF00] hover:bg-[#c2eb00] text-[#121212] font-black text-[10px] tracking-widest uppercase px-5 py-3.5 rounded hover:shadow-lg hover:shadow-[#D4FF00]/10 transition-all duration-200 select-none cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5 stroke-[3px]" />
              <span>New Post</span>
            </Link>
          )}
        </div>
      </div>

      {/* 2. Search & Category Filters Bar */}
      <div className="flex flex-col xl:flex-row gap-4 justify-between items-stretch xl:items-center">
        {/* Search input box */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#A4A896]/40 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search protocols & articles..."
            className="w-full bg-[#13160B] border border-[#1C210E] focus:border-[#D4FF00]/50 text-white placeholder-[#A4A896]/20 rounded-xl pl-11 pr-10 py-3 text-xs md:text-sm focus:outline-none transition-colors duration-200 uppercase font-mono font-bold"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                updateFilters({ search: '' });
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A4A896]/40 hover:text-white transition-colors cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category filtering tags */}
        <div className="flex flex-wrap gap-2 items-center">
          {CATEGORIES.map(category => {
            const isActive =
              category === 'ALL PROTOCOLS'
                ? currentCategory === 'ALL PROTOCOLS' ||
                  !searchParams.get('category')
                : currentCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => handleCategorySelect(category)}
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
}
