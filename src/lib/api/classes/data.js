import { serverFetch } from "../server";

export const getAllClass = async () => {
  const res = await serverFetch('/api/class');
  return res;
};

export const getPaginatedClasses = async (page) => {
  if (!page) {
    page = 1;
  }
  const res = await serverFetch(`/api/classes?page=${page}`);
  return res;
}

export const getClassById = async (id) => {
  const res = await serverFetch(`/api/classes/${id}`);
  return res;
};

export const getClassByEmail = async (email) => {
  const res = await serverFetch(`/api/classes/${email}`);
  return res;
}
