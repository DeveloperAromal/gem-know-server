import supabase from "../config/authConfig/supabase.js";

export async function getAbsenteesByClass(classname) {
  const { data, error } = await supabase
    .from("absentees")
    .select("*")
    .eq("classname", classname);

  if (error) throw new Error(error.message);
  return data;
}
