import supabase from "../config/authConfig/supabase.js";
import { generateToken } from "../utils/jwt.js";
import { handleOtpRequest } from "../services/email_otp_.service.js";

export const loginService = async ({ username, password }) => {
  // Check s_auth table
  let { data: sData, error: sError } = await supabase
    .from("s_auth")
    .select("*")
    .eq("username", username)
    .eq("password", password)
    .single();

  if (sData && !sError) {
    const token = generateToken({
      id: sData.id,
      username: sData.username,
      role: sData.role,
    });
    return token;
  }

  // Check t_auth table if no match in s_auth
  let { data: tData, error: tError } = await supabase
    .from("t_auth")
    .select("*")
    .eq("username", username)
    .eq("password", password)
    .single();

  if (tData && !tError) {
    const token = generateToken({
      id: tData.id,
      username: tData.username,
      role: tData.role,
    });
    return token;
  }

  return null;
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
  // Check s_auth table
  let { data: sData, error: sError } = await supabase
    .from("s_auth")
    .select("email")
    .eq("username", username)
    .single();

  if (sData && !sError) {
    const email = sData.email;
    if (!email) {
      throw new Error("No email associated with this username");
    }
    await handleOtpRequest(email);
    return { email, message: "OTP sent successfully" };
  }

  // Check t_auth table if no match in s_auth
  let { data: tData, error: tError } = await supabase
    .from("t_auth")
    .select("email")
    .eq("username", username)
    .single();

  if (tData && !tError) {
    const email = tData.email;
    if (!email) {
      throw new Error("No email associated with this username");
    }
    await handleOtpRequest(email);
    return { email, message: "OTP sent successfully" };
  }

  throw new Error("Username not found");
};
