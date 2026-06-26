'use client';

import React from 'react';
import { useSession } from '@/lib/auth-client';
import { motion } from 'framer-motion';
import {
  Users, Dumbbell, User, Mail, Star, Clock, Sparkles, ChevronRight, PlusCircle, DollarSign, BookOpen,
} from 'lucide-react';
import Link from 'next/link';

const AdminOverviewClient = ({ stats }) => {
  const { data: session } = useSession();
  const user = session?.user;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 70, damping: 14 } },
  };

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="flex-1 bg-[#0A0D02] min-h-screen px-6 py-10 md:px-12 md:py-16 text-white overflow-y-auto">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-5xl mx-auto space-y-10">
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-[#1C210E] pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#D4FF00] tracking-widest uppercase mb-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Admin Console</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
              Welcome Back, <span className="text-[#D4FF00]">{user?.name ? user.name.split(' ')[0] : 'Admin'}</span>
            </h1>
          </div>
          <div className="text-xs text-[#A4A896]/60 font-semibold md:text-right">
            <span className="block text-[#A4A896]/40 uppercase tracking-widest font-bold">Today</span>
            <span>{today}</span>
          </div>
        </motion.div>

        <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {[
            { label: 'Total Users', value: stats.totalUsers, icon: Users, href: '/dashboard/admin/users', color: '#D4FF00' },
            { label: 'Total Trainers', value: stats.totalTrainers, icon: User, href: '/dashboard/admin/trainers', color: '#D4FF00' },
            { label: 'Total Classes', value: stats.totalClasses, icon: Dumbbell, href: '/dashboard/admin/classes', color: '#D4FF00' },
            { label: 'Total Bookings', value: stats.totalBookings, icon: BookOpen, href: '/dashboard/admin/classes', color: '#D4FF00' },
          ].map((stat, i) => (
            <motion.div key={i} variants={itemVariants} className="relative group bg-[#13160B] border border-[#1C210E] rounded-3xl p-6 overflow-hidden transition-all duration-300 hover:border-[#D4FF00]/40">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4FF00]/5 rounded-bl-full pointer-events-none group-hover:bg-[#D4FF00]/10 transition-all duration-300" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#A4A896]/60 uppercase tracking-wider">{stat.label}</p>
                  <h3 className="text-4xl md:text-5xl font-black mt-2 text-white font-mono tracking-tight">{stat.value}</h3>
                </div>
                <div className="p-3 bg-[#1A1F0F] rounded-2xl border border-[#282F18]">
                  <stat.icon className="h-6 w-6 text-[#D4FF00]" />
                </div>
              </div>
              <Link href={stat.href} className="mt-4 flex items-center gap-1 text-[11px] font-bold text-[#D4FF00] tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                <span>Manage</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="relative group bg-[#13160B] border border-[#1C210E] rounded-3xl p-6 overflow-hidden transition-all duration-300 hover:border-[#D4FF00]/40">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-[#A4A896]/60 uppercase tracking-wider">Total Revenue</p>
              <h3 className="text-4xl md:text-5xl font-black mt-2 text-[#D4FF00] font-mono tracking-tight">${Number(stats.totalRevenue || 0).toFixed(2)}</h3>
            </div>
            <div className="p-3 bg-[#1A1F0F] rounded-2xl border border-[#282F18]">
              <DollarSign className="h-6 w-6 text-[#D4FF00]" />
            </div>
          </div>
          <Link href="/dashboard/admin/transactions" className="mt-4 flex items-center gap-1 text-[11px] font-bold text-[#D4FF00] tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
            <span>View Transactions</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-[#13160B] border border-[#1C210E] rounded-3xl p-6 flex flex-col items-center text-center space-y-6">
          <div className="text-left w-full">
            <h3 className="text-xs font-bold text-[#A4A896]/40 uppercase tracking-widest">Profile Details</h3>
          </div>
          <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-[#1C210E] p-1 bg-[#14180A]/60">
            {user?.image ? (
              <img src={user.image} alt="" className="w-full h-full object-cover rounded-full" />
            ) : (
              <div className="w-full h-full rounded-full bg-[#1C210E] flex items-center justify-center">
                <User className="h-10 w-10 text-[#A4A896]/60" />
              </div>
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{user?.name || 'Admin'}</h2>
            <p className="text-xs text-[#A4A896]/70">{user?.email}</p>
          </div>
          <div className="inline-block text-xs font-black uppercase tracking-widest bg-violet-500/15 text-violet-400 px-4 py-1.5 rounded-full border border-violet-500/30">
            Admin
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminOverviewClient;
