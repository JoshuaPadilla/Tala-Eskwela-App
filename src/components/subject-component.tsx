import { Image } from "expo-image";
import React from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { Icons } from "../constants/icons/icons.constant";
import { Subject } from "../interfaces/subject.interface";
import { useSubjectStore } from "../stores/subject.store";

interface SubjectProps {
  subject?: Subject;
}

const SubjectComponent = ({ subject }: SubjectProps) => {
  const { deleteSubject } = useSubjectStore();

  const handleDeleteSubject = (id: string) => {
    deleteSubject(id);
  };
  return (
    <TouchableOpacity className="w-full p-4 bg-purple-200 rounded-md">
      <View className="flex-row justify-between">
        <Text>{subject?.name}</Text>
        <Pressable
          hitSlop={5}
          onPress={() => {
            handleDeleteSubject(subject?.id || "");
          }}
        >
          <Image
            source={Icons.trash}
            style={{ height: 15, width: 15, tintColor: "#F75555" }}
          />
        </Pressable>
      </View>

      <Text>{subject?.desc}</Text>
    </TouchableOpacity>
  );
};

export default SubjectComponent;
