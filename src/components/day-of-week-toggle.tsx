import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DAY_OF_WEEK } from "../enums/day_of_week";

interface DayOfWeekToggleProps {
  dayOfWeek: string[];
  currentValue: DAY_OF_WEEK;
  setValue: (value: DAY_OF_WEEK) => void;
}

const DayOfWeekToggle = ({
  dayOfWeek,
  currentValue,
  setValue,
}: DayOfWeekToggleProps) => {
  return (
    <View className="flex-row flex-wrap gap-1 pb-4 w-full justify-items-start">
      {dayOfWeek.map((day) => (
        <TouchableOpacity
          key={day}
          className={`${day === currentValue ? "bg-cyan-400" : "bg-cyan-400/50"} px-4 py-2 rounded-md w-[32%] items-center justify-center`}
          onPress={() => setValue(day as DAY_OF_WEEK)}
        >
          <Text>{day}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default DayOfWeekToggle;
