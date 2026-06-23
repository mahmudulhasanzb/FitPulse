'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Upload,
  Clock,
  DollarSign,
  ArrowRight,
  ChevronDown,
  Plus,
  Users,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { uploadImage } from '@/lib/uploadImage';
import { useSession } from '@/lib/auth-client';
import { addClasses } from '@/lib/api/classes/action';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const AddNewClass = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const days = [
    { label: 'M', value: 'Monday' },
    { label: 'T', value: 'Tuesday', defaultChecked: true },
    { label: 'W', value: 'Wednesday' },
    { label: 'Th', value: 'Thursday', defaultChecked: true },
    { label: 'F', value: 'Friday' },
    { label: 'S', value: 'Saturday' },
    { label: 'Su', value: 'Sunday' },
  ];

  const [imageUrl, setImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

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
    // Structure form data to match database document models
    const classData = {
      className: data.classTitle,
      authorName: session?.user?.name,
      authorEmail: session?.user?.email,
      authorImage: session?.user?.image,
      authorRole: session?.user?.role,
      coverImage: data.coverImage,
      category: data.category,
      difficulty: data.difficulty,
      duration: parseInt(data.duration, 10),
      price: parseFloat(data.price),
      schedule: data.schedule,
      startTime: data.startTime,
      description: data.description,
      status: 'Pending',
      totalEnrollment: 0,
      capacity: parseInt(data.capacity, 10),
      createdAt: new Date(),
    };
    const resData = await addClasses(classData);
    if (resData.acknowledged) {
      toast.success('Class created successfully');
      router.push(`/dashboard/${session?.user?.role?.toLowerCase()}/classes`);
    } else {
      toast.error('Failed to add class');
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-[#13160B] border border-[#1C210E] rounded-3xl p-6 space-y-6">
        <h2 className="text-lg font-black uppercase tracking-tight text-white">
          Class Identity
        </h2>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-[#A4A896]/60 uppercase tracking-widest block">
            Class Title
          </label>
          <input
            type="text"
            {...register('classTitle', {
              required: 'Class Title is required',
            })}
            placeholder="e.g., Advanced Kettlebell Flow"
            className="w-full bg-[#0A0D02] border border-[#282F18] rounded-xl py-3.5 px-4 text-sm text-white placeholder-[#A4A896]/30 focus:outline-none focus:border-[#D4FF00] transition-colors duration-200"
          />
          <p className="text-red-500 text-xs mt-2">
            {errors?.classTitle?.message}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold text-[#A4A896]/60 uppercase tracking-widest block">
              Cover Image
            </label>
            <span className="text-[9px] font-bold text-[#A4A896]/40 uppercase tracking-wider">
              Optimized size: 1920x1080px
            </span>
          </div>

          <div className="border border-dashed border-[#282F18] rounded-2xl p-8 bg-[#0A0D02]/40 flex flex-col items-center justify-center text-center space-y-4 hover:border-[#D4FF00]/40 transition-colors duration-300 cursor-pointer group relative overflow-hidden min-h-[220px]">
            <input
              type="file"
              className="hidden"
              id="file-upload"
              onChange={handleFileChange}
              accept="image/*"
            />

            {imageUrl ? (
              <div className="absolute inset-0 w-full h-full group">
                <img
                  src={imageUrl}
                  alt="Cover Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center space-y-2">
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer px-4 py-2 bg-[#D4FF00] text-black font-bold text-xs uppercase rounded-xl hover:scale-105 transition-transform duration-200"
                  >
                    Change Image
                  </label>
                </div>
              </div>
            ) : (
              <div className="w-full">
                {isUploading ? (
                  <div className="flex flex-col items-center space-y-3 py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#D4FF00]"></div>
                    <span className="text-sm font-bold text-white">
                      Uploading to ImgBB...
                    </span>
                  </div>
                ) : (
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center w-full"
                  >
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
                )}
              </div>
            )}
          </div>
          <p className="text-red-500 text-xs mt-2">
            {errors?.coverImage?.message}
          </p>
        </div>
      </div>

      <div className="bg-[#13160B] border border-[#1C210E] rounded-3xl p-6 space-y-6">
        <h2 className="text-lg font-black uppercase tracking-tight text-white">
          Specifications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-[#A4A896]/60 uppercase tracking-widest block">
              Category
            </label>
            <div className="relative">
              <select
                defaultValue=""
                {...register('category', {
                  required: 'Category is required',
                })}
                className="w-full bg-[#0A0D02] border border-[#282F18] rounded-xl py-3.5 px-4 text-sm text-white placeholder-[#A4A896]/30 focus:outline-none focus:border-[#D4FF00] appearance-none cursor-pointer transition-colors duration-200"
              >
                <option value="" disabled>
                  Select category
                </option>
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
              <p className="text-red-500 text-xs mt-2">
                {errors.category.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-[#A4A896]/60 uppercase tracking-widest block">
              Difficulty Level
            </label>
            <div className="relative">
              <select
                defaultValue=""
                {...register('difficulty', {
                  required: 'Difficulty Level is required',
                })}
                className="w-full bg-[#0A0D02] border border-[#282F18] rounded-xl py-3.5 px-4 text-sm text-white placeholder-[#A4A896]/30 focus:outline-none focus:border-[#D4FF00] appearance-none cursor-pointer transition-colors duration-200"
              >
                <option value="" disabled>
                  Select level
                </option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#A4A896]/60">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
            {errors?.difficulty && (
              <p className="text-red-500 text-xs mt-2">
                {errors.difficulty.message}
              </p>
            )}
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
                {...register('duration', {
                  required: 'Duration is required',
                  min: {
                    value: 1,
                    message: 'Duration must be at least 1 minute',
                  },
                })}
                placeholder="45"
                min="1"
                className="w-full bg-[#0A0D02] border border-[#282F18] rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-[#A4A896]/30 focus:outline-none focus:border-[#D4FF00] transition-colors duration-200"
              />
            </div>
            {errors?.duration && (
              <p className="text-red-500 text-xs mt-2">
                {errors.duration.message}
              </p>
            )}
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
                {...register('price', {
                  required: 'Price is required',
                  min: { value: 0, message: 'Price cannot be negative' },
                })}
                step="0.01"
                placeholder="25.00"
                min="0"
                className="w-full bg-[#0A0D02] border border-[#282F18] rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-[#A4A896]/30 focus:outline-none focus:border-[#D4FF00] transition-colors duration-200"
              />
            </div>
            {errors?.price && (
              <p className="text-red-500 text-xs mt-2">
                {errors.price.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
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
                className="w-full bg-[#0A0D02] border border-[#282F18] rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-[#A4A896]/30 focus:outline-none focus:border-[#D4FF00] transition-colors duration-200"
              />
            </div>
            {errors?.capacity && (
              <p className="text-red-500 text-xs mt-2">
                {errors.capacity.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-[#13160B] border border-[#1C210E] rounded-3xl p-6 space-y-6">
        <h2 className="text-lg font-black uppercase tracking-tight text-white">
          Schedule & Details
        </h2>

        <div className="space-y-3">
          <label className="text-[10px] font-bold text-[#A4A896]/60 uppercase tracking-widest block">
            Weekly Schedule
          </label>
          <div className="flex flex-wrap gap-2">
            {days.map(day => (
              <label key={day.label} className="cursor-pointer">
                <input
                  type="checkbox"
                  value={day.value}
                  defaultChecked={day.defaultChecked}
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
              {...register('startTime', {
                required: 'Start Time is required',
              })}
              placeholder="06:00 PM"
              className="w-full bg-[#0A0D02] border border-[#282F18] rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-[#A4A896]/30 focus:outline-none focus:border-[#D4FF00] transition-colors duration-200"
            />
          </div>
          <p className="text-red-500 text-xs mt-2">
            {errors?.startTime?.message}
          </p>
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
            {...register('description', {
              required: 'Description is required',
            })}
            rows={4}
            placeholder="Detail the workout focus, required equipment, and what athletes can expect to achieve..."
            className="w-full bg-[#0A0D02] border border-[#282F18] rounded-xl py-3.5 px-4 text-sm text-white placeholder-[#A4A896]/30 focus:outline-none focus:border-[#D4FF00] transition-colors duration-200 resize-none"
          />
          <p className="text-red-500 text-xs mt-2">
            {errors?.description?.message}
          </p>
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
  );
};

export default AddNewClass;
