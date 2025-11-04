import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { TeacherIcons } from "../constants/icons/teacher.constants";
import { shadow } from "../helpers/shadow";
import { timeToDisplay } from "../helpers/timeToString.helper";
import { Schedule } from "../interfaces/schedule.interface";
import { useScheduleStore } from "../stores/schedule.store";
import ImageComponent from "./image_component";
import H1Text from "./text_components/h1";
import H2Text from "./text_components/h2";

interface ScheduleComponentProps {
  schedule: Schedule;
  onPress?: () => void;
}

const ScheduleComponent = ({ schedule }: ScheduleComponentProps) => {
  const [loading, setLoading] = useState(false);
  const { deleteSchedule } = useScheduleStore();

  const handleDelete = async () => {
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
    <TouchableOpacity
      className="flex-row gap-4 p-4 bg-white rounded-lg w-full"
      style={shadow()}
    >
      <ImageComponent
        source={TeacherIcons.students_icon}
        radius={5}
        size={40}
      />

      <View className="">
        <H2Text value={schedule.subject.name} />
        <H1Text
          value={`${timeToDisplay(schedule.start_time)} - ${timeToDisplay(schedule.end_time)}`}
          additionalClassname="text-black-100/50"
        />
      </View>
    </TouchableOpacity>
  );
};

export default ScheduleComponent;
