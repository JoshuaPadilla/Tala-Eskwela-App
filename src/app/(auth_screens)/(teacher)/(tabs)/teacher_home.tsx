import socket from "@/lib/socket";
import { timeToDisplay } from "@/src/helpers/timeToString.helper";
import { Schedule } from "@/src/interfaces/schedule.interface";
import { useAttendanceStore } from "@/src/stores/attendance.store";
import { useAuthStore } from "@/src/stores/auth.store";
import { useClassStore } from "@/src/stores/class.store";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TeacherHome = () => {
  const { teacherUser, logout } = useAuthStore();
  const { getCurrentClassSchedule } = useClassStore();
  const { addAttendance, getCurrentSchedAttendance } = useAttendanceStore();

  const [currentSched, setCurrentSched] = useState<Schedule | undefined>();

  useEffect(() => {
    socket.on("newAttendance", (data) => {
      addAttendance(data.data);
    });
  }, [addAttendance]);

  useEffect(() => {
    const getCurrentSched = async () => {
      const result = await getCurrentClassSchedule(
        teacherUser?.advisory_class?.id || ""
      );

      getCurrentSchedAttendance(teacherUser?.advisory_class?.id || "");

      if (result) {
        setCurrentSched(result);
      }
    };

    getCurrentSched();
  }, [getCurrentClassSchedule, teacherUser]);

  const handleLogout = () => {
    logout();

    router.replace("/");
  };

  return (
    <>
      <SafeAreaView className="flex-1 p-8">
        <View className="flex-row justify-between">
          <TouchableOpacity
            onPress={handleLogout}
            className="px-4 py-2 items-center justify-center bg-danger rounded-md mb-4"
          >
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>

        {teacherUser?.advisory_class && (
          <View className="">
            <Text>Grade {teacherUser?.advisory_class?.grade_lvl}</Text>
            <Text>Section {teacherUser?.advisory_class?.section}</Text>
          </View>
        )}

        <Text>Hello {teacherUser?.first_name}</Text>
        <Text>students</Text>

        {teacherUser?.advisory_class && (
          <View className="mt-4">
            <Text>
              Current Subject: {currentSched?.subject.name}{" "}
              {`${timeToDisplay(currentSched?.start_time || "")} - ${timeToDisplay(currentSched?.end_time || "")}`}
            </Text>
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

export default TeacherHome;
