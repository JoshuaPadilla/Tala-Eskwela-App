import TeacherScheduleComponent from "@/src/components/teacher_components/teacher_schedule_component";
import { Schedule } from "@/src/interfaces/schedule.interface";
import { useAttendanceStore } from "@/src/stores/attendance.store";
import { useAuthStore } from "@/src/stores/auth.store";
import { useScheduleStore } from "@/src/stores/schedule.store";
import { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TeacherAttendance = () => {
  const { currentSchedAttendance } = useAttendanceStore();
  const { teacherUser } = useAuthStore();
  const { getTodaysSchedules } = useScheduleStore();

  const [todaysSchedules, setTodaysSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    const getClassSchedules = async () => {
      const scheds = await getTodaysSchedules(
        teacherUser?.advisory_class?.id ?? ""
      );

      setTodaysSchedules(scheds);
    };

    getClassSchedules();
  }, [getTodaysSchedules, teacherUser]);
  return (
    <SafeAreaView className="p-8">
      <Text>TeacherAttendance</Text>

      <ScrollView contentContainerClassName="gap-2 pb-[200px]">
        {todaysSchedules &&
          todaysSchedules.map((sched, idx) => (
            <TeacherScheduleComponent
              key={sched.id || idx}
              schedule={sched}
              onPress={() => {}}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TeacherAttendance;
