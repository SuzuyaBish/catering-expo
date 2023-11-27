import React, { useState } from "react";
import {
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { Text } from "../components/StyledText";
import { supabase } from "../lib/supabase";

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
    <ScrollView
      className="flex-1"
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <View className="flex-1 flex flex-col items-center justify-center bg-blueColor space-y-5">
        <View className="h-40 w-40">
          <Image
            resizeMode="cover"
            className="h-40 w-40"
            source={require("../../assets/ico.png")}
          />
        </View>
        <TextInput
          className="w-80 p-3 border rounded mb-3"
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={{
            fontFamily: "Inter_400Regular",
            color: "white",
            borderColor: "white",
          }}
          placeholderTextColor={"white"}
        />
        <TextInput
          className="w-80 p-3 border rounded mb-3"
          placeholder="Password"
          keyboardType="visible-password"
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          style={{
            fontFamily: "Inter_400Regular",
            color: "white",
            borderColor: "white",
          }}
          placeholderTextColor={"white"}
        />
        <TouchableOpacity
          className="bg-orangeColor w-80 p-3 rounded flex items-center justify-center"
          onPress={() => {
            signIn();
          }}
        >
          <Text className="text-white">Sign In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
