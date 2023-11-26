import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import LoginScreen from "../screens/LoginScreen";

export default function RegistrationStack() {
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
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegistrationStack} />
    </Stack.Navigator>
  );
}
