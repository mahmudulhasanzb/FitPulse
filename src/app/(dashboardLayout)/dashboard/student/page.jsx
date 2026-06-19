'use client';

import React, { useState } from 'react';
import { useSession } from '@/lib/auth-client';
import { motion } from 'framer-motion';
import {
  Calendar,
  Heart,
  User,
  Mail,
  Clock,
  AlertTriangle,
  ChevronRight,
  Sparkles,
  FileText,
} from 'lucide-react';
import Image from 'next/image';

const StudentOverViewPage = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const [appStatus, setAppStatus] = useState('rejected');

  const stats = {
    bookedClasses: 5,
    favorites: 8,
  };

  const adminFeedback =
    'Please verify your personal fitness credentials and upload a clear, high-resolution copy of your certification document. The provided certificate was expired. You can re-apply once updated.';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 70,
        damping: 14,
      },
    },
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex-1 bg-[#0A0D02] min-h-screen px-6 py-10 md:px-12 md:py-16 text-white overflow-y-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto space-y-10"
      >
        {/* Top Header */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-[#1C210E] pb-6"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#D4FF00] tracking-widest uppercase mb-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Student Dashboard</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
              Welcome Back, {user?.name ? user.name.split(' ')[0] : 'Athlete'}!
            </h1>
          </div>
          <div className="text-xs text-[#A4A896]/60 font-semibold md:text-right">
            <span className="block text-[#A4A896]/40 uppercase tracking-widest font-bold">
              Today
            </span>
            <span>{today}</span>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {/* Booked Classes Card */}
          <div className="relative group bg-[#13160B] border border-[#1C210E] rounded-3xl p-6 overflow-hidden transition-all duration-300 hover:border-[#D4FF00]/40">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4FF00]/5 rounded-bl-full pointer-events-none group-hover:bg-[#D4FF00]/10 transition-all duration-300" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#A4A896]/60 uppercase tracking-wider">
                  Booked Classes
                </p>
                <h3 className="text-4xl md:text-5xl font-black mt-2 text-white font-mono tracking-tight">
                  {stats.bookedClasses}
                </h3>
              </div>
              <div className="p-3 bg-[#1A1F0F] rounded-2xl border border-[#282F18]">
                <Calendar className="h-6 w-6 text-[#D4FF00]" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-[11px] font-bold text-[#D4FF00] tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
              <span>View Bookings</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Favorites Card */}
          <div className="relative group bg-[#13160B] border border-[#1C210E] rounded-3xl p-6 overflow-hidden transition-all duration-300 hover:border-[#D4FF00]/40">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-bl-full pointer-events-none group-hover:bg-red-500/10 transition-all duration-300" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#A4A896]/60 uppercase tracking-wider">
                  Favorite Classes
                </p>
                <h3 className="text-4xl md:text-5xl font-black mt-2 text-white font-mono tracking-tight">
                  {stats.favorites}
                </h3>
              </div>
              <div className="p-3 bg-[#1F1414] rounded-2xl border border-[#2F1818]">
                <Heart className="h-6 w-6 text-red-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-[11px] font-bold text-red-400 tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
              <span>View Favorites</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </motion.div>

        {/* Profile and Details Layout */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-5 gap-6"
        >
          {/* Profile Details Block */}
          <div className="md:col-span-2 bg-[#13160B] border border-[#1C210E] rounded-3xl p-6 flex flex-col items-center text-center space-y-6">
            <div className="w-full text-left">
              <h3 className="text-xs font-bold text-[#A4A896]/40 uppercase tracking-widest">
                Profile Details
              </h3>
            </div>

            {/* Avatar */}
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-[#1C210E] p-1 bg-[#14180A]/60 flex items-center justify-center">
              {user?.image ? (
                <div className="w-full h-full rounded-full overflow-hidden relative">
                  <Image
                    src={user.image}
                    fill
                    alt="User avatar"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-full rounded-full bg-[#1C210E] flex items-center justify-center">
                  <User className="h-10 w-10 text-[#A4A896]/60" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="space-y-2 w-full">
              <h2 className="text-xl font-bold text-white truncate px-2">
                {user?.name || 'Guest User'}
              </h2>
              <div className="flex items-center justify-center gap-1.5 text-xs text-[#A4A896]/70 truncate px-2">
                <Mail className="h-3.5 w-3.5 text-[#A4A896]/50 flex-shrink-0" />
                <span className="truncate">
                  {user?.email || 'guest@fitpulse.com'}
                </span>
              </div>
            </div>

            {/* Role Badge */}
            <div className="pt-2 w-full">
              <div className="inline-block text-xs font-black uppercase tracking-widest bg-[#D4FF00]/10 text-[#D4FF00] px-4 py-1.5 rounded-full border border-[#D4FF00]/20">
                User
              </div>
            </div>
          </div>

          {/* Trainer Application Status Block */}
          <div className="md:col-span-3 bg-[#13160B] border border-[#1C210E] rounded-3xl p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-[#A4A896]/40 uppercase tracking-widest">
                  Trainer Application
                </h3>

                {/* Switch states button for testing */}
                <div className="flex items-center gap-1 bg-[#14180A] border border-[#1C210E] p-0.5 rounded-lg">
                  <button
                    onClick={() => setAppStatus('pending')}
                    className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded transition-colors ${
                      appStatus === 'pending'
                        ? 'bg-[#282F18] text-[#D4FF00]'
                        : 'text-[#A4A896]/50 hover:text-white'
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => setAppStatus('rejected')}
                    className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded transition-colors ${
                      appStatus === 'rejected'
                        ? 'bg-[#282F18] text-[#D4FF00]'
                        : 'text-[#A4A896]/50 hover:text-white'
                    }`}
                  >
                    Rejected
                  </button>
                </div>
              </div>

              {appStatus === 'pending' ? (
                /* Pending Application View */
                <div className="space-y-4 pt-4">
                  <div className="inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider">
                    <Clock className="h-4 w-4" />
                    <span>Pending Review</span>
                  </div>
                  <h4 className="text-lg font-bold text-white">
                    Application Received
                  </h4>
                  <p className="text-xs md:text-sm text-[#A4A896]/80 leading-relaxed">
                    Thank you for applying to be a trainer at FitPulse! Your
                    application credentials, experience, and slots are currently
                    being evaluated by our team. This process normally takes 2-3
                    business days.
                  </p>
                </div>
              ) : (
                /* Rejected Application View */
                <div className="space-y-4 pt-4">
                  <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-400 border border-red-500/20 px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Application Rejected</span>
                  </div>
                  <h4 className="text-lg font-bold text-white">
                    Application Review Feedback
                  </h4>

                  {/* Feedback Message */}
                  <div className="bg-[#1C1111]/30 border border-[#2F1818] rounded-2xl p-4 space-y-2">
                    <div className="text-[10px] font-black uppercase tracking-widest text-red-400/80">
                      Feedback from Administrator
                    </div>
                    <p className="text-xs text-[#A4A896]/90 leading-relaxed italic">
                      "{adminFeedback}"
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer actions inside the card */}
            <div className="mt-8 pt-4 border-t border-[#1C210E]/60 flex items-center justify-between">
              <span className="text-[11px] text-[#A4A896]/50 font-semibold">
                {appStatus === 'pending'
                  ? 'Submitted on Jun 19, 2026'
                  : 'Status update on Jun 20, 2026'}
              </span>
              {appStatus === 'rejected' && (
                <button className="flex items-center gap-1.5 text-xs font-bold bg-[#D4FF00] hover:bg-[#c2eb00] text-[#121212] px-4 py-2.5 rounded-full cursor-pointer transition-colors duration-200 uppercase">
                  <FileText className="h-3.5 w-3.5" />
                  <span>Re-apply Now</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StudentOverViewPage;
