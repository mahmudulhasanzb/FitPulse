import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getFavoritesByEmail } from '@/lib/api/favorites/data';
import FavouriteClassesClient from './FavouriteClassesClient';

const FavouriteClassesPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect('/login');
  const email = session.user.email;
  const favorites = await getFavoritesByEmail(email);

  return <FavouriteClassesClient favorites={favorites} />;
};

export default FavouriteClassesPage;
