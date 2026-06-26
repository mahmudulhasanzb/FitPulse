'use client';

import React from 'react';
import { CheckCircle2, XCircle, Trash2, Clock, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { updateAdminClass } from '@/lib/api/mutations/actions';
import { deleteClasses } from '@/lib/api/classes/action';
import { useState } from 'react';

const ManageClassesClient = ({ classes }) => {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState(null);

  const handleStatus = async (id, status) => {
    await updateAdminClass(id, { status });
    toast.success(`Class ${status}`);
    router.refresh();
  };

  const handleDelete = async (id) => {
    await deleteClasses(id);
    toast.success('Class deleted');
    setDeleteId(null);
    router.refresh();
  };

  return (
    <div className="flex-1 bg-[#0A0D02] min-h-screen px-6 py-10 md:px-12 md:py-16 text-white">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="border-b border-[#1C210E] pb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-[#D4FF00] tracking-widest uppercase mb-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Admin Console</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Manage Classes</h1>
        </div>

        <div className="bg-[#13160B] border border-[#1C210E] rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#1C210E]/60">
              <thead>
                <tr className="bg-[#181C0E]/40">
                  <th className="px-6 py-4 text-[10px] font-black text-[#A4A896]/40 uppercase tracking-widest text-left">Class</th>
                  <th className="px-6 py-4 text-[10px] font-black text-[#A4A896]/40 uppercase tracking-widest text-left">Trainer</th>
                  <th className="px-6 py-4 text-[10px] font-black text-[#A4A896]/40 uppercase tracking-widest text-left">Status</th>
                  <th className="px-6 py-4 text-[10px] font-black text-[#A4A896]/40 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C210E]/40">
                {classes.map((c, i) => (
                  <motion.tr
                    key={c._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="hover:bg-[#1C210E]/20 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-white">{c.className}</div>
                      <div className="text-[10px] text-[#A4A896]/50 mt-0.5">{c.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#A4A896]/70">{c.authorName || c.authorEmail}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border inline-flex items-center gap-1 ${
                        c.status === 'Approved' ? 'bg-[#D4FF00]/10 text-[#D4FF00] border-[#D4FF00]/20' :
                        c.status === 'Rejected' ? 'bg-red-500/15 text-red-400 border-red-500/30' :
                        'bg-yellow-500/15 text-yellow-400 border-yellow-500/30'
                      }`}>
                        {c.status === 'Pending' && <Clock className="h-3 w-3" />}
                        {c.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="inline-flex items-center gap-2">
                        {c.status !== 'Approved' && (
                          <button
                            onClick={() => handleStatus(c._id, 'Approved')}
                            className="p-1.5 bg-green-950/30 border border-green-500/20 text-green-400 hover:text-green-300 rounded-lg transition-colors cursor-pointer"
                            title="Approve"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                        {c.status !== 'Rejected' && (
                          <button
                            onClick={() => handleStatus(c._id, 'Rejected')}
                            className="p-1.5 bg-red-950/30 border border-red-500/20 text-red-400 hover:text-red-300 rounded-lg transition-colors cursor-pointer"
                            title="Reject"
                          >
                            <XCircle className="h-3.5 w-3.5" />
                          </button>
                        )}
                        {deleteId === c._id ? (
                          <div className="inline-flex items-center gap-1">
                            <button
                              onClick={() => handleDelete(c._id)}
                              className="px-2 py-1 bg-red-600 text-white text-[8px] font-black uppercase rounded cursor-pointer"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setDeleteId(null)}
                              className="px-2 py-1 bg-[#1C210E] text-[#A4A896] text-[8px] font-black uppercase rounded cursor-pointer"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteId(c._id)}
                            className="p-1.5 bg-red-950/30 border border-red-500/20 text-red-400 hover:text-red-300 rounded-lg transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
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

export default ManageClassesClient;
