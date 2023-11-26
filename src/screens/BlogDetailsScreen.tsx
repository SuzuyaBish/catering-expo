import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, View } from "react-native";
import { Text } from "../components/StyledText";
import { fetchBlogById } from "../functions/blog-functions";

export default function BlogDetailsScreen({ route, navigation }) {
  const { id } = route.params;

  const [blog, setBlog] = useState<Blog>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogById(id).then((blog) => {
      setBlog(blog);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center flex">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{
        backgroundColor: "#1b222d",
      }}
    >
      <View className="p-5 space-y-5 flex flex-col items-center">
        <Text className="text-2xl text-center text-white">{blog.title}</Text>
        <Text className="text-center text-white">{blog.subtitle}</Text>
        <View className="flex flex-row items-center space-x-3">
          {blog.author?.avatar && (
            <Image
              resizeMode="cover"
              source={{
                uri: blog.author?.avatar,
              }}
              className="w-8 h-8 rounded-full overflow-hidden"
            />
          )}
          <Text className=" text-white">
            {blog.author?.first_name} {blog.author?.last_name}
          </Text>
        </View>
        <Text className=" text-white">{format(new Date(blog.created_at), "MMMM dd, yyyy")}</Text>
        <Image
          className="w-full h-64 rounded-2xl"
          resizeMode="cover"
          source={{
            uri: blog.image,
          }}
        />
        <View>
          {blog.top_content.split("\n").map((paragraph, index) => {
            return (
              <Text key={index} className="text-center text-white">
                {paragraph}
              </Text>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}
