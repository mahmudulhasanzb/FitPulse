"use client";

import React, { useState, useMemo } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ClassCard from '@/components/ClassCard';

const FilterClasses = ({ allClasses = [] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL CLASSES');
  const [isOpen, setIsOpen] = useState(false);

  // Dynamically extract categories from allClasses
  const categories = useMemo(() => {
    const cats = new Set();
    allClasses.forEach(item => {
      if (item.category) {
        cats.add(item.category.toUpperCase().trim());
      }
    });
    return ['ALL CLASSES', ...Array.from(cats)];
  }, [allClasses]);

  // Filter classes based on query and category
  const filteredClasses = useMemo(() => {
    return allClasses.filter(item => {
      const className = item.className || '';
      const category = item.category || '';
      
      const matchesSearch = className.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'ALL CLASSES' || 
        category.toUpperCase().trim() === selectedCategory.toUpperCase();
      
      return matchesSearch && matchesCategory;
    });
  }, [allClasses, searchQuery, selectedCategory]);

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
    <div>
      {/* Filter Controls Bar */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-stretch md:items-center mb-10">
        
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

        {/* Category filter dropdown */}
        <div className="relative w-full md:w-64">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full bg-bg-card border border-white/10 hover:border-white/20 text-white rounded-xl px-5 py-3 text-xs md:text-sm font-black uppercase tracking-wider flex items-center justify-between cursor-pointer transition-all duration-300 select-none active:scale-[0.99]"
          >
            <span>{selectedCategory}</span>
            <ChevronDown className={`w-4 h-4 text-neutral-light transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isOpen && (
              <>
                {/* Overlay click-away listener */}
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsOpen(false)}
                />
                
                {/* Dropdown Items list */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 left-0 mt-2 bg-bg-navbar border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 py-1.5 max-h-64 overflow-y-auto"
                >
                  {categories.map((category) => {
                    const isActive = selectedCategory === category;
                    return (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsOpen(false);
                        }}
                        className={`w-full text-left px-5 py-2.5 text-xs font-black uppercase tracking-wider transition-colors duration-200 cursor-pointer block ${
                          isActive 
                            ? 'bg-primary text-black' 
                            : 'text-neutral-light hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {category}
                      </button>
                    );
                  })}
                </motion.div>
              </>
            )}
          </AnimatePresence>
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
          {filteredClasses.map((classItem, index) => (
            <motion.div key={classItem._id || `${classItem.className}-${index}`} variants={cardVariants}>
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
  );
};

export default FilterClasses;
