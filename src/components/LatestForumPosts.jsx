'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Heart, ArrowRight, User } from 'lucide-react';
import Link from 'next/link';
import { getPaginatedForumPosts } from '@/lib/api/forum/data';
import Image from 'next/image';

const LatestForumPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPaginatedForumPosts(1).then(res => {
      const data = Array.isArray(res) ? res : Array.isArray(res?.data) ? res.data : [];
      setPosts(data.slice(0, 4));
    }).catch(() => {});
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 70, damping: 14 } },
  };

  return (
    <section className="relative bg-bg-dark px-6 md:px-16 py-24 z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight uppercase">
              Latest Forum Posts
            </h2>
            <p className="text-sm md:text-base text-neutral-light/70 mt-2">
              Fresh insights from our training community.
            </p>
          </div>
          <motion.a
            href="/forum-posts"
            whileHover={{ x: 3 }}
            className="inline-flex items-center gap-1 text-sm font-bold text-primary tracking-wider uppercase cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span>View All</span>
          </motion.a>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {posts.map(post => (
            <motion.div key={post._id} variants={itemVariants}>
              <Link href={`/forum-posts/${post._id}`} className="block group">
                <div className="bg-[#13160B] border border-[#1C210E] hover:border-[#D4FF00]/40 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col sm:flex-row h-full">
                  <div className="relative w-full sm:w-40 h-40 flex-shrink-0 bg-[#0A0D02]">
                    {post.image ? (
                      <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="160px" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#1A1F0F] text-[#A4A896]/30">
                        <span className="text-[9px] font-bold tracking-wider uppercase">No Image</span>
                      </div>
                    )}
                    <span className="absolute top-2 left-2 bg-[#D4FF00] text-black font-black text-[8px] tracking-widest uppercase px-2 py-0.5 rounded-sm">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-1 min-w-0">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[10px] text-[#A4A896]/50">
                        <span>{post.authorName}</span>
                        <span className="text-[#D4FF00]">•</span>
                        <span className="uppercase tracking-wider">{post.role}</span>
                      </div>
                      <h3 className="text-sm font-extrabold text-white leading-snug group-hover:text-[#D4FF00] transition-colors line-clamp-2 uppercase">
                        {post.title}
                      </h3>
                      <p className="text-xs text-[#A4A896]/70 line-clamp-2">{post.description}</p>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#1C210E]/60">
                      <div className="flex items-center gap-3 text-[10px] text-[#A4A896]/50">
                        <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" />{post.commentCount?.length || 0}</span>
                        <span className="flex items-center gap-1"><Heart className="h-3 w-3" />{post.likes?.length || 0}</span>
                      </div>
                      <span className="text-[9px] font-black text-[#D4FF00] uppercase tracking-wider group-hover:underline">Read</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LatestForumPosts;
