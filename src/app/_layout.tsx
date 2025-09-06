import { Stack } from "expo-router";
import { useEffect } from "react";
import { usePushNotifications } from "../hooks/usePushNotification";
import "./globals.css";

import * as Notifications from "expo-notifications";

export default function RootLayout() {
  const { expoPushToken, notification } = usePushNotifications();

  useEffect(() => {
    const handleLaunchNotification = async () => {
      const response = await Notifications.getLastNotificationResponseAsync();
      if (response) {
        const data = response.notification.request.content.data;
        console.log(data);
      }
    };

    handleLaunchNotification();
  }, []);
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth_screens)" options={{ headerShown: false }} />
        <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
