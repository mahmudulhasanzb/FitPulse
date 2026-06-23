"use client";

import React, { useState, useEffect } from 'react';
import { Pencil, X, ChevronRight, ImageIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { uploadImage } from '@/lib/uploadImage';
import { editForumPost } from '@/lib/api/forum/action';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const ForumPostEditModal = ({ post }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(post?.image || '');
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  // Initialize/Reset form values when modal opens or post updates
  useEffect(() => {
    if (isOpen && post) {
      reset({
        title: post.title,
        classification: post.category || 'training',
        visualAsset: post.image || '',
        brief: post.description,
      });
      setImageUrl(post.image || '');
    }
  }, [isOpen, post, reset]);

  // Manually register visualAsset for updates
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
      setValue('visualAsset', url, { shouldValidate: true });
    }
  };

  const onSubmit = async data => {
    setIsSubmitting(true);
    try {
      const updatedData = {
        title: data.title,
        category: data.classification,
        image: data.visualAsset,
        description: data.brief,
      };

      const res = await editForumPost(post._id.toString(), updatedData);
      if (res?.acknowledged || res?.modifiedCount > 0 || res?.matchedCount > 0) {
        toast.success('Forum post updated successfully!');
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error('Failed to update forum post');
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
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(true);
        }}
        className="flex items-center gap-1 text-[9px] font-black tracking-widest text-[#D4FF00] hover:text-[#c2eb00] uppercase cursor-pointer bg-transparent border-0 p-0 focus:outline-none transition-colors"
        title="Edit Forum Post"
      >
        <Pencil className="h-3.5 w-3.5" />
        <span>Edit</span>
      </button>

      {/* Modal Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 whitespace-normal text-left"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {/* Modal Container */}
          <div 
            className="relative w-full max-w-xl max-h-[90vh] bg-[#13160B] border border-[#1C210E] rounded-3xl p-6 md:p-8 shadow-2xl shadow-black/50 animate-in zoom-in-95 duration-200 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
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
                Edit Forum Post
              </h2>
              <p className="text-[10px] text-[#A4A896]/50 uppercase tracking-widest font-bold mt-1">
                Post ID: {post?._id}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 overflow-y-auto pr-1 flex-1">
              
              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#A4A896]/60 uppercase tracking-widest block">
                  Protocol Title
                </label>
                <input
                  type="text"
                  {...register('title', { required: 'Protocol Title is required' })}
                  placeholder="ENTER DESCRIPTIVE TITLE"
                  className="w-full bg-[#0A0D02] border border-[#282F18] rounded-xl py-3 px-4 text-sm text-white placeholder-[#A4A896]/30 focus:outline-none focus:border-[#D4FF00] transition-colors duration-200 font-bold"
                />
                {errors?.title && (
                  <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
                )}
              </div>

              {/* Classification */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#A4A896]/60 uppercase tracking-widest block">
                  Classification
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'edit-class-training', label: 'TRAINING', value: 'training' },
                    { id: 'edit-class-nutrition', label: 'NUTRITION', value: 'nutrition' },
                    { id: 'edit-class-recovery', label: 'RECOVERY', value: 'recovery' },
                    { id: 'edit-class-announcement', label: 'ANNOUNCEMENT', value: 'announcement' },
                  ].map(tab => (
                    <label key={tab.id} className="cursor-pointer">
                      <input
                        type="radio"
                        value={tab.value}
                        {...register('classification')}
                        className="sr-only peer"
                      />
                      <div className="px-3.5 py-1.5 rounded-full border border-[#282F18] text-[9px] font-black tracking-wider text-[#A4A896]/55 bg-[#0A0D02]/30 peer-checked:border-[#D4FF00] peer-checked:text-[#D4FF00] hover:border-[#D4FF00]/40 transition-all duration-200 select-none">
                        {tab.label}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Cover Image Upload & Preview */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#A4A896]/60 uppercase tracking-widest block">
                  Visual Asset (Optional)
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
                      id={`edit-forum-upload-${post?._id}`}
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                    <label
                      htmlFor={`edit-forum-upload-${post?._id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#D4FF00] hover:bg-[#c2eb00] text-[#121212] font-black text-[10px] uppercase rounded-lg transition-all duration-200 cursor-pointer select-none"
                    >
                      {isUploading ? 'Uploading...' : 'Upload Image'}
                    </label>
                    <p className="text-[9px] text-[#A4A896]/50 mt-1 font-semibold">
                      JPEG, PNG, or WEBP up to 5MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Detailed Brief */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#A4A896]/60 uppercase tracking-widest block">
                  Detailed Brief
                </label>
                <textarea
                  {...register('brief', { required: 'Detailed Brief is required' })}
                  rows={5}
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
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-[10px] font-black tracking-widest text-[#A4A896]/55 hover:text-white uppercase transition-colors duration-200 cursor-pointer bg-transparent border-0 p-0"
                >
                  Discard
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting || isUploading}
                  className="flex items-center justify-center gap-2 bg-[#D4FF00] hover:bg-[#c2eb00] text-[#121212] disabled:opacity-50 disabled:cursor-not-allowed font-black text-[10px] tracking-widest uppercase px-6 py-3.5 rounded hover:shadow-lg hover:shadow-[#D4FF00]/10 transition-all duration-200 cursor-pointer"
                >
                  <span>{isSubmitting ? 'Saving...' : 'Save changes'}</span>
                  <ChevronRight className="h-3.5 w-3.5 stroke-[3px]" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ForumPostEditModal;