'use client';

import React from 'react';
import { Trash2, MessageCircle, User, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { deleteForumPost } from '@/lib/api/forum/action';

const ManageForumClient = ({ posts }) => {
  const router = useRouter();

  const handleDelete = async (id) => {
    const formData = new FormData();
    formData.set('postId', id);
    await deleteForumPost(formData);
    toast.success('Post deleted');
    router.refresh();
  };

  return (
    <div className="flex-1 bg-[#0A0D02] min-h-screen px-6 py-10 md:px-12 md:py-16 text-white">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="border-b border-[#1C210E] pb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-[#D4FF00] tracking-widest uppercase mb-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Admin Console</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Manage Forum Posts</h1>
        </div>

        <div className="bg-[#13160B] border border-[#1C210E] rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#1C210E]/60">
              <thead>
                <tr className="bg-[#181C0E]/40">
                  <th className="px-6 py-4 text-[10px] font-black text-[#A4A896]/40 uppercase tracking-widest text-left">Title</th>
                  <th className="px-6 py-4 text-[10px] font-black text-[#A4A896]/40 uppercase tracking-widest text-left">Author</th>
                  <th className="px-6 py-4 text-[10px] font-black text-[#A4A896]/40 uppercase tracking-widest text-left">Role</th>
                  <th className="px-6 py-4 text-[10px] font-black text-[#A4A896]/40 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C210E]/40">
                {posts.map((p, i) => (
                  <motion.tr
                    key={p._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.02 }}
                    className="hover:bg-[#1C210E]/20 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-white">{p.title}</div>
                      <div className="text-[10px] text-[#A4A896]/50 mt-0.5">{p.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#282F18] overflow-hidden flex-shrink-0">
                          {p.authorImage ? (
                            <img src={p.authorImage} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <User className="h-3 w-3 text-[#A4A896] m-1.5" />
                          )}
                        </div>
                        <span className="text-sm text-[#A4A896]/70">{p.authorName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border bg-violet-500/15 text-violet-400 border-violet-500/30">
                        {p.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => {
                          if (window.confirm('Delete this forum post?')) handleDelete(p._id);
                        }}
                        className="p-1.5 bg-red-950/30 border border-red-500/20 text-red-400 hover:text-red-300 rounded-lg transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageForumClient;
