import ImageComponent from "@/src/components/image_component";
import SearchBarComponent from "@/src/components/search_bar_component";
import StudentScheduleList from "@/src/components/student_components/student_schedule_list";
import { Icons } from "@/src/constants/icons/icons.constant";
import { Schedule } from "@/src/interfaces/schedule.interface";
import { useAuthStore } from "@/src/stores/auth.store";
import { useScheduleStore } from "@/src/stores/schedule.store";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const StudentHome = () => {
  const { studentUser, logout } = useAuthStore();
  const { getTodaysSchedules, loading, getSchedules, schedules } =
    useScheduleStore();

  const [todaysSched, setTodaysSched] = useState<Schedule[] | []>([]);

  useEffect(() => {
    getSchedules();
    const fetchTodaysSchedules = async () => {
      if (studentUser?.class.id) {
        const result = await getTodaysSchedules(studentUser.class.id);

        if (result) {
          setTodaysSched(result);
        }
      }
    };

    fetchTodaysSchedules();
  }, [studentUser, getTodaysSchedules]);

  const handleLogout = () => {
    logout();

    router.push("/");
  };

  const handleOptionPress = () => {
    console.log("Hello world");
  };

  return (
    <SafeAreaView className="flex-1 p-6  gap-2">
      {/* Headings */}
      <View className="flex-row justify-between items-center w-full">
        <TouchableOpacity onPress={handleOptionPress} className="w-[100px]">
          <ImageComponent
            source={studentUser?.profileUrl || null}
            size={40}
            radius={999}
          />
        </TouchableOpacity>

        <Text className="font-poppins-bold text-lg text-cyan-400">Home</Text>

        <TouchableOpacity
          onPress={handleOptionPress}
          className="w-[100px] items-end"
        >
          <ImageComponent source={Icons.options} size={20} />
        </TouchableOpacity>
      </View>

      {/* Body */}

      {/* Greetings */}
      <View className="my-4">
        <Text className="text-2xl font-rubik-bold text-cyan-500">
          Hi {studentUser?.first_name}!
        </Text>
        <Text className="text-sm font-rubik-light text-cyan-500">
          Good Morning!
        </Text>
      </View>

      <SearchBarComponent
        onSubmit={(text) => {
          console.log(text);
        }}
      />

      <Text className="my-4 text-lg font-poppins-semibold text-cyan-600">
        Subjects for today:
      </Text>

      {loading ? (
        <View className="h-[40%]">
          <ActivityIndicator size={"large"} />
        </View>
      ) : todaysSched.length === 0 ? (
        <View className="p-8 items-center justify-center">
          <Text className="font-rubik-bold text-lg text-cyan-500">
            No Schedule Today!
          </Text>
        </View>
      ) : (
        <StudentScheduleList schedules={schedules} />
      )}
    </SafeAreaView>
  );
};

export default StudentHome;
