import React from 'react';
import Link from 'next/link';
import { Eye, Trash2 } from 'lucide-react';
import { deleteForumPost } from '@/lib/api/add-forum/action';
import Image from 'next/image';

const MyForumPostCard = ({ post }) => {
  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Oct 12, 2023';

  // Simulated view count based on title hash to look dynamic and match mockup
  const getViewsCount = title => {
    if (!title) return '1.2K';
    const hash = title
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const num = (hash % 20) * 120 + 350;
    return num >= 1000 ? (num / 1000).toFixed(1) + 'K' : num.toString();
  };

  const viewsCount = getViewsCount(post.title);

  return (
    <div className="relative group bg-[#13160B] border border-[#1C210E] hover:border-[#D4FF00]/40 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col h-full shadow-xl">
      {/* Absolute overlay link for card clicks (excluding bottom actions) */}
      <Link
        href={`/dashboard/trainer/my-forum-posts/${post._id}`}
        className="absolute inset-0 z-0"
      />

      {/* Inner layout container */}
      <div className="flex flex-col h-full z-10 pointer-events-none">
        {/* Card Image Cover */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0A0D02]">
          {post.image ? (
            <img
              src={post.image}
              alt={post.title}
              // width={500}
              // height={500}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#1A1F0F] text-[#A4A896]/30">
              <span className="text-[10px] font-bold tracking-wider uppercase">
                No Image Asset
              </span>
            </div>
          )}

          {/* Absolute Category Badge */}
          <span className="absolute top-4 left-4 bg-[#0A0D02]/85 border border-[#D4FF00]/25 text-[#D4FF00] font-black text-[9px] tracking-widest uppercase px-3 py-1 rounded-full">
            {post.category || 'STRENGTH'}
          </span>
        </div>

        {/* Card Contents */}
        <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-[#A4A896]/35 uppercase tracking-widest block font-mono">
              {formattedDate}
            </span>
            <h3 className="text-base font-extrabold text-white leading-snug group-hover:text-[#D4FF00] transition-colors duration-200 line-clamp-2">
              {post.title}
            </h3>
          </div>

          {/* Footer Area */}
          <div className="flex items-center justify-between pt-4 border-t border-[#1C210E]/60 pointer-events-auto">
            {/* Views counter */}
            <div className="flex items-center gap-1.5 text-[10px] text-[#A4A896]/55 font-bold uppercase tracking-wider">
              <Eye className="h-3.5 w-3.5 text-[#A4A896]/40" />
              <span>{viewsCount} Views</span>
            </div>

            {/* Delete form action */}
            <form action={deleteForumPost} className="relative z-20">
              <input type="hidden" name="postId" value={post._id.toString()} />
              <button
                type="submit"
                className="flex items-center gap-1 text-[9px] font-black tracking-widest text-red-400 hover:text-red-300 uppercase cursor-pointer bg-transparent border-0 p-0 focus:outline-none transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5 text-red-500/80" />
                <span>Delete</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyForumPostCard;
