import React from "react";
import { Modal, Text, View } from "react-native";

interface CreateModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

const CreateSubjectModal = ({
  modalVisible,
  setModalVisible,
}: CreateModalProps) => {
  return (
    <Modal
      animationType="fade"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
      transparent
    >
      <View className="flex-1 bg-black-100/40 justify-center items-center">
        <Text>This is a modal</Text>
      </View>
    </Modal>
  );
};

export default CreateSubjectModal;
