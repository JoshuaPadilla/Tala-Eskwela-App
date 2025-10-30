import ImageComponent from "@/src/components/image_component";
import ScheduleComponent from "@/src/components/schedule-component";
import H1Text from "@/src/components/text_components/h1";
import H3Text from "@/src/components/text_components/h3";
import H4Text from "@/src/components/text_components/h4";
import { TeacherIcons } from "@/src/constants/icons/teacher.constants";
import { useAuthStore } from "@/src/stores/auth.store";
import { useScheduleStore } from "@/src/stores/schedule.store";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TeacherHome = () => {
  const { teacherUser, logout } = useAuthStore();
  const { getTodaysSchedules, todaysSchedule, loading } = useScheduleStore();

  useEffect(() => {
    if (teacherUser?.advisory_class && teacherUser.advisory_class.id) {
      getTodaysSchedules(teacherUser.advisory_class.id);
    }
  }, [getTodaysSchedules, teacherUser]);

  const handleLogout = () => {
    logout();

    router.replace("/");
  };

  return (
    <>
      <LinearGradient
        colors={["#22d3ee", "#f1f5f9"]}
        start={{ x: 0, y: 0 }}
        // 3. Define the ending point of the gradient
        // [0, 1] is bottom-left (creating a vertical gradient)
        end={{ x: 0, y: 0.3 }}
        className="flex-1 "
      >
        <SafeAreaView className="flex-1 px-6 py-12">
          <H4Text
            value={`Hello Teacher ${teacherUser?.first_name}`}
            additionalClassname="text-orange-400"
          />

          {/* quick Insights */}
          <View className="flex-row mt-8 justify-between my-4">
            {/* Subjects */}
            <View className="bg-white p-4 rounded-lg items-center w-[48%]">
              <View className="flex-row gap-2 items-center">
                <ImageComponent
                  source={TeacherIcons.subjects_icon}
                  size={40}
                  radius={9999}
                />

                <View>
                  <H1Text
                    value="Total Subjects"
                    additionalClassname="text-orange-400"
                  />
                  <H1Text
                    value="in this Class:"
                    additionalClassname="text-orange-400"
                  />
                </View>
              </View>

              <H4Text value={"8"} additionalClassname="text-orange-400" />
            </View>

            {/* Students */}
            <View className="bg-white p-4 rounded-lg items-center w-[48%]">
              <View className="flex-row gap-2 items-center">
                <ImageComponent
                  source={TeacherIcons.students_icon}
                  size={40}
                  radius={9999}
                />

                <View>
                  <H1Text
                    value="Total Enrolled:"
                    additionalClassname="text-orange-400"
                  />
                  <H1Text
                    value="Students:"
                    additionalClassname="text-orange-400"
                  />
                </View>
              </View>

              <H4Text value={"2 "} additionalClassname="text-orange-400" />
            </View>
          </View>
          <Pressable onPress={handleLogout}>
            <Text>Logout</Text>
          </Pressable>
          {/* Todays Schedule */}

          <H3Text value="Todays Schedule:" additionalClassname="text-black" />

          <ScrollView contentContainerClassName="pb-[100px] py-4 items-center px-2 gap-2">
            {loading ? (
              <ActivityIndicator size={"large"} className="my-4" />
            ) : todaysSchedule.length > 0 ? (
              todaysSchedule.map((sched) => (
                <ScheduleComponent schedule={sched} key={sched.id} />
              ))
            ) : (
              <H3Text
                value="No Schedule for today"
                additionalClassname="text-black-100/50 my-8"
              />
            )}
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

export default TeacherHome;
