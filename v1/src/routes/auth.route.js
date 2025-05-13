import { Router } from "express";
import { login } from "../controllers/auth.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();
router.post("/auth/login", login);

router.get("/auth/protected/me", protect, (req, res) => {
  res.json({ message: "Secure route", user: req.user });
});

export default router;
