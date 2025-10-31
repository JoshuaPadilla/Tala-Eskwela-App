import { Icons } from "@/src/constants/icons/icons.constant";
import { timeToDisplay } from "@/src/helpers/timeToString.helper";
import { Schedule } from "@/src/interfaces/schedule.interface";
import { ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ImageComponent from "../image_component";

interface Props {
  sched: Schedule;
}

const StudentScheduleCard = ({ sched }: Props) => {
  const handleViewSchedule = () => {
    router.push({
      pathname: "/student_screens/student_view_schedule",
      params: { schedule_id: sched.id },
    });
  };

  return (
    <TouchableOpacity
      className="flex-1 min-w-[45%]  rounded-md bg-cyan-500 h-[150px]"
      onPress={handleViewSchedule}
    >
      <ImageBackground
        source={Icons.parent}
        style={{ height: "100%", width: "100%" }}
      />

      <LinearGradient
        colors={["#f1f5f9", "#22d3ee"]}
        start={{ x: 0, y: 2 }}
        // 3. Define the ending point of the gradient
        // [0, 1] is bottom-left (creating a vertical gradient)
        end={{ x: 0, y: 0 }}
        className="absolute w-full p-4 bottom-0"
      >
        <View>
          <View className="flex-row justify-between items-center">
            <Text className="text-lg font-poppins-semibold text-white">
              {sched.subject.name}
            </Text>

            <ImageComponent
              source={Icons.arrow_right}
              size={10}
              color="rgb(255 255 255 / 0.8)"
            />
          </View>

          <Text className="text-sm font-rubik-medium text-white/80">
            {timeToDisplay(sched.start_time)} - {timeToDisplay(sched.end_time)}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default StudentScheduleCard;
