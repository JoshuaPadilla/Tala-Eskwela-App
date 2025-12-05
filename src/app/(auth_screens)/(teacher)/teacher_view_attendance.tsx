import EditAttendanceStatusModal from "@/src/components/teacher_components/edit_attendance_status_modal";
import { Icons } from "@/src/constants/icons/icons.constant";
import { ATTENDANCE_STATUS } from "@/src/enums/attendance-status";
import { getAttendanceColor } from "@/src/helpers/getAttendanceStatus.helper";
import {
  formatAttendanceTime,
  timeToDisplay,
} from "@/src/helpers/timeToString.helper";
import { Attendance } from "@/src/interfaces/attendance.interface";
import { Class } from "@/src/interfaces/class.interface";
import { Schedule } from "@/src/interfaces/schedule.interface";
import { Student } from "@/src/interfaces/student.interface";
import { useAttendanceStore } from "@/src/stores/attendance.store";
import { useScheduleStore } from "@/src/stores/schedule.store";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TeacherViewAttendance = () => {
  const [loading, setLoading] = useState(false);

  const { attendanceId } = useLocalSearchParams<{ attendanceId: string }>();

  const [attendance, setAttendance] = useState<Attendance | undefined>(
    undefined
  );
  const [editModalVisible, setEditModalVisible] = useState(false);

  const [schedule, setSchedule] = useState<Schedule | undefined>(undefined);

  const { getAttendance, updateAttendance } = useAttendanceStore();
  const { getSchedule } = useScheduleStore();

  const student: Student | undefined = attendance?.student || undefined;
  const classObj: Class | undefined = attendance?.class || undefined;

  const handleChangeAttendanceStatus = (status: ATTENDANCE_STATUS) => {
    updateAttendance(attendanceId, { status });

    setAttendance((prev) => {
      if (!prev) return prev;
      return { ...prev, status };
    });
  };

  useEffect(() => {
    if (attendanceId) {
      setLoading(true);
      const fetchDetails = async () => {
        try {
          setLoading(true);

          const att = await getAttendance(attendanceId || "");

          if (att) {
            setAttendance(att);
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

  return (
    <SafeAreaView
      className={`bg-slate-100 p-6 gap-4 items-center ${loading && "justify-center flex-1"}`}
    >
      <EditAttendanceStatusModal
        value={attendance?.status || ATTENDANCE_STATUS.ABSENT}
        onConfirm={handleChangeAttendanceStatus}
        modalVisible={editModalVisible}
        setModalVisible={setEditModalVisible}
      />
      {!loading && (
        <>
          <View className="flex-row justify-between w-full items-center  ">
            <Text className="font-bold text-lg">View Attendance</Text>
          </View>

          {/* Student Details */}
          <View className="w-full bg-white p-2 rounded-md">
            <View className="gap-4 flex-row items-center">
              <Image
                source={attendance?.student.profileUrl}
                style={{ height: 70, width: 70, borderRadius: 999 }}
              />

              <View className="gap-2">
                {/* Name */}
                <Text className="font-bold text-lg">{`${student?.first_name} ${student?.middle_name} ${student?.last_name}`}</Text>

                {/* Status */}
                <View className="flex-row gap-4 items-center">
                  <View
                    className="px-4 rounded-md"
                    style={{
                      backgroundColor: getAttendanceColor(attendance?.status),
                    }}
                  >
                    <Text className="font-semibold text-xl">
                      {attendance?.status}
                    </Text>
                  </View>

                  {/* Edit Button */}
                  <TouchableOpacity
                    className="flex-row gap-2 items-baseline"
                    onPress={() => setEditModalVisible(true)}
                  >
                    <Image
                      source={Icons.edit_icon}
                      style={{ height: 20, width: 20 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* Attendance Details */}

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
            className="bg-black-100 px-20 py-4 rounded-lg mt-14"
            onPress={() => router.back()}
          >
            <Text className="text-white text-md">Back</Text>
          </TouchableOpacity>
        </>
      )}

      {loading && <ActivityIndicator size={"large"} />}
    </SafeAreaView>
  );
};

export default TeacherViewAttendance;
