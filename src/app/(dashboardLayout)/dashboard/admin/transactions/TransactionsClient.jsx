'use client';

import React from 'react';
import { DollarSign, Calendar, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const TransactionsClient = ({ transactions }) => {
  return (
    <div className="flex-1 bg-[#0A0D02] min-h-screen px-6 py-10 md:px-12 md:py-16 text-white">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="border-b border-[#1C210E] pb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-[#D4FF00] tracking-widest uppercase mb-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Admin Console</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Transactions</h1>
        </div>

        <div className="bg-[#13160B] border border-[#1C210E] rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#1C210E]/60">
              <thead>
                <tr className="bg-[#181C0E]/40">
                  <th className="px-6 py-4 text-[10px] font-black text-[#A4A896]/40 uppercase tracking-widest text-left">User Email</th>
                  <th className="px-6 py-4 text-[10px] font-black text-[#A4A896]/40 uppercase tracking-widest text-left">Class</th>
                  <th className="px-6 py-4 text-[10px] font-black text-[#A4A896]/40 uppercase tracking-widest text-left">Amount</th>
                  <th className="px-6 py-4 text-[10px] font-black text-[#A4A896]/40 uppercase tracking-widest text-left">Date</th>
                  <th className="px-6 py-4 text-[10px] font-black text-[#A4A896]/40 uppercase tracking-widest text-right">Transaction ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C210E]/40">
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-sm text-[#A4A896]/40 font-mono">
                      No transactions found
                    </td>
                  </tr>
                ) : (
                  transactions.map((tx, i) => (
                    <motion.tr
                      key={tx._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.02 }}
                      className="hover:bg-[#1C210E]/20 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#A4A896]/80">{tx.userEmail}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-bold">{tx.className || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-sm font-black text-[#D4FF00]">
                          <DollarSign className="h-3.5 w-3.5" />
                          {tx.amount}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-[#A4A896]/60">
                        {tx.createdAt ? new Date(tx.createdAt).toLocaleDateString() : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right font-mono text-[10px] text-[#A4A896]/50 truncate max-w-[120px]">{tx.transactionId}</td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsClient;
