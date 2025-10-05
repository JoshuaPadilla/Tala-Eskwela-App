import { timeToDisplay } from "@/src/helpers/timeToString.helper";
import { Schedule } from "@/src/interfaces/schedule.interface";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface TeacherComponentProps {
  schedule: Schedule;
}
const TeacherScheduleComponent = ({ schedule }: TeacherComponentProps) => {
  const handleSchedPress = () => {
    router.push({
      pathname: "/(auth_screens)/(teacher)/view_schedule",
      params: { schedule_id: schedule.id },
    });
  };

  return (
    <TouchableOpacity
      className="p-4 bg-cyan-200 rounded-md"
      onPress={handleSchedPress}
    >
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
