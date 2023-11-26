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

export default function BlogScreen({navigation}) {
  const [loading, setLoading] = useState<boolean>(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    fetchBlogs().then((blogs) => {
      setBlogs(blogs);
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
        backgroundColor: "#f3f3f3",
      }}
    >
      <View className="p-5">
        <View className="flex flex-col">
          {blogs.slice(0, 4).map((blog) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Blog Details", {
                    id: blog.id,
                  });
                }}
                className="w-full h-40 mb-4"
              >
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
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}
