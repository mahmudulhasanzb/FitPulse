import { baseUrl } from "./baseUrl"

export const serverFetch = async (path, options = {}) => {
  const formattedPath = path.startsWith('/') ? path : `/${path}`;
  const res = await fetch(`${baseUrl}${formattedPath}`, {
    next: { revalidate: 60 },
    ...options,
  });
  
  if (!res.ok) {
    console.error(`Fetch error: ${res.status} ${res.statusText} for ${formattedPath}`);
    return null;
  }
  
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch (error) {
    console.error(`JSON parse error for ${formattedPath}:`, error);
    return null;
  }
}