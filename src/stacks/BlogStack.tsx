import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import BlogDetailsScreen from "../screens/BlogDetailsScreen";
import BlogScreen from "../screens/BlogScreen";

export default function BlogStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1b222d",
        },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen name="Our Blogs" component={BlogScreen} />
      <Stack.Screen name="Blog Details" component={BlogDetailsScreen} />
    </Stack.Navigator>
  );
}
