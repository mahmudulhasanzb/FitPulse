'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  Camera,
  Plus,
  GraduationCap,
  Dumbbell,
  Check,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { uploadImage } from '@/lib/uploadImage';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      role: 'student',
    },
  });

  // Watch password for real-time validation rules
  const passwordVal = watch('password', '');
  const hasMinLength = passwordVal.length >= 6;
  const hasUppercase = /[A-Z]/.test(passwordVal);
  const hasLowercase = /[a-z]/.test(passwordVal);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async e => {
    const file = e.target.files?.[0];
    if (file) {
      const toastId = toast.loading('Uploading profile photo...');
      try {
        const imageUrl = await uploadImage(file);
        if (imageUrl) {
          setPhotoPreview(imageUrl);
          toast.success('Profile photo uploaded successfully!', {
            id: toastId,
          });
        } else {
          toast.error('Failed to upload photo.', { id: toastId });
        }
      } catch (error) {
        console.error(error);
        toast.error('Failed to upload photo.', { id: toastId });
      }
    }
  };

  const handleRoleSelect = selectedRole => {
    setRole(selectedRole);
    setValue('role', selectedRole);
  };

  const onSubmit = async data => {
    const { data: response, error } = await authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        // role: role,
        image: photoPreview || '',
      },
      {
        onSuccess: () => {
          toast.success('Account created successfully!');
          router.push('/')
        },
        onError: ({ error }) => {
          toast.error(error?.message || 'Registration failed');
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-[#0A0D02] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-white font-sans antialiased">
      <div className="w-full max-w-[480px] bg-[#0E1106]/70 border border-[#1C210E] rounded-3xl p-8 md:p-10 shadow-2xl backdrop-blur-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Create Account
          </h2>
          <p className="text-[#A4A896]/60 text-sm mt-1.5 font-medium">
            Join the elite performance community.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Biometric Upload */}
          <div className="flex flex-col items-center justify-center space-y-2 mb-4">
            <div className="relative w-24 h-24">
              <div
                onClick={handlePhotoClick}
                className="w-full h-full rounded-full border border-dashed border-[#282F18] hover:border-[#D4FF00]/50 bg-[#14180A] flex items-center justify-center cursor-pointer group transition-all duration-300 overflow-hidden"
              >
                {photoPreview ? (
                  <Image
                    src={photoPreview}
                    alt="Profile Preview"
                    width={96}
                    height={96}
                    unoptimized={true}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-[#A4A896]/40 group-hover:text-white transition-colors duration-200">
                    <Camera className="w-7 h-7 stroke-[1.5]" />
                  </div>
                )}
              </div>
              {/* Plus Icon Badge */}
              <div
                onClick={handlePhotoClick}
                className="absolute bottom-0 right-0 bg-[#D4FF00] rounded-full p-1.5 border-2 border-[#0E1106] flex items-center justify-center shadow-lg cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95 z-10"
              >
                <Plus className="w-3 h-3 text-[#121212] stroke-[3]" />
              </div>
            </div>
            <span className="text-[10px] text-[#A4A896]/55 tracking-wider font-extrabold uppercase mt-1">
              Upload Biometric Photo
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              {...register('image', {
                onChange: handleFileChange,
              })}
              ref={e => {
                register('image').ref(e);
                fileInputRef.current = e;
              }}
            />
          </div>

          {/* Full Name */}
          <div className="space-y-2">
            <label className="block text-[11px] font-extrabold text-[#A4A896]/70 uppercase tracking-widest">
              Full Name
            </label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              placeholder="John V. Carter"
              className="w-full bg-[#14180A] border border-[#282F18] text-white placeholder-[#A4A896]/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4FF00] focus:ring-1 focus:ring-[#D4FF00]/30 transition-all duration-200"
            />
            {errors.name && (
              <span className="text-red-500 text-xs">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Email Address */}
          <div className="space-y-2">
            <label className="block text-[11px] font-extrabold text-[#A4A896]/70 uppercase tracking-widest">
              Email Address
            </label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              placeholder="athlete@fitpulse.io"
              className="w-full bg-[#14180A] border border-[#282F18] text-white placeholder-[#A4A896]/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4FF00] focus:ring-1 focus:ring-[#D4FF00]/30 transition-all duration-200"
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Account Type Tab Selector */}
          <div className="space-y-2">
            <label className="block text-[11px] font-extrabold text-[#A4A896]/70 uppercase tracking-widest">
              Account Type
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleRoleSelect('student')}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  role === 'student'
                    ? 'bg-[#D4FF00]/5 border-[#D4FF00] text-[#D4FF00]'
                    : 'bg-[#14180A]/40 border-[#282F18] text-[#A4A896]/60 hover:text-white hover:border-[#3B3E31]'
                }`}
              >
                <GraduationCap className="w-4 h-4 stroke-[2]" />
                <span>Student</span>
              </button>
              <button
                type="button"
                onClick={() => handleRoleSelect('trainer')}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  role === 'trainer'
                    ? 'bg-[#D4FF00]/5 border-[#D4FF00] text-[#D4FF00]'
                    : 'bg-[#14180A]/40 border-[#282F18] text-[#A4A896]/60 hover:text-white hover:border-[#3B3E31]'
                }`}
              >
                <Dumbbell className="w-4 h-4 stroke-[2]" />
                <span>Trainer</span>
              </button>
            </div>
            <input type="hidden" {...register('role')} />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="block text-[11px] font-extrabold text-[#A4A896]/70 uppercase tracking-widest">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', { required: 'Password is required' })}
                placeholder="••••••••"
                className="w-full bg-[#14180A] border border-[#282F18] text-white placeholder-[#A4A896]/30 rounded-xl px-4 py-3 text-sm pr-10 focus:outline-none focus:border-[#D4FF00] focus:ring-1 focus:ring-[#D4FF00]/30 transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-black/50 hover:text-black cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-500 text-xs">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Password Validation Hints */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center space-x-2 text-xs">
              <span
                className={`rounded-full p-0.5 ${hasMinLength ? 'bg-[#D4FF00] text-[#121212]' : 'bg-[#282F18] text-[#A4A896]/40'}`}
              >
                <Check className="w-3 h-3 stroke-[3]" />
              </span>
              <span
                className={hasMinLength ? 'text-white/95' : 'text-[#A4A896]/50'}
              >
                6+ characters
              </span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <span
                className={`rounded-full p-0.5 ${hasUppercase ? 'bg-[#D4FF00] text-[#121212]' : 'bg-[#282F18] text-[#A4A896]/40'}`}
              >
                <Check className="w-3 h-3 stroke-[3]" />
              </span>
              <span
                className={hasUppercase ? 'text-white/95' : 'text-[#A4A896]/50'}
              >
                1 uppercase letter
              </span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <span
                className={`rounded-full p-0.5 ${hasLowercase ? 'bg-[#D4FF00] text-[#121212]' : 'bg-[#282F18] text-[#A4A896]/40'}`}
              >
                <Check className="w-3 h-3 stroke-[3]" />
              </span>
              <span
                className={hasLowercase ? 'text-white/95' : 'text-[#A4A896]/50'}
              >
                1 lowercase letter
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#D4FF00] hover:bg-[#c2eb00] disabled:bg-[#D4FF00]/40 disabled:text-[#121212]/50 text-[#121212] font-black text-sm uppercase py-4 rounded-xl cursor-pointer disabled:cursor-not-allowed shadow-lg shadow-[#D4FF00]/10 hover:shadow-[#D4FF00]/25 transition-all duration-200 transform active:scale-98 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-[#121212]"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Creating Account...</span>
              </>
            ) : (
              <span>Create Account</span>
            )}
          </button>

          {/* Divider */}
          <div className="relative py-2 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#1C210E]/60"></div>
            </div>
            <span className="relative bg-[#0E1106] px-4 text-[9px] font-extrabold text-[#A4A896]/40 uppercase tracking-widest select-none">
              Or Continue With
            </span>
          </div>

          {/* Google Signup Button */}
          <button
            type="button"
            className="w-full bg-[#14180A] hover:bg-[#1C210E] border border-[#282F18] text-white font-extrabold text-xs uppercase py-3.5 rounded-xl cursor-pointer flex items-center justify-center gap-2.5 transition-all duration-200"
          >
            {/* Custom Google Icon SVG */}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.187 4.114-3.478 0-6.3-2.822-6.3-6.3s2.822-6.3 6.3-6.3c1.63 0 3.106.625 4.22 1.642l3.085-3.085C19.04 2.5 15.9 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c5.897 0 10.866-4.188 10.866-11.24 0-.768-.078-1.516-.216-2.24H12.24z" />
            </svg>
            <span>Google</span>
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center text-xs font-semibold text-[#A4A896]/60">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-[#D4FF00] hover:underline transition-colors duration-200"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
