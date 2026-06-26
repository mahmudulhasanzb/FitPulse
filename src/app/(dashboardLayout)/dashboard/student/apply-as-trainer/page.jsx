import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getTrainerApplicationByEmail } from '@/lib/api/trainer-applications/data';
import ApplyAsTrainerClient from './ApplyAsTrainerClient';

const ApplyAsTrainerPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect('/login');
  const email = session.user.email;
  const existing = await getTrainerApplicationByEmail(email);

  return <ApplyAsTrainerClient existing={existing} />;
};

export default ApplyAsTrainerPage;
