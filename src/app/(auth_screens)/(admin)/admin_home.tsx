import { useAuthStore } from "@/src/stores/auth.store";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AdminHome = () => {
  const { logout } = useAuthStore();

  const handleGoToSubjects = () => {
    router.push("/(auth_screens)/(admin)/subject_screens/subjects_list");
    return;
  };

  const handleGoToClasses = () => {
    router.push("/(auth_screens)/(admin)/class_screens/class_list");
    return;
  };

  const handleGoToSchedules = () => {
    router.push("/(auth_screens)/(admin)/schedule_screens/schedules_list");
    return;
  };

  const handleGoToTeachers = () => {
    router.push("/(auth_screens)/(admin)/teachers_screens/teachers_list");
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <SafeAreaView className="p-8 flex-1">
      <View className="h-[40%]">
        <Text>Hello Admin</Text>
      </View>

      <Pressable onPress={handleLogout}>
        <Text>Logout</Text>
      </Pressable>

      <View className="flex flex-row flex-wrap justify-between items-center gap-2 p-4">
        <TouchableOpacity
          className="px-2 py-4 w-[48%] bg-status-processing rounded-md justify-center items-center"
          onPress={handleGoToSubjects}
        >
          <Text>Subjects</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="px-2 py-4 w-[48%] bg-status-processing rounded-md justify-center items-center"
          onPress={handleGoToClasses}
        >
          <Text>Classes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="px-2 py-4 w-[48%] bg-status-processing rounded-md justify-center items-center"
          onPress={handleGoToSchedules}
        >
          <Text>Schedules</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="px-2 py-4 w-[48%] bg-status-processing rounded-md justify-center items-center"
          onPress={handleGoToTeachers}
        >
          <Text>Teachers</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AdminHome;
