'use client';

import React from 'react';
import { motion } from 'framer-motion';
import FeaturedClassCard from './FeaturedClassCard';

import { useState, useEffect } from 'react';
import { getPaginatedClasses } from '@/lib/api/classes/data';

const FeaturedSection = () => {
  const [classCards, setClassCards] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await getPaginatedClasses();
        const data = Array.isArray(res)
          ? res
          : Array.isArray(res?.data)
            ? res.data
            : [];
        // Sort by totalEnrollment (booking count) descending for featured
        const sorted = [...data].sort((a, b) => (b.totalEnrollment || 0) - (a.totalEnrollment || 0));
        setClassCards(sorted);
      } catch (err) {
        console.error('Failed to fetch classes:', err);
      }
    };
    fetchClasses();
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const cardContainerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 70, damping: 14 } },
  };

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
            <span>View All</span>
          </motion.a>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[...classCards]
            .sort((a, b) => (b.totalEnrollment || 0) - (a.totalEnrollment || 0))
            .slice(0, 3)
            .map(classItem => (
              <motion.div key={classItem._id} variants={cardContainerVariants}>
                <FeaturedClassCard classData={classItem} />
              </motion.div>
            ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedSection;
