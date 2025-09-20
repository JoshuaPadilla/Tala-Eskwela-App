import { Subject } from "@/src/interfaces/subject.interface";
import { useSubjectStore } from "@/src/stores/subject.store";
import React from "react";
import { ActivityIndicator, Modal, ScrollView, Text, View } from "react-native";
import SubjectListItemComponent from "../subject_components/subject_list_item_component";

interface SelectSubjectModalProps {
  modalVisible: boolean;
  onCloseCallback: (subject?: Subject) => void;
}

const SelectSubjectModal = ({
  modalVisible,
  onCloseCallback,
}: SelectSubjectModalProps) => {
  const { subjects, loading } = useSubjectStore();

  const handleOnSelectCallback = (subject?: Subject) => {
    if (subject) {
      onCloseCallback(subject);
    } else {
      onCloseCallback();
    }

    return;
  };

  return (
    <Modal
      animationType="fade"
      visible={modalVisible}
      transparent
      onRequestClose={() => handleOnSelectCallback()}
    >
      <View className="flex-1 bg-black-100/40 justify-center items-center">
        <View className="w-[80%] max-h-[70%] min-h-[30%] bg-white rounded-lg p-8 gap-2">
          <View>
            <Text>Select a Subject</Text>
          </View>

          {loading ? (
            <ActivityIndicator size={"small"} />
          ) : (
            <ScrollView contentContainerClassName="pb-[200px] py-4 gap-4">
              {subjects &&
                subjects.map((subject, index) => (
                  <SubjectListItemComponent
                    subject={subject}
                    onSelect={(cl) => handleOnSelectCallback(cl)}
                    key={subject.id || index}
                  />
                ))}
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default SelectSubjectModal;
