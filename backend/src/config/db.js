import { Client, Pool } from "pg";
import ENV from "./ENV.js";

export const connectedDB = new Client({
  host: ENV.DATABASE_HOST,
  port: Number(ENV.DATABASE_PORT),
  user: ENV.DATABASE_USER,
  password: ENV.DATABASE_PASSWORD,
  database: ENV.DATABASE_NAME,
});

export const pool = new Pool({
  host: ENV.PGHOST,
  database: ENV.PGDATABASE,
  user: ENV.PGUSER,
  password: ENV.PGPASSWORD,
  port: 5432,
  ssl: {
    require: true,
  },
});

const connectDB = async () => {
  try {
    const conn = await pool.connect();
    console.log(`✅ Database Connected`);
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    throw error;
  }
};

export default connectDB;
