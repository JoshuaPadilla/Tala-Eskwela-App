import ImageComponent from "@/src/components/image_component";
import { Icons } from "@/src/constants/icons/icons.constant";
import { useAuthStore } from "@/src/stores/auth.store";
import { router } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const StudentHome = () => {
  const { studentUser, logout } = useAuthStore();

  const handleLogout = () => {
    logout();

    router.push("/");
  };

  const handleOptionPress = () => {
    console.log("Hello world");
  };

  return (
    <SafeAreaView className="flex-1 p-8  ">
      <View className="flex-row justify-between items-center">
        <TouchableOpacity onPress={handleOptionPress}>
          <ImageComponent
            source={studentUser?.profileUrl || null}
            size={40}
            radius={999}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleOptionPress}>
          <ImageComponent source={Icons.options} size={20} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default StudentHome;
