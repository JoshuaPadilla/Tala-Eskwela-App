import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

interface ToggleProps {
  trueValue: string;
  falseValue: string;

  onPress: (value: boolean) => void;
}

const ToggleTab = ({ trueValue, falseValue, onPress }: ToggleProps) => {
  const [value, setValue] = useState(true);

  const toggle = (bol: boolean) => {
    setValue(bol);
    onPress(value);
  };

  return (
    <View className="flex-row justify-around p-4 rounded-md">
      <Pressable
        className={`${value ? "border-b-white border" : ""} w-[50%]`}
        onPress={() => toggle(true)}
      >
        <Text>{trueValue}</Text>
      </Pressable>

      <Pressable
        className={`${value ? "border-b-white" : ""}`}
        onPress={() => toggle(false)}
      >
        <Text>{falseValue}</Text>
      </Pressable>
    </View>
  );
};

export default ToggleTab;
