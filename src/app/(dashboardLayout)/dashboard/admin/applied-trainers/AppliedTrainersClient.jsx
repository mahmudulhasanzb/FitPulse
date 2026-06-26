'use client';

import React, { useState } from 'react';
import { User, Mail, Clock, X, Sparkles, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { approveTrainerApplication } from '@/lib/api/mutations/actions';

const AppliedTrainersClient = ({ applications }) => {
  const router = useRouter();
  const [modalId, setModalId] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const selected = applications.find(a => a._id === modalId);

  const handleAction = async (status) => {
    if (!feedback.trim() && status === 'Rejected') {
      toast.error('Please provide feedback for rejection');
      return;
    }
    setSubmitting(true);
    await approveTrainerApplication(modalId, { status, feedback: feedback || '' });
    toast.success(`Application ${status}`);
    setModalId(null);
    setFeedback('');
    setSubmitting(false);
    router.refresh();
  };

  return (
    <div className="flex-1 bg-[#0A0D02] min-h-screen px-6 py-10 md:px-12 md:py-16 text-white">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="border-b border-[#1C210E] pb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-[#D4FF00] tracking-widest uppercase mb-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Admin Console</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Applied Trainers</h1>
        </div>

        <div className="bg-[#13160B] border border-[#1C210E] rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#1C210E]/60">
              <thead>
                <tr className="bg-[#181C0E]/40">
                  <th className="px-6 py-4 text-[10px] font-black text-[#A4A896]/40 uppercase tracking-widest text-left">Applicant</th>
                  <th className="px-6 py-4 text-[10px] font-black text-[#A4A896]/40 uppercase tracking-widest text-left">Specialty</th>
                  <th className="px-6 py-4 text-[10px] font-black text-[#A4A896]/40 uppercase tracking-widest text-left">Experience</th>
                  <th className="px-6 py-4 text-[10px] font-black text-[#A4A896]/40 uppercase tracking-widest text-left">Status</th>
                  <th className="px-6 py-4 text-[10px] font-black text-[#A4A896]/40 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C210E]/40">
                {applications.map((a, i) => (
                  <motion.tr
                    key={a._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="hover:bg-[#1C210E]/20 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#282F18] flex items-center justify-center overflow-hidden">
                          {a.userImage ? (
                            <img src={a.userImage} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <User className="h-4 w-4 text-[#A4A896]" />
                          )}
                        </div>
                        <span className="text-sm font-bold text-white">{a.userName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#A4A896]/70 capitalize">{a.specialty}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#A4A896]/70">{a.experience} years</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                        a.status === 'Approved' ? 'bg-[#D4FF00]/10 text-[#D4FF00] border-[#D4FF00]/20' :
                        a.status === 'Rejected' ? 'bg-red-500/15 text-red-400 border-red-500/30' :
                        'bg-yellow-500/15 text-yellow-400 border-yellow-500/30'
                      }`}>{a.status}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => { setModalId(a._id); setFeedback(a.feedback || ''); }}
                        className="px-3 py-1.5 bg-[#D4FF00] text-black text-[9px] font-black uppercase tracking-wider rounded-lg hover:bg-[#c2eb00] transition-colors cursor-pointer"
                      >
                        Details
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {modalId && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-[#13160B] border border-[#1C210E] rounded-3xl p-6 md:p-8 shadow-2xl">
            <button
              onClick={() => setModalId(null)}
              className="absolute top-4 right-4 p-1.5 bg-[#1C210E]/40 border border-[#282F18]/40 text-[#A4A896]/60 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            <h2 className="text-xl font-black uppercase tracking-tight text-white mb-6">Application Details</h2>

            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b border-[#1C210E]">
                <div className="w-12 h-12 rounded-full bg-[#282F18] overflow-hidden">
                  {selected.userImage ? (
                    <img src={selected.userImage} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <User className="h-6 w-6 text-[#A4A896] m-3" />
                  )}
                </div>
                <div>
                  <p className="text-white font-bold">{selected.userName}</p>
                  <p className="text-[#A4A896]/60 text-xs">{selected.userEmail}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#0A0D02] p-4 rounded-xl">
                  <p className="text-[9px] font-black text-[#A4A896]/40 uppercase tracking-widest">Experience</p>
                  <p className="text-white font-bold mt-1">{selected.experience} years</p>
                </div>
                <div className="bg-[#0A0D02] p-4 rounded-xl">
                  <p className="text-[9px] font-black text-[#A4A896]/40 uppercase tracking-widest">Specialty</p>
                  <p className="text-white font-bold mt-1 capitalize">{selected.specialty}</p>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#A4A896]/60 uppercase tracking-widest block mb-2">
                  Admin Feedback
                </label>
                <textarea
                  value={feedback}
                  onChange={e => setFeedback(e.target.value)}
                  rows={3}
                  placeholder="Write feedback for the applicant..."
                  className="w-full bg-[#0A0D02] border border-[#282F18] rounded-xl py-3 px-4 text-sm text-white placeholder-[#A4A896]/30 focus:outline-none focus:border-[#D4FF00] transition-colors resize-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-[#1C210E]">
                <button
                  onClick={() => handleAction('Approved')}
                  disabled={submitting}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#D4FF00] hover:bg-[#c2eb00] text-black font-black text-xs uppercase py-3 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Approve
                </button>
                <button
                  onClick={() => handleAction('Rejected')}
                  disabled={submitting}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase py-3 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
                >
                  <XCircle className="h-4 w-4" />
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppliedTrainersClient;
