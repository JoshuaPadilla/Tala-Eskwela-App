import BackComponent from "@/src/components/back_component";
import DayOfWeekToggle from "@/src/components/day-of-week-toggle";
import { CreateScheduleDto } from "@/src/dto/create-schedule.dto";
import { DAY_OF_WEEK } from "@/src/enums/day_of_week";
import { useScheduleStore } from "@/src/stores/schedule.store";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import DatePicker from "react-native-date-picker";

import SelectClassModal from "@/src/components/modals/select-class-modal";
import { Icons } from "@/src/constants/icons/icons.constant";
import { Class } from "@/src/interfaces/class.interface";
import { useClassStore } from "@/src/stores/class.store";
import { Image } from "expo-image";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AddSchedule = () => {
  const { loading } = useScheduleStore();
  const { getClasses } = useClassStore();

  const [classToDisplay, setClassToDisplay] = useState<Class>();

  const [open, setOpen] = useState(false);
  const [isStartTime, setIsStartTime] = useState(true);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [form, setForm] = useState<CreateScheduleDto>({
    class_id: "",
    subject_id: "",
    day_of_week: DAY_OF_WEEK.MONDAY,
    end_time: "",
    start_time: "",
  });
  const [selectClassModalVisible, setSelectClassModalVisible] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOnConfirm = (time: Date) => {
    const formattedTime = time.toLocaleTimeString("en-PH", {
      minute: "2-digit",
      hour: "2-digit",
    });
    if (isStartTime) {
      setStartTime(formattedTime);
    } else {
      setEndTime(formattedTime);
    }
  };

  const handleSelectClass = () => {
    getClasses();
    setSelectClassModalVisible(true);
  };

  const handleSelectClassCallback = (classObj?: Class) => {
    if (!classObj) {
      return;
    }
    setClassToDisplay(classObj);
    setSelectClassModalVisible(false);
    handleInputChange("class_id", classObj.id || "");
  };

  const handleSelectEndTime = () => {
    setOpen(true);
    setIsStartTime(false);
  };

  const handleSelectStartTime = () => {
    setOpen(true);
    setIsStartTime(true);
  };

  const handleDayOfWeekChange = (dayOfWeek: DAY_OF_WEEK) => {
    handleInputChange("day_of_week", dayOfWeek);
  };

  return (
    <>
      {/* modals */}
      <DatePicker
        date={new Date()}
        modal
        open={open}
        mode="time"
        onConfirm={(time) => {
          setOpen(false);
          handleOnConfirm(time);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        locale="en-PH"
      />

      <SelectClassModal
        onCloseCallback={handleSelectClassCallback}
        modalVisible={selectClassModalVisible}
      />

      <SafeAreaView className="p-8">
        <BackComponent />

        <Text className="mb-10">AddClass</Text>

        <ScrollView className="pb-[200px]">
          {/* Day of Week */}

          <View className="gap-4">
            <Text>Select Date:</Text>
            <DayOfWeekToggle
              dayOfWeek={Object.values(DAY_OF_WEEK)}
              currentValue={form.day_of_week}
              setValue={handleDayOfWeekChange}
            />
          </View>

          {/* time selection */}
          <View className="w-full flex-row justify-between pb-8">
            {/* start time */}
            <View className="w-[48%] gap-2">
              <View className="flex-row justify-between">
                <Text>Start Time</Text>
                {startTime && (
                  <Pressable hitSlop={5} onPress={handleSelectStartTime}>
                    <Image
                      source={Icons.edit}
                      style={{ height: 20, width: 20 }}
                    />
                  </Pressable>
                )}
              </View>

              {!startTime ? (
                <TouchableOpacity
                  className="items-center justify-center bg-cyan-200 p-4 rounded-md"
                  onPress={handleSelectStartTime}
                >
                  <Text>Time</Text>
                </TouchableOpacity>
              ) : (
                <View className="items-center justify-center p-4 border-b-2">
                  <Text>{startTime}</Text>
                </View>
              )}
            </View>

            {/* end time */}
            <View className="w-[48%] gap-2">
              <View className="flex-row justify-between">
                <Text>End Time</Text>
                {endTime && (
                  <Pressable hitSlop={5} onPress={handleSelectEndTime}>
                    <Image
                      source={Icons.edit}
                      style={{ height: 20, width: 20 }}
                    />
                  </Pressable>
                )}
              </View>

              {!endTime ? (
                <TouchableOpacity
                  className="items-center justify-center bg-cyan-200 p-4 rounded-md"
                  onPress={handleSelectEndTime}
                >
                  <Text>Time</Text>
                </TouchableOpacity>
              ) : (
                <View className="items-center justify-center p-4 border-b-2">
                  <Text>{endTime}</Text>
                </View>
              )}
            </View>
          </View>

          {/* add class */}
          <View className="gap-4">
            <View className="flex-row justify-between">
              <Text>Class</Text>
              {form.class_id && (
                <Pressable hitSlop={5} onPress={handleSelectClass}>
                  <Image
                    source={Icons.edit}
                    style={{ height: 20, width: 20 }}
                  />
                </Pressable>
              )}
            </View>

            {!form.class_id ? (
              <TouchableOpacity
                className="w-full items-center justify-center bg-cyan-500 rounded-lg p-2"
                onPress={handleSelectClass}
              >
                <Image source={Icons.plus} style={{ height: 20, width: 20 }} />
              </TouchableOpacity>
            ) : (
              <View className="bg-cyan-200 p-4 rounded-md">
                <Text>
                  {classToDisplay?.section} {classToDisplay?.grade_lvl}
                </Text>
              </View>
            )}
          </View>

          {loading ? (
            <ActivityIndicator size={"small"} />
          ) : (
            <TouchableOpacity
              className="w-full h-14 rounded-lg my-4"
              onPress={() => {}}
            >
              <LinearGradient
                colors={["#fb923c", "#22d3ee", "#fb923c", "#22d3ee"]}
                start={{ x: -1, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="w-full h-full items-center justify-center rounded-lg overflow-hidden self-end"
                style={{ borderRadius: 10 }}
              >
                <Text className="text-primary-400 font-semibold text-lg">
                  Submit
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default AddSchedule;
