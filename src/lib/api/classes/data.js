import { serverFetch } from "../server";

export const getAllClasses = async () => {
  const res = await serverFetch('/api/classes');
  return res;
};
