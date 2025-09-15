import socket from "@/lib/socket";
import { Stack } from "expo-router";
import React, { useEffect } from "react";

const AuthScreensLayout = () => {
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
  }, []);

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
