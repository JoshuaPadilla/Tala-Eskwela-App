import TeacherScheduleComponent from "@/src/components/teacher_components/teacher_schedule_component";
import H4Text from "@/src/components/text_components/h4";
import { useAttendanceStore } from "@/src/stores/attendance.store";
import { useAuthStore } from "@/src/stores/auth.store";
import { useScheduleStore } from "@/src/stores/schedule.store";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { ScrollView, View } from "react-native";

const TeacherAttendance = () => {
  const { currentSchedAttendance } = useAttendanceStore();
  const { teacherUser } = useAuthStore();
  const { getTodaysSchedules, todaysSchedule } = useScheduleStore();

  useEffect(() => {
    if (
      teacherUser?.advisory_class &&
      teacherUser.advisory_class.id &&
      todaysSchedule.length === 0
    ) {
      getTodaysSchedules(teacherUser.advisory_class.id);
    }
  }, [getTodaysSchedules, teacherUser, todaysSchedule]);

  return (
    <View className="flex-1 gap-4 bg-slate-100">
      <LinearGradient
        colors={["#fb923c", "#f1f5f9"]}
        start={{ x: 0, y: 0 }}
        // 3. Define the ending point of the gradient
        // [0, 1] is bottom-left (creating a vertical gradient)
        end={{ x: 0, y: 0.3 }}
        className="flex-1 px-6 py-12"
      >
        <View className="flex-row justify-between">
          <H4Text value={`Attendance`} additionalClassname="text-white my-4" />
        </View>
        <ScrollView contentContainerClassName="gap-2 pb-[200px]">
          {todaysSchedule &&
            todaysSchedule.map((sched, idx) => (
              <TeacherScheduleComponent
                key={sched.id || idx}
                schedule={sched}
              />
            ))}
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

export default TeacherAttendance;
