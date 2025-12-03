import { Icons } from "@/src/constants/icons/icons.constant";
import { formatAttendanceTime } from "@/src/helpers/timeToString.helper";
import { Attendance } from "@/src/interfaces/attendance.interface";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface TeacherAttendanceComponentProps {
  attendance: Attendance;
}

const TeacherAttendanceComponent = ({
  attendance,
}: TeacherAttendanceComponentProps) => {
  const handleViewAttendance = () => {
    router.push({
      pathname: "/teacher_view_attendance",
      params: { attendanceId: attendance.id },
    });
  };

  const student = attendance.student;
  const fullName = `${student.first_name} ${student.middle_name.charAt(0)}. ${student.last_name}`;

  return (
    <TouchableOpacity
      onPress={handleViewAttendance}
      className="flex-row px-2 py-4 gap-4 rounded-lg border-t-black-100/60"
      style={{ borderTopWidth: 0.5 }}
    >
      <View className="size-[50px] items-center justify-center">
        <Image
          source={student.profileUrl}
          style={{ height: "100%", width: "100%", borderRadius: 999 }}
        />
      </View>

      <View className="">
        <Text className="font-poppins-bold text-md">{fullName}</Text>
        <Text className="font-rubik-medium text-sm">{student.email}</Text>
      </View>

      <View className="flex-row flex-1 items-baseline justify-end gap-2 pr-4">
        <Image source={Icons.time_in} style={{ height: 15, width: 15 }} />
        <Text className="font-poppins-semibold text-sm">
          {formatAttendanceTime(attendance.timestamp)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TeacherAttendanceComponent;
