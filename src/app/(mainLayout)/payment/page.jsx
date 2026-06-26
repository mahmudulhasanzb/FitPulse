import React from 'react';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getClassById } from '@/lib/api/classes/data';
import PaymentClient from './PaymentClient';

export const dynamic = 'force-dynamic';

const PaymentPage = async ({ searchParams }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect('/login');
  }

  const { classId } = await searchParams;
  if (!classId) {
    redirect('/classes');
  }

  const classData = await getClassById(classId);
  if (!classData) {
    redirect('/classes');
  }

  return (
    <PaymentClient classData={classData} />
  );
};

export default PaymentPage;
