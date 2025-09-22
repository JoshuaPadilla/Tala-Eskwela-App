import { Teacher } from "@/src/interfaces/teacher.interface";
import { useTeacherStore } from "@/src/stores/teacher.store";
import React from "react";
import { Modal, ScrollView, Text, View } from "react-native";
import TeacherModalListComponent from "../teacher-modal-list-component.tsx";

interface SelectTeacherModalProps {
  modalVisible: boolean;
  onCloseCallback: (teacher: Teacher) => void;
}

const SelectTeacherModal = ({
  modalVisible,
  onCloseCallback,
}: SelectTeacherModalProps) => {
  const { teachers, loading } = useTeacherStore();

  const handleOnSelectCallback = (teacher: Teacher) => {
    onCloseCallback(teacher);
  };

  return (
    <Modal animationType="fade" visible={modalVisible} transparent>
      <View className="flex-1 bg-black-100/40 justify-center items-center">
        <View className="w-[80%] max-h-[70%] bg-white rounded-lg p-8 gap-2">
          <View>
            <Text>Select a teacher</Text>
          </View>

          <ScrollView contentContainerClassName="pb-[200px] py-4 gap-4">
            {teachers &&
              teachers.map((teacher, index) => (
                <TeacherModalListComponent
                  teacher={teacher}
                  onSelect={handleOnSelectCallback}
                  key={teacher.id || index}
                />
              ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default SelectTeacherModal;
