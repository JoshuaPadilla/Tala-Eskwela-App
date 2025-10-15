import { Student } from "@/src/interfaces/student.interface";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import StudentModalListComponent from "../student-modal-list-component";

interface SelectStudentsModalProps {
  modalVisible: boolean;
  onCloseCallback: (student_ids: string[]) => void;
  onClose: () => void;
  students: Student[];
}

const SelectStudentsModal = ({
  modalVisible,
  onCloseCallback,
  onClose,
  students,
}: SelectStudentsModalProps) => {
  const [selectedStudents, setSeletedStudents] = useState<string[]>([]);

  const handleOnSubmit = () => {
    onCloseCallback(selectedStudents);
    setSeletedStudents([]);
  };

  const handleSelectStudent = (student_id: string) => {
    setSeletedStudents((prev) => [...prev, student_id]);
  };

  const handleUnSelectStudent = (student_id: string) => {
    setSeletedStudents((prev) =>
      prev.filter((student) => student_id !== student)
    );
  };

  const handleCloseModal = () => {
    onClose();
    setSeletedStudents([]);
  };

  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      transparent
      onRequestClose={handleCloseModal}
    >
      <View className="flex-1 bg-black-100/40 justify-center items-center">
        <View className="w-[80%] max-h-[70%] bg-white rounded-lg p-8 gap-2">
          <View>
            <Text>Select students to add</Text>
          </View>

          <ScrollView contentContainerClassName="pb-[200px] py-4 gap-4">
            {students &&
              students.map((student, index) => (
                <StudentModalListComponent
                  student={student}
                  key={student.id || index}
                  onSelect={handleSelectStudent}
                  onUnSelect={handleUnSelectStudent}
                />
              ))}
          </ScrollView>

          <TouchableOpacity
            className="w-full h-14 rounded-lg my-4"
            onPress={handleOnSubmit}
          >
            <LinearGradient
              colors={["#fb923c", "#22d3ee", "#fb923c", "#22d3ee"]}
              start={{ x: -1, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="w-full h-full items-center justify-center rounded-lg overflow-hidden self-end"
              style={{ borderRadius: 10 }}
            >
              <Text className="text-primary-400 font-semibold text-lg">
                Submit
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SelectStudentsModal;
