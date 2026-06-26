import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { serverFetch } from '@/lib/api/server';
import ManageForumClient from './ManageForumClient';

const AdminForumPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== 'admin') redirect('/login');
  const posts = await serverFetch('/api/all-forum-posts');

  return <ManageForumClient posts={Array.isArray(posts) ? posts : []} />;
};

export default AdminForumPage;
