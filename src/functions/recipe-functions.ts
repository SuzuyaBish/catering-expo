import Toast from "react-native-toast-message";
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

export const fetchRecipeById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("recipes")
      .select("*, reviews(*, author(*))")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }
    if (data) {
      return data as Recipe;
    }
  } catch (error) {
    throw error;
  }
};

export const unFavoriteRecipe = async (
  recipe: Recipe,
  user: User,
  favorites: Favorite[]
) => {
  const favorite = favorites.find((f) => f.recipe.id === recipe.id);

  if (!favorite) {
    // toast.error("Error removing favorite")
    Toast.show({
      type: "error",
      text1: "Error removing favorite",
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  } else {
    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("id", favorite.id);

    const { data: updatedUser, error: userError } = await supabase
      .from("users")
      .update({
        favorites: user.favorites.filter((f) => f.id !== favorite.id),
      })
      .eq("id", user.id)
      .single();

    if (error || userError) {
      // toast.error("Error removing favorite")
      Toast.show({
        type: "error",
        text1: "Error removing favorite",
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
  }
};

export const favoriteRecipe = async (recipe: Recipe, user: User) => {
  const { data, error } = await supabase
    .from("favorites")
    .insert([
      {
        user_id: user.user_id,
        recipe: recipe.id,
      },
    ])
    .select("*")
    .single();
  console.log(data);

  const favs = data! as Favorite;

  const { data: updatedUser, error: userError } = await supabase
    .from("users")
    .update({
      favorites: [...user.favorites, favs.id],
    })
    .eq("id", user.id)
    .single();

  if (error || userError) {
    // toast.error("Error adding favorite")
    Toast.show({
      type: "error",
      text1: "Error adding favorite",
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  }
};

export const writeReview = async (
  author: string,
  review: string,
  rating: number,
  recipe: Recipe
) => {
  const { data, error } = await supabase
    .from("reviews")
    .insert({
      author: author,
      recipe: recipe.id,
      review: review,
      rating: rating,
    })
    .select("*")
    .single();

  const reviewData = data! as Review;

  const getIdsFromReviews = recipe.reviews.map((r) => r.id);

  const { data: updatedRecipe, error: recipeError } = await supabase
    .from("recipes")
    .update({
      reviews: [...getIdsFromReviews, reviewData.id],
    })
    .eq("id", recipe.id)
    .single();

  if (error || recipeError) {
    // toast.error("Error adding review")
    Toast.show({
      type: "error",
      text1: "Error adding review",
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
    console.log("Review", error);
    console.log("Recipe", recipeError);
  } else {
    // toast.success("Review added!")
    Toast.show({
      type: "success",
      text1: "Review added!",
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  }
};
