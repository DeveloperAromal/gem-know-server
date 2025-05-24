import supabase from "../config/authConfig/supabase.js";

export async function getAllTeachers() {
  const { data, error } = await supabase.from("t_users").select("*");
  if (error) throw new Error(error.message);
  return data;
}

export async function getTeacherByUsername(username) {
  const { data, error } = await supabase
    .from("t_users")
    .select("*")
    .eq("username", username)
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function createTeacher(user) {
  const { data, error } = await supabase
    .from("t_users")
    .insert([user])
    .select();
  if (error) throw new Error(error.message);
  return data[0];
}

export async function updateTeacher(username, user) {
  const { data, error } = await supabase
    .from("t_users")
    .update(user)
    .eq("username", username)
    .select();
  if (error) throw new Error(error.message);
  return data[0];
}

export async function deleteTeacher(username) {
  const { error } = await supabase
    .from("t_users")
    .delete()
    .eq("username", username);
  if (error) throw new Error(error.message);
  return { message: "Teacher deleted successfully" };
}
