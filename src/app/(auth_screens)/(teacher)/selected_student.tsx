import { useChangeMode } from "@/src/stores/change-mode.store";
import { useStudentStore } from "@/src/stores/student.store";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SelectedStudent = () => {
  const { selectedStudent } = useStudentStore();
  const { changeMode } = useChangeMode();

  const handleRegister = () => {
    changeMode();

    router.push("/(auth_screens)/(teacher)/register-student");
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center gap-4">
      <Text>{selectedStudent?.first_name}</Text>

      <TouchableOpacity
        className="px-4 py-2 bg-primary-300 rounded-md"
        onPress={handleRegister}
      >
        <Text>Register Card</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SelectedStudent;
