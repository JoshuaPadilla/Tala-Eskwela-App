import ImageComponent from "@/src/components/image_component";
import { Icons } from "@/src/constants/icons/icons.constant";
import { Images } from "@/src/constants/images/image.constants";
import { getSchedTimeStatusColor } from "@/src/helpers/color.helpers";
import { getSchedTimeStatus } from "@/src/helpers/isBetween.helper";
import { shadow } from "@/src/helpers/shadow";
import { timeToDisplay } from "@/src/helpers/timeToString.helper";
import { Schedule } from "@/src/interfaces/schedule.interface";
import { useScheduleStore } from "@/src/stores/schedule.store";
import { ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import * as Progress from "react-native-progress";
import { SafeAreaView } from "react-native-safe-area-context";

const StudentViewSchedule = () => {
  const { schedule_id } = useLocalSearchParams<{ schedule_id: string }>();
  const { getSchedule, loading } = useScheduleStore();

  const [selectedSched, setSelectedSched] = useState<Schedule | undefined>(
    undefined
  );

  const containerShadow = shadow();

  const teacherFullname = selectedSched?.class.class_teacher
    ? `${selectedSched?.class.class_teacher.first_name} ${selectedSched?.class.class_teacher.middle_name} ${selectedSched?.class.class_teacher.last_name}`
    : "";

  const schedDateTime =
    selectedSched &&
    `${selectedSched.day_of_week.toString().toUpperCase().slice(0, 3)} | ${timeToDisplay(selectedSched.start_time)} - ${timeToDisplay(selectedSched.end_time)}`;

  const schedTimeStatus =
    selectedSched &&
    getSchedTimeStatus(selectedSched.start_time, selectedSched.end_time);

  const schedStatusColor = getSchedTimeStatusColor(
    schedTimeStatus || "upcoming"
  );

  useEffect(() => {
    const fetchScheduleDetails = async () => {
      if (schedule_id) {
        const result = await getSchedule(schedule_id);

        if (result) {
          setSelectedSched(result);
        }
      }
    };

    fetchScheduleDetails();
  }, [schedule_id, getSchedule]);
  return (
    <SafeAreaView className="p-2 bg-slate-100 ">
      {/* Heading */}
      {/* <View className="flex-row justify-between items-center ">
        <BackComponent />

        <TouchableOpacity>
          <ImageComponent
            source={Icons.dot_option}
            size={10}
            addStyle={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              backgroundColor: "#22d3ee",
            }}
            radius={10}
          />
        </TouchableOpacity>
      </View> */}

      {loading ? (
        <View className="h-[40%]">
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <ScrollView contentContainerClassName="pb-[200px] gap-2 px-4">
          <View className="bg-cyan-300 rounded-lg mb-4 h-[35%] overflow-hidden">
            <ImageBackground
              source={Images.subject_placeholder}
              style={{ height: "100%", width: "100%" }}
            />

            <View
              className={`absolute z-10 m-4 px-4 py-2 rounded-lg top-0`}
              style={{ backgroundColor: schedStatusColor }}
            >
              <Text className="font-rubik-medium">
                {schedTimeStatus}
                {schedTimeStatus === "ongoing" && "..."}
              </Text>
            </View>

            <LinearGradient
              colors={["rgb(30 30 30 / 0.0)", "rgb(30 30 30 / 0.8)"]}
              start={{ x: 0, y: 0.3 }}
              // 3. Define the ending point of the gradient
              // [0, 1] is bottom-left (creating a vertical gradient)
              end={{ x: 0, y: 1 }}
              className="absolute size-full justify-end p-4 bottom-0 bg-black-100/40"
            >
              <View>
                {/* first row */}
                <View className="flex-row gap-2 items-center">
                  <Text className="text-2xl font-poppins-semibold text-white">
                    {selectedSched && selectedSched.subject.name}
                  </Text>

                  {/* <Text className="text-sm font-rubik-bold text-white">
                {selectedSched &&
                  `${timeToDisplay(selectedSched.start_time)} - ${timeToDisplay(selectedSched?.end_time)}`}
              </Text> */}
                </View>

                {/* second row */}
                <View className="flex-row gap-2 items-center">
                  <ImageComponent
                    source={Icons.class_advisory}
                    size={15}
                    color="#FFF"
                  />

                  <Text className="text-lg font-poppins-semibold text-white">
                    {teacherFullname}
                  </Text>

                  {/* <Text className="text-sm font-rubik-bold text-white">
                {selectedSched &&
                  `${timeToDisplay(selectedSched.start_time)} - ${timeToDisplay(selectedSched?.end_time)}`}
              </Text> */}
                </View>

                {/* third row */}
                <View className="flex-row gap-2 items-center">
                  <ImageComponent
                    source={Icons.date_time}
                    size={15}
                    color="#FFF"
                  />

                  <Text className="text-md font-rubik-regular text-white">
                    {schedDateTime}
                  </Text>

                  {/* <Text className="text-sm font-rubik-bold text-white">
                {selectedSched &&
                  `${timeToDisplay(selectedSched.start_time)} - ${timeToDisplay(selectedSched?.end_time)}`}
              </Text> */}
                </View>
              </View>
            </LinearGradient>
          </View>
          {/* container */}
          <View className="flex-row gap-2 flex-wrap w-full">
            {/* left cards */}
            <View className="flex-1 h-full gap-2">
              {/* upper card */}
              <View
                className="flex-1 bg-white rounded-lg
                "
                style={shadow()}
              >
                <Progress.Bar progress={0.3} width={null} />
              </View>

              {/* lower card */}
              <View
                className="flex-1 max-h-[20%] bg-white rounded-lg
                "
                style={shadow()}
              ></View>
            </View>

            {/* right cards */}
            <View className="flex-1 gap-2">
              {/* Present rate */}
              <View
                className="flex-1 bg-white rounded-lg p-3"
                style={containerShadow}
              >
                <View className="flex-row gap-2 items-center">
                  <View className="p-2 bg-status-present items-center justify-center rounded-lg">
                    <ImageComponent
                      source={Icons.student_sched_present}
                      size={15}
                    />
                  </View>
                  <Text className="font-poppins-regular font-md text-black-200">
                    Present Rate
                  </Text>
                </View>

                <View className="mt-2">
                  <Text className="font-rubik-bold text-xl text-black-100">
                    80%
                  </Text>

                  <Text className="font-rubik-regular text-sm text-black-200">
                    16 total out of 20
                  </Text>
                </View>
              </View>

              {/* Absent rate */}
              <View
                className="flex-1 bg-white rounded-lg p-3"
                style={containerShadow}
              >
                <View className="flex-row gap-2 items-center">
                  <View className="p-2 bg-status-absent items-center justify-center rounded-lg">
                    <ImageComponent
                      source={Icons.student_sched_absent}
                      size={15}
                    />
                  </View>
                  <Text className="font-poppins-regular font-md text-black-200">
                    Absent Rate
                  </Text>
                </View>

                <View className="mt-2">
                  <Text className="font-rubik-bold text-xl text-black-100">
                    80%
                  </Text>

                  <Text className="font-rubik-regular text-sm text-black-200">
                    16 total out of 20
                  </Text>
                </View>
              </View>

              {/* Late rate */}
              <View
                className="flex-1 bg-white rounded-lg p-3"
                style={containerShadow}
              >
                <View className="flex-row gap-2 items-center">
                  <View className="p-2 bg-status-late items-center justify-center rounded-lg">
                    <ImageComponent
                      source={Icons.student_sched_late}
                      size={15}
                    />
                  </View>
                  <Text className="font-poppins-regular font-md text-black-200">
                    Present Rate
                  </Text>
                </View>

                <View className="mt-2">
                  <Text className="font-rubik-bold text-xl text-black-100">
                    80%
                  </Text>

                  <Text className="font-rubik-regular text-sm text-black-200">
                    16 total out of 20
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View className="h-[150px] bg-schedStatus-ended rounded-lg">
            <Text>Attendance</Text>
          </View>
          <View className="h-[150px] bg-schedStatus-ended rounded-lg"></View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default StudentViewSchedule;
