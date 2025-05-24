import { Router } from "express";
import {
  login,
  resetPassword,
  getEmailAndSendOtp,
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/authMiddleware.js";
import dotenv from "dotenv";
import supabase from "../config/authConfig/supabase.js";
import axios from "axios";

dotenv.config();

const router = Router();

router.post("/auth/login", login);
router.post("/auth/reset/reset-password", resetPassword);
router.post("/auth/forget/get-email-and-send-otp", getEmailAndSendOtp);

router.get("/auth/protected/me", protect, async (req, res) => {
  try {
    // Check s_auth table
    let { data: sData, error: sError } = await supabase
      .from("s_auth")
      .select("admno")
      .eq("id", req.user.id)
      .single();

    if (sData && !sError) {
      const admno = sData.admno;
      if (!admno) {
        return res.status(400).json({ error: "Admission number not found" });
      }
      const apiResponse = await axios.get(
        `${process.env.API_BASE_URL}/api/v1/user?admno=${admno}`
      );

      return res.json({
        message: "Secure route",
        user: req.user,
        userData: apiResponse.data,
      });
    }

    // Check t_auth table if no match in s_auth
    let { data: tData, error: tError } = await supabase
      .from("t_auth")
      .select("username")
      .eq("id", req.user.id)
      .single();

    if (tData && !tError) {
      const username = tData.username;
      if (!username) {
        return res.status(400).json({ error: "Username not found" });
      }
      const apiResponse = await axios.get(
        `${process.env.API_BASE_URL}/api/v1/teacher?username=${username}`
      );

      return res.json({
        message: "Secure route",
        user: req.user,
        userData: apiResponse.data,
      });
    }

    return res.status(404).json({ error: "User not found" });
  } catch (err) {
    console.error("Protected Route Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
