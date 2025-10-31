import { Icons } from "@/src/constants/icons/icons.constant";
import { timeToDisplay } from "@/src/helpers/timeToString.helper";
import { Schedule } from "@/src/interfaces/schedule.interface";
import { useScheduleStore } from "@/src/stores/schedule.store";
import { ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const StudentViewSchedule = () => {
  const { schedule_id } = useLocalSearchParams<{ schedule_id: string }>();
  const { getSchedule, loading } = useScheduleStore();

  const [selectedSched, setSelectedSched] = useState<Schedule | undefined>(
    undefined
  );

  const teacherFullname = `${selectedSched?.class.class_teacher.first_name} ${selectedSched?.class.class_teacher.middle_name} ${selectedSched?.class.class_teacher.last_name}`;

  useEffect(() => {
    const fetchScheduleDetails = async () => {
      if (schedule_id) {
        const result = await getSchedule(schedule_id);

        if (result) {
          setSelectedSched(result);
        }
      }
    };

    fetchScheduleDetails();
  }, [schedule_id, getSchedule]);
  return (
    <SafeAreaView className="p-6 bg-slate-100">
      {/* Heading */}
      {/* <View className="flex-row justify-between items-center ">
        <BackComponent />

        <TouchableOpacity>
          <ImageComponent
            source={Icons.dot_option}
            size={10}
            addStyle={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              backgroundColor: "#22d3ee",
            }}
            radius={10}
          />
        </TouchableOpacity>
      </View> */}

      {loading ? (
        <View className="h-[40%]">
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <View className="bg-cyan-300 rounded-lg mb-4 h-[55%] ">
          <ImageBackground
            source={Icons.parent}
            style={{ height: "100%", width: "100%" }}
          />

          <LinearGradient
            colors={["#f1f5f9", "rgb(103 232 249 / 0.6)"]}
            start={{ x: 0, y: 4 }}
            // 3. Define the ending point of the gradient
            // [0, 1] is bottom-left (creating a vertical gradient)
            end={{ x: 0, y: 0 }}
            className="absolute w-full p-4 bottom-0"
          >
            {/* first row */}
            <View className="flex-row justify-between items-center">
              <Text className="text-lg font-poppins-semibold text-white">
                {selectedSched && selectedSched.subject.name}
              </Text>

              <Text className="text-sm font-rubik-bold text-white">
                {selectedSched &&
                  `${timeToDisplay(selectedSched.start_time)} - ${timeToDisplay(selectedSched?.end_time)}`}
              </Text>
            </View>

            <View className="flex-row justify-between items-center">
              <Text className="text-lg font-poppins-semibold text-white">
                {teacherFullname}
              </Text>

              <Text className="text-sm font-rubik-bold text-white">
                {selectedSched &&
                  `${timeToDisplay(selectedSched.start_time)} - ${timeToDisplay(selectedSched?.end_time)}`}
              </Text>
            </View>
          </LinearGradient>
        </View>
      )}
    </SafeAreaView>
  );
};

export default StudentViewSchedule;
