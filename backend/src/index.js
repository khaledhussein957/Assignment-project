import express from "express";

import connectDB from "./config/db.js";
import ENV from "./config/ENV.js";

const app = express();

const startServer = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error("Failed to connect to database. Exiting...");
    process.exit(1);
  }
  app.listen(ENV.PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${ENV.PORT}`);
  });
};

startServer();
