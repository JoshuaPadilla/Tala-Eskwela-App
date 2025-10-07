import { useParentStore } from "@/src/stores/parent.store";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import ParentModalListComponent from "../parent_modal_list_component";

interface SelectParentModalProps {
  modalVisible: boolean;
  onCloseCallback: (parentId: string) => void;
  onClose: () => void;
}

const SelectParentModal = ({
  modalVisible,
  onClose,
  onCloseCallback,
}: SelectParentModalProps) => {
  const { parentsForAddingStudents, loading } = useParentStore();

  const [selectedParentId, setSelectedParentId] = useState("");

  const handleOnCloseCallback = (parent_id: string) => {
    onCloseCallback(parent_id);
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      visible={modalVisible}
      transparent
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black-100/40 justify-center items-center">
        <View className="w-[80%] max-h-[70%] bg-white rounded-lg p-8 gap-2">
          <View className="flex-row justify-between items-center">
            <Text>Select parent to add</Text>

            <Pressable onPress={onClose} hitSlop={5}>
              <Text>x</Text>
            </Pressable>
          </View>

          {loading ? (
            <View className="h-[40%]">
              <ActivityIndicator size={"large"} />
            </View>
          ) : (
            <ScrollView contentContainerClassName="pb-[200px] py-4 gap-4">
              {parentsForAddingStudents.length > 0 &&
                parentsForAddingStudents.map((parent, index) => (
                  <ParentModalListComponent
                    parent={parent}
                    key={parent.id || index}
                    onSelect={handleOnCloseCallback}
                  />
                ))}
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default SelectParentModal;
