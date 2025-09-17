import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { Icons } from "../constants/icons/icons.constant";
import { Class } from "../interfaces/class.interface";

interface ClassComponentProps {
  classObj: Class;
}

const ClassComponent = ({ classObj }: ClassComponentProps) => {
  const handleDeleteClass = () => {
    console.log("hello World");
  };

  const handleSelect = () => {
    router.push({
      pathname: "/class_screens/view_class",
      params: { class_id: classObj.id },
    });
  };

  return (
    <TouchableOpacity
      className="w-full p-4 bg-purple-200 rounded-md"
      onPress={handleSelect}
    >
      <View className="flex-row justify-between">
        <Text>{classObj.grade_lvl}</Text>
        <Pressable hitSlop={5} onPress={handleDeleteClass}>
          <Image
            source={Icons.trash}
            style={{ height: 15, width: 15, tintColor: "#F75555" }}
          />
        </Pressable>
      </View>

      <Text>{classObj?.section}</Text>
    </TouchableOpacity>
  );
};

export default ClassComponent;
