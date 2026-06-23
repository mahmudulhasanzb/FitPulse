import { baseUrl } from "./baseUrl"

export const serverMutation = async (path, method, data) => {
  try {
    const formattedPath = path.startsWith('/') ? path : `/${path}`;
    const res = await fetch(`${baseUrl}${formattedPath}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      console.warn(`Mutation to ${formattedPath} failed with status: ${res.status}`);
      return null;
    }
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch (e) {
      console.warn(`Mutation to ${formattedPath} returned invalid JSON:`, text.substring(0, 100));
      return null;
    }
  } catch (error) {
    console.error(`serverMutation error on ${path}:`, error);
    return null;
  }
}

export const serverFetch = async (path) => {
  try {
    const formattedPath = path.startsWith('/') ? path : `/${path}`;
    const res = await fetch(`${baseUrl}${formattedPath}`);
    if (!res.ok) {
      console.warn(`Fetch to ${formattedPath} failed with status: ${res.status}`);
      return null;
    }
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch (e) {
      console.warn(`Fetch to ${formattedPath} returned invalid JSON:`, text.substring(0, 100));
      return null;
    }
  } catch (error) {
    console.error(`serverFetch error on ${path}:`, error);
    return null;
  }
}