import React from 'react';
import Link from 'next/link';
import { 
  Upload, 
  ChevronRight, 
  Image as ImageIcon 
} from 'lucide-react';

const AddFroumPage = () => {
  return (
    <div className="flex-1 bg-[#0A0D02] min-h-screen px-6 py-8 md:px-12 md:py-12 text-white overflow-y-auto">
      <div className="max-w-3xl mx-auto space-y-8">
        
        
        {/* Header Title */}
        <div className="space-y-2 pb-6 border-b border-[#1C210E]">
          <h1 className="text-3xl font-black uppercase tracking-tight text-white font-mono">
            New Dispatch
          </h1>
          <p className="text-xs text-[#A4A896]/60 font-medium">
            Share training protocols, nutrition science, or squad updates.
          </p>
        </div>

        {/* Form Container */}
        <form className="space-y-6">
          <div className="bg-[#13160B] border border-[#1C210E] rounded-3xl p-8 space-y-8">
            
            {/* Protocol Title */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-[#A4A896]/60 uppercase tracking-widest block">
                Protocol Title
              </label>
              <input 
                type="text" 
                name="title"
                required
                placeholder="ENTER DESCRIPTIVE TITLE"
                className="w-full bg-white text-black font-extrabold placeholder-black/35 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#D4FF00]/50 uppercase tracking-wider text-sm transition-all duration-200"
              />
            </div>

            {/* Classification */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-[#A4A896]/60 uppercase tracking-widest block">
                Classification
              </label>
              <div className="flex flex-wrap gap-2.5">
                {[
                  { id: 'class-training', label: 'TRAINING', value: 'training', defaultChecked: true },
                  { id: 'class-nutrition', label: 'NUTRITION', value: 'nutrition' },
                  { id: 'class-recovery', label: 'RECOVERY', value: 'recovery' },
                  { id: 'class-announcement', label: 'ANNOUNCEMENT', value: 'announcement' }
                ].map(tab => (
                  <label key={tab.id} className="cursor-pointer">
                    <input 
                      type="radio" 
                      name="classification" 
                      id={tab.id}
                      value={tab.value}
                      defaultChecked={tab.defaultChecked}
                      className="sr-only peer" 
                    />
                    <div className="px-4 py-2 rounded-full border border-[#282F18] text-[10px] font-black tracking-wider text-[#A4A896]/55 bg-[#0A0D02]/30 peer-checked:border-[#D4FF00] peer-checked:text-[#D4FF00] hover:border-[#D4FF00]/40 transition-all duration-200 select-none">
                      {tab.label}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Visual Asset Dropzone */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-[#A4A896]/60 uppercase tracking-widest block">
                Visual Asset (Optional)
              </label>
              
              <div className="border border-dashed border-[#282F18] rounded-2xl p-10 bg-[#0A0D02]/40 flex flex-col items-center justify-center text-center space-y-4 hover:border-[#D4FF00]/40 transition-colors duration-300 cursor-pointer group">
                <input type="file" name="visualAsset" className="hidden" id="forum-file-upload" />
                <label htmlFor="forum-file-upload" className="cursor-pointer flex flex-col items-center w-full">
                  <div className="p-4 bg-transparent border border-[#282F18] rounded-full text-[#A4A896]/60 group-hover:border-[#D4FF00] group-hover:text-[#D4FF00] transition-colors duration-200">
                    <ImageIcon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-black text-white mt-4 tracking-wider uppercase block">
                    Drag & drop or click to upload
                  </span>
                  <span className="text-[9px] text-[#A4A896]/40 mt-1 font-bold tracking-wider uppercase block">
                    High-res JPEG, PNG, or GIF up to 5MB
                  </span>
                </label>
              </div>
            </div>

            {/* Detailed Brief */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-[#A4A896]/60 uppercase tracking-widest block">
                Detailed Brief
              </label>
              <textarea 
                name="brief"
                required
                rows={6}
                placeholder="Outline the specifics..."
                className="w-full bg-[#0A0D02]/60 border border-[#282F18] rounded-xl py-3.5 px-4 text-sm text-white placeholder-[#A4A896]/20 focus:outline-none focus:border-[#D4FF00] transition-colors duration-200 resize-none font-medium"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-[#1C210E]/60">
              <button 
                type="reset"
                className="text-[10px] font-black tracking-widest text-[#A4A896]/55 hover:text-white uppercase transition-colors duration-200 cursor-pointer"
              >
                Discard
              </button>
              
              <button 
                type="submit"
                className="flex items-center justify-center gap-2 bg-[#D4FF00] hover:bg-[#c2eb00] text-[#121212] font-black text-[10px] tracking-widest uppercase px-6 py-3.5 rounded hover:shadow-lg hover:shadow-[#D4FF00]/10 transition-all duration-200 cursor-pointer"
              >
                <span>Post to community</span>
                <ChevronRight className="h-3.5 w-3.5 stroke-[3px]" />
              </button>
            </div>

          </div>
        </form>

      </div>
    </div>
  );
};

export default AddFroumPage;
