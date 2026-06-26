import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getBookingsByEmail } from '@/lib/api/bookings/data';
import BookedClassesClient from './BookedClassesClient';

const BookedClassesPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect('/login');
  const email = session.user.email;
  const bookings = await getBookingsByEmail(email);

  return <BookedClassesClient bookings={bookings} />;
};

export default BookedClassesPage;
