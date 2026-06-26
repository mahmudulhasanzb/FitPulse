import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAllUsers } from '@/lib/api/users/data';
import ManageUsersClient from './ManageUsersClient';

const ManageUsersPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== 'admin') redirect('/login');
  const users = await getAllUsers();

  return <ManageUsersClient users={users} />;
};

export default ManageUsersPage;
