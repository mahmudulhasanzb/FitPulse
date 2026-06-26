import { serverFetch } from "../server";

export const getCommentsByPostId = async (postId) => {
  const res = await serverFetch(`/api/forum-post/${postId}/comments`);
  return res;
};
