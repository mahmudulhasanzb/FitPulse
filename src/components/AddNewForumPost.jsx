'use client';

import React, { useState, useEffect } from 'react';
import { Upload, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useSession } from '@/lib/auth-client';
import { uploadImage } from '@/lib/uploadImage';
import { addForumPost } from '@/lib/api/forum/action';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';

const AddNewForumPost = () => {
  const { data: session } = useSession();
  console.log('session:', session)

  const [imageUrl, setImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    register('visualAsset');
  }, [register]);

  const handleFileChange = async e => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const url = await uploadImage(file);
    setIsUploading(false);
    if (url) {
      setImageUrl(url);
      setValue('visualAsset', url);
    }
  };

  const onSubmit = async data => {
    const forumPostData = {
      title: data.title,
      authorEmail: session?.user?.email,
      authorName: session?.user?.name,
      authorImage: session?.user?.image,
      role: session?.user?.role,
      category: data.classification,
      image: data.visualAsset,
      description: data.brief,
    };
    const resData = await addForumPost(forumPostData);

    if (resData.acknowledged) {
      toast.success('Forum Post Added Successfully');
      redirect(`/dashboard/${session?.user?.role}/forum`);
    } else {
      toast.error('Failed to Add Forum Post');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-[#13160B] border border-[#1C210E] rounded-3xl p-8 space-y-8">
        {/* Protocol Title */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-[#A4A896]/60 uppercase tracking-widest block">
            Protocol Title
          </label>
          <input
            type="text"
            {...register('title', {
              required: 'Protocol Title is required',
            })}
            placeholder="ENTER DESCRIPTIVE TITLE"
            className="w-full bg-white text-black font-extrabold placeholder-black/35 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#D4FF00]/50 uppercase tracking-wider text-sm transition-all duration-200"
          />
          {errors?.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Classification */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-[#A4A896]/60 uppercase tracking-widest block">
            Classification
          </label>
          <div className="flex flex-wrap gap-2.5">
            {[
              {
                id: 'class-training',
                label: 'TRAINING',
                value: 'training',
                defaultChecked: true,
              },
              {
                id: 'class-nutrition',
                label: 'NUTRITION',
                value: 'nutrition',
              },
              {
                id: 'class-recovery',
                label: 'RECOVERY',
                value: 'recovery',
              },
              {
                id: 'class-announcement',
                label: 'ANNOUNCEMENT',
                value: 'announcement',
              },
            ].map(tab => (
              <label key={tab.id} className="cursor-pointer">
                <input
                  type="radio"
                  value={tab.value}
                  defaultChecked={tab.defaultChecked}
                  {...register('classification')}
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

          <div className="border border-dashed border-[#282F18] rounded-2xl p-8 bg-[#0A0D02]/40 flex flex-col items-center justify-center text-center space-y-4 hover:border-[#D4FF00]/40 transition-colors duration-300 cursor-pointer group relative overflow-hidden min-h-[220px]">
            <input
              type="file"
              className="hidden"
              id="forum-file-upload"
              onChange={handleFileChange}
              accept="image/*"
            />

            {imageUrl ? (
              <div className="absolute inset-0 w-full h-full group">
                <img
                  src={imageUrl}
                  alt="Asset Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center space-y-2">
                  <label
                    htmlFor="forum-file-upload"
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
                    htmlFor="forum-file-upload"
                    className="cursor-pointer flex flex-col items-center w-full"
                  >
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
                )}
              </div>
            )}
          </div>
        </div>

        {/* Detailed Brief */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-[#A4A896]/60 uppercase tracking-widest block">
            Detailed Brief
          </label>
          <textarea
            {...register('brief', {
              required: 'Detailed Brief is required',
            })}
            rows={6}
            placeholder="Outline the specifics..."
            className="w-full bg-[#0A0D02]/60 border border-[#282F18] rounded-xl py-3.5 px-4 text-sm text-white placeholder-[#A4A896]/20 focus:outline-none focus:border-[#D4FF00] transition-colors duration-200 resize-none font-medium"
          />
          {errors?.brief && (
            <p className="text-red-500 text-xs mt-1">{errors.brief.message}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-[#1C210E]/60">
          <button
            type="reset"
            onClick={() => setImageUrl('')}
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
  );
};

export default AddNewForumPost;
