import React from 'react';
import ForumPostsFilter from '@/components/ForumPostsFilter';
import ForumPostCard from '@/components/ForumPostCard';
import {
  Pagination,
  PaginationList,
  PaginationItem,
} from '@/components/Pagination ';
import { getAllForumPosts } from '@/lib/api/forum/data';

const ForumPosts = async () => {
  const forumPosts = await getAllForumPosts();

  return (
    <div className="bg-[#0A0D02] min-h-screen text-white px-6 py-10 md:px-12 md:py-16 font-sans">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Sort, Search, Classification Filters Header */}
        <ForumPostsFilter />

        {/* Row-Based Vertical Cards List */}
        <div className="flex flex-col gap-6">
          {forumPosts.length > 0 ? (
            forumPosts.map(post => (
              <ForumPostCard
                key={post._id?.toString() || post._id}
                post={post}
              />
            ))
          ) : (
            <div className="bg-[#13160B] border border-[#1C210E] rounded-3xl p-16 text-center flex flex-col items-center justify-center space-y-4">
              <span className="text-xs font-bold text-[#A4A896]/40 uppercase tracking-widest block font-mono">
                No articles published to community
              </span>
            </div>
          )}
        </div>

        {/* Mockup Pagination Controls */}
        <Pagination className="flex items-center justify-center pt-8 border-t border-[#1C210E]/60 select-none">
          <PaginationList className="flex items-center gap-2">
            {/* Previous */}
            <li>
              <button
                type="button"
                disabled
                className="inline-flex h-9 items-center justify-center px-3 text-[10px] font-black uppercase tracking-wider text-[#A4A896]/30 cursor-not-allowed select-none bg-transparent border-0"
              >
                &lt; Previous
              </button>
            </li>

            {/* Pages */}
            <PaginationItem
              active
              className="bg-[#D4FF00] hover:bg-[#c2eb00] text-black border-[#D4FF00] text-xs font-black rounded-lg h-9 w-9 flex items-center justify-center cursor-pointer"
            >
              1
            </PaginationItem>

            <PaginationItem className="bg-[#13160B] border border-[#1C210E] hover:border-[#D4FF00]/40 text-white text-xs font-black rounded-lg h-9 w-9 flex items-center justify-center cursor-pointer">
              2
            </PaginationItem>

            <PaginationItem className="bg-[#13160B] border border-[#1C210E] hover:border-[#D4FF00]/40 text-white text-xs font-black rounded-lg h-9 w-9 flex items-center justify-center cursor-pointer">
              3
            </PaginationItem>

            <li className="text-[#A4A896]/40 text-xs font-black px-2 select-none font-mono">
              ...
            </li>

            <PaginationItem className="bg-[#13160B] border border-[#1C210E] hover:border-[#D4FF00]/40 text-white text-xs font-black rounded-lg h-9 w-9 flex items-center justify-center cursor-pointer">
              12
            </PaginationItem>

            {/* Next */}
            <li>
              <button
                type="button"
                className="inline-flex h-9 items-center justify-center px-3 text-[10px] font-black uppercase tracking-wider text-[#D4FF00] hover:text-[#c2eb00] select-none cursor-pointer bg-transparent border-0"
              >
                Next &gt;
              </button>
            </li>
          </PaginationList>
        </Pagination>
      </div>
    </div>
  );
};

export default ForumPosts;
