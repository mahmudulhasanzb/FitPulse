'use server';

import { serverMutation } from '../mutation';

import { revalidatePath } from 'next/cache';

export const addForumPost = async data => {
  const res = await serverMutation('/api/forum-post', 'POST', data);
  return res;
};

export const editForumPost = async (postId, data) => {
  const res = await serverMutation(`/api/forum-post/${postId}`, 'PATCH', data);
  revalidatePath('/dashboard/trainer/forum');
  return res;
};

export const deleteForumPost = async formData => {
  const id = formData.get('postId');
  const res = await serverMutation(`/api/forum-post/${id}`, 'DELETE');
  revalidatePath('/dashboard/trainer/forum');
  return res;
};

