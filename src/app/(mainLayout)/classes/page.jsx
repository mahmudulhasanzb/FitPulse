import React from 'react';
import FilterClasses from '@/components/FilterClasses';
import { getAllClasses } from '@/lib/api/classes/data';

const AllClassesPage = async () => {
  // get actual classes data from server 
  const allClasses = await getAllClasses();
  console.log(allClasses);

  const classesData = Array.isArray(allClasses) ? allClasses : [];

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

        {/* Filter Section */}
        <FilterClasses allClasses={classesData} />

      </div>
    </div>
  );
};

export default AllClassesPage;