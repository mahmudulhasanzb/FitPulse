import React from 'react';
import FilterClasses from '@/components/FilterClasses';
import PaginationControls from '@/components/Pagination';
import { baseUrl } from '@/lib/api/baseUrl';

export const dynamic = 'force-dynamic';

const AllClassesPage = async ({ searchParams }) => {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const search = params.search || '';
  const category = params.category || '';

  const query = new URLSearchParams({ page: currentPage, limit: 10 });
  if (search) query.set('search', search);
  if (category) query.set('category', category);

  const res = await fetch(`${baseUrl}/api/classes?${query.toString()}`);
  const allClasses = await res.json();
  const totalPage = allClasses.totalPage ?? 1;
  const classesData = Array.isArray(allClasses.data) ? allClasses.data : [];

  return (
    <div className="bg-bg-dark min-h-screen px-6 md:px-16 py-12 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase text-white mb-4">Explore Classes</h1>
          <p className="text-sm md:text-base text-neutral-light/75 max-w-2xl leading-relaxed">
            High-performance training sessions led by elite athletes. Filter by your goals and find your next breakthrough.
          </p>
        </div>

        <FilterClasses
          allClasses={classesData}
          currentSearch={search}
          currentCategory={category}
        />

        {/* Pagination — sits at the bottom of the card grid */}
        <div className="mt-10">
          <PaginationControls currentPage={currentPage} totalPages={totalPage} />
        </div>
      </div>
    </div>
  );
};

export default AllClassesPage;
