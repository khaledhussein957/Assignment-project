import { Client } from "pg";
import ENV from "./ENV.js";

export const connectedDB = new Client({
  host: ENV.DATABASE_HOST,
  port: Number(ENV.DATABASE_PORT),
  user: ENV.DATABASE_USER,
  password: ENV.DATABASE_PASSWORD,
  database: ENV.DATABASE_NAME,
});

const connectDB = async () => {
  try {
    const conn = await connectedDB.connect();
    console.log(`✅ Database Connected`);
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    throw error;
  }
};

export default connectDB;
