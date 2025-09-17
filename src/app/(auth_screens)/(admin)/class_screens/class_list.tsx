import BackComponent from "@/src/components/back_component";
import ClassComponent from "@/src/components/class-component";
import { useClassStore } from "@/src/stores/class.store";
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

const CLassList = () => {
  const { classes, getClasses, loading } = useClassStore();

  useEffect(() => {
    getClasses();
  }, [getClasses]);

  const handleAddClass = () => {
    router.push("/(auth_screens)/(admin)/class_screens/add_class");
    return;
  };

  return (
    <SafeAreaView className="p-8 items-center">
      <BackComponent />

      <View className="flex-row justify-between w-full">
        <Text>Classes:</Text>
        <Pressable
          className="px-4 py-2 bg-primary-300 rounded-md"
          onPress={handleAddClass}
        >
          <Text>Add</Text>
        </Pressable>
      </View>

      <View
        className={`${loading ? "items-center justify-center size-[80%]" : ""} w-full`}
      >
        {loading ? (
          <ActivityIndicator size={"large"} />
        ) : (
          <ScrollView contentContainerClassName="pb-[200px] py-8 gap-4">
            {classes &&
              classes.map((classObj, index) => (
                <ClassComponent
                  classObj={classObj}
                  key={classObj.class_id || index}
                />
              ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CLassList;
