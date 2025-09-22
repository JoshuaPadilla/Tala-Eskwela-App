import { Icons } from "@/src/constants/icons/icons.constant";
import { Class } from "@/src/interfaces/class.interface";
import { useClassStore } from "@/src/stores/class.store";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ClassComponentProps {
  classObj: Class;
}

const ClassComponent = ({ classObj }: ClassComponentProps) => {
  console.log(classObj.class_teacher.id);
  const [loading, setLoading] = useState(false);

  const { deleteClass } = useClassStore();

  const handleDeleteClass = async () => {
    try {
      setLoading(true);
      await deleteClass(classObj.id || "");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = () => {
    router.push({
      pathname: "/class_screens/view_class",
      params: { class_id: classObj.id },
    });
  };

  if (loading) {
    return (
      <View className="items-center justify-center">
        <ActivityIndicator size={"small"} />
      </View>
    );
  }

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
