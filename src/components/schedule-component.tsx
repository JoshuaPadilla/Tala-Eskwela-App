import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Schedule } from "../interfaces/schedule.interface";

interface ScheduleComponentProps {
  schedule: Schedule;
}

const ScheduleComponent = ({ schedule }: ScheduleComponentProps) => {
  return (
    <TouchableOpacity className="p-2 bg-cyan-200 rounded-lg">
      <Text>Subject name: {schedule.subject.name}</Text>
      <Text>Start time: {schedule.start_time}</Text>
      <Text>End time: {schedule.end_time}</Text>
      <Text>Every: {schedule.day_of_week}</Text>
    </TouchableOpacity>
  );
};

export default ScheduleComponent;
