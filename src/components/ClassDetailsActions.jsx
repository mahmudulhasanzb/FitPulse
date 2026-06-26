"use client"
import React, { useState, useEffect } from 'react';
import { CalendarCheck, Heart, HeartOff, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { checkBooking } from '@/lib/api/bookings/data';
import { checkFavorite } from '@/lib/api/favorites/data';
import { addFavorite } from '@/lib/api/mutations/actions';
import { baseUrl } from '@/lib/api/baseUrl';

const ClassDetailsActions = ({ classId, className, classImage }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const [booked, setBooked] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [favId, setFavId] = useState(null);
  const [loadingBooking, setLoadingBooking] = useState(true);
  const [loadingFav, setLoadingFav] = useState(true);
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    if (!user?.email || !classId) return;

    checkBooking(classId, user.email).then(res => {
      setBooked(res.booked);
      setLoadingBooking(false);
    });

    checkFavorite(classId, user.email).then(res => {
      setFavorited(res.favorited);
      setLoadingFav(false);
    });

    // Check blocked status
    fetch(`${baseUrl}/api/users`)
      .then(res => res.json())
      .then(users => {
        const currentUser = users.find(u => u.email === user.email);
        if (currentUser?.status === 'blocked') setIsBlocked(true);
      })
      .catch(e => console.error(e));
  }, [classId, user]);

  const handleBookClass = async () => {
    if (!user) {
      toast.error('Please login to book a class');
      router.push('/login');
      return;
    }

    if (isBlocked) {
      toast.error('Action restricted by Admin');
      return;
    }

    if (booked) {
      toast.error('You have already booked this class');
      return;
    }

    router.push(`/payment?classId=${classId}`);
  };

  const handleToggleFavorite = async () => {
    if (!user) {
      toast.error('Please login to add favorites');
      router.push('/login');
      return;
    }

    if (isBlocked) {
      toast.error('Action restricted by Admin');
      return;
    }

    const res = await addFavorite({ classId, className, classImage });
    if (res.favorited) {
      setFavorited(true);
      toast.success('Successfully added to your favorites!');
    } else {
      setFavorited(false);
      toast.success('Removed from favorites');
    }
  };

  return (
    <div className="space-y-3.5 w-full">
      {/* Book Now Button */}
      <button
        onClick={handleBookClass}
        disabled={loadingBooking}
        className={`w-full font-black py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all duration-300 transform active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 ${
          booked
            ? 'bg-[#1C210E] text-[#A4A896]/50 cursor-not-allowed'
            : 'bg-primary hover:bg-primary/95 text-black'
        }`}
      >
        {loadingBooking ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <CalendarCheck className="w-4 h-4" />
        )}
        {booked ? 'Already Booked' : 'Book Now'}
      </button>

      {/* Add to Favorites Button */}
      <button
        onClick={handleToggleFavorite}
        disabled={loadingFav}
        className={`w-full font-black py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all duration-300 transform active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 ${
          favorited
            ? 'bg-red-950/30 border border-red-500/20 text-red-400'
            : 'bg-transparent border border-white/10 hover:bg-white/5 hover:border-white/20 text-white'
        }`}
      >
        {loadingFav ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : favorited ? (
          <HeartOff className="w-4 h-4" />
        ) : (
          <Heart className="w-4 h-4 text-primary" />
        )}
        {favorited ? 'Saved to Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
};

export default ClassDetailsActions;
