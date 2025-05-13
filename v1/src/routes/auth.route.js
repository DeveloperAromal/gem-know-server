import { Router } from "express";
import { login } from "../controllers/auth.controller.js";
import { protect } from "../middleware/authMiddleware.js";
import dotenv from "dotenv";
import supabase from "../config/authConfig/supabase.js";

dotenv.config();

const router = Router();
router.post("/auth/login", login);

router.get("/auth/protected/me", protect, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("s_auth")
      .select("admno")
      .eq("id", req.user.id)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: "User not found" });
    }

    const admno = data.admno;
    if (!admno) {
      return res.status(400).json({ error: "Admission number not found" });
    }

    // Step 2: Call the /api/v1/user?admno=<admno> endpoint
    const apiResponse = await axios.get(
      `${process.env.API_BASE_URL}/api/v1/user?admno=${admno}`
    );

    // Step 3: Return the user data from the API
    res.json({
      message: "Secure route",
      user: req.user,
      userData: apiResponse.data,
    });
  } catch (err) {
    console.error("Protected Route Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});
export default router;
