import { supabase } from "../lib/supabase";

export const fetchUser = async () => {
  let userData = null;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data, error } = await supabase
      .from("users")
      .select("*, favorites(*, recipe(*))")
      .eq("user_id", user?.id)
      .single();

    if (error) {
      console.error(error);
    }

    userData = data;
  }

  return userData;
};
