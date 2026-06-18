'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    console.log(data);

    const { data: response, error} = await authClient.signIn.email({
      email: data.email,
      password: data.password,
    }, {
      onSuccess: () => {
        toast.success('Logedin successfully')
        router.push("/")
      },
      onError: ({error}) => {
        toast.error(error.message)
        return
      }
    })
  };

  return (
    <div className="min-h-screen bg-[#0A0D02] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-white font-sans antialiased">
      <div className="w-full max-w-[480px] bg-[#0E1106]/70 border border-[#1C210E] rounded-3xl p-8 md:p-10 shadow-2xl backdrop-blur-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Sign In
          </h2>
          F
          <p className="text-[#A4A896]/60 text-sm mt-1.5 font-medium">
            Welcome back. Enter your credentials to access your dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                className="absolute right-3.5 top-1/2 -translate-y-1/2  text-black/50 hover:text-black cursor-pointer"
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#D4FF00] hover:bg-[#c2eb00] text-[#121212] font-black text-sm uppercase py-4 rounded-xl cursor-pointer shadow-lg shadow-[#D4FF00]/10 hover:shadow-[#D4FF00]/25 transition-all duration-200 transform active:scale-98"
          >
            Sign In
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
          {"Don't have an account?"}{' '}
          <Link
            href="/signup"
            className="text-[#D4FF00] hover:underline transition-colors duration-200"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
