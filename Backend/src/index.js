import express from "express";
import cors from "cors";
import "dotenv/config";

import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import job from "./lib/cron.js";
import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

job.start();

app.use(cors());
app.use(express.json());

// Health check route (for cron)
app.get("/api", (req, res) => {
  res.status(200).json({
    message: "API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});