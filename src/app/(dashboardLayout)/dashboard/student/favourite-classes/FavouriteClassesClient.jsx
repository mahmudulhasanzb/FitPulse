'use client';

import React from 'react';
import { Heart, Trash2, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { deleteFavorite } from '@/lib/api/mutations/actions';

const FavouriteClassesClient = ({ favorites }) => {
  const router = useRouter();

  const handleRemove = async (id) => {
    await deleteFavorite(id);
    toast.success('Removed from favorites');
    router.refresh();
  };

  return (
    <div className="flex-1 bg-[#0A0D02] min-h-screen px-6 py-10 md:px-12 md:py-16 text-white">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="border-b border-[#1C210E] pb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-[#D4FF00] tracking-widest uppercase mb-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Student Dashboard</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Favourite Classes</h1>
        </div>

        {favorites.length === 0 ? (
          <div className="bg-[#13160B] border border-[#1C210E] rounded-3xl p-12 text-center">
            <Heart className="h-10 w-10 text-[#A4A896]/20 mx-auto mb-4" />
            <p className="text-sm text-[#A4A896]/40 font-mono">No favorite classes yet</p>
            <Link href="/classes" className="inline-flex items-center gap-1 mt-4 text-xs font-black text-[#D4FF00] uppercase tracking-wider hover:underline">
              Explore Classes <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {favorites.map((f, i) => (
              <motion.div
                key={f._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="relative group bg-[#13160B] border border-[#1C210E] hover:border-[#D4FF00]/40 rounded-3xl overflow-hidden transition-all duration-300"
              >
                {f.classImage && (
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={f.classImage} alt={f.className} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <div className="p-5">
                  <h3 className="text-base font-extrabold text-white group-hover:text-[#D4FF00] transition-colors">{f.className}</h3>
                  <Link href={`/classes/${f.classId}`} className="text-[10px] font-black text-[#D4FF00] uppercase tracking-wider mt-2 inline-block hover:underline">
                    View Details
                  </Link>
                </div>
                <button
                  onClick={() => handleRemove(f._id)}
                  className="absolute top-3 right-3 p-2 bg-red-950/30 border border-red-500/20 text-red-400 hover:text-red-300 rounded-xl transition-colors cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavouriteClassesClient;
