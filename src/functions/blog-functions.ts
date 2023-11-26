import { supabase } from "../lib/supabase";

export const fetchBlogs = async () => {
  try {
    const { data, error } = await supabase.from("blogs").select("*");

    if (error) {
      throw error;
    }

    if (data) {
      return data as Blog[];
    }
  } catch (error) {
    throw error;
  }
};
