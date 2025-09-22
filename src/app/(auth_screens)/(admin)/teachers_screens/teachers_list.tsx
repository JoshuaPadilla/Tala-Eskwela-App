import TeacherListComponent from "@/src/components/teacher_components/teacher-list-component";
import { useTeacherStore } from "@/src/stores/teacher.store";
import React, { useEffect } from "react";
import { ActivityIndicator, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TeachersList = () => {
  const { getTeachers, teachers, loading } = useTeacherStore();

  useEffect(() => {
    getTeachers();
  }, [getTeachers]);

  return (
    <SafeAreaView className="p-8">
      <Text>Teachers:</Text>

      {loading ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <ScrollView contentContainerClassName="pb-[200px] py-8 gap-4">
          {teachers.length &&
            teachers.map((teacher, index) => (
              <TeacherListComponent
                onSelect={() => {}}
                teacher={teacher}
                key={teacher.id || index}
              />
            ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default TeachersList;
