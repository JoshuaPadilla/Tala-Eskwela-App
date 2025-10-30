import { TabIcon } from "@/src/components/tab_icon_component";
import { TeacherTabIcons } from "@/src/constants/icons/teacher.constants";
import { Tabs } from "expo-router";

export default function StudentTabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          position: "absolute",
          borderTopColor: "#0061FF1A",
          height: 70,
        },
      }}
    >
      <Tabs.Screen
        key="student_home"
        name="student_home"
        options={{
          title: "StudentHome",
          headerShown: false,
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon
              icon={TeacherTabIcons.tab_home}
              focused={focused}
              title="Home"
            />
          ),
        }}
      />

      <Tabs.Screen
        key="student_attendance"
        name="student_attendance"
        options={{
          title: "StudentAttendance",
          headerShown: false,
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon
              icon={TeacherTabIcons.tab_attendance}
              focused={focused}
              title="Attendance"
            />
          ),
        }}
      />

      <Tabs.Screen
        key="student_insights"
        name="student_insights"
        options={{
          title: "StudentInsights",
          headerShown: false,
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon
              icon={TeacherTabIcons.tab_insights}
              focused={focused}
              title="Insights"
            />
          ),
        }}
      />
    </Tabs>
  );
}
