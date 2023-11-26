import { supabase } from "../lib/supabase";

export const fetchRecipes = async () => {
  try {
    const { data, error } = await supabase.from("recipes").select("*");

    if (error) {
      throw error;
    }

    if (data) {
      return data as Recipe[];
    }
  } catch (error) {
    throw error;
  }
};
