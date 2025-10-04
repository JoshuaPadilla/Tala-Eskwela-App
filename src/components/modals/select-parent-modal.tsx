import { useParentStore } from "@/src/stores/parent.store";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
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
  const { parents, loading } = useParentStore();

  console.log(parents);

  return (
    <Modal
      animationType="fade"
      visible={modalVisible}
      transparent
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black-100/40 justify-center items-center">
        <View className="w-[80%] max-h-[70%] bg-white rounded-lg p-8 gap-2">
          <View>
            <Text>Select parent to add</Text>
          </View>

          {loading ? (
            <View className="h-[40%]">
              <ActivityIndicator size={"large"} />
            </View>
          ) : (
            <ScrollView contentContainerClassName="pb-[200px] py-4 gap-4">
              {parents.length > 0 &&
                parents.map((parent, index) => (
                  <ParentModalListComponent
                    parent={parent}
                    key={parent.id || index}
                    onSelect={() => {}}
                  />
                ))}
            </ScrollView>
          )}

          <TouchableOpacity
            className="w-full h-14 rounded-lg my-4"
            onPress={() => {}}
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

export default SelectParentModal;
