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
