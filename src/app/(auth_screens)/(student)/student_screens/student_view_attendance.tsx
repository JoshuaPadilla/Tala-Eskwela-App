import { Attendance } from "@/src/interfaces/attendance.interface";
import { useAttendanceStore } from "@/src/stores/attendance.store";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const StudentViewAttendance = () => {
  const { attendanceId } = useLocalSearchParams<{ attendanceId: string }>();

  const [attendance, setAttendance] = useState<Attendance | undefined>(
    undefined
  );

  const { getAttendance } = useAttendanceStore();

  useEffect(() => {
    if (attendanceId) {
      const fetchDetails = async () => {
        const result = await getAttendance(attendanceId || "");

        if (result) {
          setAttendance(result);
        }
      };

      fetchDetails();
    }
  }, [attendanceId, getAttendance]);

  return (
    <SafeAreaView>
      <Text>student_view_attendance</Text>
    </SafeAreaView>
  );
};

export default StudentViewAttendance;
