import { useAuthStore } from "@/src/stores/auth.store";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TeacherHome = () => {
  const { user } = useAuthStore();

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white gap-10">
      <Text>Hello {user?.first_name}</Text>
    </SafeAreaView>
  );
};

export default TeacherHome;
