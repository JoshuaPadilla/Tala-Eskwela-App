import { useAuthStore } from "@/src/stores/auth.store";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ParentHome = () => {
  const { parentUser, logout } = useAuthStore();

  const handleLogout = () => {
    logout();

    router.replace("/");
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white gap-10">
      <View className="flex-row justify-between">
        <TouchableOpacity
          onPress={handleLogout}
          className="px-4 py-2 items-center justify-center bg-danger rounded-md mb-4"
        >
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
      <Text>Hello {parentUser?.first_name}</Text>
    </SafeAreaView>
  );
};

export default ParentHome;
