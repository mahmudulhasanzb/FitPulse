import { serverFetch } from "../server";

export const getAllClasses = async () => {
  const res = await serverFetch('/api/classes');
  return res;
};

export const getClassById = async (id) => {
  const res = await serverFetch(`/api/classes/${id}`);
  return res;
};

export const getClassByEmail = async (email) => {
  const res = await serverFetch(`/api/classes/${email}`);
  return res;
}
