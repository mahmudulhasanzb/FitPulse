'use client';

import React from 'react';
import { motion } from 'framer-motion';
import FeaturedClassCard from '@/components/cards/FeaturedClassCard';
import { useState, useEffect } from 'react';
import { getPaginatedClasses } from '@/lib/api/classes/data';
import FeaturedClassCardSkeleton from '@/components/cards/FeaturedClassCardSkeleton';
import { ArrowRight } from 'lucide-react';


const FeaturedSection = () => {
  const [classCards, setClassCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await getPaginatedClasses(1, 10, 'booked');
        const data = Array.isArray(res)
          ? res
          : Array.isArray(res?.data)
            ? res.data
            : [];
        setClassCards(data);
      } catch (err) {
        console.error('Failed to fetch classes:', err);
      } finally {
        setIsLoading(false)
      }
    };
    fetchClasses();
  }, []);

  return (
    <section className="relative bg-bg-dark px-6 md:px-16 py-24 z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight uppercase">
              Featured Classes
            </h2>
            <p className="text-sm md:text-base text-neutral-light/70 mt-2">
              Most popular training sessions based on bookings.
            </p>
          </div>
          <motion.a
            href="/classes"
            whileHover={{ x: 3 }}
            className="inline-flex items-center gap-1 text-sm font-bold text-primary tracking-wider uppercase cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span>View All</span> <ArrowRight className='size-4'/>
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading ? (
            [1, 2, 3].map(n => <FeaturedClassCardSkeleton key={n} />)
          ) : classCards.length > 0 ? (
            classCards.slice(0, 3).map(classItem => (
              <FeaturedClassCard key={classItem._id} classData={classItem} />
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-neutral-light/50 text-sm">
              No featured classes found.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
