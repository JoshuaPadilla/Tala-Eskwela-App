import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Parent } from "../interfaces/parent.interface";
interface props {
  parent: Parent;
  onSelect: () => void;
}
const ParentModalListComponent = ({ parent }: props) => {
  return (
    <TouchableOpacity className="p-4 bg-cyan-200 rounded-md">
      <Text>
        {parent.first_name} {parent.last_name}
      </Text>
    </TouchableOpacity>
  );
};

export default ParentModalListComponent;
