import socket from "@/lib/socket";
import { useStudentStore } from "@/src/stores/student.store";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const RegisterStudent = () => {
  const [rfidUuid, setRfidUuid] = useState("");
  const [title, setTitle] = useState("Place you id in the reader");
  const { updateStudents } = useStudentStore();

  useEffect(() => {
    socket.on("tapped", (data) => {
      console.log("data:", data);
      setRfidUuid(data.data);
      updateStudents({ rfid_tag_uid: data.data });
    });
  }, [updateStudents, setRfidUuid]);

  useEffect(() => {
    if (rfidUuid) {
      setTitle("ID reveiced, going back now...");
      setTimeout(() => {
        router.back();
      }, 1500);
    }
  }, [rfidUuid]);

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <View className="p-4 bg-primary-400 rounded-md mb-10">
        <Text>{title}</Text>
      </View>

      <Text>{rfidUuid ? rfidUuid : "Waiting..."}</Text>
    </SafeAreaView>
  );
};

export default RegisterStudent;
