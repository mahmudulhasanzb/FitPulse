'use server'

import { revalidatePath } from "next/cache";
import { serverMutation } from "../mutation";

export const addBooking = async (data) => {
  const res = await serverMutation('/api/bookings', 'POST', data);
  revalidatePath('/dashboard/student/booked-classes');
  return res;
};

export const addFavorite = async (data) => {
  const res = await serverMutation('/api/favorites', 'POST', data);
  revalidatePath('/dashboard/student/favourite-classes');
  return res;
};

export const deleteFavorite = async (id) => {
  const res = await serverMutation(`/api/favorites/${id}`, 'DELETE');
  revalidatePath('/dashboard/student/favourite-classes');
  return res;
};

export const addTrainerApplication = async (data) => {
  const res = await serverMutation('/api/trainer-application', 'POST', data);
  revalidatePath('/dashboard/student/apply-as-trainer');
  return res;
};

export const addComment = async (postId, data) => {
  const res = await serverMutation(`/api/forum-post/${postId}/comments`, 'POST', data);
  revalidatePath(`/forum-posts/${postId}`);
  return res;
};

export const editComment = async (commentId, data) => {
  const res = await serverMutation(`/api/comments/${commentId}`, 'PATCH', data);
  return res;
};

export const deleteComment = async (commentId) => {
  const res = await serverMutation(`/api/comments/${commentId}`, 'DELETE');
  return res;
};

export const likePost = async (postId) => {
  const res = await serverMutation(`/api/forum-post/${postId}/like`, 'POST', {});
  return res;
};

export const dislikePost = async (postId) => {
  const res = await serverMutation(`/api/forum-post/${postId}/dislike`, 'POST', {});
  return res;
};

export const approveTrainerApplication = async (id, data) => {
  const res = await serverMutation(`/api/trainer-application/${id}`, 'PATCH', data);
  revalidatePath('/dashboard/admin/applied-trainers');
  return res;
};

export const updateUser = async (id, data) => {
  const res = await serverMutation(`/api/users/${id}`, 'PATCH', data);
  revalidatePath('/dashboard/admin/users');
  return res;
};

export const updateAdminClass = async (id, data) => {
  const res = await serverMutation(`/api/admin/classes/${id}`, 'PATCH', data);
  revalidatePath('/dashboard/admin/classes');
  return res;
};

export const demoteTrainer = async (id) => {
  const res = await serverMutation(`/api/trainers/demote/${id}`, 'PATCH', {});
  revalidatePath('/dashboard/admin/trainers');
  return res;
};

export const addTransaction = async (data) => {
  const res = await serverMutation('/api/transactions', 'POST', data);
  return res;
};
