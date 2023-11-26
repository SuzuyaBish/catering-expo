import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "../components/StyledText";
import { fetchRecipes } from "../functions/recipe-functions";

export default function RecipesScreen({ navigation }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetchRecipes().then((recipes) => {
      setRecipes(recipes);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <View className="flex-1 flex items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: "#1b222d",
      }}
    >
      <View className="p-5">
        <View className="flex flex-row flex-wrap gap-y-5 items-center justify-between">
          {recipes.map((recipe) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Details", {
                    id: recipe.id,
                  });
                }}
                key={recipe.id}
                className="w-[48%] h-40"
              >
                <ImageBackground
                  source={{
                    uri: recipe.image,
                  }}
                  resizeMode="cover"
                  key={recipe.id}
                  className="h-40 rounded-2xl overflow-hidden relative"
                >
                  <View className="absolute bottom-5 w-full flex items-center justify-center">
                    <View className="bg-white p-1 rounded">
                      <Text>{recipe.title}</Text>
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}
