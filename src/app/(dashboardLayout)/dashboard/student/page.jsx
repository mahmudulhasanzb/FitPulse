import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { serverFetch } from '@/lib/api/server';
import StudentOverViewClient from './StudentOverViewClient';

const StudentOverViewPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect('/login');
  const email = session.user.email;
  let stats = { totalBookings: 0, totalFavorites: 0, application: null };
  try {
    stats = await serverFetch(`/api/stats/student/${email}`);
  } catch (e) {}

  return <StudentOverViewClient stats={stats} />;
};

export default StudentOverViewPage;
