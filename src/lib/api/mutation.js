import { baseUrl } from "./baseUrl"
import { getTokenServer } from "../getTokenServer";

export const serverMutation = async (path, method, data) => {
  const token = await getTokenServer();

  const formattedPath = path.startsWith('/') ? path : `/${path}`;
  const res = await fetch(`${baseUrl}${formattedPath}`, {
    method: method,
    headers: {
      
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data)
  })
  return res.json()
}
