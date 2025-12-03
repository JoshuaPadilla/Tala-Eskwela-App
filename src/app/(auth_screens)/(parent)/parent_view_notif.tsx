import { getNotifToDisplayParent } from "@/src/helpers/attendance_notif.helper";
import {
  formatAttendanceTime,
  timeToDisplay,
} from "@/src/helpers/timeToString.helper";
import { Attendance } from "@/src/interfaces/attendance.interface";
import { Class } from "@/src/interfaces/class.interface";
import { NotifDetailsDisplay } from "@/src/interfaces/notif-details-display-student.interface";
import { Schedule } from "@/src/interfaces/schedule.interface";
import { Student } from "@/src/interfaces/student.interface";
import { useAttendanceStore } from "@/src/stores/attendance.store";
import { useAuthStore } from "@/src/stores/auth.store";
import { useScheduleStore } from "@/src/stores/schedule.store";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ParentViewNotification = () => {
  const { studentUser, parentUser } = useAuthStore();
  const { attendanceId } = useLocalSearchParams<{ attendanceId: string }>();

  const [loading, setLoading] = useState(false);

  const [attendance, setAttendance] = useState<Attendance | undefined>(
    undefined
  );
  const [schedule, setSchedule] = useState<Schedule | undefined>(undefined);

  const student: Student | undefined = attendance?.student || undefined;
  const classObj: Class | undefined = attendance?.class || undefined;

  const { getAttendance } = useAttendanceStore();
  const { getSchedule } = useScheduleStore();

  const [notifDisplayDetails, setNotifDisplayDetails] = useState<
    NotifDetailsDisplay | undefined
  >(undefined);

  useEffect(() => {
    if (attendanceId) {
      setLoading(true);
      const fetchDetails = async () => {
        try {
          setLoading(true);

          const att = await getAttendance(attendanceId || "");

          if (att) {
            setAttendance(att);
            const notifDeails = getNotifToDisplayParent(att.status);
            setNotifDisplayDetails(notifDeails);
            const sched = await getSchedule(att.scheduleId);

            if (sched) {
              setSchedule(sched);
            }
          }
        } catch (error) {
          console.log("Error loading attendacne", error);
        } finally {
          setLoading(false);
        }
      };

      fetchDetails();
    }
  }, [attendanceId, getAttendance, getSchedule]);

  const handleBack = () => {
    if (student) {
      router.replace("/student_home");
    }

    if (parentUser) {
      router.replace("/parent_home");
    }
  };

  return (
    <SafeAreaView
      className={`bg-slate-100 p-6 gap-4 items-center ${loading && "justify-center flex-1"}`}
    >
      {!loading && (
        <>
          {/* Header */}

          <View className="w-full h-[40%] justify-center items-center gap-2 pb-4">
            <Image
              source={notifDisplayDetails?.icon}
              contentFit="contain"
              style={{ width: "70%", height: "70%" }}
            />

            <View className="w-full items-center">
              <Text className="font-bold text-2xl">Present</Text>
              <Text className="font-normal text-md text-black-300">
                {notifDisplayDetails?.message}
              </Text>
            </View>
          </View>

          {/* Student Details */}
          <View className="w-full bg-white p-2 rounded-md">
            <View className="gap-4 flex-row items-center">
              <Image
                source={attendance?.student.profileUrl}
                style={{ height: 70, width: 70, borderRadius: 999 }}
              />

              <View className="">
                <Text className="font-bold text-lg">{`${student?.first_name} ${student?.middle_name} ${student?.last_name}`}</Text>

                <View className="flex-row gap-2 items-baseline">
                  <Text className="font-normal text-sm">Student Id: </Text>
                  <Text className="font-bold text-md">
                    {student?.rfid_tag_uid}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View className="w-full py-2 px-4 bg-white rounded-md">
            {/* grade and section */}
            <View className="flex-row gap-2 items-end justify-between py-1 border-b border-black-100/20">
              <Text className="font-semibold text-lg">Attendance Details </Text>
            </View>

            {/* grade and section */}
            <View className="flex-row gap-2 items-end justify-between py-2 border-b border-black-100/5">
              <Text className="font-normal text-md">Grade and Section: </Text>
              <Text className="font-semibold text-lg">{`${classObj?.grade_lvl} - ${classObj?.section}`}</Text>
            </View>

            {/* subject name */}
            <View className="flex-row gap-2 items-end justify-between py-2 border-b border-black-100/5">
              <Text className="font-normal text-md">Subject Name: </Text>
              <Text className="font-semibold text-lg">
                {schedule?.subject.name}
              </Text>
            </View>

            {/* subject time */}
            <View className="flex-row gap-2 items-end justify-between py-2 border-b border-black-100/5">
              <Text className="font-normal text-md">Subject Time: </Text>
              <Text className="font-semibold text-lg">
                {`${timeToDisplay(schedule?.start_time || "")} - ${timeToDisplay(schedule?.end_time || "")}`}
              </Text>
            </View>

            {/* time in */}
            <View className="flex-row gap-2 items-end justify-between py-2 border-b border-black-100/5">
              <Text className="font-normal text-md">Time in: </Text>
              <Text className="font-semibold text-lg">
                {formatAttendanceTime(attendance?.timestamp)}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            className="bg-black-100 px-14 py-4 rounded-lg mt-14"
            onPress={handleBack}
          >
            <Text className="text-white text-md">Back</Text>
          </TouchableOpacity>
        </>
      )}

      {loading && <ActivityIndicator size={"large"} />}
    </SafeAreaView>
  );
};

export default ParentViewNotification;
