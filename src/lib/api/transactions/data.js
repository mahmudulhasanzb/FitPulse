import { serverFetch } from "../server";

export const getAllTransactions = async () => {
  const res = await serverFetch('/api/transactions');
  return res;
};
