import { Image } from "expo-image";
import React from "react";
import {
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icons } from "../constants/icons/icons.constant";
import { Images } from "../constants/images/image.constants";
import { Roles } from "../enums/role.enum";

interface RoleChoiceProps {
  icon: ImageSourcePropType;
  title: Roles;
  bg_color: string;
  onPress: (role: Roles) => void;
}

interface RoleSelectionFormProps {
  onSelect: (role: Roles) => void;
}

const RoleSelectionForm = ({ onSelect }: RoleSelectionFormProps) => {
  return (
    <View className="items-center w-full">
      <Image source={Icons.app_logo} style={{ height: 120, width: 120 }} />
      <Text className="font-bold text-primary-400 text-3xl">
        What User are you?
      </Text>

      <View className="w-full justify-center items-center mt-12 gap-4">
        <RoleChoice
          icon={Images.alvin}
          title={Roles.TEACHER}
          bg_color="#22d3ee"
          onPress={onSelect}
        />
        <RoleChoice
          icon={Images.dino}
          title={Roles.STUDENT}
          bg_color="#fb923c"
          onPress={onSelect}
        />
        <RoleChoice
          icon={Images.revel}
          title={Roles.PARENT}
          bg_color="#facc15"
          onPress={onSelect}
        />
      </View>
    </View>
  );
};

const RoleChoice = ({ icon, title, bg_color, onPress }: RoleChoiceProps) => {
  return (
    <TouchableOpacity
      className="w-[90%] flex-row items-center justify-start gap-4 rounded-lg p-4 border border-white/40"
      style={{ backgroundColor: bg_color }}
      onPress={() => onPress(title)}
    >
      <Image source={icon} style={{ height: 120, width: 120 }} />

      <Text className="text-primary-400 font-semibold text-4xl">
        {title.charAt(0).toUpperCase()}
        {title.slice(1)}
      </Text>
    </TouchableOpacity>
  );
};

export default RoleSelectionForm;
