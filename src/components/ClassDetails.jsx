"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Clock, Award, Users, BookOpen, Star, Calendar, ArrowLeft } from 'lucide-react';
import ClassDetailsActions from './ClassDetailsActions';

const ClassDetails = ({ classData }) => {
  const router = useRouter();

  if (!classData) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-white">
        <p className="text-neutral-light text-lg mb-4">No class details found.</p>
        <button 
          onClick={() => router.back()}
          className="bg-white/5 border border-white/10 hover:bg-white/10 text-white px-5 py-2.5 rounded-xl text-xs uppercase font-bold tracking-widest cursor-pointer"
        >
          Go Back
        </button>
      </div>
    );
  }

  const {
    _id,
    className,
    authorRole,
    coverImage,
    category,
    difficulty,
    duration,
    price,
    schedule = [],
    startTime,
    description,
    totalEnrollment
  } = classData;

  const displayImage = coverImage || 'https://images.unsplash.com/photo-1483721310020-03333e577078';
  const displayDuration = typeof duration === 'number' ? `${duration} min` : duration;
  const displayPrice = typeof price === 'number' ? `$${price}` : price;
  const formattedSchedule = schedule.length > 0 
    ? `${schedule.join(', ')} at ${startTime || ''}` 
    : 'No schedule set';

  return (
    <div className="bg-[#0A0D02] min-h-screen text-white pb-20">
      
      {/* Hero Banner Section */}
      <div className="relative w-full h-[450px] overflow-hidden">
        <Image 
          src={displayImage} 
          alt={className || 'Class Detail banner'} 
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        {/* Dark subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D02] via-[#0A0D02]/35 to-transparent" />
        
        {/* Translucent Back Button */}
        <button 
          onClick={() => router.back()}
          className="absolute top-6 left-6 md:left-12 z-20 bg-[#121212]/30 backdrop-blur-md hover:bg-white/10 border border-white/10 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </button>

        {/* Dynamic Category/Difficulty badges & Title */}
        <div className="absolute bottom-8 left-6 md:left-12 z-10 flex flex-col gap-2.5 max-w-4xl">
          <div className="flex gap-2">
            {category && (
              <span className="bg-red-500/20 text-red-400 border border-red-500/20 text-[9px] md:text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded">
                {category}
              </span>
            )}
            {difficulty && (
              <span className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/20 text-[9px] md:text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded">
                {difficulty}
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-none mt-1">
            {className}
          </h1>
          {authorRole && (
            <p className="text-neutral-light/75 text-xs md:text-sm font-semibold mt-1">
              by <span className="capitalize">{authorRole}</span>
            </p>
          )}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: About Class & Detailed Cards */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* About Card */}
            <div className="bg-[#13160B] border border-white/5 p-6 md:p-8 rounded-2xl">
              <h2 className="text-base md:text-lg font-bold text-white mb-4 flex items-center gap-2 tracking-wide uppercase">
                <BookOpen className="w-4 h-4 text-primary" />
                About This Class
              </h2>
              <p className="text-neutral-light/90 text-sm md:text-base leading-relaxed font-normal">
                {description}
              </p>
            </div>

            {/* Class Details Card */}
            <div className="bg-[#13160B] border border-white/5 p-6 md:p-8 rounded-2xl">
              <h2 className="text-base md:text-lg font-bold text-white mb-6 flex items-center gap-2 tracking-wide uppercase">
                <Star className="w-4 h-4 text-primary" />
                Class Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Duration box */}
                <div className="bg-white/5 border border-white/5 p-5 rounded-xl flex flex-col justify-between h-32">
                  <span className="text-[10px] font-black text-neutral-light uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    Duration
                  </span>
                  <span className="text-base md:text-lg font-black text-white">{displayDuration}</span>
                </div>

                {/* Schedule box */}
                <div className="bg-white/5 border border-white/5 p-5 rounded-xl flex flex-col justify-between h-32">
                  <span className="text-[10px] font-black text-neutral-light uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    Schedule
                  </span>
                  <span className="text-xs font-extrabold text-white leading-relaxed break-words capitalize">{formattedSchedule}</span>
                </div>

                {/* Enrolled box */}
                <div className="bg-white/5 border border-white/5 p-5 rounded-xl flex flex-col justify-between h-32">
                  <span className="text-[10px] font-black text-neutral-light uppercase tracking-wider flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-primary" />
                    Enrolled
                  </span>
                  <span className="text-base md:text-lg font-black text-white">{totalEnrollment || 0} students</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Pricing & Action Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[#13160B] border border-white/5 p-6 rounded-2xl space-y-6 sticky top-6">
              
              {/* Pricing Display */}
              <div>
                <span className="text-4xl md:text-5xl font-black text-primary leading-none">{displayPrice}</span>
                <span className="block text-[11px] font-bold text-neutral-light/75 uppercase tracking-wider mt-1.5">per session</span>
              </div>

              {/* Stat Summary Box */}
              <div className="bg-white/5 border border-white/5 px-4 py-3 rounded-xl flex items-center gap-4 text-xs font-bold text-neutral-light/90">
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-primary" />
                  {totalEnrollment || 0} booked
                </span>
                <span className="text-white/10">|</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-primary" />
                  {displayDuration}
                </span>
              </div>

              {/* Actions Area */}
              <ClassDetailsActions classId={_id} />

              {/* Schedule Bottom Box */}
              <div className="bg-white/5 border border-white/5 px-4 py-4 rounded-xl space-y-2 text-left">
                <span className="text-[10px] font-bold text-neutral-light uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  Schedule
                </span>
                <p className="text-xs font-extrabold text-white uppercase tracking-wider leading-relaxed">
                  {formattedSchedule}
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default ClassDetails;
