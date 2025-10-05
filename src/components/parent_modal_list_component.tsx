import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Parent } from "../interfaces/parent.interface";
interface props {
  parent: Parent;
  onSelect: (parent_id: string) => void;
}
const ParentModalListComponent = ({ parent, onSelect }: props) => {
  const handleOnSelect = () => {
    onSelect(parent.id || "");
  };

  return (
    <TouchableOpacity
      className="p-4 bg-cyan-200 rounded-md"
      onPress={handleOnSelect}
    >
      <Text>
        {parent.first_name} {parent.last_name}
      </Text>
    </TouchableOpacity>
  );
};

export default ParentModalListComponent;
