import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Icons } from "../constants/icons/icons.constant";

const BackComponent = () => {
  return (
    <TouchableOpacity
      className="flex-row justify-between items-center py-4 w-full"
      onPress={router.back}
    >
      <Image source={Icons.back} style={{ height: 25, width: 25 }} />
    </TouchableOpacity>
  );
};

export default BackComponent;
