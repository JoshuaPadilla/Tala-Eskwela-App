import BackComponent from "@/src/components/back_component";
import SelectStudentsModal from "@/src/components/modals/select-students.modal";
import StudentListComponent from "@/src/components/student-list-component";
import { Student } from "@/src/interfaces/student.interface";
import { useAuthStore } from "@/src/stores/auth.store";
import { useClassStore } from "@/src/stores/class.store";
import { useStudentStore } from "@/src/stores/student.store";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TeacherStudents = () => {
  const { getStudents } = useStudentStore();
  const { teacherUser } = useAuthStore();
  const { addStudents } = useClassStore();

  const [addStudentsModalVisible, setAddStudentsModalVisible] = useState(false);

  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  const [students, setStudents] = useState<Student[] | []>([]);
  const [availStudents, setAvailStudents] = useState<Student[] | []>([]);

  const handleOpenAddStudentModal = async () => {
    setAddStudentsModalVisible(true);

    const result = await getStudents("?class=null");

    if (result) {
      setAvailStudents(result);
    }
  };

  const handleCloseModal = () => {
    setAddStudentsModalVisible(false);
  };

  const addStudentCloseCallback = async (student_ids: string[]) => {
    if (student_ids.length === 0 || !teacherUser?.advisory_class) return;

    const newStudents = await addStudents(
      teacherUser?.advisory_class?.id || "",
      student_ids
    );

    if (newStudents) {
      setStudents((prev) => [...prev, ...newStudents]);
    }

    setAddStudentsModalVisible(false);
  };

  useEffect(() => {
    const loadStudents = async () => {
      const result = await getStudents(
        teacherUser?.advisory_class.id &&
          `?class=${teacherUser?.advisory_class.id}`
      );

      if (result) {
        setStudents(result);
      }
    };

    loadStudents();
  }, [getStudents, setStudents, teacherUser]);

  return (
    <>
      <SelectStudentsModal
        modalVisible={addStudentsModalVisible}
        onClose={handleCloseModal}
        onCloseCallback={addStudentCloseCallback}
        students={availStudents}
      />
      <SafeAreaView className="flex-1 p-8">
        <View className="flex-row justify-between items-center">
          <BackComponent />

          <Pressable
            className="px-4 py-2 bg-primary-300 rounded-md"
            onPress={handleOpenAddStudentModal}
          >
            <Text>Add</Text>
          </Pressable>
        </View>

        <Text className="text-lg font-bold">Students:</Text>

        <ScrollView>
          {students &&
            students.map((student, idx) => {
              return (
                <StudentListComponent
                  student={student}
                  key={student.id || idx}
                />
              );
            })}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default TeacherStudents;
