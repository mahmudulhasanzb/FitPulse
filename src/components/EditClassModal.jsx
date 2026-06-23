"use client";

import React, { useState, useEffect } from 'react';
import { Pencil, X, Upload, Clock, DollarSign, ChevronDown, Users } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { uploadImage } from '@/lib/uploadImage';
import { updateClasses } from '@/lib/api/classes/action';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const EditClassModal = ({ classData }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(classData?.coverImage || '');
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const days = [
    { label: 'M', value: 'Monday' },
    { label: 'T', value: 'Tuesday' },
    { label: 'W', value: 'Wednesday' },
    { label: 'Th', value: 'Thursday' },
    { label: 'F', value: 'Friday' },
    { label: 'S', value: 'Saturday' },
    { label: 'Su', value: 'Sunday' },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  // Initialize/Reset form values when modal opens or classData updates
  useEffect(() => {
    if (isOpen && classData) {
      reset({
        className: classData.className,
        coverImage: classData.coverImage,
        category: classData.category,
        difficulty: classData.difficulty,
        duration: classData.duration,
        price: classData.price,
        schedule: classData.schedule || [],
        startTime: classData.startTime,
        description: classData.description,
        capacity: classData.capacity || 20,
      });
      setImageUrl(classData.coverImage || '');
    }
  }, [isOpen, classData, reset]);

  // Manually register coverImage for file updates
  useEffect(() => {
    register('coverImage', { required: 'Cover Image is required' });
  }, [register]);

  const handleFileChange = async e => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const url = await uploadImage(file);
    setIsUploading(false);
    if (url) {
      setImageUrl(url);
      setValue('coverImage', url, { shouldValidate: true });
    }
  };

  const onSubmit = async data => {
    setIsSubmitting(true);
    try {
      const updatedData = {
        className: data.className,
        coverImage: data.coverImage,
        category: data.category,
        difficulty: data.difficulty,
        duration: parseInt(data.duration, 10),
        price: parseFloat(data.price),
        schedule: data.schedule,
        startTime: data.startTime,
        description: data.description,
        capacity: parseInt(data.capacity, 10),
      };

      const res = await updateClasses(classData._id, updatedData);
      if (res?.acknowledged || res?.modifiedCount > 0 || res?.matchedCount > 0) {
        toast.success('Class updated successfully');
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error('Failed to update class');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred during update');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-1.5 bg-[#1C210E]/40 border border-[#282F18] text-[#A4A896]/70 hover:text-white rounded-lg transition-colors cursor-pointer"
        title="Edit Class"
      >
        <Pencil className="h-3.5 w-3.5" />
      </button>

      {/* Modal Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 whitespace-normal text-left">
          
          {/* Modal Container */}
          <div className="relative w-full max-w-xl max-h-[90vh] bg-[#13160B] border border-[#1C210E] rounded-3xl p-6 md:p-8 shadow-2xl shadow-black/50 animate-in zoom-in-95 duration-200 flex flex-col">
            
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-1.5 bg-[#1C210E]/40 border border-[#282F18]/40 text-[#A4A896]/60 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <h2 className="text-xl font-black uppercase tracking-tight text-white font-mono">
                Edit Class Settings
              </h2>
              <p className="text-[10px] text-[#A4A896]/50 uppercase tracking-widest font-bold mt-1">
                Class ID: {classData?._id}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 overflow-y-auto pr-1 flex-1">
              
              {/* Class Title */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#A4A896]/60 uppercase tracking-widest block">
                  Class Title
                </label>
                <input
                  type="text"
                  {...register('className', { required: 'Class Title is required' })}
                  placeholder="e.g., Advanced Kettlebell Flow"
                  className="w-full bg-[#0A0D02] border border-[#282F18] rounded-xl py-3 px-4 text-sm text-white placeholder-[#A4A896]/30 focus:outline-none focus:border-[#D4FF00] transition-colors duration-200"
                />
                {errors?.className && (
                  <p className="text-red-500 text-xs mt-1">{errors.className.message}</p>
                )}
              </div>

              {/* Cover Image Upload & Preview */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#A4A896]/60 uppercase tracking-widest block">
                  Cover Image
                </label>
                <div className="flex gap-4 items-center border border-[#282F18] rounded-2xl p-4 bg-[#0A0D02]/40">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Cover Preview"
                      className="w-24 h-16 object-cover rounded-lg border border-[#282F18]"
                    />
                  ) : (
                    <div className="w-24 h-16 bg-[#13160B] rounded-lg border border-dashed border-[#282F18] flex items-center justify-center text-[#A4A896]/30 text-xs">
                      No image
                    </div>
                  )}
                  <div className="flex-1 text-left">
                    <input
                      type="file"
                      className="hidden"
                      id={`edit-file-upload-${classData?._id}`}
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                    <label
                      htmlFor={`edit-file-upload-${classData?._id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#D4FF00] hover:bg-[#c2eb00] text-[#121212] font-black text-[10px] uppercase rounded-lg transition-all duration-200 cursor-pointer select-none"
                    >
                      {isUploading ? 'Uploading...' : 'Upload Image'}
                    </label>
                    <p className="text-[9px] text-[#A4A896]/50 mt-1 font-semibold">
                      JPEG, PNG, or WEBP up to 5MB
                    </p>
                  </div>
                </div>
                {errors?.coverImage && (
                  <p className="text-red-500 text-xs mt-1">{errors.coverImage.message}</p>
                )}
              </div>

              {/* Category & Difficulty */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-[#A4A896]/60 uppercase tracking-widest block">
                    Category
                  </label>
                  <div className="relative">
                    <select
                      defaultValue=""
                      {...register('category', { required: 'Category is required' })}
                      className="w-full bg-[#0A0D02] border border-[#282F18] rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[#D4FF00] appearance-none cursor-pointer transition-colors duration-200"
                    >
                      <option value="" disabled>Select category</option>
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
                  {errors?.category && (
                    <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-[#A4A896]/60 uppercase tracking-widest block">
                    Difficulty Level
                  </label>
                  <div className="relative">
                    <select
                      defaultValue=""
                      {...register('difficulty', { required: 'Difficulty Level is required' })}
                      className="w-full bg-[#0A0D02] border border-[#282F18] rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[#D4FF00] appearance-none cursor-pointer transition-colors duration-200"
                    >
                      <option value="" disabled>Select level</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#A4A896]/60">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                  {errors?.difficulty && (
                    <p className="text-red-500 text-xs mt-1">{errors.difficulty.message}</p>
                  )}
                </div>
              </div>

              {/* Duration, Price & Capacity */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-[#A4A896]/60 uppercase tracking-widest block">
                    Duration (Mins)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#A4A896]/40">
                      <Clock className="h-4 w-4" />
                    </div>
                    <input
                      type="number"
                      {...register('duration', {
                        required: 'Duration is required',
                        min: { value: 1, message: 'Must be at least 1 minute' }
                      })}
                      placeholder="45"
                      min="1"
                      className="w-full bg-[#0A0D02] border border-[#282F18] rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-[#D4FF00] transition-colors duration-200"
                    />
                  </div>
                  {errors?.duration && (
                    <p className="text-red-500 text-xs mt-1">{errors.duration.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-[#A4A896]/60 uppercase tracking-widest block">
                    Price / Session
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#A4A896]/40">
                      <DollarSign className="h-4 w-4" />
                    </div>
                    <input
                      type="number"
                      {...register('price', {
                        required: 'Price is required',
                        min: { value: 0, message: 'Price cannot be negative' }
                      })}
                      step="0.01"
                      placeholder="25.00"
                      min="0"
                      className="w-full bg-[#0A0D02] border border-[#282F18] rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-[#D4FF00] transition-colors duration-200"
                    />
                  </div>
                  {errors?.price && (
                    <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-[#A4A896]/60 uppercase tracking-widest block">
                    Class Capacity
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#A4A896]/40">
                      <Users className="h-4 w-4" />
                    </div>
                    <input
                      type="number"
                      {...register('capacity', {
                        required: 'Capacity is required',
                        min: { value: 1, message: 'Capacity must be at least 1' },
                      })}
                      placeholder="20"
                      min="1"
                      className="w-full bg-[#0A0D02] border border-[#282F18] rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-[#D4FF00] transition-colors duration-200"
                    />
                  </div>
                  {errors?.capacity && (
                    <p className="text-red-500 text-xs mt-1">{errors.capacity.message}</p>
                  )}
                </div>
              </div>

              {/* Schedule Days */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#A4A896]/60 uppercase tracking-widest block text-left">
                  Weekly Schedule
                </label>
                <div className="flex flex-wrap gap-2 justify-start">
                  {days.map(day => (
                    <label key={day.label} className="cursor-pointer">
                      <input
                        type="checkbox"
                        value={day.value}
                        {...register('schedule')}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#0A0D02] text-[#A4A896]/55 border border-[#282F18] peer-checked:bg-[#D4FF00] peer-checked:text-black font-extrabold text-[11px] transition-all duration-200 select-none">
                        {day.label}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Start Time */}
              <div className="space-y-1.5 max-w-xs text-left">
                <label className="text-[10px] font-bold text-[#A4A896]/60 uppercase tracking-widest block">
                  Start Time
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#A4A896]/40">
                    <Clock className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    {...register('startTime', { required: 'Start Time is required' })}
                    placeholder="06:00 PM"
                    className="w-full bg-[#0A0D02] border border-[#282F18] rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-[#D4FF00] transition-colors duration-200"
                  />
                </div>
                {errors?.startTime && (
                  <p className="text-red-500 text-xs mt-1">{errors.startTime.message}</p>
                )}
              </div>

              {/* Class Description */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold text-[#A4A896]/60 uppercase tracking-widest block">
                    Class Description
                  </label>
                  <span className="text-[9px] font-bold text-[#A4A896]/30 uppercase tracking-wider">
                    Markdown supported
                  </span>
                </div>
                <textarea
                  {...register('description', { required: 'Description is required' })}
                  rows={4}
                  placeholder="Detail the workout focus..."
                  className="w-full bg-[#0A0D02] border border-[#282F18] rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[#D4FF00] transition-colors duration-200 resize-none"
                />
                {errors?.description && (
                  <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1C210E]/60 mt-6">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2.5 text-xs font-black uppercase tracking-wider text-[#A4A896]/70 hover:text-white border border-[#282F18] bg-[#1C210E]/20 hover:bg-[#1C210E]/50 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 text-xs font-black uppercase tracking-wider bg-[#D4FF00] hover:bg-[#c2eb00] text-[#121212] rounded-xl transition-colors cursor-pointer shadow-lg shadow-[#D4FF00]/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}
    </>
  );
};

export default EditClassModal;

