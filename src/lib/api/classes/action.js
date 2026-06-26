'use server'

import { revalidatePath } from "next/cache";
import { serverMutation } from "../mutation";

export const addClasses = async (data) => {
  const res = await serverMutation('/api/trainer', 'POST', data);
  revalidatePath('/dashboard/trainer/classes');
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
