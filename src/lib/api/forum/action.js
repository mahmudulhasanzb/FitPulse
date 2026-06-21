'use server';

import { serverMutation } from '../server';

import { revalidatePath } from 'next/cache';

export const addForumPost = async data => {
  const res = await serverMutation('/api/forum-post', 'POST', data);
  return res;
};

export const updateForumPost = async (id, data) => {
  const res = await serverMutation(`/api/forum-post/${id}`, 'PATCH', data);
  return res;
};

export const deleteForumPost = async formData => {
  const id = formData.get('postId');
  const res = await serverMutation(`/api/forum-post/${id}`, 'DELETE');
  revalidatePath('/dashboard/trainer/my-forum-posts');
  return res;
};

