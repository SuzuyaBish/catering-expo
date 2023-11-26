import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  View,
} from "react-native";
import { Text } from "../components/StyledText";
import { fetchBlogs } from "../functions/blog-functions";
import { fetchRecipes } from "../functions/recipe-functions";

export default function HomeScreen() {
  const [loading, setLoading] = useState<boolean>(true);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    fetchRecipes()
      .then((recipes) => {
        setRecipes(recipes);
      })
      .then(() => {
        fetchBlogs().then((blogs) => {
          setBlogs(blogs);
          setLoading(false);
        });
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
    <ScrollView contentContainerStyle={{
      backgroundColor: "#f3f3f3",
    }}>
      <View className="p-5">
        <View className="flex flex-row items-center justify-between mb-5">
          <Text className="text-2xl">Our Recipes</Text>
          <Text className="text-orangeColor">View All</Text>
        </View>
        <View className="flex flex-row items-center justify-between">
          {recipes.slice(0, 2).map((recipe) => {
            return (
              <View className="w-[48%] h-40">
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
              </View>
            );
          })}
        </View>
        <View className="flex flex-row items-center justify-between mb-5 mt-10">
          <Text className="text-2xl">Our Blogs</Text>
          <Text className="text-orangeColor">View All</Text>
        </View>
        <View className="flex flex-col">
          {blogs.slice(0, 4).map((blog) => {
            return (
              <View className="w-full h-40 mb-4">
                <ImageBackground
                  source={{
                    uri: blog.image,
                  }}
                  resizeMode="cover"
                  key={blog.id}
                  className="h-40 rounded-2xl overflow-hidden relative"
                >
                  <View className="absolute bottom-5 left-5">
                    <View className="bg-white/80 p-2 rounded">
                      <Text>{blog.title}</Text>
                    </View>
                  </View>
                </ImageBackground>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}
