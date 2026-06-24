"use client"
import React from 'react';
import { CalendarCheck, Heart } from 'lucide-react';
import toast from 'react-hot-toast';

const ClassDetailsActions = ({ classId }) => {

  const handleBookClass = async () => {
    const toastId = toast.loading('Initiating checkout session...');
    try {
      const res = await fetch('/api/checkout_session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.url) {
        toast.success('Redirecting to Stripe payment...', { id: toastId });
        window.location.href = data.url;
      } else {
        toast.error(data.error || 'Failed to initiate booking session.', { id: toastId });
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred. Please try again.', { id: toastId });
    }
  }
  
  return (
    <div className="space-y-3.5 w-full">
      {/* Book Now Button */}
      <button onClick={handleBookClass} className="w-full bg-primary hover:bg-primary/95 text-black font-black py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all duration-300 transform active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2">
        <CalendarCheck className="w-4 h-4" />
        Book Now
      </button>

      {/* Add to Favorites Button */}
      <button className="w-full bg-transparent border border-white/10 hover:bg-white/5 hover:border-white/20 text-white font-black py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all duration-300 transform active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2">
        <Heart className="w-4 h-4 text-primary" />
        Add to Favorites
      </button>
    </div>
  );
};

export default ClassDetailsActions;
