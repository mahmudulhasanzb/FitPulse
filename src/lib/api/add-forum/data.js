import { serverFetch } from "../server"

export const getMyForumPosts = async (email) => {
  const result = await serverFetch(`api/my-forum-post/${email}`)

  return result;
}

export const getMyForumPostById = async (id) => {
  const result = await serverFetch(`/api/forum-post/${id}`)
  
  return result;
}