import { Inter_400Regular, useFonts } from "@expo-google-fonts/inter";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Session } from "@supabase/supabase-js";
import {
  BookMarkedIcon,
  CircleUser,
  HomeIcon,
  UtensilsCrossed,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { supabase } from "./src/lib/supabase";
import AccountScreen from "./src/screens/AccountScreen";
import BlogScreen from "./src/screens/BlogScreen";
import HomeScreen from "./src/screens/HomeScreen";
import RecipeStack from "./src/stacks/RecipeStack";
import RegistrationStack from "./src/stacks/RegistrationStack";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
  });

  const Tab = createBottomTabNavigator();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <>
      <GestureHandlerRootView className="flex-1">
        <BottomSheetModalProvider>
          <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  tabBarIcon: ({ focused }) => (
                    <HomeIcon
                      size={24}
                      color={focused ? "#e32f45" : "#748c94"}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="Our Recipes"
                component={RecipeStack}
                options={{
                  title: "Our Recipes",
                  tabBarLabel: "Recipes",
                  headerShown: false,
                  tabBarIcon: ({ focused }) => (
                    <UtensilsCrossed
                      size={24}
                      color={focused ? "#e32f45" : "#748c94"}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="Blogs"
                component={BlogScreen}
                options={{
                  tabBarIcon: ({ focused }) => (
                    <BookMarkedIcon
                      size={24}
                      color={focused ? "#e32f45" : "#748c94"}
                    />
                  ),
                }}
              />
              {session && session.user ? (
                <Tab.Screen
                  name="Account"
                  component={AccountScreen}
                  options={{
                    tabBarIcon: ({ focused }) => (
                      <CircleUser
                        size={24}
                        color={focused ? "#e32f45" : "#748c94"}
                      />
                    ),
                  }}
                />
              ) : (
                <Tab.Screen
                  name="Account"
                  component={RegistrationStack}
                  options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                      <CircleUser
                        size={24}
                        color={focused ? "#e32f45" : "#748c94"}
                      />
                    ),
                  }}
                />
              )}
            </Tab.Navigator>
          </NavigationContainer>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
      <Toast />
    </>
  );
}
