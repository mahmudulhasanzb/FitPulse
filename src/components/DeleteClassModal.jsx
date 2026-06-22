"use client";

import React, { useState } from 'react';
import { Trash2, AlertTriangle, X } from 'lucide-react';
import { deleteClasses } from '@/lib/api/classes/action';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const DeleteClassModal = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  
  const handleDelete = async () => {
    await deleteClasses(id);
    setIsOpen(false);
    toast.success('Class deleted successfully');
    router.refresh();
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-1.5 bg-[#1C210E]/40 border border-[#282F18] text-[#A4A896]/70 hover:text-red-400 rounded-lg transition-colors cursor-pointer"
        title="Delete Class"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 whitespace-normal">
          
          <div className="relative w-full max-w-md bg-[#13160B] border border-[#1C210E] rounded-3xl p-6 shadow-2xl shadow-black/50 text-left animate-in zoom-in-95 duration-200">
            
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1.5 bg-[#1C210E]/40 border border-[#282F18]/40 text-[#A4A896]/60 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3.5 mb-4">
              <div className="p-2.5 bg-red-950/30 border border-red-500/20 rounded-xl text-red-500">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-black uppercase tracking-wide text-white font-mono">
                Confirm Deletion
              </h3>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-[#A4A896]/80 leading-relaxed font-medium">
                Are you sure you want to delete this class? This action cannot be undone and will permanently remove all scheduling and student booking information.
              </p>
              
              
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 mt-6 border-t border-[#1C210E]/60 pt-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-xs font-black uppercase tracking-wider text-[#A4A896]/70 hover:text-white border border-[#282F18] bg-[#1C210E]/20 hover:bg-[#1C210E]/50 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-xs font-black uppercase tracking-wider bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors cursor-pointer shadow-lg shadow-red-600/10"
              >
                Delete Class
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default DeleteClassModal;

