import BackComponent from "@/src/components/back_component";
import SelectTeacherModal from "@/src/components/modals/select-teacher-modal";
import { Icons } from "@/src/constants/icons/icons.constant";
import { CreateClassDto } from "@/src/dto/create-class.dto";
import { Teacher } from "@/src/interfaces/teacher.interface";
import { useClassStore } from "@/src/stores/class.store";
import { useTeacherStore } from "@/src/stores/teacher.store";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AddClass = () => {
  const { createClass, loading } = useClassStore();
  const [selectTeacher, setSelectTeacher] = useState(false);

  const [classForm, setClassForm] = useState<CreateClassDto>({
    class_teacher: "",
    grade_lvl: "",
    section: "",
  });

  const { getTeachers } = useTeacherStore();

  const handleInputChange = (field: string, value: string) => {
    setClassForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddTeacher = () => {
    getTeachers();
    setSelectTeacher(true);
  };

  const modalCloseCallBack = (teacher: Teacher) => {
    if (!teacher) return;

    handleInputChange("class_teacher", teacher.id || "");
    setSelectTeacher(false);
  };

  const handleSubmit = async () => {
    if (!classForm.grade_lvl && !classForm.section && classForm.class_teacher) {
      console.log("must have one of those");
      return;
    }
    await createClass(classForm);
  };

  return (
    <>
      <SelectTeacherModal
        modalVisible={selectTeacher}
        onCloseCallback={modalCloseCallBack}
      />
      <SafeAreaView className="p-8">
        <BackComponent />

        <Text className="mb-10">AddClass</Text>

        <ScrollView className="pb-[200px]">
          <View className="w-full items-start justify-center gap-2 mb-4">
            <Text className="text-black-100 text-l">Grade Level</Text>

            <View className="w-full items-start justify-center border border-cyan-500 rounded-lg px-2">
              <TextInput
                className="w-full text-black-100"
                value={String(classForm?.grade_lvl) || ""}
                onChange={(e) => {
                  handleInputChange("grade_lvl", e.nativeEvent.text);
                }}
                keyboardType="number-pad"
              />
            </View>
          </View>

          <View className="w-full items-start justify-center gap-2 mb-4">
            <Text className="text-black-100 text-l">Section</Text>

            <View className="w-full items-start justify-center border border-cyan-500 rounded-lg px-2">
              <TextInput
                className="w-full text-black-100"
                value={String(classForm?.section) || ""}
                onChange={(e) => {
                  handleInputChange("section", e.nativeEvent.text);
                }}
              />
            </View>
          </View>

          <View className="w-full items-start justify-center gap-2 mb-4">
            <Text className="text-black-100 text-l">Teacher</Text>

            <TouchableOpacity
              className="w-full items-center justify-center bg-cyan-500 rounded-lg p-2"
              onPress={handleAddTeacher}
            >
              <Image source={Icons.plus} style={{ height: 20, width: 20 }} />
            </TouchableOpacity>
          </View>

          {loading ? (
            <ActivityIndicator size={"small"} />
          ) : (
            <TouchableOpacity
              className="w-full h-14 rounded-lg "
              onPress={handleSubmit}
            >
              <LinearGradient
                colors={["#fb923c", "#22d3ee", "#fb923c", "#22d3ee"]}
                start={{ x: -1, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="w-full h-full items-center justify-center rounded-lg overflow-hidden"
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

export default AddClass;
