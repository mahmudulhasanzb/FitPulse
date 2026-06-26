'use client';

import React, { useState } from 'react';
import { CreditCard, Sparkles, Shield, ArrowRight, Loader2, Info } from 'lucide-react';
import toast from 'react-hot-toast';
import Image from 'next/image';

const PaymentClient = ({ classData }) => {
  const [loading, setLoading] = useState(false);

  const {
    _id,
    className,
    authorName,
    coverImage,
    category,
    price,
    duration
  } = classData;

  const displayImage = coverImage || 'https://images.unsplash.com/photo-1483721310020-03333e577078';
  const displayPrice = typeof price === 'number' ? `$${price.toFixed(2)}` : price;

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading('Initiating secure Stripe payment...');

    try {
      const res = await fetch('/api/checkout_session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ classId: _id }),
      });
      const data = await res.json();

      if (data.url) {
        toast.success('Redirecting to Stripe...', { id: toastId });
        window.location.href = data.url;
      } else {
        toast.error(data.error || 'Failed to create checkout session', { id: toastId });
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred. Please try again.', { id: toastId });
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-[#0A0D02] min-h-screen px-6 py-12 md:px-16 md:py-24 text-white">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="border-b border-[#1C210E] pb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-[#D4FF00] tracking-widest uppercase mb-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Secure Checkout</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Complete Your Booking</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Billing Form / Details */}
          <div className="lg:col-span-7 space-y-6">
            <form onSubmit={handlePayment} className="bg-[#13160B] border border-[#1C210E] rounded-3xl p-6 md:p-8 space-y-6">
              <h2 className="text-lg font-bold uppercase tracking-wide flex items-center gap-2 border-b border-[#1C210E] pb-3">
                <CreditCard className="w-5 h-5 text-[#D4FF00]" />
                Payment Method
              </h2>

              <div className="space-y-4">
                <div className="p-4 bg-[#181C0E]/40 border border-[#282F18] rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-white/5 rounded flex items-center justify-center border border-white/10 font-bold text-[10px] text-neutral-light tracking-wide">
                      STRIPE
                    </div>
                    <div>
                      <p className="text-sm font-bold">Stripe Secure Checkout</p>
                      <p className="text-xs text-neutral-light/60">Pay with credit card or digital wallet</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full border-2 border-[#D4FF00] flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#D4FF00]" />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-neutral-light/75 bg-white/5 border border-white/5 p-4 rounded-xl">
                  <Shield className="w-4 h-4 text-[#D4FF00] flex-shrink-0" />
                  <span>Payments are processed securely through Stripe. Your card information never touches our servers.</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#D4FF00] hover:bg-[#c2eb00] text-black font-black py-4 rounded-xl text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98] shadow-lg shadow-[#D4FF00]/10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Proceed to Stripe Checkout
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-[#13160B] border border-[#1C210E] rounded-3xl p-6 space-y-6 sticky top-6">
              <h2 className="text-sm font-black uppercase tracking-wider text-neutral-light/50">Order Summary</h2>

              <div className="flex gap-4">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#1C210E] flex-shrink-0 border border-white/5">
                  <Image
                    src={displayImage}
                    alt={className}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#D4FF00] bg-[#D4FF00]/10 px-2 py-0.5 rounded border border-[#D4FF00]/25">
                      {category || 'FITNESS'}
                    </span>
                    <h3 className="text-sm font-bold text-white mt-1.5 line-clamp-1">{className}</h3>
                  </div>
                  <p className="text-xs text-neutral-light/70 capitalize">Trainer: {authorName || 'Elite Trainer'}</p>
                </div>
              </div>

              <div className="border-t border-[#1C210E] pt-4 space-y-3 text-xs">
                <div className="flex justify-between items-center text-neutral-light/75">
                  <span>Class Price</span>
                  <span className="text-white font-bold">{displayPrice}</span>
                </div>
                <div className="flex justify-between items-center text-neutral-light/75">
                  <span>Duration</span>
                  <span className="text-white font-bold">{duration}</span>
                </div>
                <div className="border-t border-[#1C210E] pt-3 flex justify-between items-end">
                  <span className="text-sm font-bold text-white">Total Amount</span>
                  <span className="text-2xl font-black text-[#D4FF00] leading-none">{displayPrice}</span>
                </div>
              </div>

              <div className="bg-[#181C0E]/40 border border-[#282F18] p-4 rounded-xl flex gap-3 text-xs text-neutral-light/80">
                <Info className="w-4 h-4 text-[#D4FF00] flex-shrink-0 mt-0.5" />
                <p>After a successful transaction, the class will be added to your Booked Classes instantly.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentClient;
