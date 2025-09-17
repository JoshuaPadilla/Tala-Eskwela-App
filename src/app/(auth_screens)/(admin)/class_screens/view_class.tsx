import { Class } from "@/src/interfaces/class.interface";
import { useClassStore } from "@/src/stores/class.store";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ViewClass = () => {
  const { class_id } = useLocalSearchParams();

  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

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

  return (
    <SafeAreaView className="p-8 items-center">
      <Text>{selectedClass?.section}</Text>
    </SafeAreaView>
  );
};

export default ViewClass;
