'use client';

import React from 'react';
import { motion } from 'framer-motion';
import FeaturedCard from './FeaturedCard';

const classCards = [
  {
    _id: 'class-hiit-masterclass',
    className: 'HIIT Masterclass',
    trainerName: 'Jane Doe',
    description:
      'Max-effort conditioning designed to shred body fat and build endurance.',
    category: 'HIIT',
    price: 30.0,
    duration: '45 minutes',
    bookingCount: 45,
    image: '/hiit_workout.png',
    featured: true,
    status: 'Approved',
    badge: 'POPULAR',
    badgeType: 'highlight',
    slotsLeft: 12,
    icon: 'lightning',
  },
  {
    _id: 'class-zen-yoga',
    className: 'Zen Yoga',
    trainerName: 'Jane Doe',
    description:
      'Focus on mobility, breathing techniques, and active recovery for the elite athlete.',
    category: 'Yoga',
    price: 25.0,
    duration: '60 minutes',
    bookingCount: 30,
    image: '/zen_yoga.png',
    featured: true,
    status: 'Approved',
    badge: 'MINDFULNESS',
    badgeType: 'muted',
    slotsLeft: 8,
    icon: 'sprout',
  },
  {
    _id: 'class-power-lifting',
    className: 'Power Lifting',
    trainerName: 'Jane Doe',
    description:
      'Technical strength development focusing on Big Three movements: Squat, Bench, Deadlift.',
    category: 'Powerlifting',
    price: 35.0,
    duration: '90 minutes',
    bookingCount: 50,
    image: '/power_lifting.png',
    featured: true,
    status: 'Approved',
    badge: null,
    badgeType: null,
    slotsLeft: 0,
    icon: 'dumbbell',
  },
];

const FeaturedSection = () => {
  // Stagger variants for the cards entering viewport
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardContainerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 70,
        damping: 14,
      },
    },
  };

  return (
    <section className="relative bg-bg-dark px-6 md:px-16 py-24 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight uppercase">
              Featured Classes
            </h2>
            <p className="text-sm md:text-base text-neutral-light/70 mt-2">
              Curated high-intensity training sessions.
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

        {/* Classes Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {classCards.map(classItem => (
            <motion.div key={classItem._id} variants={cardContainerVariants}>
              <FeaturedCard classData={classItem} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedSection;
