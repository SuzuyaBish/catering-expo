import * as Linking from "expo-linking";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "../components/StyledText";
import { fetchBlogs } from "../functions/blog-functions";
import { fetchRecipes } from "../functions/recipe-functions";

export default function HomeScreen({ navigation }) {
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
      <View className="flex-1 flex items-center justify-center bg-blueColor">
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
        <View className="flex flex-row items-center justify-between mb-5">
          <Text className="text-2xl text-white">Our Recipes</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Our Recipes");
            }}
          >
            <Text className="text-orangeColor">View All</Text>
          </TouchableOpacity>
        </View>
        <View className="flex flex-row items-center justify-between">
          {recipes.slice(0, 2).map((recipe) => {
            return (
              <TouchableOpacity key={recipe.id} className="w-[48%] h-40">
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
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(
              "https://catering-monorepo-catering-web.vercel.app/contact"
            );
          }}
        >
          <ImageBackground
            resizeMode="cover"
            source={require("../../assets/cta.jpg")}
            className="h-40 w-full relative mt-10 flex flex-col items-center justify-center rounded-2xl overflow-hidden"
          >
            <View className="bg-black/20 z-0 w-full absolute h-full flex flex-col items-center justify-center"></View>
            <View className="z-20 absolute">
              <Text className="text-white bg-transparent text-lg">
                Ready to cater your next event?
              </Text>
              <Text className="text-white text-lg text-center">
                Get in touch today!
              </Text>
              <TouchableOpacity className="bg-orangeColor p-2 rounded flex items-center justify-center">
                <Text className="text-white">Get In Touch</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <View className="flex flex-row items-center justify-between mb-5 mt-10">
          <Text className="text-2xl text-white">Our Blogs</Text>
          <Text className="text-orangeColor">View All</Text>
        </View>
        <View className="flex flex-col">
          {blogs.slice(0, 4).map((blog) => {
            return (
              <View key={blog.id} className="w-full h-40 mb-4">
                <ImageBackground
                  source={{
                    uri: blog.image,
                  }}
                  resizeMode="cover"
                  key={blog.id}
                  className="h-40 rounded-2xl overflow-hidden relative"
                >
                  <View className="absolute bottom-5 left-5">
                    <View className="bg-white/80 w-full p-2 rounded">
                      <Text numberOfLines={1} className="w-72">
                        {blog.title}
                      </Text>
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
