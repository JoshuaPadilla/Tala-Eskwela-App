import { timeToDisplay } from "@/src/helpers/timeToString.helper";
import { Schedule } from "@/src/interfaces/schedule.interface";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface TeacherComponentProps {
  schedule: Schedule;
  onPress: () => void;
}
const TeacherScheduleComponent = ({
  schedule,
  onPress,
}: TeacherComponentProps) => {
  return (
    <TouchableOpacity className="p-4 bg-cyan-200 rounded-md">
      <View className="">
        <Text>Subject: {schedule.subject.name}</Text>
        <Text>Description: {schedule.subject.desc}</Text>
        <Text>
          Time: {timeToDisplay(schedule.start_time)} -{" "}
          {timeToDisplay(schedule.end_time)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TeacherScheduleComponent;
