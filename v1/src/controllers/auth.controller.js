import {
  loginService,
  resetPasswordService,
} from "../services/auth.service.js";

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

export const resetPassword = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const result = await resetPasswordService({ email, password });
    res.status(200).json(result);
  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(400).json({ error: err.message });
  }
};
