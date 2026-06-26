'use client';

import React, { useState, useEffect } from 'react';
import { Briefcase, Clock, Sparkles, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { addTrainerApplication } from '@/lib/api/mutations/actions';
import { useSession } from '@/lib/auth-client';
import { baseUrl } from '@/lib/api/baseUrl';

const ApplyAsTrainerClient = ({ existing }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const [submitting, setSubmitting] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    if (!user?.email) return;
    fetch(`${baseUrl}/api/users`)
      .then(res => res.json())
      .then(users => {
        const currentUser = users.find(u => u.email === user.email);
        if (currentUser?.status === 'blocked') setIsBlocked(true);
      })
      .catch(e => console.error(e));
  }, [user]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (isBlocked) {
      toast.error('Action restricted by Admin');
      return;
    }
    setSubmitting(true);
    const res = await addTrainerApplication(data);
    if (res.acknowledged) {
      toast.success('Application submitted successfully');
      router.refresh();
    } else {
      toast.error(res.msg || 'Failed to submit application');
    }
    setSubmitting(false);
  };

  if (existing) {
    return (
      <div className="flex-1 bg-[#0A0D02] min-h-screen px-6 py-10 md:px-12 md:py-16 text-white">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="border-b border-[#1C210E] pb-6">
            <div className="flex items-center gap-2 text-xs font-bold text-[#D4FF00] tracking-widest uppercase mb-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Student Dashboard</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Apply as Trainer</h1>
          </div>

          <div className="bg-[#13160B] border border-[#1C210E] rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-3 rounded-xl ${
                existing.status === 'Approved' ? 'bg-[#D4FF00]/10' :
                existing.status === 'Rejected' ? 'bg-red-500/10' : 'bg-yellow-500/10'
              }`}>
                {existing.status === 'Approved' ? <CheckCircle2 className="h-6 w-6 text-[#D4FF00]" /> :
                 existing.status === 'Rejected' ? <XCircle className="h-6 w-6 text-red-400" /> :
                 <Clock className="h-6 w-6 text-yellow-400" />}
              </div>
              <div>
                <h2 className="text-lg font-black text-white uppercase tracking-tight">
                  Application {existing.status}
                </h2>
                <p className="text-xs text-[#A4A896]/60 mt-1">
                  {existing.status === 'Pending' ? 'Your application is under review.' :
                   existing.status === 'Approved' ? 'Congratulations! You are now a trainer.' :
                   'Your application was not approved.'}
                </p>
              </div>
            </div>

            {existing.status === 'Rejected' && existing.feedback && (
              <div className="bg-[#1C1111]/30 border border-[#2F1818] rounded-2xl p-5">
                <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-red-400/80 mb-2">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  Feedback from Administrator
                </div>
                <p className="text-sm text-[#A4A896]/90 italic">"{existing.feedback}"</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#0A0D02] min-h-screen px-6 py-10 md:px-12 md:py-16 text-white">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="border-b border-[#1C210E] pb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-[#D4FF00] tracking-widest uppercase mb-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Student Dashboard</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Apply as Trainer</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-[#13160B] border border-[#1C210E] rounded-3xl p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-[#A4A896]/60 uppercase tracking-widest block">
              Years of Experience
            </label>
            <input
              type="number"
              {...register('experience', {
                required: 'Experience is required',
                min: { value: 0, message: 'Must be 0 or more' },
              })}
              placeholder="e.g. 3"
              className="w-full bg-[#0A0D02] border border-[#282F18] rounded-xl py-3.5 px-4 text-sm text-white placeholder-[#A4A896]/30 focus:outline-none focus:border-[#D4FF00] transition-colors"
            />
            <p className="text-red-500 text-xs mt-1">{errors?.experience?.message}</p>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-[#A4A896]/60 uppercase tracking-widest block">
              Specialty
            </label>
            <div className="relative">
              <select
                defaultValue=""
                {...register('specialty', { required: 'Specialty is required' })}
                className="w-full bg-[#0A0D02] border border-[#282F18] rounded-xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-[#D4FF00] appearance-none cursor-pointer transition-colors"
              >
                <option value="" disabled>Select specialty</option>
                <option value="yoga">Yoga</option>
                <option value="weights">Weights / Strength Training</option>
                <option value="cardio">Cardio</option>
                <option value="hiit">HIIT</option>
                <option value="pilates">Pilates</option>
                <option value="other">Other</option>
              </select>
            </div>
            <p className="text-red-500 text-xs mt-1">{errors?.specialty?.message}</p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#D4FF00] hover:bg-[#c2eb00] text-black font-black text-xs uppercase py-4 rounded-xl transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Briefcase className="h-4 w-4" />
            {submitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyAsTrainerClient;
