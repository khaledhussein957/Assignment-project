import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import ENV from "./config/ENV.js";

import productRoute from "./routes/product.route.js";

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true })); // credentials: true allows the browser to send the cookies to the server with the request

// routes
app.use("/api/products", productRoute);

// test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API!" });
});

// error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

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
