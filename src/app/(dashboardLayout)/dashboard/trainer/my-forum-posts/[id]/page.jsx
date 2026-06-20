import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Activity, CheckCircle2, Zap, User } from 'lucide-react';
import { getMyForumPostById } from '@/lib/api/add-forum/data';
import Image from 'next/image';

const MyForumPostDetails = async ({ params }) => {
  const { id } = await params;
  const post = await getMyForumPostById(id);

  if (!post) {
    return (
      <div className="flex-1 bg-[#0A0D02] min-h-screen flex flex-col items-center justify-center text-white space-y-4">
        <h2 className="text-xl font-black uppercase tracking-widest text-[#A4A896]/50">
          Post Not Found
        </h2>
        <Link
          href="/dashboard/trainer/my-forum-posts"
          className="text-xs font-black uppercase text-[#D4FF00] hover:underline"
        >
          Back to list
        </Link>
      </div>
    );
  }

  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  // Time elapsed helper
  const getTimeAgo = date => {
    if (!date) return '3 hours ago';
    const diffMs = new Date() - new Date(date);
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHrs = Math.floor(diffMins / 60);
    if (diffHrs < 24) return `${diffHrs} hours ago`;
    return `${Math.floor(diffHrs / 24)} days ago`;
  };

  const timeAgo = getTimeAgo(post.createdAt);

  return (
    <div className="flex-1 bg-[#0A0D02] min-h-screen text-white overflow-y-auto font-sans">
      {/* 1. Full-Width Banner Cover Section */}
      <div className="relative w-full aspect-[21/9] md:aspect-[24/8] min-h-[320px] bg-black">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            // width={500}
            // height={500}
            className="w-full h-full object-cover opacity-60"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#13160B] to-[#0A0D02] flex items-center justify-center opacity-70 border-b border-[#1C210E]" />
        )}

        {/* Banner Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D02] via-[#0A0D02]/30 to-black/70 flex flex-col justify-between p-6 md:p-12">
          {/* Back button */}
          <div>
            <Link
              href="/dashboard/trainer/my-forum-posts"
              className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-widest text-white/60 hover:text-[#D4FF00] transition-colors duration-200 uppercase"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to dispatches</span>
            </Link>
          </div>

          {/* Title & Metadata */}
          <div className="space-y-4 max-w-4xl">
            <div className="flex items-center gap-3">
              <span className="bg-[#D4FF00] text-black font-black text-[9px] tracking-widest uppercase px-2.5 py-1 rounded">
                {post.category || 'PROTOCOL'}
              </span>
              <span className="text-[10px] text-white/60 font-bold uppercase tracking-wider font-mono">
                {timeAgo}
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white leading-tight font-mono">
              {post.title}
            </h1>

            {/* Author Profile block */}
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full border border-[#1C210E] bg-[#13160B] flex items-center justify-center text-[#A4A896]/60 overflow-hidden">
                <User className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-extrabold text-white">
                  {post.authorName || 'Marcus Sterling'}
                </div>
                <div className="text-[9px] font-black text-[#D4FF00] tracking-wider uppercase mt-0.5">
                  {post.role === 'trainer'
                    ? 'Lead Strength Specialist'
                    : 'Verified Coach'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Page Grid Content */}
      <div className="max-w-5xl mx-auto px-6 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left Column: Description & Insights (2/3 width) */}
          <div className="md:col-span-2 space-y-8 leading-relaxed text-sm md:text-base text-[#A4A896]/95">
            <p className="font-semibold text-white/90">{post.description}</p>

            <h2 className="text-lg font-black uppercase tracking-wider text-[#D4FF00] pt-4 font-mono">
              The Parallel Myth
            </h2>

            <p>
              While powerlifting standards mandate the hip-crease passing below
              the top of the patella, general hypertrophy and functional
              strength can be achieved at varying depths. Going "Ass to Grass"
              (ATG) recruits more glute and adductor involvement, but requires
              significant thoracic extension and ankle dorsiflexion to prevent
              the notorious 'butt wink'.
            </p>

            {/* Callout technical box */}
            <div className="bg-[#13160B] border-l-2 border-[#D4FF00] rounded-r-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-[#D4FF00] uppercase font-mono">
                <Zap className="h-4 w-4 fill-[#D4FF00]" />
                <span>Technical Insight: Biomechanical Efficiency</span>
              </div>
              <p className="text-xs italic text-[#A4A896]/80 leading-relaxed font-medium">
                "Think of your squat as a recursive function. If the input
                (mobility) is insufficient, the output (depth) will fail at a
                certain threshold. Debug your ankle mobility before scaling your
                depth."
              </p>
            </div>

            <p>
              In this guide, we break down the three primary levers of a
              successful squat descent: pelvic tilt, knee tracking, and foot
              pressure distribution. For most of our members, a depth just below
              parallel maintains the best tension-to-safety ratio.
            </p>

            {/* Capsule tags */}
            <div className="flex flex-wrap gap-2 pt-6">
              {['#squat-mechanics', '#strength-training', '#biomechanics'].map(
                tag => (
                  <span
                    key={tag}
                    className="text-[10px] font-bold text-[#A4A896]/45 bg-[#13160B] border border-[#1C210E] px-3.5 py-1.5 rounded-full uppercase font-mono"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
          </div>

          {/* Right Column: Spec cards (1/3 width) */}
          <div className="space-y-6">
            {/* Performance Data Widget Card */}
            <div className="bg-[#13160B] border border-[#1C210E] rounded-3xl p-6 space-y-5">
              <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-[#A4A896]/60 uppercase border-b border-[#1C210E] pb-3 font-mono">
                <Activity className="h-4 w-4 text-[#D4FF00]" />
                <span>Performance Data</span>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-[9px] text-[#A4A896]/40 font-bold uppercase tracking-wider block font-mono">
                    Target Load
                  </span>
                  <span className="text-sm font-extrabold text-[#D4FF00] uppercase mt-0.5 block">
                    85% 1RM
                  </span>
                </div>
                <div>
                  <span className="text-[9px] text-[#A4A896]/40 font-bold uppercase tracking-wider block font-mono">
                    Volume Phase
                  </span>
                  <span className="text-sm font-extrabold text-[#D4FF00] uppercase mt-0.5 block">
                    Hypertrophy II
                  </span>
                </div>
                <div>
                  <span className="text-[9px] text-[#A4A896]/40 font-bold uppercase tracking-wider block font-mono">
                    Effort Score
                  </span>
                  <span className="text-sm font-extrabold text-[#D4FF00] uppercase mt-0.5 block">
                    RPE 9
                  </span>
                </div>
              </div>
            </div>

            {/* Recommended Gear Card */}
            <div className="bg-[#13160B] border border-[#1C210E] rounded-3xl p-6 space-y-4">
              <div className="text-[10px] font-black tracking-widest text-[#A4A896]/60 uppercase border-b border-[#1C210E] pb-3 font-mono">
                Recommended Gear
              </div>

              <ul className="space-y-3 text-xs text-[#A4A896]/85 font-semibold">
                {[
                  'Heeled Lifting Shoes',
                  '7mm Neoprene Sleeves',
                  'Lever Action Belt',
                ].map(gear => (
                  <li key={gear} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#D4FF00] flex-shrink-0" />
                    <span>{gear}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyForumPostDetails;
