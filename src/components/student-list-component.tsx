import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { shadow } from "../helpers/shadow";
import { Student } from "../interfaces/student.interface";
import { useStudentStore } from "../stores/student.store";
import ImageComponent from "./image_component";

interface StudentListComponentProps {
  student: Student;
}

const StudentListComponent = ({ student }: StudentListComponentProps) => {
  const fullName = `${student.first_name} ${student.middle_name} ${student.last_name}`;
  const { setSelectedStudent } = useStudentStore();

  const handleSelectStudent = () => {
    setSelectedStudent(student);
    router.push({ pathname: "/(auth_screens)/(teacher)/selected_student" });
  };

  return (
    <TouchableOpacity
      className="flex-row gap-4 w-full p-4 bg-white rounded-sm"
      onPress={handleSelectStudent}
      style={shadow()}
    >
      <ImageComponent source={student.profileUrl} size={80} radius={99} />

      <View className="">
        <Text className="font-poppins-bold">{fullName}</Text>
        <Text className="font-poppins-semibold text-black-100/80">
          {student.email}
        </Text>
        <Text className="font-poppins-regular text-black-100/60">
          {student.phone}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default StudentListComponent;
