import { betterAuth } from "better-auth";
import { pool } from "../config/db.js";
import ENV from "../config/ENV.js";

export const auth = betterAuth({
  socialProviders: {
    google: {
      clientId: ENV.GOOGLE_CLIENT_ID,
      clientSecret: ENV.GOOGLE_CLIENT_SECRET,
      accessType: "offline",
      prompt: "select_account consent",
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  database: pool,
  secret: ENV.BETTER_AUTH_SECRET,
  baseURL: ENV.BETTER_AUTH_URL,
});
