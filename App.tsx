import { Inter_400Regular, useFonts } from "@expo-google-fonts/inter";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Session } from "@supabase/supabase-js";
import {
  BookMarkedIcon,
  CircleUser,
  HomeIcon,
  LogOut,
  UtensilsCrossed,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { supabase } from "./src/lib/supabase";
import AccountScreen from "./src/screens/AccountScreen";
import HomeScreen from "./src/screens/HomeScreen";
import BlogStack from "./src/stacks/BlogStack";
import RecipeStack from "./src/stacks/RecipeStack";
import RegistrationStack from "./src/stacks/RegistrationStack";
import { TouchableOpacity } from "react-native";

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
            <Tab.Navigator
              screenOptions={{
                tabBarStyle: {
                  backgroundColor: "#1b222d",
                  borderTopWidth: 0,
                  elevation: 0,
                },
              }}
            >
              <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  tabBarLabelStyle: {
                    fontFamily: "Inter_400Regular",
                  },
                  headerStyle: {
                    backgroundColor: "#1b222d",
                  },
                  headerTintColor: "#fff",
                  tabBarActiveTintColor: "#f26754",
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
                  tabBarLabelStyle: {
                    fontFamily: "Inter_400Regular",
                  },
                  tabBarActiveTintColor: "#f26754",
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
                component={BlogStack}
                options={{
                  tabBarLabelStyle: {
                    fontFamily: "Inter_400Regular",
                  },
                  tabBarActiveTintColor: "#f26754",
                  headerShown: false,
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
                    tabBarLabelStyle: {
                      fontFamily: "Inter_400Regular",
                    },
                    headerStyle: {
                      backgroundColor: "#1b222d",
                    },
                    headerTintColor: "#fff",
                    tabBarActiveTintColor: "#f26754",

                    // icon at the top of the screen
                    headerRight: () => (
                      <TouchableOpacity
                        className="p-10"
                        onPress={async () => {
                          await supabase.auth.signOut();
                        }}
                      >
                        <LogOut size={24} color="#fff" />
                      </TouchableOpacity>
                    ),

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
                    tabBarLabelStyle: {
                      fontFamily: "Inter_400Regular",
                    },
                    headerStyle: {
                      backgroundColor: "#1b222d",
                    },
                    headerTintColor: "#fff",
                    tabBarActiveTintColor: "#f26754",
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
