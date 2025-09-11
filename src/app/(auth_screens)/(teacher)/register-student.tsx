import socket from "@/lib/socket";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const RegisterStudent = () => {
  const [rfidUuid, setRfidUuid] = useState("");

  useEffect(() => {
    socket.on("tapped", (data) => {
      setRfidUuid(data.data);
    });
  }, []);

  return (
    <SafeAreaView>
      <Text>{rfidUuid}</Text>
    </SafeAreaView>
  );
};

export default RegisterStudent;
