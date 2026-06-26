import React from 'react';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { User, Mail, Shield, Calendar, ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

const ProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect('/login');
  }

  const { user } = session;

  return (
    <div className="min-h-screen bg-[#0A0D02] text-white py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-[#13160B] border border-[#1C210E] rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#D4FF00] to-transparent opacity-80" />
        
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-widest text-[#A4A896]/60 hover:text-[#D4FF00] transition-colors duration-200 uppercase"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Go to Dashboard</span>
          </Link>
        </div>

        <div className="flex flex-col items-center text-center space-y-6">
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
            <h1 className="text-2xl font-black text-white truncate px-2 font-mono uppercase tracking-tight">
              {user?.name || 'Coach'}
            </h1>
            <div className="flex items-center justify-center gap-1.5 text-xs text-[#A4A896]/70 truncate px-2">
              <Mail className="h-3.5 w-3.5 text-[#A4A896]/50 flex-shrink-0" />
              <span className="truncate">{user?.email}</span>
            </div>
          </div>

          <div className="pt-2 w-full border-t border-[#1C210E]/60 space-y-4">
            <div className="flex justify-between items-center text-xs px-2">
              <span className="text-[#A4A896]/60 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#D4FF00]" /> Role
              </span>
              <span className="inline-block text-[10px] font-black uppercase tracking-widest bg-[#D4FF00]/10 text-[#D4FF00] px-3 py-1 rounded-full border border-[#D4FF00]/20 capitalize">
                {user?.role}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs px-2">
              <span className="text-[#A4A896]/60 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#D4FF00]" /> Status
              </span>
              <span className="text-white font-mono uppercase font-bold">
                Active Member
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
