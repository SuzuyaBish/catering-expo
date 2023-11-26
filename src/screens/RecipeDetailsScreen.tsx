import { StarIcon } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import Toast from "react-native-toast-message";
import { Text } from "../components/StyledText";
import {
  classNames,
  getReviewAverage,
  recipeInFavorites,
} from "../functions/functions";
import {
  favoriteRecipe,
  fetchRecipeById,
  unFavoriteRecipe,
} from "../functions/recipe-functions";
import { fetchUser } from "../functions/user-function";

export default function RecipeDetailsScreen({ route, navigation }) {
  const { id } = route.params;
  const [user, setUser] = useState<User>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [recipe, setRecipe] = useState<Recipe>(null);

  useEffect(() => {
    fetchRecipeById(id)
      .then((recipe) => {
        setRecipe(recipe);
      })
      .then(() => {
        fetchUser().then((user) => {
          setUser(user);
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
    <ScrollView className="flex-1">
      <Image
        className="w-full h-60"
        source={{
          uri: recipe.image,
        }}
      />
      <View className="p-3 space-y-5">
        <View className="flex flex-row items-center justify-between">
          <Text className="text-lg">{recipe.title}</Text>
          <View className="flex flex-row items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                size={20}
                className={classNames(
                  Number(getReviewAverage(recipe)) > rating
                    ? "text-yellow-400"
                    : "text-gray-300",
                  "h-4 w-4 flex-shrink-0"
                )}
                aria-hidden="true"
              />
            ))}
          </View>
        </View>
        <Text>{recipe.description}</Text>
        <View className="flex flex-row items-center justify-between">
          <TouchableOpacity
            onPress={async () => {
              if (user) {
                if (recipeInFavorites(recipe, user.favorites) && !loading) {
                  setLoading(true);

                  await unFavoriteRecipe(recipe, user, user.favorites).then(
                    () => {
                      fetchRecipeById(id)
                        .then((recipe) => {
                          setRecipe(recipe);
                        })
                        .then(() => {
                          fetchUser().then((user) => {
                            setUser(user);
                            setLoading(false);
                          });
                        });
                    }
                  );
                } else {
                  setLoading(true);

                  await favoriteRecipe(recipe, user).then(() => {
                    fetchRecipeById(id)
                      .then((recipe) => {
                        setRecipe(recipe);
                      })
                      .then(() => {
                        fetchUser().then((user) => {
                          setUser(user);
                          setLoading(false);
                        });
                      });
                  });
                }
              } else {
                Toast.show({
                  type: "error",
                  text1: "Error",
                  text2: "You must be logged in to favorite a recipe",
                  position: "bottom",
                });
              }
            }}
            className="w-[48%] bg-orangeColor flex items-center justify-center py-4 rounded-lg"
          >
            <Text className="text-white">
              {user ? (
                <>
                  {recipeInFavorites(recipe, user.favorites)
                    ? "Unfavorite"
                    : "Favorite"}
                </>
              ) : (
                "Favorite"
              )}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (user) {
              } else {
                Toast.show({
                  type: "error",
                  text1: "Error",
                  text2: "You must be logged in to write a review",
                  position: "bottom",
                });
              }
            }}
            className="w-[48%] bg-white border-orangeColor border flex items-center justify-center py-4 rounded-lg"
          >
            <Text className="text-orangeColor">Write Review</Text>
          </TouchableOpacity>
        </View>
        <View className="space-y-3">
          <Text className="text-">Hightlights</Text>
          <View>
            {recipe.highlights.map((highlight) => {
              return <Text key={highlight}>• {highlight}</Text>;
            })}
          </View>
        </View>
        <View className="mt-5">
          <TabViewExample />
        </View>
      </View>
    </ScrollView>
  );
}

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#ff4081" }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
);
const ThirdRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
);

const renderScene = SceneMap({
  ingredients: FirstRoute,
  instructions: SecondRoute,
  reviews: ThirdRoute,
});

export function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "ingredients", title: "Ingredients" },
    { key: "instructions", title: "Instructions" },
    { key: "reviews", title: "Reviews" },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: "#f26754" }}
          style={{ backgroundColor: "#f3f3f3" }}
          labelStyle={{ fontSize: 12, color: "#f26754" }}
        />
      )}
    />
  );
}
