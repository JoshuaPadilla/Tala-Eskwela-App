import socket from "@/lib/socket";
import { useAuthStore } from "@/src/stores/auth.store";
import { Stack } from "expo-router";
import React, { useEffect } from "react";

const AuthScreensLayout = () => {
  const { teacherUser } = useAuthStore();

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();

      console.log("Socket connected globally in RootLayout");
    }

    return () => {
      if (socket.connected) {
        socket.disconnect();
        console.log("Socket disconnected globally in RootLayout");
      }
    };
  }, [teacherUser]);

  useEffect(() => {
    if (socket.connected && teacherUser) {
      socket.emit("join_class", { class_id: teacherUser.advisory_class.id });
    }
  }, [teacherUser]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(parent)" options={{ headerShown: false }} />
      <Stack.Screen name="(student)" options={{ headerShown: false }} />
      <Stack.Screen name="(teacher)" options={{ headerShown: false }} />
      <Stack.Screen name="(admin)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AuthScreensLayout;
