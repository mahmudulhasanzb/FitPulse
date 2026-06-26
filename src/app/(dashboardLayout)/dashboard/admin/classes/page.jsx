import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAllClass } from '@/lib/api/classes/data';
import ManageClassesClient from './ManageClassesClient';

const ManageClassesPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== 'admin') redirect('/login');
  const classes = await getAllClass();

  return <ManageClassesClient classes={classes} />;
};

export default ManageClassesPage;
