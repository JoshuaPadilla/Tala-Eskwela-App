import { TabIcon } from "@/src/components/tab_icon_component";
import { TeacherTabIcons } from "@/src/constants/icons/teacher.constants";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function TabLayout() {
  return (
    <>
      <StatusBar style="dark" translucent />
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
          key="teacher_home"
          name="teacher_home"
          options={{
            title: "HomeTab",
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
          key="teacher_attendance"
          name="teacher_attendance"
          options={{
            title: "TeacherAttendanceTab",
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
          key="teacher_students"
          name="teacher_students"
          options={{
            title: "TeacherStudentTab",
            headerShown: false,
            tabBarIcon: ({ focused }: { focused: boolean }) => (
              <TabIcon
                icon={TeacherTabIcons.tab_students}
                focused={focused}
                title="Students"
              />
            ),
          }}
        />

        <Tabs.Screen
          key="teacher_insights"
          name="teacher_insights"
          options={{
            title: "TeacherInsightsTab",
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

        <Tabs.Screen
          key="teacher_subjects"
          name="teacher_subjects"
          options={{
            title: "TeacherSubjectsTab",
            headerShown: false,
            tabBarIcon: ({ focused }: { focused: boolean }) => (
              <TabIcon
                icon={TeacherTabIcons.tab_subjects}
                focused={focused}
                title="Subjects"
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
