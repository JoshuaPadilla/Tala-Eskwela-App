import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { Icons } from "../constants/icons/icons.constant";
import ImageComponent from "./image_component";

interface SearchBarProps {
  onSubmit: (text: string) => void;
  placeHolderText?: string;
  additionalClassname?: string;
}

const SearchBarComponent = ({
  onSubmit,
  placeHolderText,
  additionalClassname,
}: SearchBarProps) => {
  const [value, setValue] = useState("");

  const handleInputChange = (text: string) => {
    setValue(text);
  };

  const handleSubmit = () => {
    onSubmit(value);
  };

  return (
    <View
      className={`flex-row justify-between items-center px-4 py-2 border border-1 border-orange-400 rounded-md ${additionalClassname}`}
    >
      <View className="flex-row items-center gap-4">
        <ImageComponent source={Icons.search_bar} size={20} />

        <TextInput
          className="w-[75%] text-orange-500"
          value={value}
          onChangeText={(text) => {
            handleInputChange(text);
          }}
          placeholder={placeHolderText}
          placeholderTextColor={"#fdba74"}
          cursorColor={"#f97316"}
        />
      </View>

      <Pressable hitSlop={5} onPress={handleSubmit}>
        <Text className="text-sm font-rubik-semibold text-orange-500">
          Submit
        </Text>
      </Pressable>
    </View>
  );
};

export default SearchBarComponent;
