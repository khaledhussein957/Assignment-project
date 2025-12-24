import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import connectDB from "./config/db.js";
import ENV from "./config/ENV.js";
import jobs from "./config/cron.js";

import productRoute from "./routes/product.route.js";
import { auth } from "./lib/auth.js";
import { toNodeHandler } from "better-auth/node";

const app = express();

jobs.start();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

// better-auth handler
app.all("/api/auth/*path", toNodeHandler(auth));

// routes
app.use("/api/products", productRoute);

// test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API!" });
});

// make our app ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../dashboard/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../dashboard", "dist", "index.html"));
  });
}

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
