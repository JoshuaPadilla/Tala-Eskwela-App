import { ATTENDANCE_STATUS } from "@/src/enums/attendance-status";
import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import SelectStatusTabFilter from "../select_status_tab_filter";

interface ModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  value: ATTENDANCE_STATUS;
  onConfirm: (status: ATTENDANCE_STATUS) => void;
}

const EditAttendanceStatusModal = ({
  modalVisible,
  setModalVisible,
  value,
  onConfirm,
}: ModalProps) => {
  const statusValues = Object.values(ATTENDANCE_STATUS);

  const [selected, setSelected] = useState<ATTENDANCE_STATUS>(value);

  const handleConfirm = (status: ATTENDANCE_STATUS) => {
    onConfirm(status);
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
        <View className="w-[80%] bg-slate-100 rounded-lg items-center p-4 gap-4">
          <SelectStatusTabFilter
            list={statusValues}
            onSelect={setSelected}
            value={selected}
          />

          {/* Buttons */}
          <View className="w-full flex-row justify-around items-center p-4">
            <TouchableOpacity
              className="py-2 px-6 justify-center items-center bg-danger/80 rounded-lg"
              onPress={() => handleConfirm(selected)}
            >
              <Text className="font-rubik-medium text-white">Confirm</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="py-2 justify-center items-center px-6"
              onPress={() => setModalVisible(false)}
            >
              <Text className="font-rubik-medium ">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditAttendanceStatusModal;
