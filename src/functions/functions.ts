import { supabase } from "../lib/supabase";

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const getReviewAverage = (recipe: Recipe) => {
  const reviews = recipe.reviews;
  const reviewCount = reviews.length;
  const reviewTotal = reviews.reduce((acc, review) => {
    return acc + Number(review.rating);
  }, 0);

  return Number.isNaN(reviewTotal / reviewCount)
    ? ""
    : reviewTotal / reviewCount;
};

export const recipeInFavorites = (recipe: Recipe, favorites: Favorite[]) => {
  const recipeIds = favorites.map((favorite) => favorite.recipe.id);
  return recipeIds.includes(recipe.id);
};

export const fetchUser = async () => {
  const user_id = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("users")
    .select("*, favorites(*, recipe(*))")
    .eq("user_id", user_id.data.user.id)
    .single();

  return data as User;
};

export const getRecipesFromFavorites = (favorites: Favorite[]) => {
  const recipes = favorites.map((favorite) => favorite.recipe)
  return recipes
}

