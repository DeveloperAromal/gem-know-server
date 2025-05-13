import supabase from "../config/authConfig/supabase.js";

export async function getResultByAdmno(admno) {
  const { data, error } = await supabase
    .from("result")
    .select("*")
    .eq("admno", admno)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateVerifiedStatus(admno, isVerified) {
  const { data, error } = await supabase
    .from("result")
    .update({ verified: isVerified })
    .eq("admno", admno)
    .select();

  if (error) throw new Error(error.message);
  return data[0];
}
