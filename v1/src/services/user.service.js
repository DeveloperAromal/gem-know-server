import supabase from "../config/authConfig/supabase.js";

export async function getAllUsers() {
  const { data, error } = await supabase.from("users").select("*");
  if (error) throw new Error(error.message);
  return data;
}

export async function getUserByadmno(admno) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("admno", admno)
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function createUser(user) {
  const { data, error } = await supabase.from("users").insert([user]).select();
  if (error) throw new Error(error.message);
  return data[0];
}

export async function updateUser(admno, user) {
  const { data, error } = await supabase
    .from("users")
    .update(user)
    .eq("admno", admno)
    .select();
  if (error) throw new Error(error.message);
  return data[0];
}

export async function deleteUser(admno) {
  const { error } = await supabase.from("users").delete().eq("admno", admno);
  if (error) throw new Error(error.message);
  return { message: "User deleted successfully" };
}
