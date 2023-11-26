import React from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "../components/StyledText";
import { supabase } from "../lib/supabase";

export default function AccountScreen() {
  return (
    <TouchableOpacity
    className="p-10"
      onPress={async () => {
        await supabase.auth.signOut();
      }}
    >
      <Text>Sign Out</Text>
    </TouchableOpacity>
  );
}
