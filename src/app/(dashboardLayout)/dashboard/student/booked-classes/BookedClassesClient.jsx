'use client';

import React from 'react';
import { Calendar, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const BookedClassesClient = ({ bookings }) => {
  return (
    <div className="flex-1 bg-[#0A0D02] min-h-screen px-6 py-10 md:px-12 md:py-16 text-white">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="border-b border-[#1C210E] pb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-[#D4FF00] tracking-widest uppercase mb-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Student Dashboard</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Booked Classes</h1>
        </div>

        <div className="bg-[#13160B] border border-[#1C210E] rounded-3xl overflow-hidden">
          {bookings.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-sm text-[#A4A896]/40 font-mono">No booked classes yet</p>
              <Link href="/classes" className="inline-flex items-center gap-1 mt-4 text-xs font-black text-[#D4FF00] uppercase tracking-wider hover:underline">
                Explore Classes <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#1C210E]/60">
                <thead>
                  <tr className="bg-[#181C0E]/40">
                    <th className="px-6 py-4 text-[10px] font-black text-[#A4A896]/40 uppercase tracking-widest text-left">Class Name</th>
                    <th className="px-6 py-4 text-[10px] font-black text-[#A4A896]/40 uppercase tracking-widest text-left">Trainer</th>
                    <th className="px-6 py-4 text-[10px] font-black text-[#A4A896]/40 uppercase tracking-widest text-left">Schedule</th>
                    <th className="px-6 py-4 text-[10px] font-black text-[#A4A896]/40 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1C210E]/40">
                  {bookings.map((b, i) => (
                    <motion.tr
                      key={b._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="hover:bg-[#1C210E]/20 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-bold text-white">{b.className}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#A4A896]/70">{b.trainerName || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-xs text-[#A4A896]/60 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {b.schedule || 'Flexible'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <Link
                          href={`/classes/${b.classId}`}
                          className="text-[10px] font-black uppercase tracking-wider text-[#D4FF00] hover:underline"
                        >
                          View Details
                        </Link>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookedClassesClient;
