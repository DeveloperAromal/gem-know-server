import { loginService } from "../services/auth.service.js";

export const login = async (req, res) => {
  try {
    const token = await loginService(req.body);
    if (!token) return res.status(401).json({ error: "Invalid credentials" });

    res.json({ token });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
