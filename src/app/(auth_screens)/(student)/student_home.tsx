import { useAuthStore } from "@/src/stores/auth.store";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const StudentHome = () => {
  const { studentUser, logout } = useAuthStore();

  const handleLogout = () => {
    logout();

    router.push("/");
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white gap-10">
      <Text>Hello {studentUser?.first_name}</Text>

      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default StudentHome;
