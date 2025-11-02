import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Student } from "../interfaces/student.interface";
import { useStudentStore } from "../stores/student.store";

interface StudentListComponentProps {
  student: Student;
}

const StudentListComponent = ({ student }: StudentListComponentProps) => {
  const { setSelectedStudent } = useStudentStore();

  const handleSelectStudent = () => {
    setSelectedStudent(student);
    router.push({ pathname: "/(auth_screens)/(teacher)/selected_student" });
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
      </View>

      <Text>{student.phone}</Text>
    </TouchableOpacity>
  );
};

export default StudentListComponent;
