"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import ClassCard from '@/components/ClassCard';
import { getAllClasses } from '@/lib/api/classes/action';

// Dummy dataset matching mockup items + extra filters
const initialClasses = [
  {
    _id: 'class-metcon-burst',
    className: 'ADVANCED METCON BURST',
    trainerName: 'Alex Rivera',
    trainerRole: 'LEAD STRENGTH COACH',
    trainerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
    category: 'HIIT',
    price: 25,
    duration: '45 Minutes',
    level: 'Level: Pro',
    image: '/assets/images/class_metcon.png',
    status: 'Approved',
  },
  {
    _id: 'class-iron-flow',
    className: 'IRON FLOW VINYASA',
    trainerName: 'David Kim',
    trainerRole: 'MOBILITY SPECIALIST',
    trainerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop',
    category: 'YOGA',
    price: 18,
    duration: '60 Minutes',
    level: 'All Levels',
    image: '/assets/images/class_yoga.png',
    status: 'Approved',
  },
  {
    _id: 'class-olympic-power',
    className: 'OLYMPIC POWER FOUNDATIONS',
    trainerName: 'Marcus Thorne',
    trainerRole: 'POWERLIFTING HEAD',
    trainerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop',
    category: 'WEIGHTS',
    price: 30,
    duration: '75 Minutes',
    level: 'Intermediate',
    image: '/assets/images/class_weights.png',
    status: 'Approved',
  },
  {
    _id: 'class-hiit-cardio',
    className: 'HIIT CARDIO BLAST',
    trainerName: 'Alex Rivera',
    trainerRole: 'LEAD STRENGTH COACH',
    trainerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
    category: 'CARDIO',
    price: 22,
    duration: '50 Minutes',
    level: 'Intermediate',
    image: '/assets/images/class_metcon.png',
    status: 'Approved',
  },
  {
    _id: 'class-pilates-sculpt',
    className: 'PILATES CORE SCULPT',
    trainerName: 'David Kim',
    trainerRole: 'MOBILITY SPECIALIST',
    trainerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop',
    category: 'PILATES',
    price: 20,
    duration: '60 Minutes',
    level: 'All Levels',
    image: '/assets/images/class_pilates.png',
    status: 'Approved',
  },
  {
    _id: 'class-power-squats',
    className: 'MAX EFFORT STRENGTH',
    trainerName: 'Marcus Thorne',
    trainerRole: 'POWERLIFTING HEAD',
    trainerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop',
    category: 'WEIGHTS',
    price: 35,
    duration: '90 Minutes',
    level: 'Level: Pro',
    image: '/assets/images/power_lifting.png',
    status: 'Approved',
  }
];

// Available categories matching the filter buttons
const categories = ['ALL CLASSES', 'YOGA', 'CARDIO', 'WEIGHTS', 'HIIT', 'PILATES'];

const AllClassesPage = async () => {

  const allClasses = await getAllClasses();
  console.log(allClasses);

  const [classes, setClasses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL CLASSES');

  useEffect(() => {
    const loadClasses = async () => {
      try {
        const fetched = await getAllClasses();
        if (Array.isArray(fetched)) {
          setClasses(fetched);
        }
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    loadClasses();
  }, []);

  const normalizedClasses = useMemo(() => {
    const apiClasses = classes.map((item) => ({
      _id: item._id || `class-db-${Math.random()}`,
      className: (item.title || item.className || 'UNNAMED CLASS').toUpperCase(),
      trainerName: item.trainerName || item.email || 'ALEX RIVERA',
      trainerRole: item.trainerRole || 'LEAD STRENGTH COACH',
      trainerAvatar: item.trainerAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
      category: (item.category || 'HIIT').toUpperCase(),
      price: typeof item.price === 'number' ? item.price : parseFloat(item.price || 0),
      duration: typeof item.duration === 'number' ? `${item.duration} Minutes` : (item.duration || '45 Minutes'),
      level: item.difficulty || item.level || 'All Levels',
      image: item.coverImage || item.image || '/assets/images/class_metcon.png',
      status: item.status || 'Approved',
    }));

    return [...initialClasses, ...apiClasses];
  }, [classes]);

  // Perform memoized search and category filtering
  const filteredClasses = useMemo(() => {
    return normalizedClasses.filter(classItem => {
      const matchesSearch = classItem.className.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'ALL CLASSES' || classItem.category.toUpperCase() === selectedCategory.toUpperCase();
      return matchesSearch && matchesCategory;
    });
  }, [normalizedClasses, searchQuery, selectedCategory]);

  // Framer Motion animation configurations
  const gridVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 85,
        damping: 14,
      },
    },
  };

  return (
    <div className="bg-bg-dark min-h-screen px-6 md:px-16 py-12 text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Title & Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase text-white mb-4">
            Explore Classes
          </h1>
          <p className="text-sm md:text-base text-neutral-light/75 max-w-2xl leading-relaxed">
            High-performance training sessions led by elite athletes. Filter by your goals
            and find your next breakthrough.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col xl:flex-row gap-6 justify-between items-stretch xl:items-center mb-10">
          
          {/* Search input field */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 text-neutral-light absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search by class name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-bg-card border border-white/10 focus:border-primary/50 text-white rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none transition-colors duration-200"
            />
          </div>

          {/* Category filter buttons */}
          <div className="flex flex-wrap gap-2 md:gap-3 items-center">
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 md:px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 transform active:scale-95 cursor-pointer border ${
                    isActive 
                      ? 'bg-primary text-black border-primary shadow-[0_4px_12px_rgba(212,255,0,0.2)]' 
                      : 'bg-white/5 text-neutral-light/90 border-white/5 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

        </div>

        {/* Filtered Grid Section */}
        {filteredClasses.length > 0 ? (
          <motion.div 
            variants={gridVariants}
            initial="hidden"
            animate="visible"
            key={`${selectedCategory}-${searchQuery}`} // Reset animation on filter updates
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredClasses.map((classItem) => (
              <motion.div key={classItem._id} variants={cardVariants}>
                <ClassCard classData={classItem} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20 bg-bg-card border border-white/5 rounded-2xl max-w-md mx-auto">
            <p className="text-sm text-neutral-light mb-6">
              No classes found matching your criteria.
            </p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('ALL CLASSES');
              }}
              className="px-6 py-2.5 bg-primary text-black font-extrabold uppercase text-xs tracking-wider rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default AllClassesPage;