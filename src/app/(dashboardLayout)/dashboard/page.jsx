import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const role = session?.user.role
  redirect(`/dashboard/${role}`);


};

export default DashboardPage;
