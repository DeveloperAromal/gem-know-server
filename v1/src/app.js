import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import resultRoutes from "./routes/result.route.js";
import absenteeRoutes from "./routes/absentee.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", userRoutes);
app.use("/api/v1", resultRoutes);
app.use("/api/v1", absenteeRoutes);
app.use("/api/v1", authRoutes);

export default app;
