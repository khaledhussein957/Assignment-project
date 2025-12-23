import express from "express";

import connectDB from "./config/db.js";
import ENV from "./config/ENV.js";

import productRoute from "./routes/product.route.js";

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/products", productRoute);

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
