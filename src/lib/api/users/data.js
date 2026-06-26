import { serverFetch } from "../server";

export const getAllUsers = async () => {
  const res = await serverFetch('/api/users');
  return res;
};

export const getTrainers = async () => {
  const res = await serverFetch('/api/trainers');
  return res;
};
