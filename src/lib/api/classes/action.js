'use server'

import { revalidatePath } from "next/cache";
import { serverFetch, serverMutation } from "../server"

export const addClasses = async (data) => {
  const res = await serverMutation('/api/trainer', 'POST', data);
  return res
}

export const deleteClasses = async (id) => {
  const res = await serverMutation(`/api/classes/${id}`, 'DELETE');
  revalidatePath('/dashboard/trainer/classes');
  return res
}

export const updateClasses = async (id, data) => {
  const res = await serverMutation(`/api/classes/${id}`, 'PATCH', data);
  revalidatePath('/dashboard/trainer/classes');
  return res
}
