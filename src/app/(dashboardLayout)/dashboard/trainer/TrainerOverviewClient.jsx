'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Dumbbell,
  User,
  Mail,
  Clock,
  Sparkles,
  ChevronRight,
  PlusCircle,
  Briefcase
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const TrainerOverviewClient = ({ user, classes = [], application }) => {
  const classCount = classes.length;
  const totalStudentEnrolled = classes.reduce((sum, cls) => sum + (cls.totalEnrollment || 0), 0);

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

  const specMap = {
    yoga: 'Yoga',
    weights: 'Weights / Strength Training',
    cardio: 'Cardio',
    hiit: 'HIIT',
    pilates: 'Pilates',
    other: 'Fitness Coaching'
  };

  const specialtyDisplay = application?.specialty ? (specMap[application.specialty] || application.specialty) : 'Personal Training';
  const experienceYears = application?.experience ? `${application.experience} Years of Experience` : 'Certified Coach';

  return (
    <div className="flex-1 bg-[#0A0D02] min-h-screen px-6 py-10 md:px-12 md:py-16 text-white overflow-y-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto space-y-10"
      >
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-[#1C210E] pb-6"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#D4FF00] tracking-widest uppercase mb-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Trainer Portal</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
              Welcome Back, Coach {user?.name ? user.name.split(' ')[0] : 'Trainer'}!
            </h1>
          </div>
          <div className="text-xs text-[#A4A896]/60 font-semibold md:text-right">
            <span className="block text-[#A4A896]/40 uppercase tracking-widest font-bold">
              Today
            </span>
            <span>{today}</span>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          <div className="relative group bg-[#13160B] border border-[#1C210E] rounded-3xl p-6 overflow-hidden transition-all duration-300 hover:border-[#D4FF00]/40">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4FF00]/5 rounded-bl-full pointer-events-none group-hover:bg-[#D4FF00]/10 transition-all duration-300" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#A4A896]/60 uppercase tracking-wider">
                  Total Classes Created
                </p>
                <h3 className="text-4xl md:text-5xl font-black mt-2 text-white font-mono tracking-tight">
                  {classCount}
                </h3>
              </div>
              <div className="p-3 bg-[#1A1F0F] rounded-2xl border border-[#282F18]">
                <Dumbbell className="h-6 w-6 text-[#D4FF00]" />
              </div>
            </div>
            <Link href="/dashboard/trainer/classes" className="mt-4 flex items-center gap-1 text-[11px] font-bold text-[#D4FF00] tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
              <span>Manage Classes</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="relative group bg-[#13160B] border border-[#1C210E] rounded-3xl p-6 overflow-hidden transition-all duration-300 hover:border-[#D4FF00]/40">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4FF00]/5 rounded-bl-full pointer-events-none group-hover:bg-[#D4FF00]/10 transition-all duration-300" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#A4A896]/60 uppercase tracking-wider">
                  Total Students Enrolled
                </p>
                <h3 className="text-4xl md:text-5xl font-black mt-2 text-white font-mono tracking-tight">
                  {totalStudentEnrolled}
                </h3>
              </div>
              <div className="p-3 bg-[#1A1F0F] rounded-2xl border border-[#282F18]">
                <Users className="h-6 w-6 text-[#D4FF00]" />
              </div>
            </div>
            <Link href="/dashboard/trainer/classes" className="mt-4 flex items-center gap-1 text-[11px] font-bold text-[#D4FF00] tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
              <span>View Roster</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-5 gap-6"
        >
          <div className="md:col-span-2 bg-[#13160B] border border-[#1C210E] rounded-3xl p-6 flex flex-col items-center text-center space-y-6">
            <div className="w-full text-left">
              <h3 className="text-xs font-bold text-[#A4A896]/40 uppercase tracking-widest">
                Profile Details
              </h3>
            </div>

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

            <div className="space-y-2 w-full">
              <h2 className="text-xl font-bold text-white truncate px-2">
                {user?.name || 'Guest Trainer'}
              </h2>
              <div className="flex items-center justify-center gap-1.5 text-xs text-[#A4A896]/70 truncate px-2">
                <Mail className="h-3.5 w-3.5 text-[#A4A896]/50 flex-shrink-0" />
                <span className="truncate">
                  {user?.email || 'trainer@fitpulse.com'}
                </span>
              </div>
            </div>

            <div className="pt-2 w-full">
              <div className="inline-block text-xs font-black uppercase tracking-widest bg-[#D4FF00]/10 text-[#D4FF00] px-4 py-1.5 rounded-full border border-[#D4FF00]/20">
                Trainer
              </div>
            </div>
          </div>

          <div className="md:col-span-3 bg-[#13160B] border border-[#1C210E] rounded-3xl p-6 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-xs font-bold text-[#A4A896]/40 uppercase tracking-widest">
                Trainer Overview Summary
              </h3>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1.5">
                  <Briefcase className="h-4.5 w-4.5 text-[#D4FF00]" />
                  <span className="text-xs text-[#A4A896]/80 font-bold uppercase tracking-wider">
                    {experienceYears}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock className="h-4.5 w-4.5 text-[#D4FF00]" />
                  <span className="text-xs text-[#A4A896]/80 font-bold uppercase tracking-wider">
                    Verified Coach status
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Specialization
                </h4>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#1A1F0F] border border-[#282F18] text-[#D4FF00] px-3 py-1 rounded-full">
                    {specialtyDisplay}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Professional Bio
                </h4>
                <p className="text-xs text-[#A4A896]/80 leading-relaxed">
                  Certified trainer specializing in fitness training and athletic conditioning. Passionate about empowering athletes to crush milestones and build consistency.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#1C210E]/60 flex items-center justify-between">
              <span className="text-[11px] text-[#A4A896]/50 font-semibold">
                Status: Verified Coach
              </span>
              <Link href="/dashboard/trainer/classes/add-class" className="flex items-center gap-1.5 text-xs font-bold bg-[#D4FF00] hover:bg-[#c2eb00] text-[#121212] px-4 py-2.5 rounded-full cursor-pointer transition-colors duration-200 uppercase">
                <PlusCircle className="h-3.5 w-3.5" />
                <span>Create New Class</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TrainerOverviewClient;
