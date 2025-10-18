import BackComponent from "@/src/components/back_component";
import TeacherAttendanceComponent from "@/src/components/teacher_components/teacher_attendance_component";
import { Icons } from "@/src/constants/icons/icons.constant";
import {
  formatAttendanceDate,
  timeToDisplay,
} from "@/src/helpers/timeToString.helper";
import { Schedule } from "@/src/interfaces/schedule.interface";
import { useAttendanceStore } from "@/src/stores/attendance.store";
import { useScheduleStore } from "@/src/stores/schedule.store";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ViewSchedule = () => {
  const { schedule_id } = useLocalSearchParams();
  const { getSchedule, loading } = useScheduleStore();
  const { getAttendanceByCurrentSchedule, currentSchedAttendance } =
    useAttendanceStore();

  const [selectedSched, setSelectedSched] = useState<Schedule | undefined>(
    undefined
  );

  useEffect(() => {
    const loadSchedule = async () => {
      if (schedule_id && Array.isArray(schedule_id) === false) {
        const sched = await getSchedule(schedule_id);

        if (sched) {
          setSelectedSched(sched);
        }
        getAttendanceByCurrentSchedule(sched?.class.id || "", schedule_id);
      }
    };

    loadSchedule();
  }, [schedule_id, getSchedule, getAttendanceByCurrentSchedule]);

  const schedTime = `${timeToDisplay(selectedSched?.start_time || "")} - ${timeToDisplay(selectedSched?.end_time || "")}`;

  const today = new Date();

  return (
    <SafeAreaView className="flex-1 p-6">
      <BackComponent />

      {loading ? (
        <View className="h-[40%]">
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <View className="gap-2">
          <ScrollView contentContainerClassName="pb-[100px] gap-1">
            <View className="bg-orange-300 rounded-lg p-4 mb-4">
              {/* Name */}
              <View className="flex-row justify-between items-center">
                <Text className="font-poppins-bold text-xl">
                  {selectedSched?.subject.name}
                </Text>

                <Text className="font-rubik-medium">
                  {formatAttendanceDate(today)}
                </Text>
              </View>

              {/* time */}
              <Text className="font-rubik-medium text-black-100/80 mb-4">
                {schedTime}
              </Text>

              {/* Insights */}
              <View className="flex-row gap-2">
                <View className="bg-orange-400/70 p-4 rounded-md flex-row gap-4 items-center flex-1">
                  <Image
                    source={Icons.present}
                    style={{ width: 35, height: 35 }}
                  />

                  <View>
                    <Text className="font-rubik-semibold text-lg">16/30</Text>
                    <Text className="font-rubik-light text-sm">Present</Text>
                  </View>
                </View>

                <View className="bg-orange-400/70 p-4 rounded-md flex-row gap-4 items-center flex-1">
                  <Image
                    source={Icons.absent}
                    style={{ width: 35, height: 35 }}
                  />

                  <View>
                    <Text className="font-rubik-semibold text-lg">16/30</Text>
                    <Text className="font-rubik-light text-sm">Absent</Text>
                  </View>
                </View>
              </View>
            </View>

            {currentSchedAttendance.length > 0 &&
              currentSchedAttendance.map((att) => (
                <TeacherAttendanceComponent attendance={att} key={att.id} />
              ))}
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ViewSchedule;
