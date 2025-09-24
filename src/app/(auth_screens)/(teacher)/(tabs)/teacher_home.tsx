import socket from "@/lib/socket";
import SelectStudentsModal from "@/src/components/modals/select-students.modal";
import StudentListComponent from "@/src/components/student-list-component";
import TeacherAttendanceComponent from "@/src/components/teacher_components/teacher_attendance_component";
import { useAttendanceStore } from "@/src/stores/attendance.store";
import { useAuthStore } from "@/src/stores/auth.store";
import { useClassStore } from "@/src/stores/class.store";
import { useStudentStore } from "@/src/stores/student.store";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TeacherHome = () => {
  const { teacherUser, logout } = useAuthStore();
  const { students, getStudents, getStudent, selectedStudent } =
    useStudentStore();
  const { addStudents } = useClassStore();
  const { addAttendance, attendances } = useAttendanceStore();

  const [selectStudentModalVisible, setSelectStudentModalVisible] =
    useState(false);

  useEffect(() => {
    socket.on("newAttendance", (data) => {
      addAttendance(data.data);
    });
  }, [addAttendance]);

  useEffect(() => {
    const loadStudents = async () => {
      await getStudents(`?class=${teacherUser?.advisory_class.id}`);
    };

    loadStudents();
  }, [getStudents, teacherUser]);

  const handleSelectStudents = () => {
    getStudents(`?class=null`);
    setSelectStudentModalVisible(true);
  };

  const handleSelectStudentsCallback = (student_ids: string[]) => {
    addStudents(teacherUser?.advisory_class.id || "", student_ids);
    setSelectStudentModalVisible(false);
  };

  const handleSelecStudent = (student_id: string) => {
    getStudent(student_id);
    router.push("/(auth_screens)/(teacher)/selected_student");
  };

  const handleLogout = () => {
    logout();

    router.replace("/");
  };

  const handleOnRequestClose = () => {
    setSelectStudentModalVisible(false);
  };

  return (
    <>
      <SelectStudentsModal
        modalVisible={selectStudentModalVisible}
        onCloseCallback={handleSelectStudentsCallback}
        onClose={handleOnRequestClose}
      />
      <SafeAreaView className="flex-1 p-8">
        <View className="flex-row justify-between">
          <TouchableOpacity
            onPress={handleLogout}
            className="px-4 py-2 items-center justify-center bg-danger rounded-md mb-4"
          >
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>

        <View className="">
          <Text>Grade {teacherUser?.advisory_class?.grade_lvl}</Text>
          <Text>Section {teacherUser?.advisory_class?.section}</Text>
        </View>

        <Text>Hello {teacherUser?.first_name}</Text>
        <Text>students</Text>

        {!teacherUser?.advisory_class ? (
          <View className="items-center justify-center flex-1">
            <Text>No Advisory Class</Text>
          </View>
        ) : (
          <>
            <TouchableOpacity
              onPress={handleSelectStudents}
              className="p-4 items-center justify-center bg-cyan-200 rounded-md mt-4"
            >
              <Text>Add Student</Text>
            </TouchableOpacity>

            <ScrollView contentContainerClassName="w-full pb[100px] py-12 gap-2 mt-10">
              {students &&
                students.map((student) => (
                  <StudentListComponent student={student} key={student.id} />
                ))}
            </ScrollView>
          </>
        )}

        <ScrollView contentContainerClassName="pb-[200px] p-4 gap-2">
          {attendances &&
            attendances.map((attendance, index) => (
              <TeacherAttendanceComponent attendance={attendance} key={index} />
            ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default TeacherHome;
