import { Attendance } from "@/src/interfaces/attendance.interface";
import React from "react";
import { Text, View } from "react-native";

interface TeacherAttendanceComponentProps {
  attendance: Attendance;
}

const TeacherAttendanceComponent = ({
  attendance,
}: TeacherAttendanceComponentProps) => {
  return (
    <View className="p-4 bg-cyan-200 rounded-lg">
      <Text>
        {attendance.student?.first_name} {attendance.student.last_name}
      </Text>
    </View>
  );
};

export default TeacherAttendanceComponent;
