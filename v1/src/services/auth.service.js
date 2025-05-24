import supabase from "../config/authConfig/supabase.js";
import { generateToken } from "../utils/jwt.js";
import { handleOtpRequest } from "../services/email_otp_.service.js";

export const loginService = async ({ username, password }) => {
  const { data, error } = await supabase
    .from("s_auth")
    .select("*")
    .eq("username", username)
    .eq("password", password)
    .single();

  if (error || !data) return null;

  const token = generateToken({
    id: data.id,
    username: data.username,
    role: data.role,
  });

  return token;
};

export const resetPasswordService = async ({ email, password }) => {
  const { data, error } = await supabase
    .from("s_auth")
    .update({ password })
    .eq("email", email)
    .select()
    .single();

  if (error || !data) {
    throw new Error(
      "Failed to reset password. User not found or database error."
    );
  }

  return { message: "Password reset successfully" };
};

export const getEmailAndSendOtpService = async ({ username }) => {
  const { data, error } = await supabase
    .from("s_auth")
    .select("email")
    .eq("username", username)
    .single();

  if (error || !data) {
    throw new Error("Username not found");
  }

  const email = data.email;
  if (!email) {
    throw new Error("No email associated with this username");
  }

  await handleOtpRequest(email);
  return { email, message: "OTP sent successfully" };
};
