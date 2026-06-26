import { serverFetch } from "../server";

export const getFavoritesByEmail = async (email) => {
  const res = await serverFetch(`/api/favorites/${email}`);
  return res;
};

export const checkFavorite = async (classId, email) => {
  const res = await serverFetch(`/api/favorites/check/${classId}/${email}`);
  return res;
};
