import ClassDetails from '@/components/ClassDetails';
import RecommendedClasses from '@/components/RecommendedClasses';
import { getClassById } from '@/lib/api/classes/data';
import React from 'react';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

const ClassDetailsPage = async ({ params }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect('/login');
  }

  const { id } = await params;
  const classData = await getClassById(id);

  return (
    <>
      <ClassDetails classData={classData} />
      {classData && (
        <RecommendedClasses 
          category={classData.category} 
          currentClassId={classData._id} 
        />
      )}
    </>
  );
};

export default ClassDetailsPage;
