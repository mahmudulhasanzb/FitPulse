import MyForumPostCard from '@/components/MyForumPostCard';
import { getMyForumPosts } from '@/lib/api/forum/data';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import React from 'react';

const MyForumPosts = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const postData = (await getMyForumPosts(session?.user?.email)) || [];

  return (
    <div className="flex-1 bg-[#0A0D02] min-h-screen px-6 py-10 md:px-12 md:py-16 text-white overflow-y-auto font-sans">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-[#1C210E] pb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white font-mono">
              My Forum Posts
            </h1>
            <p className="text-xs text-[#A4A896]/60 font-semibold mt-1">
              Manage your published articles and training insights.
            </p>
          </div>

          <Link
            href="/dashboard/trainer/add-forum"
            className="inline-flex items-center justify-center gap-1.5 bg-[#D4FF00] hover:bg-[#c2eb00] text-[#121212] font-black text-xs uppercase px-6 py-3.5 rounded hover:shadow-lg hover:shadow-[#D4FF00]/10 transition-all duration-200 select-none cursor-pointer self-start sm:self-auto"
          >
            <Plus className="h-4 w-4 stroke-[3px]" />
            <span>Create Post</span>
          </Link>
        </div>

        {/* Posts Grid Layout */}
        {postData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {postData.map(post => (
              <MyForumPostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="bg-[#13160B] border border-[#1C210E] rounded-3xl p-16 text-center flex flex-col items-center justify-center space-y-4">
            <span className="text-xs font-bold text-[#A4A896]/40 uppercase tracking-widest block font-mono">
              No Articles Published Yet
            </span>
            <Link
              href="/dashboard/trainer/add-forum-post"
              className="text-xs font-black uppercase tracking-wider text-[#D4FF00] hover:underline"
            >
              Write your first insight &rarr;
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyForumPosts;
