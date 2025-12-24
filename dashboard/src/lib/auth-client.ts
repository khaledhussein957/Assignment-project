import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: `https://assignment-project-6hx1.onrender.com/api/auth`,
});
