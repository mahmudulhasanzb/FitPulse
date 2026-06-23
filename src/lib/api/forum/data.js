import { serverFetch } from '../server';

// export const getAllForumPosts = async () => {
//   const result = await serverFetch('api/forum-posts')

//   return result;
// }

export const getPaginatedForumPosts = async page => {
  if (!page) {
    page = 1;
  }
  const result = await serverFetch(`api/forum-posts?page=${page}`);

  return result;
};

export const getMyForumPosts = async email => {
  const result = await serverFetch(`api/my-forum-post/${email}`);

  return result;
};

export const getMyForumPostById = async id => {
  const result = await serverFetch(`/api/forum-post/${id}`);

  return result;
};
