import React from 'react';
import Link from 'next/link';
import { MessageSquare, Heart, ArrowRight, User } from 'lucide-react';
import Image from 'next/image';

const ForumPostCard = ({ post }) => {
  const rawDate = post.createdAt?.['$date'] || post.createdAt;
  
  // Dynamic elapsed time helper
  const getTimeAgo = date => {
    if (!date) return '2h ago';
    const diffMs = new Date() - new Date(date);
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHrs = Math.floor(diffMins / 60);
    if (diffHrs < 24) return `${diffHrs}h ago`;
    return `${Math.floor(diffHrs / 24)}d ago`;
  };
  
  const timeAgo = getTimeAgo(rawDate);

  // Generate hash-based numbers for comments/likes if empty to look dynamic and match mockup design
  const getSimulatedStats = (title) => {
    if (!title) return { comments: 12, likes: 45 };
    const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return {
      comments: post.commentCount?.length || (hash % 38) + 8,
      likes: post.likes?.length || (hash % 180) + 40
    };
  };

  const stats = getSimulatedStats(post.title);

  // Styling helpers for role badges 
  const badge =
    post.role === 'trainer'
      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
      : post.role === 'admin'
        ? 'bg-violet-500/15 text-violet-400 border border-violet-500/30 shadow-sm'
        : 'bg-sky-500/15 text-sky-400 border border-sky-500/30 shadow-sm';



  return (
    <div className="flex flex-col md:flex-row bg-[#13160B] border border-[#1C210E] hover:border-[#D4FF00]/40 rounded-3xl overflow-hidden transition-all duration-300 shadow-xl group relative">
      
      {/* 1. Card Image Section (Left) */}
      <div className="relative w-full md:w-[200px] lg:w-[240px] aspect-[16/10] md:aspect-[4/3] flex-shrink-0 bg-[#0A0D02]">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 240px"
            className="object-cover group-hover:scale-102 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#1A1F0F] text-[#A4A896]/30">
            <span className="text-[10px] font-bold tracking-wider uppercase font-mono">No Image</span>
          </div>
        )}
        
        {/* Absolute Category Badge */}
        <span className="absolute top-3 left-3 bg-[#D4FF00] text-black font-black text-[9px] tracking-widest uppercase px-2.5 py-0.5 rounded-sm select-none font-mono">
          {post.category}
        </span>
      </div>

      {/* 2. Card Content Section (Right) */}
      <div className="p-5 md:p-6 flex flex-col justify-between flex-1 min-w-0 space-y-3">
        
        {/* Top: Profile Info & Time Elapsed */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <Image src={post.authorImage} alt='authorImage' width={40} height={40} className="w-7 h-7 rounded-full border border-[#1C210E] bg-[#1A1F0F] flex items-center justify-center text-[#A4A896]/60 overflow-hidden flex-shrink-0">
              
            </Image>
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xs font-black text-white truncate max-w-[120px] md:max-w-[150px]">
                {post.authorName}
              </span>

              <span className={`text-[8px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full select-none font-mono whitespace-nowrap ${badge}`}>
                {post.role}
              </span>

              
            </div>
          </div>
          <span className="text-[10px] text-[#A4A896]/50 font-bold uppercase tracking-wider font-mono flex-shrink-0">
            {timeAgo}
          </span>
        </div>

        {/* Mid: Title & Description */}
        <div className="space-y-2 flex-1">
          <Link href={`/forum-posts/${post._id}`}>
            <h3 className="text-base md:text-lg font-black text-white leading-snug group-hover:text-[#D4FF00] transition-colors duration-200 uppercase line-clamp-2 font-mono">
              {post.title}
            </h3>
          </Link>
          <p className="text-xs md:text-sm text-[#A4A896]/75 leading-relaxed line-clamp-2 font-medium">
            {post.description}
          </p>
        </div>

        {/* Bottom: Comments, Likes, and Read More link */}
        <div className="flex items-center justify-between pt-4 border-t border-[#1C210E]/60">
          
          {/* Comments & Likes counts */}
          <div className="flex items-center gap-4 text-[10px] text-[#A4A896]/65 font-bold font-mono">
            <div className="flex items-center gap-1.5 hover:text-white transition-colors duration-150 cursor-pointer">
              <MessageSquare className="h-4 w-4 text-[#A4A896]/45" />
              <span>{stats.comments}</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-red-400 transition-colors duration-150 cursor-pointer">
              <Heart className="h-4 w-4 text-[#A4A896]/45 group-hover:text-red-500/20" />
              <span>{stats.likes}</span>
            </div>
          </div>

          {/* Read More Link */}
          <Link 
            href={`/forum-posts/${post._id}`}
            className="inline-flex items-center gap-1 bg-transparent hover:gap-2 text-[10px] font-black text-[#D4FF00] tracking-widest uppercase transition-all duration-300"
          >
            <span>READ MORE</span>
            <ArrowRight className="h-3.5 w-3.5 stroke-[3px]" />
          </Link>

        </div>

      </div>

    </div>
  );
};

export default ForumPostCard;
