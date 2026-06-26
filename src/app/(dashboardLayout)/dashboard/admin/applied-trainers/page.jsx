import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAllTrainerApplications } from '@/lib/api/trainer-applications/data';
import AppliedTrainersClient from './AppliedTrainersClient';

const AppliedTrainersPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== 'admin') redirect('/login');
  const applications = await getAllTrainerApplications();

  return <AppliedTrainersClient applications={applications} />;
};

export default AppliedTrainersPage;
