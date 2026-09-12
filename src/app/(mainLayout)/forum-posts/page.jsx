import React from 'react';
import ForumPostsFilter from '@/components/forms/ForumPostsFilter';
import ForumPostCard from '@/components/cards/ForumPostCard';
import PaginationControls from '@/components/ui/Pagination';
import { getPaginatedForumPosts } from '@/lib/api/forum/data';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export const revalidate = 60;

const ForumPosts = async ({ searchParams }) => {
  const { page, search, category, sort } = (await searchParams) || {};
  const currentPage = Number(page) || 1;

  const [forumResponse, session] = await Promise.all([
    getPaginatedForumPosts({
      page: currentPage,
      search: search || '',
      category: category || '',
      sort: sort || 'latest',
    }),
    auth.api
      .getSession({
        headers: await headers(),
      })
      .catch(() => null),
  ]);

  const role = session?.user?.role;

  // Handle both new {data, page, totalPage} shape and legacy plain array
  const postsData = Array.isArray(forumResponse)
    ? forumResponse
    : Array.isArray(forumResponse?.data)
      ? forumResponse.data
      : [];
  const totalPage = forumResponse?.totalPage ?? 1;

  return (
    <div className="bg-[#0A0D02] min-h-screen text-white px-6 py-10 md:px-12 md:py-16 font-sans">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Sort, Search, Classification Filters Header */}
        <ForumPostsFilter session={session} role={role} />

        {/* Row-Based Vertical Cards List */}
        <div className="flex flex-col gap-6">
          {postsData.length > 0 ? (
            postsData.map(post => (
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

        {/* Pagination */}
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPage}
        />
      </div>
    </div>
  );
};

export default ForumPosts;
