import React from 'react';
import Link from 'next/link';
import { 
  Upload, 
  Clock, 
  DollarSign, 
  ArrowRight, 
  ChevronDown, 
  Plus 
} from 'lucide-react';

const AddNewClassesPage = () => {
  const days = [
    { label: 'M', value: 'Monday' },
    { label: 'T', value: 'Tuesday', defaultChecked: true },
    { label: 'W', value: 'Wednesday' },
    { label: 'Th', value: 'Thursday', defaultChecked: true },
    { label: 'F', value: 'Friday' },
    { label: 'S', value: 'Saturday' },
    { label: 'Su', value: 'Sunday' },
  ];

  return (
    <div className="flex-1 bg-[#0A0D02] min-h-screen px-6 py-8 md:px-12 md:py-12 text-white overflow-y-auto">
      <div className="max-w-3xl mx-auto space-y-8">
        
        <div className="flex items-center justify-between border-b border-[#1C210E] pb-6">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-black uppercase tracking-tight text-white">Add New Class</h1>
              <p className="text-[10px] font-bold text-[#D4FF00] tracking-widest uppercase mt-0.5">
                Instructor Portal
              </p>
            </div>
          </div>
          
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#13160B] border border-[#1C210E] rounded-xl text-[10px] font-bold uppercase tracking-widest text-[#A4A896] hover:border-[#D4FF00]/50 transition-colors duration-200">
            <Plus className="h-3 w-3 text-[#D4FF00]" />
            <span>Draft Mode</span>
          </button>
        </div>

        {/* Form Container */}
        <form className="space-y-6">
          
          <div className="bg-[#13160B] border border-[#1C210E] rounded-3xl p-6 space-y-6">
            <h2 className="text-lg font-black uppercase tracking-tight text-white">Class Identity</h2>
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[#A4A896]/60 uppercase tracking-widest block">
                Class Title
              </label>
              <input 
                type="text" 
                name="title"
                required
                placeholder="e.g., Advanced Kettlebell Flow"
                className="w-full bg-[#0A0D02] border border-[#282F18] rounded-xl py-3.5 px-4 text-sm text-white placeholder-[#A4A896]/30 focus:outline-none focus:border-[#D4FF00] transition-colors duration-200"
              />
            </div>

            {/* Cover Image Upload Zone */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-[#A4A896]/60 uppercase tracking-widest block">
                  Cover Image
                </label>
                <span className="text-[9px] font-bold text-[#A4A896]/40 uppercase tracking-wider">
                  Optimized size: 1920x1080px
                </span>
              </div>
              
              <div className="border border-dashed border-[#282F18] rounded-2xl p-8 bg-[#0A0D02]/40 flex flex-col items-center justify-center text-center space-y-4 hover:border-[#D4FF00]/40 transition-colors duration-300 cursor-pointer group">
                <input type="file" name="coverImage" className="hidden" id="file-upload" />
                <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                  <div className="p-4 bg-[#D4FF00] rounded-full text-black shadow-lg shadow-[#D4FF00]/10 group-hover:scale-105 transition-transform duration-200">
                    <Upload className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-bold text-white mt-4 block">
                    Drag & drop or click to upload
                  </span>
                  <span className="text-[10px] text-[#A4A896]/50 mt-1 font-semibold block">
                    JPEG, PNG, or WEBP up to 5MB
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-[#13160B] border border-[#1C210E] rounded-3xl p-6 space-y-6">
            <h2 className="text-lg font-black uppercase tracking-tight text-white">Specifications</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#A4A896]/60 uppercase tracking-widest block">
                  Category
                </label>
                <div className="relative">
                  <select 
                    name="category"
                    required
                    className="w-full bg-[#0A0D02] border border-[#282F18] rounded-xl py-3.5 px-4 text-sm text-white placeholder-[#A4A896]/30 focus:outline-none focus:border-[#D4FF00] appearance-none cursor-pointer transition-colors duration-200"
                  >
                    <option value="" disabled selected>Select category</option>
                    <option value="hiit">HIIT</option>
                    <option value="yoga">Yoga</option>
                    <option value="pilates">Pilates</option>
                    <option value="weights">Strength Training</option>
                    <option value="cardio">Cardio</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#A4A896]/60">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#A4A896]/60 uppercase tracking-widest block">
                  Difficulty Level
                </label>
                <div className="relative">
                  <select 
                    name="difficulty"
                    required
                    className="w-full bg-[#0A0D02] border border-[#282F18] rounded-xl py-3.5 px-4 text-sm text-white placeholder-[#A4A896]/30 focus:outline-none focus:border-[#D4FF00] appearance-none cursor-pointer transition-colors duration-200"
                  >
                    <option value="" disabled selected>Select level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#A4A896]/60">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#A4A896]/60 uppercase tracking-widest block">
                  Duration (Mins)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#A4A896]/40">
                    <Clock className="h-4 w-4" />
                  </div>
                  <input 
                    type="number" 
                    name="duration"
                    required
                    placeholder="45"
                    min="1"
                    className="w-full bg-[#0A0D02] border border-[#282F18] rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-[#A4A896]/30 focus:outline-none focus:border-[#D4FF00] transition-colors duration-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#A4A896]/60 uppercase tracking-widest block">
                  Price / Session
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#A4A896]/40">
                    <DollarSign className="h-4 w-4" />
                  </div>
                  <input 
                    type="number" 
                    name="price"
                    required
                    step="0.01"
                    placeholder="25.00"
                    min="0"
                    className="w-full bg-[#0A0D02] border border-[#282F18] rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-[#A4A896]/30 focus:outline-none focus:border-[#D4FF00] transition-colors duration-200"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#13160B] border border-[#1C210E] rounded-3xl p-6 space-y-6">
            <h2 className="text-lg font-black uppercase tracking-tight text-white">Schedule & Details</h2>
            
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-[#A4A896]/60 uppercase tracking-widest block">
                Weekly Schedule
              </label>
              <div className="flex flex-wrap gap-2">
                {days.map(day => (
                  <label key={day.label} className="cursor-pointer">
                    <input 
                      type="checkbox" 
                      name="schedule" 
                      value={day.value} 
                      defaultChecked={day.defaultChecked}
                      className="sr-only peer" 
                    />
                    <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#0A0D02] text-[#A4A896]/55 border border-[#282F18] peer-checked:bg-[#D4FF00] peer-checked:text-black font-extrabold text-[11px] transition-all duration-200 select-none">
                      {day.label}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2 max-w-xs">
              <label className="text-[10px] font-bold text-[#A4A896]/60 uppercase tracking-widest block">
                Start Time
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#A4A896]/40">
                  <Clock className="h-4 w-4" />
                </div>
                <input 
                  type="text" 
                  name="startTime"
                  required
                  placeholder="06:00 PM"
                  className="w-full bg-[#0A0D02] border border-[#282F18] rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-[#A4A896]/30 focus:outline-none focus:border-[#D4FF00] transition-colors duration-200"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-[#A4A896]/60 uppercase tracking-widest block">
                  Class Description
                </label>
                <span className="text-[9px] font-bold text-[#A4A896]/30 uppercase tracking-wider">
                  Markdown supported
                </span>
              </div>
              <textarea 
                name="description"
                required
                rows={4}
                placeholder="Detail the workout focus, required equipment, and what athletes can expect to achieve..."
                className="w-full bg-[#0A0D02] border border-[#282F18] rounded-xl py-3.5 px-4 text-sm text-white placeholder-[#A4A896]/30 focus:outline-none focus:border-[#D4FF00] transition-colors duration-200 resize-none"
              />
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <button 
              type="submit"
              className="flex items-center justify-center gap-2 bg-[#D4FF00] hover:bg-[#c2eb00] text-[#121212] font-black text-xs uppercase px-12 py-4 rounded-full shadow-lg shadow-[#D4FF00]/10 hover:shadow-[#D4FF00]/20 transition-all duration-200 cursor-pointer"
            >
              <span>Create Class</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddNewClassesPage;
