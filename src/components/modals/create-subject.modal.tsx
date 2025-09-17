import { useSubjectStore } from "@/src/stores/subject.store";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface CreateModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

const CreateSubjectModal = ({
  modalVisible,
  setModalVisible,
}: CreateModalProps) => {
  const { createSubject, loading } = useSubjectStore();

  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");

  const handleOnsubmit = async () => {
    if (!name) {
      setTimeout(() => {
        console.log("Subject must have a name");
      }, 300);
      return;
    }

    await createSubject({
      name,
      desc,
    });

    handleClose();
  };

  const handleClose = () => {
    setName("");
    setDesc("");

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
        <KeyboardAvoidingView
          className="size-full justify-center items-center"
          behavior={"padding"}
        >
          <View className="w-[80%] max-h-full bg-white rounded-lg p-8 gap-2">
            <Text className="mb-4 text-xl font-semibold">Add Subject</Text>

            <View className="items-center justify-center ">
              <View className="w-full items-start justify-center gap-2">
                <Text className="text-l">Subject Name</Text>

                <View className="w-full items-start justify-center border border-cyan-200 rounded-lg px-2">
                  <TextInput
                    className="w-full text-black-100"
                    value={name}
                    onChange={(e) => {
                      setName(e.nativeEvent.text);
                    }}
                  />
                </View>
              </View>
            </View>

            <View className="w-full items-start justify-center gap-2">
              <Text className="text-l">Description</Text>

              <View className="w-full items-start justify-center border border-cyan-200 rounded-lg px-2">
                <TextInput
                  className="w-full text-black-100"
                  value={desc}
                  onChange={(e) => {
                    setDesc(e.nativeEvent.text);
                  }}
                />
              </View>
            </View>

            {loading ? (
              <ActivityIndicator size={"small"} className="p-8" />
            ) : (
              <TouchableOpacity
                className="w-full h-14 rounded-lg mt-10"
                onPress={handleOnsubmit}
              >
                <LinearGradient
                  colors={["#fb923c", "#22d3ee", "#fb923c", "#22d3ee"]}
                  start={{ x: -1, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  className="w-full h-full items-center justify-center rounded-lg overflow-hidden"
                  style={{ borderRadius: 10 }}
                >
                  <Text className="text-primary-400 font-semibold text-lg">
                    Add
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default CreateSubjectModal;
