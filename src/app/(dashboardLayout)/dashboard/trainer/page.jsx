import React from 'react';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getClassByEmail } from '@/lib/api/classes/data';
import { getTrainerApplicationByEmail } from '@/lib/api/trainer-applications/data';
import TrainerOverviewClient from './TrainerOverviewClient';

const TrainerOverviewPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect('/login');
  }

  const email = session.user.email;
  let classes = [];
  let application = null;

  try {
    classes = (await getClassByEmail(email)) || [];
  } catch (error) {
    console.error('Failed to fetch trainer classes:', error);
  }

  try {
    application = await getTrainerApplicationByEmail(email);
  } catch (error) {
    console.error('Failed to fetch trainer application:', error);
  }

  return (
    <TrainerOverviewClient
      user={session.user}
      classes={classes}
      application={application}
    />
  );
};

export default TrainerOverviewPage;
