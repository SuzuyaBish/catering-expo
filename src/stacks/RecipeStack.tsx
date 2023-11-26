import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import RecipeDetailsScreen from "../screens/RecipeDetailsScreen";
import RecipesScreen from "../screens/RecipesScreen";

export default function RecipeStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Recipes" component={RecipesScreen} />
      <Stack.Screen name="Details" component={RecipeDetailsScreen} />
    </Stack.Navigator>
  );
}
