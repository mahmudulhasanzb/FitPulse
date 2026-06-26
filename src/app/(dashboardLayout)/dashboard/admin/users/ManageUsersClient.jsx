'use client';

import React, { useState } from 'react';
import { Shield, ShieldOff, Star, Mail, User, Search, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { updateUser } from '@/lib/api/mutations/actions';

const ManageUsersClient = ({ users }) => {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const filtered = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const handleBlock = async (id, currentStatus) => {
    const newStatus = currentStatus === 'blocked' ? 'active' : 'blocked';
    await updateUser(id, { status: newStatus });
    toast.success(`User ${newStatus === 'blocked' ? 'Blocked' : 'Unblocked'}`);
    router.refresh();
  };

  const handleMakeAdmin = async (id) => {
    await updateUser(id, { role: 'admin' });
    toast.success('User promoted to Admin');
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
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Manage Users</h1>
        </div>

        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-[#A4A896]/40 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full bg-[#13160B] border border-[#1C210E] text-white rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[#D4FF00] transition-colors"
          />
        </div>

        <div className="bg-[#13160B] border border-[#1C210E] rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#1C210E]/60">
              <thead>
                <tr className="bg-[#181C0E]/40">
                  <th className="px-6 py-4 text-[10px] font-black text-[#A4A896]/40 uppercase tracking-widest text-left">User</th>
                  <th className="px-6 py-4 text-[10px] font-black text-[#A4A896]/40 uppercase tracking-widest text-left">Email</th>
                  <th className="px-6 py-4 text-[10px] font-black text-[#A4A896]/40 uppercase tracking-widest text-left">Role</th>
                  <th className="px-6 py-4 text-[10px] font-black text-[#A4A896]/40 uppercase tracking-widest text-left">Status</th>
                  <th className="px-6 py-4 text-[10px] font-black text-[#A4A896]/40 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C210E]/40">
                {filtered.map((u, i) => (
                  <motion.tr
                    key={u._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="hover:bg-[#1C210E]/20 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#282F18] flex items-center justify-center overflow-hidden">
                          {u.image ? (
                            <img src={u.image} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <User className="h-4 w-4 text-[#A4A896]" />
                          )}
                        </div>
                        <span className="text-sm font-bold text-white">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#A4A896]/70">{u.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                        u.role === 'admin' ? 'bg-violet-500/15 text-violet-400 border-violet-500/30' :
                        u.role === 'trainer' ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' :
                        'bg-sky-500/15 text-sky-400 border-sky-500/30'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                        u.status === 'blocked' ? 'bg-red-500/15 text-red-400 border-red-500/30' : 'bg-[#D4FF00]/10 text-[#D4FF00] border-[#D4FF00]/20'
                      }`}>
                        {u.status || 'active'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="inline-flex items-center gap-2">
                        {u.role !== 'admin' && (
                          <button
                            onClick={() => handleMakeAdmin(u._id)}
                            className="p-1.5 bg-[#1C210E]/40 border border-[#282F18] text-yellow-400 hover:text-yellow-300 rounded-lg transition-colors cursor-pointer"
                            title="Make Admin"
                          >
                            <Star className="h-3.5 w-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => handleBlock(u._id, u.status)}
                          className={`p-1.5 border rounded-lg transition-colors cursor-pointer ${
                            u.status === 'blocked'
                              ? 'bg-green-950/30 border-green-500/20 text-green-400 hover:text-green-300'
                              : 'bg-red-950/30 border-red-500/20 text-red-400 hover:text-red-300'
                          }`}
                          title={u.status === 'blocked' ? 'Unblock' : 'Block'}
                        >
                          {u.status === 'blocked' ? <ShieldOff className="h-3.5 w-3.5" /> : <Shield className="h-3.5 w-3.5" />}
                        </button>
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

export default ManageUsersClient;
