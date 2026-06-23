import React from 'react';
import FilterClasses from '@/components/FilterClasses';
import PaginationControls from '@/components/Pagination ';
import { getPaginatedClasses } from '@/lib/api/classes/data';

export const dynamic = 'force-dynamic';

const AllClassesPage = async ({ searchParams }) => {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const allClasses = await getPaginatedClasses(currentPage);
  const totalPage = allClasses.totalPage ?? allClasses.totalPages ?? 1;
  const classesData = Array.isArray(allClasses.data) ? allClasses.data : [];

  return (
    <div className="bg-bg-dark min-h-screen px-6 md:px-16 py-12 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Title & Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase text-white mb-4">
            Explore Classes
          </h1>
          <p className="text-sm md:text-base text-neutral-light/75 max-w-2xl leading-relaxed">
            High-performance training sessions led by elite athletes. Filter by
            your goals and find your next breakthrough.
          </p>
        </div>

        {/* Filter Section */}
        <FilterClasses allClasses={classesData} />

        {/* Pagination */}
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPage}
        />
      </div>
    </div>
  );
};

export default AllClassesPage;
