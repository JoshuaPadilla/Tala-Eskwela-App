import { Icons } from "@/src/constants/icons/icons.constant";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ImageComponent from "../image_component";

interface ModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  onConfirm: () => Promise<void>;
}

const RemoveStudentConfirmationModal = ({
  modalVisible,
  setModalVisible,
  onConfirm,
}: ModalProps) => {
  const [removing, setRemoving] = useState(false);

  const handleConfirm = async () => {
    try {
      setRemoving(true);
      await onConfirm();
    } catch (error) {
      console.log(error);
    } finally {
      setRemoving(false);
    }

    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="fade"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
      transparent
    >
      <View className="flex-1 bg-black-100/40 justify-center items-center">
        <View className="w-[80%] bg-white rounded-lg items-center p-4 gap-4">
          {removing ? (
            <View className="gap-4 p-4">
              <ActivityIndicator size={"large"} />

              <Text className="font-rubik-regular">Removing student...</Text>
            </View>
          ) : (
            <>
              {/* Image */}
              <ImageComponent source={Icons.remove_student_icon} size={100} />
              {/* Messages */}
              <View className="items-center">
                <Text className="font-poppins-bold text-xl text-danger">
                  Remove Student
                </Text>

                <Text className="text-center font-rubik-regular">
                  Are you sure you want to{" "}
                  <Text className="font-rubik-bold">remove</Text> this student
                  from your class?
                </Text>
              </View>

              {/* Buttons */}
              <View className="w-full flex-row justify-around items-center p-4">
                <TouchableOpacity
                  className="py-2 px-6 justify-center items-center bg-danger/80 rounded-lg"
                  onPress={handleConfirm}
                >
                  <Text className="font-rubik-medium text-white">Confirm</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="py-2 justify-center items-center px-6"
                  onPress={handleCancel}
                >
                  <Text className="font-rubik-medium ">Cancel</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default RemoveStudentConfirmationModal;
