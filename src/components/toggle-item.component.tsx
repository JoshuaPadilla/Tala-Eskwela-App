import React from "react";
import { Pressable, Text } from "react-native";
import { ClassToggle } from "../enums/view_class_toggle.enum";

interface ToggleItemProps {
  selectedItem: ClassToggle;
  item: ClassToggle;
  onSelect: (item: ClassToggle) => void;
}

const ToggleItemComponent = ({
  item,
  selectedItem,
  onSelect,
}: ToggleItemProps) => {
  const handleSelectItem = (item: ClassToggle) => {
    onSelect(item);
  };

  console.log(item, selectedItem);

  return (
    <Pressable
      className="w-[33.333%] p-4 rounded-md items-center"
      style={{ backgroundColor: selectedItem === item ? "#a5f3fc" : "" }}
      onPress={() => handleSelectItem(item)}
    >
      <Text>{item}</Text>
    </Pressable>
  );
};

export default ToggleItemComponent;
