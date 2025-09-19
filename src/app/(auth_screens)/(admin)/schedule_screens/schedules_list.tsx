import BackComponent from "@/src/components/back_component";
import ScheduleComponent from "@/src/components/schedule-component";
import { useScheduleStore } from "@/src/stores/schedule.store";
import { router } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SchedulesList = () => {
  const { getSchedules, loading, schedules } = useScheduleStore();

  useEffect(() => {
    getSchedules();
  }, [getSchedules]);

  const handleAddSchedule = () => {
    router.push("/(auth_screens)/(admin)/schedule_screens/add_schedule");
    return;
  };

  return (
    <SafeAreaView className="p-8">
      <BackComponent />
      <View className="flex-row justify-between w-full">
        <Text>Classes:</Text>
        <Pressable
          className="px-4 py-2 bg-primary-300 rounded-md"
          onPress={handleAddSchedule}
        >
          <Text>Add</Text>
        </Pressable>
      </View>

      {loading ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <ScrollView contentContainerClassName="pb-[200px] py-8 gap-4">
          {schedules &&
            schedules.map((schedule, index) => (
              <ScheduleComponent schedule={schedule} key={index} />
            ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default SchedulesList;
