import { createClient } from "@supabase/supabase-js";
import { generateOtp } from "../utils/otp.js";
import { sendOtpEmail } from "../utils/mail.js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export const handleOtpRequest = async (email) => {
  const otp = generateOtp();
  const expiresAt = new Date(Date.now() + 60 * 1000).toISOString();

  const { error } = await supabase
    .from("otp")
    .insert([{ email, otp, expires_at: expiresAt }]);

  if (error) throw new Error(error.message);

  await sendOtpEmail(email, otp);
};

export const verifyOtp = async (email, otp) => {
  const { data, error } = await supabase
    .from("otp")
    .select("otp, expires_at")
    .eq("email", email)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error || !data) {
    throw new Error("No OTP found for this email");
  }

  const currentTime = new Date();
  const otpExpiresAt = new Date(data.expires_at);

  if (currentTime > otpExpiresAt) {
    throw new Error("OTP has expired");
  }

  if (data.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  // Optionally delete the OTP after successful verification
  await supabase.from("otp").delete().eq("email", email);

  return true;
};
