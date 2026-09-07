import { serverFetch } from "../server";

export const getAllClass = async () => {
  const res = await serverFetch('/api/class');
  return res;
};

export const getPaginatedClasses = async (page = 1, limit = 10, sort = '') => {
  const query = new URLSearchParams({ page, limit });
  if (sort) {
    query.set('sort', sort);
  }
  const res = await serverFetch(`/api/classes?${query.toString()}`);
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
