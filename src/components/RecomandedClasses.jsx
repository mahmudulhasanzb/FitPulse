import React from 'react';
import { getAllClass } from '@/lib/api/classes/data';
import ClassCard from './ClassCard';

const RecomandedClasses = async ({ category, currentClassId }) => {
  if (!category) return null;

  const allClasses = await getAllClass();
  if (!Array.isArray(allClasses)) return null;

  // Filter classes by the same category, excluding the current class
  const recommended = allClasses
    .filter(
      (item) =>
        item.category?.toLowerCase().trim() === category.toLowerCase().trim() &&
        item._id !== currentClassId
    )
    .slice(0, 3); // Display up to 3 recommended classes

  if (recommended.length === 0) return null;

  return (
    <div className="bg-[#0A0D02] text-white px-6 md:px-12 py-16 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Title */}
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-10 text-white">
          More <span className="text-primary">{category}</span> Classes
        </h2>

        {/* Dynamic Class Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommended.map((classItem) => (
            <div key={classItem._id}>
              <ClassCard classData={classItem} />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default RecomandedClasses;
