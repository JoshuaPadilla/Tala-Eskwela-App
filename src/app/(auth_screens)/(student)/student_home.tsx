import { useAuthStore } from "@/src/stores/auth.store";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const StudentHome = () => {
  const { studentUser, logout } = useAuthStore();

  const handleLogout = () => {
    logout();

    router.push("/");
  };

  return (
    <SafeAreaView className="flex-1 p-8  ">
      <View className="p-4 flex-row justify-between items-center">
        <Text>Hello {studentUser?.first_name}</Text>
        <TouchableOpacity
          onPress={handleLogout}
          className="px-4 py-2 bg-danger rounded-md "
        >
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default StudentHome;
