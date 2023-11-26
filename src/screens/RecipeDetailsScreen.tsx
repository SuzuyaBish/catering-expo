import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { StarIcon } from "lucide-react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
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
  writeReview,
} from "../functions/recipe-functions";
import { fetchUser } from "../functions/user-function";

export default function RecipeDetailsScreen({ route, navigation }) {
  const { id } = route.params;
  const [user, setUser] = useState<User>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [review, setReview] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true);
  const [recipe, setRecipe] = useState<Recipe>(null);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const min = 0;
  const max = 5;

  const handleChange = (event) => {
    const value = Math.max(min, Math.min(max, Number(event.nativeEvent.text)));
    setRating(value);
  };

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

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

  const FirstRoute = () => (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{
        backgroundColor: "#1b222d",
      }}
    >
      <View className="w-full p-5">
        {recipe.ingredients.map((ingredient) => {
          return (
            <View className="flex items-baseline flex-row">
              <Text className="text-white">{"\u2022"}</Text>
              <Text className="flex-1 pl-5 text-white">{ingredient}</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );

  const SecondRoute = () => (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{
        backgroundColor: "#1b222d",
      }}
    >
      <View className="w-full p-5">
        {recipe.instructions.map((ingredient) => {
          return (
            <View className="flex items-baseline flex-row">
              <Text className="text-white">{"\u2022"}</Text>
              <Text className="flex-1 pl-5 text-white">{ingredient}</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
  const ThirdRoute = () => (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{
        backgroundColor: "#1b222d",
      }}
    >
      <View className="w-full p-5">
        {recipe.reviews.map((review) => {
          return (
            <View className="flex space-y-4 mb-10">
              <View className="flex flex-row items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    size={20}
                    className={classNames(
                      parseInt(review.rating) > rating
                        ? "text-yellow-400"
                        : "text-gray-300",
                      "h-4 w-4 flex-shrink-0"
                    )}
                    aria-hidden="true"
                  />
                ))}
              </View>
              <Text className="text-white">{review.review}</Text>
              <View className="flex flex-row items-center space-x-3">
                <Image
                  className="h-8 w-8 rounded-full overflow-hidden"
                  resizeMode="cover"
                  source={{
                    uri: review.author.avatar,
                  }}
                />
                <Text className="text-white">
                  {review.author.first_name} {review.author.last_name}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );

  const renderScene = SceneMap({
    ingredients: FirstRoute,
    instructions: SecondRoute,
    reviews: ThirdRoute,
  });

  function TabViewExample() {
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
            style={{ backgroundColor: "#1b222d" }}
            labelStyle={{ fontSize: 12, color: "#f26754" }}
          />
        )}
      />
    );
  }

  if (loading) {
    return (
      <View className="flex-1 flex items-center justify-center bg-blueColor">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <Image
        className="w-full h-60"
        source={{
          uri: recipe.image,
        }}
      />
      <View className="p-3 space-y-5 bg-blueColor">
        <View className="flex flex-row items-center justify-between">
          <Text className="text-lg text-white">{recipe.title}</Text>
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
        <Text className="text-white">{recipe.description}</Text>
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
                handlePresentModalPress();
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
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        enableDynamicSizing
        index={0}
        enableContentPanningGesture={false}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        )}
        handleIndicatorStyle={
          {
            // backgroundColor: Colors.dark.mutedForeground,
          }
        }
        enablePanDownToClose
        containerStyle={{
          borderTopLeftRadius: 20,
        }}
        backgroundStyle={
          {
            // backgroundColor: Colors.dark.background,
          }
        }
        style={{
          borderRadius: 20,
          overflow: "hidden",
          shadowColor: "#000",
          borderWidth: 1,
          shadowOffset: {
            width: 0,
            height: 7,
          },
          shadowOpacity: 0.41,
          shadowRadius: 9.11,

          elevation: 14,
        }}
      >
        <BottomSheetScrollView className="flex-1">
          <View className="px-5 pb-5 space-y-5">
            <BottomSheetTextInput
              placeholder="Write a review..."
              style={{
                borderColor: "#f26754",
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                textAlignVertical: "top",
                fontWeight: "bold",
              }}
              value={review}
              onChange={(event) => {
                setReview(event.nativeEvent.text);
              }}
            />
            <BottomSheetTextInput
              placeholder="Enter a rating..."
              keyboardType="numeric"
              style={{
                borderColor: "#f26754",
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                textAlignVertical: "top",
                fontWeight: "bold",
              }}
              value={rating ? rating.toString() : ""}
              onChange={handleChange}
            />
            <TouchableOpacity
              disabled={loading}
              onPress={async () => {
                if (rating && review) {
                  setLoading(true);
                  await writeReview(user.id, review, rating, recipe).then(
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
                  Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: "You must enter a rating and a review",
                    position: "bottom",
                  });
                }
              }}
              className="bg-orangeColor py-5 rounded-lg flex items-center justify-center"
            >
              <Text className="text-white">Post Review</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>
      <View className="flex-1">
        <TabViewExample />
      </View>
    </>
  );
}
