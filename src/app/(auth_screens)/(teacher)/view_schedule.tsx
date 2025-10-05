import BackComponent from "@/src/components/back_component";
import { timeToDisplay } from "@/src/helpers/timeToString.helper";
import { Schedule } from "@/src/interfaces/schedule.interface";
import { useAttendanceStore } from "@/src/stores/attendance.store";
import { useScheduleStore } from "@/src/stores/schedule.store";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ViewSchedule = () => {
  const { schedule_id } = useLocalSearchParams();
  const { getSchedule, loading } = useScheduleStore();
  const { getAttendanceByCurrentSchedule } = useAttendanceStore();

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

  return (
    <SafeAreaView className="flex-1 p-8">
      <BackComponent />

      {loading ? (
        <View className="h-[40%]">
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <View className="">
          <View className="">
            <Text>Subject: {selectedSched?.subject.name}</Text>
            <Text>Descriptions: {selectedSched?.subject.desc}</Text>
            <Text>
              Time: {timeToDisplay(selectedSched?.start_time || "")} -{" "}
              {timeToDisplay(selectedSched?.end_time || "")}
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ViewSchedule;
