import { Class } from "@/src/interfaces/class.interface";
import { useClassStore } from "@/src/stores/class.store";
import React from "react";
import { ActivityIndicator, Modal, ScrollView, Text, View } from "react-native";
import ClassListItemComponent from "../class_components/class-list-item-component";

interface SelectClassModal {
  modalVisible: boolean;
  onCloseCallback: (classObj?: Class) => void;
}

const SelectClassModal = ({
  modalVisible,
  onCloseCallback,
}: SelectClassModal) => {
  const { classes, loading } = useClassStore();

  const handleOnSelectCallback = (classObj?: Class) => {
    if (classObj) {
      onCloseCallback(classObj);
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
            <Text>Select a Class</Text>
          </View>

          {loading ? (
            <ActivityIndicator size={"small"} />
          ) : (
            <ScrollView contentContainerClassName="pb-[200px] py-4 gap-4">
              {classes &&
                classes.map((classObj, index) => (
                  <ClassListItemComponent
                    classObj={classObj}
                    onSelect={(cl) => handleOnSelectCallback(cl)}
                    key={classObj.id || index}
                  />
                ))}
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default SelectClassModal;
