import ToggleComponent from "@/src/components/class_components/class-toggle-component.tsx";
import StudentList from "@/src/components/class_components/student-list";
import { Icons } from "@/src/constants/icons/icons.constant";
import { ClassToggle } from "@/src/enums/view_class_toggle.enum";
import { Class } from "@/src/interfaces/class.interface";
import { useClassStore } from "@/src/stores/class.store";
import { useStudentStore } from "@/src/stores/student.store";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ViewClass = () => {
  const { class_id } = useLocalSearchParams();
  const { getStudents, students } = useStudentStore();

  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [toggleState, setToggleState] = useState<ClassToggle>(
    ClassToggle.STUDENTS
  );
  const [toggleLoading, setToggleLoading] = useState(false);

  const { getClass, loading } = useClassStore();

  useEffect(() => {
    const loadClass = async () => {
      if (class_id) {
        const classObj = await getClass(class_id as string);

        console.log(classObj);

        if (classObj) {
          setSelectedClass(classObj);
        }
      }
    };

    loadClass();
  }, [class_id, getClass]);

  useEffect(() => {
    const handleToggle = async () => {
      setToggleLoading(true);
      switch (toggleState) {
        case ClassToggle.ATTENDANCE:
          console.log("Attendance");
        case ClassToggle.SCHEDULE:
          console.log("Schedule");
        case ClassToggle.STUDENTS:
          await getStudents();
      }

      setToggleLoading(false);
      return;
    };

    handleToggle();
  }, [toggleState, getStudents]);

  return (
    <SafeAreaView className="flex-1 p-8 items-center">
      {loading ? (
        <ActivityIndicator size={"small"} />
      ) : (
        <View className="w-full  gap-4">
          <View className="flex-row justify-start gap-4">
            <Image source={Icons.profile} style={{ height: 70, width: 70 }} />

            <View className="w-full p-2">
              <Text>
                {selectedClass?.class_teacher?.first_name}{" "}
                {selectedClass?.class_teacher?.first_name}
              </Text>
              <Text>{selectedClass?.class_teacher?.phone}</Text>
              <Text>{selectedClass?.class_teacher?.role.toUpperCase()}</Text>
            </View>
          </View>

          <ToggleComponent
            selectedItem={toggleState}
            data={Object.values(ClassToggle)}
            onSelectCallback={setToggleState}
          />

          <View>
            {loading ? (
              <ActivityIndicator size={"small"} />
            ) : (
              <StudentList students={students} />
            )}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ViewClass;
