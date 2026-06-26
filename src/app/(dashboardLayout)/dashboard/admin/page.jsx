import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { serverFetch } from '@/lib/api/server';
import AdminOverviewClient from './AdminOverviewClient';

const AdminOverviewPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== 'admin') redirect('/login');
  let stats = { totalUsers: 0, totalTrainers: 0, totalClasses: 0, totalBookings: 0, totalRevenue: 0 };
  try {
    stats = await serverFetch('/api/stats/admin');
  } catch (e) {}

  return <AdminOverviewClient stats={stats} />;
};

export default AdminOverviewPage;
