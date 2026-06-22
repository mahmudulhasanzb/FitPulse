import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: 'http://localhost:3000'
});

// process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_BASE_URL,

export const { signIn, signUp, useSession } = createAuthClient();


