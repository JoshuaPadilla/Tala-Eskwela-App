import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { Icons } from "../constants/icons/icons.constant";
import { Student } from "../interfaces/student.interface";
import { useStudentStore } from "../stores/student.store";

interface StudentListComponentProps {
  student: Student;
}

const StudentListComponent = ({ student }: StudentListComponentProps) => {
  const { deleteStudent, setSelectedStudent } = useStudentStore();

  const handleSelectStudent = () => {
    setSelectedStudent(student);
    router.push("/(auth_screens)/(teacher)/selected_student");
  };

  const handleDeleteStudent = async () => {
    if (!student) return;
    await deleteStudent(student.id || "");
  };
  return (
    <TouchableOpacity
      className="w-full p-4 bg-purple-200 rounded-md"
      onPress={handleSelectStudent}
    >
      <View className="flex-row justify-between">
        <Text>
          {student.first_name} {student.middle_name} {student.last_name}
        </Text>
        <Pressable hitSlop={5} onPress={handleDeleteStudent}>
          <Image
            source={Icons.trash}
            style={{ height: 15, width: 15, tintColor: "#F75555" }}
          />
        </Pressable>
      </View>

      <Text>{student.phone}</Text>
    </TouchableOpacity>
  );
};

export default StudentListComponent;
