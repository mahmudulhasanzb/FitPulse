'use server';

import { serverMutation } from '../server';

export const addForumPost = async data => {
  const res = await serverMutation('/api/forumpost', 'POST', data);
  return res;
};

export const updateForumPost = async (id,data) => {
  const res = await serverMutation(`/api/forumpost/${id}`, 'PATCH', data);
  return res;
};