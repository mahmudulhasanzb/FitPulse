'use server'

import { serverMutation } from "../server"

export const addClasses = async (data)=>{
 const res = await serverMutation('/api/trainer', 'POST',data);   
 return res
}