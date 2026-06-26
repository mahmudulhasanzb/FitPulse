'use client';

import React from 'react';
import { User, Mail, AlertTriangle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { demoteTrainer } from '@/lib/api/mutations/actions';
import { useState } from 'react';

const ManageTrainersClient = ({ trainers }) => {
  const router = useRouter();
  const [confirmId, setConfirmId] = useState(null);

  const handleDemote = async (id) => {
    await demoteTrainer(id);
    toast.success('Trainer demoted to User');
    setConfirmId(null);
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
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Manage Trainers</h1>
        </div>

        <div className="bg-[#13160B] border border-[#1C210E] rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#1C210E]/60">
              <thead>
                <tr className="bg-[#181C0E]/40">
                  <th className="px-6 py-4 text-[10px] font-black text-[#A4A896]/40 uppercase tracking-widest text-left">Trainer</th>
                  <th className="px-6 py-4 text-[10px] font-black text-[#A4A896]/40 uppercase tracking-widest text-left">Email</th>
                  <th className="px-6 py-4 text-[10px] font-black text-[#A4A896]/40 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C210E]/40">
                {trainers.map((t, i) => (
                  <motion.tr
                    key={t._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="hover:bg-[#1C210E]/20 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#282F18] flex items-center justify-center overflow-hidden">
                          {t.image ? (
                            <img src={t.image} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <User className="h-4 w-4 text-[#A4A896]" />
                          )}
                        </div>
                        <span className="text-sm font-bold text-white">{t.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#A4A896]/70">{t.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {confirmId === t._id ? (
                        <div className="inline-flex items-center gap-2">
                          <span className="text-[10px] text-red-400 font-bold">Confirm?</span>
                          <button
                            onClick={() => handleDemote(t._id)}
                            className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-[9px] font-black uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                          >
                            Demote
                          </button>
                          <button
                            onClick={() => setConfirmId(null)}
                            className="px-3 py-1.5 bg-[#1C210E] text-[#A4A896] text-[9px] font-black uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmId(t._id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-950/30 border border-red-500/20 text-red-400 hover:text-red-300 text-[9px] font-black uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                        >
                          <AlertTriangle className="h-3 w-3" />
                          Demote to User
                        </button>
                      )}
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

export default ManageTrainersClient;
