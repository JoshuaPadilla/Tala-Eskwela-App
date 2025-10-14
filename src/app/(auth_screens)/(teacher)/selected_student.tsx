import BackComponent from "@/src/components/back_component";
import SelectParentModal from "@/src/components/modals/select-parent-modal";
import { useParentStore } from "@/src/stores/parent.store";
import { useStudentStore } from "@/src/stores/student.store";
import { useUploadStore } from "@/src/stores/upload.store";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const SelectedStudent = () => {
  const { selectedStudent, setStudentToRegister, addParent } =
    useStudentStore();

  const { getParentsForAddingStudents } = useParentStore();
  const { uploadProfile } = useUploadStore();

  const [addParentModalVisible, setAddParentModalVisible] = useState(false);

  const handleRegister = () => {
    setStudentToRegister(selectedStudent?.id || "");

    router.push("/(auth_screens)/(teacher)/register_student");
  };

  const handleAddParent = () => {
    if (!selectedStudent) return;
    setAddParentModalVisible(true);

    getParentsForAddingStudents(selectedStudent.id);
  };

  const handlePickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "Please allow access to your photo library to select an image."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Use "Images" for images only
        allowsEditing: true,
        aspect: [1, 1], // Square aspect ratio for profile pictures
        quality: 0.8, // Highest quality
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        return result.assets[0].uri;
      }

      return null;
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddImage = async () => {
    const imageUri = await handlePickImage();

    if (imageUri) {
      uploadProfile(imageUri, selectedStudent?.id || "");
    }

    return;
  };

  const handleAddParentModalClose = () => {
    setAddParentModalVisible(false);
  };

  const handleAddParentCallback = (parentId: string) => {
    if (selectedStudent) {
      addParent(selectedStudent.id, parentId);
    }
  };

  return (
    <>
      <SelectParentModal
        modalVisible={addParentModalVisible}
        onClose={handleAddParentModalClose}
        onCloseCallback={handleAddParentCallback}
      />
      <SafeAreaView className="flex-1 p-8 gap-4">
        <View className="flex-row justify-between items-center">
          <BackComponent />
        </View>

        <View className="flex-row gap-2">
          <Image
            source={selectedStudent?.profileUrl}
            style={{ width: 100, height: 100 }}
            placeholder={blurhash}
          />

          <View>
            <Text>
              {selectedStudent?.first_name} {selectedStudent?.middle_name}{" "}
              {selectedStudent?.last_name}
            </Text>

            <Text>Parent: {selectedStudent?.parent?.first_name}</Text>
          </View>
        </View>

        <TouchableOpacity
          className="p-4 bg-primary-300 rounded-md justify-center items-center"
          onPress={handleRegister}
        >
          <Text>Register Card</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="p-4 bg-primary-300 rounded-md justify-center items-center"
          onPress={handleAddParent}
        >
          <Text>Add Parent</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="p-4 bg-primary-300 rounded-md justify-center items-center"
          onPress={handleAddImage}
        >
          <Text>Add Profile</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default SelectedStudent;
