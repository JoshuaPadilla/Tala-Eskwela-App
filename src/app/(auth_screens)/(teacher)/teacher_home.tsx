import { useAuthStore } from "@/src/stores/auth.store";
import { useStudentStore } from "@/src/stores/student.store";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TeacherHome = () => {
  const { user, logout } = useAuthStore();
  const { students, getStudents, getStudent, selectedStudent } =
    useStudentStore();

  useEffect(() => {
    const loadStudents = async () => {
      await getStudents();
    };

    loadStudents();
  }, [getStudents]);

  const handleSelecStudent = (student_id: string) => {
    getStudent(student_id);
    router.push("/(auth_screens)/(teacher)/selected_student");
  };

  const handleLogout = () => {
    logout();

    router.push("/");
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white gap-10">
      <Text>Hello {user?.first_name}</Text>
      <Text>students</Text>

      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>

      <ScrollView contentContainerClassName="pb[100px] py-12 gap-2">
        {students.map((student) => (
          <TouchableOpacity
            key={student.id}
            className="bg-purple-100 px-4 py-2 rounded-md"
            onPress={() => handleSelecStudent(student.id || "")}
          >
            <Text>
              {student.first_name} {student.last_name}{" "}
              {student.rfid_tag_uid || "Not yet Registered"}
            </Text>

            <Text>{student.push_token}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TeacherHome;
