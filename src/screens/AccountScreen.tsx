import React, { useEffect } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "../components/StyledText";
import { fetchUser, getRecipesFromFavorites } from "../functions/functions";

export default function AccountScreen() {
  const [userData, setUserData] = React.useState<User>(null);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchUser().then((user) => {
      setUserData(user);
      setRefreshing(false);
    });
  }, []);

  useEffect(() => {
    fetchUser().then((user) => {
      setUserData(user);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center bg-blueColor justify-center flex">
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-blueColor"
      refreshControl={
        <RefreshControl
          tintColor={"white"}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <View className="p-5">
        <Text className="text-white text-2xl mb-5">Favorited Recipes</Text>
        {getRecipesFromFavorites(userData.favorites).map((recipe) => {
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
    </ScrollView>
  );
}
