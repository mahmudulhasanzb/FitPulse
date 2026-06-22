import ClassDetails from '@/components/ClassDetails';
import RecomandedClasses from '@/components/RecomandedClasses';
import { getClassById } from '@/lib/api/classes/data';
import React from 'react';

const ClassDetailsPage = async ({ params }) => {
  const { id } = await params;
  const classData = await getClassById(id);

  return (
    <>
      <ClassDetails classData={classData} />
      {classData && (
        <RecomandedClasses 
          category={classData.category} 
          currentClassId={classData._id} 
        />
      )}
    </>
  );
};

export default ClassDetailsPage;
