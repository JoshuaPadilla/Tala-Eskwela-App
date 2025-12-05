import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ATTENDANCE_STATUS } from "../enums/attendance-status";

interface Props {
  list: ATTENDANCE_STATUS[];
  onSelect: (status: ATTENDANCE_STATUS) => void;
  value: ATTENDANCE_STATUS;
}

const SelectStatusTabFilter = ({ list, onSelect, value }: Props) => {
  return (
    <View className="p-2 gap-2 w-full">
      {list.map((item, index) => {
        const seleted = item === value;

        return (
          <TouchableOpacity
            key={index}
            className={`p-2 rounded-md ${seleted ? "bg-cyan-400" : "bg-white"}`}
            onPress={() => onSelect(item)}
          >
            <Text className="font-semibold text-lg text-center">
              {item.toUpperCase()}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default SelectStatusTabFilter;
