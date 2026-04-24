import express from "express";
import cors from "cors";
import "dotenv/config";

import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import job from "./lib/cron.js";
import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 3001;

/* Middleware */
app.use(cors());

/* IMPORTANT — Increase request size limit */
app.use(express.json({
  limit: "50mb"
}));

app.use(express.urlencoded({
  limit: "50mb",
  extended: true
}));

/* Health check route */
app.get("/api", (req, res) => {
  res.status(200).json({
    message: "API is running",
  });
});

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

/* Start server */
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    job.start();
  })
  .catch((err) => {
    console.log("Database connection failed:", err);
  });