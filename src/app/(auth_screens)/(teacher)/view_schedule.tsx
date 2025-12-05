import socket from "@/lib/socket";
import ImageComponent from "@/src/components/image_component";
import SearchBarComponent from "@/src/components/search_bar_component";
import TeacherAttendanceComponent from "@/src/components/teacher_components/teacher_attendance_component";
import { Icons } from "@/src/constants/icons/icons.constant";
import {
  formatAttendanceDate,
  timeToDisplay,
} from "@/src/helpers/timeToString.helper";
import { Schedule } from "@/src/interfaces/schedule.interface";
import { useAttendanceStore } from "@/src/stores/attendance.store";
import { useAuthStore } from "@/src/stores/auth.store";
import { useScheduleStore } from "@/src/stores/schedule.store";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ViewSchedule = () => {
  const { schedule_id } = useLocalSearchParams();
  const { getSchedule, loading } = useScheduleStore();
  const {
    getAttendanceByCurrentSchedule,
    currentSchedAttendance,
    updateCurrentSchedAttendance,
  } = useAttendanceStore();
  const { teacherUser } = useAuthStore();

  const [selectedSched, setSelectedSched] = useState<Schedule | undefined>(
    undefined
  );

  const [query, setQuery] = useState("");

  const filteredStudents = query
    ? currentSchedAttendance.filter((attendance) => {
        return `${attendance.student.first_name} ${attendance.student.middle_name} ${attendance.student.last_name}`.includes(
          query
        );
      })
    : currentSchedAttendance;

  const totalStudents = teacherUser?.advisory_class.students?.length || 0;
  const totalPresent = currentSchedAttendance.length;
  const absentCount = totalStudents - totalPresent;

  useEffect(() => {
    if (socket.connected && selectedSched && selectedSched.id) {
      socket.emit("join_subject", { subject_id: selectedSched.id });
    }
  }, [selectedSched]);

  useEffect(() => {
    socket.on("newAttendance", (data) => {
      updateCurrentSchedAttendance(data.attendance);
    });
  }, [updateCurrentSchedAttendance]);

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
                    <Text className="font-rubik-semibold text-lg">{`${totalPresent}/${totalStudents}`}</Text>
                    <Text className="font-rubik-light text-sm">Present</Text>
                  </View>
                </View>

                <View className="bg-orange-400/70 p-4 rounded-md flex-row gap-4 items-center flex-1">
                  <Image
                    source={Icons.absent}
                    style={{ width: 35, height: 35 }}
                  />

                  <View>
                    <Text className="font-rubik-semibold text-lg">{`${absentCount}/${totalStudents}`}</Text>
                    <Text className="font-rubik-light text-sm">Absent</Text>
                  </View>
                </View>
              </View>
            </View>

            <SearchBarComponent
              onSubmit={() => Keyboard.dismiss()}
              additionalClassname="mb-4"
              onChangeText={setQuery}
            />

            {filteredStudents.length > 0 ? (
              filteredStudents.map((att, idx) => (
                <TeacherAttendanceComponent attendance={att} key={idx} />
              ))
            ) : (
              <View className="items-center justify-center p-4">
                <Text className="font-rubik-medium text-lg">
                  No attendance yet!
                </Text>
                <ImageComponent
                  source={Icons.no_attendance_yet}
                  size={200}
                  addStyle={{ opacity: 60 }}
                />
              </View>
            )}
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ViewSchedule;
