import BackComponent from "@/src/components/back_component";
import SelectParentModal from "@/src/components/modals/select-parent-modal";
import { useParentStore } from "@/src/stores/parent.store";
import { useStudentStore } from "@/src/stores/student.store";
import { router } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SelectedStudent = () => {
  const { selectedStudent, setStudentToRegister, addParent } =
    useStudentStore();

  const { getParentsForAddingStudents } = useParentStore();

  const [addParentModalVisible, setAddParentModalVisible] = useState(false);

  const handleRegister = () => {
    setStudentToRegister(selectedStudent?.id || "");

    router.push("/(auth_screens)/(teacher)/register_student");
  };

  const handleAddParent = () => {
    if (!selectedStudent) return;
    setAddParentModalVisible(true);

    getParentsForAddingStudents(selectedStudent.id);
  };

  const handleAddParentModalClose = () => {
    setAddParentModalVisible(false);
  };

  const handleAddParentCallback = (parentId: string) => {
    if (selectedStudent) {
      addParent(selectedStudent.id, parentId);
    }
  };

  return (
    <>
      <SelectParentModal
        modalVisible={addParentModalVisible}
        onClose={handleAddParentModalClose}
        onCloseCallback={handleAddParentCallback}
      />
      <SafeAreaView className="flex-1 p-8 gap-4">
        <View className="flex-row justify-between items-center">
          <BackComponent />
        </View>

        <View className="">
          <Text>
            {selectedStudent?.first_name} {selectedStudent?.middle_name}{" "}
            {selectedStudent?.last_name}
          </Text>

          <Text>Parent: {selectedStudent?.parent?.first_name}</Text>
        </View>

        <TouchableOpacity
          className="p-4 bg-primary-300 rounded-md justify-center items-center"
          onPress={handleRegister}
        >
          <Text>Register Card</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="p-4 bg-primary-300 rounded-md justify-center items-center"
          onPress={handleAddParent}
        >
          <Text>Add Parent</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default SelectedStudent;
