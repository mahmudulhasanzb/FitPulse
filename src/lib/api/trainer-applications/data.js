import { serverFetch } from "../server";

export const getTrainerApplicationByEmail = async (email) => {
  const res = await serverFetch(`/api/trainer-application/${email}`);
  return res;
};

export const getAllTrainerApplications = async () => {
  const res = await serverFetch('/api/trainer-applications');
  return res;
};
