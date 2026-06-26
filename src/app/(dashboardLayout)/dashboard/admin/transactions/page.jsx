import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAllTransactions } from '@/lib/api/transactions/data';
import TransactionsClient from './TransactionsClient';

const TransactionsPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== 'admin') redirect('/login');
  const transactions = await getAllTransactions();

  return <TransactionsClient transactions={transactions} />;
};

export default TransactionsPage;
