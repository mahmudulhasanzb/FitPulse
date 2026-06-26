import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getTrainers } from '@/lib/api/users/data';
import ManageTrainersClient from './ManageTrainersClient';

const ManageTrainersPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== 'admin') redirect('/login');
  const trainers = await getTrainers();

  return <ManageTrainersClient trainers={trainers} />;
};

export default ManageTrainersPage;
