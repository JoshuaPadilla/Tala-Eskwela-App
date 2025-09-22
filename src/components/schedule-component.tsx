import { Image } from "expo-image";
import React, { useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { Icons } from "../constants/icons/icons.constant";
import { timeToDisplay } from "../helpers/timeToString.helper";
import { Schedule } from "../interfaces/schedule.interface";
import { useScheduleStore } from "../stores/schedule.store";

interface ScheduleComponentProps {
  schedule: Schedule;
}

const ScheduleComponent = ({ schedule }: ScheduleComponentProps) => {
  const [loading, setLoading] = useState(false);
  const { deleteSchedule } = useScheduleStore();

  const handleDelete = async () => {
    console.log("hello Woasda");
    try {
      setLoading(true);
      await deleteSchedule(schedule.id);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity className="p-2 bg-cyan-200 rounded-lg">
      <View className="flex-row justify-between">
        <Pressable hitSlop={5} onPress={handleDelete}>
          <Image
            source={Icons.trash}
            style={{ height: 15, width: 15, tintColor: "#F75555" }}
          />
        </Pressable>
      </View>

      <Text>Subject name: {schedule.subject.name}</Text>
      <Text>Start time: {timeToDisplay(schedule.start_time)}</Text>
      <Text>End time: {timeToDisplay(schedule.end_time)}</Text>
      <Text>Every: {schedule.day_of_week}</Text>
    </TouchableOpacity>
  );
};

export default ScheduleComponent;
