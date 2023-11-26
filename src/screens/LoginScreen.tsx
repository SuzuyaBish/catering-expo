import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { supabase } from "../lib/supabase";
import { Text } from "../components/StyledText";

export default function LoginScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const signIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.message,
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
      });
    }
  };

  return (
    <View className="flex-1 flex flex-col items-center justify-center">
      <TextInput
        className="w-80 p-3 border rounded mb-3"
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        className="w-80 p-3 border rounded mb-3"
        placeholder="Password"
        keyboardType="visible-password"
        value={password}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity
        onPress={() => {
          signIn();
        }}
      >
        <Text>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}
