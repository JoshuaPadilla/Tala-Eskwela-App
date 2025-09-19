import { useAuthStore } from "@/src/stores/auth.store";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AdminHome = () => {
  const { logout } = useAuthStore();

  const handleAddSubject = () => {
    router.push("/(auth_screens)/(admin)/subject_screens/subjects_list");
    return;
  };

  const handleAddClass = () => {
    router.push("/(auth_screens)/(admin)/class_screens/class_list");
    return;
  };

  const handleAddSchedules = () => {
    router.push("/(auth_screens)/(admin)/schedule_screens/schedules_list");
    return;
  };

  const handleLogout = () => {
    console.log("logout");
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
          onPress={handleAddSubject}
        >
          <Text>Add Subject</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="px-2 py-4 w-[48%] bg-status-processing rounded-md justify-center items-center"
          onPress={handleAddClass}
        >
          <Text>Add Class</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="px-2 py-4 w-[48%] bg-status-processing rounded-md justify-center items-center"
          onPress={handleAddSchedules}
        >
          <Text>Add Schedule</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AdminHome;
