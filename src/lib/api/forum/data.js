import { serverFetch } from '../server';

// export const getAllForumPosts = async () => {
//   const result = await serverFetch('api/forum-posts')

//   return result;
// }

export const getPaginatedForumPosts = async (params = {}) => {
  let queryParams = {};
  if (typeof params === 'number' || typeof params === 'string') {
    queryParams.page = params;
  } else if (params && typeof params === 'object') {
    queryParams = { ...params };
  }

  const query = new URLSearchParams();
  query.set('page', String(queryParams.page || 1));
  query.set('limit', String(queryParams.limit || 6));

  if (queryParams.search && queryParams.search.trim()) {
    query.set('search', queryParams.search.trim());
  }

  if (
    queryParams.category &&
    queryParams.category !== 'ALL PROTOCOLS' &&
    queryParams.category !== 'ALL'
  ) {
    query.set('category', queryParams.category.trim());
  }

  if (queryParams.sort) {
    query.set('sort', queryParams.sort);
  }

  const result = await serverFetch(`api/forum-posts?${query.toString()}`);
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
