import ForumPostDetailsClient from './ForumPostDetailsClient';
import { getMyForumPostById } from '@/lib/api/forum/data';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

const MyForumPostDetails = async ({ params }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect('/login');
  }

  const { id } = await params;
  const post = await getMyForumPostById(id);

  return <ForumPostDetailsClient post={post} postId={id} />;
};

export default MyForumPostDetails;
