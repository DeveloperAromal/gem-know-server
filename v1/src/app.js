import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import resetPassword from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import resultRoutes from "./routes/result.route.js";
import absenteeRoutes from "./routes/absentee.route.js";
import emailOtp from "./routes/email_otp.route.js";
import VerifyEmailOtp from "./routes/email_otp.route.js";
import forgetPassword from "./routes/email_otp.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", userRoutes);
app.use("/api/v1", resultRoutes);
app.use("/api/v1", absenteeRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", emailOtp);
app.use("/api/v1", VerifyEmailOtp);
app.use("/api/v1", resetPassword);
app.use("/api/v1", forgetPassword);

export default app;
