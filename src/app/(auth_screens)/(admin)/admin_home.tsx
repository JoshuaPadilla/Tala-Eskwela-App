import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AdminHome = () => {
  return (
    <SafeAreaView className="p-8">
      <View className="h-[40%]">
        <Text>Hello Admin</Text>
      </View>

      <View className="flex flex-row flex-wrap justify-between items-center gap-2 p-4">
        <TouchableOpacity
          className="px-2 py-4 w-[48%] bg-status-processing rounded-md justify-center items-center"
          onPress={() =>
            router.push("/(auth_screens)/(admin)/subject_screens/subjects_list")
          }
        >
          <Text>Add Subject</Text>
        </TouchableOpacity>

        <TouchableOpacity className="px-2 py-4 w-[48%] bg-status-processing rounded-md justify-center items-center">
          <Text>Add Class</Text>
        </TouchableOpacity>

        <TouchableOpacity className="px-2 py-4 w-[48%] bg-status-processing rounded-md justify-center items-center">
          <Text>Add Schedule</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AdminHome;
