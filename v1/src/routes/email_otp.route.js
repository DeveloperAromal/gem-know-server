import express from "express";
import {
  sendOtp,
  verifyOtpController,
} from "../controllers/email_otp.controller.js";

const router = express.Router();

router.post("/otp/send-otp", sendOtp);
router.post("/otp/verify-otp", verifyOtpController);

export default router;
