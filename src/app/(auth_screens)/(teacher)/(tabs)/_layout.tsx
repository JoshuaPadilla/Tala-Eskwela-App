import { Image } from "expo-image";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

const TabIcon = ({
  focused,
  icon,
  title,
  indicatorNumber,
}: {
  focused: boolean;
  icon?: any;
  title: string;
  indicatorNumber?: number;
}) => {
  return (
    <View className="flex-1 mt-3 flex flex-col items-center">
      {icon && (
        <Image
          source={icon}
          tintColor={focused ? "#22d3ee" : "#666876"}
          className="size-6"
          contentFit="contain"
        />
      )}
      <Text
        className={`${
          focused
            ? "text-cyan-400 font-poppins-medium"
            : "text-black-200 font-poppins-regular"
        } text-xs w-full text-center mt-1`}
      >
        {title}
      </Text>
    </View>
  );
};

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
                // icon={tab_icons.tab_home}
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
                // icon={tab_icons.tab_home}
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
                // icon={tab_icons.tab_home}
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
                // icon={tab_icons.tab_home}
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
                // icon={tab_icons.tab_home}
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
