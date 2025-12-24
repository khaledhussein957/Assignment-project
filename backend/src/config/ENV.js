import dotenv from "dotenv";

dotenv.config({ quiet: true });

const ENV = {
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_PORT: process.env.DATABASE_PORT,
  DATABASE_USER: process.env.DATABASE_USER,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_NAME: process.env.DATABASE_NAME,
  PORT: process.env.PORT,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  PGHOST: process.env.PGHOST,
  PGDATABASE: process.env.PGDATABASE,
  PGUSER: process.env.PGUSER,
  PGPASSWORD: process.env.PGPASSWORD,
  PGSSLMODE: process.env.PGSSLMODE,
  PGCHANNELBINDING: process.env.PGCHANNELBINDING,
  CLIENT_URL: process.env.CLIENT_URL,

  BETTER_AUTH_SECRET:
    process.env.BETTER_AUTH_SECRET ||
    "a-very-secret-key-at-least-thirty-two-chars",
  BETTER_AUTH_URL:
    process.env.BETTER_AUTH_URL ||
    `http://localhost:${process.env.PORT || 8080}/api/auth`,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
};

export default ENV;
