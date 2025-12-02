import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Platform } from "react-native";

export interface PushNotificationState {
  notification?: Notifications.Notification;
  expoPushToken?: Notifications.ExpoPushToken;
}

export const usePushNotifications = (): PushNotificationState => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });

  const [expoPushToken, setExpoPushToken] = useState<
    Notifications.ExpoPushToken | undefined
  >();

  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >();

  const notificationListener = useRef<Notifications.EventSubscription>(null);
  const responseListener = useRef<Notifications.EventSubscription>(null);

  const handleNotificationResponse = (
    response: Notifications.NotificationResponse
  ) => {
    const data = response.notification.request.content;

    // FIX 1: Use the correct URL path (Group folders are invisible in the URL)
    // If your file is at: app/(auth_screens)/(student)/(tabs)/student_insights.tsx
    // The path is simply: /student_insights

    // You can also send the path dynamically from your backend in the 'data' payload

    if (data.data.user === "student") {
      router.push({
        pathname:
          "/(auth_screens)/(student)/student_screens/student_view_attendance",
        params: { attendanceId: String(data.data.attendanceId) },
      });
    }
  };

  const registerForPushNotificationsAsync = async () => {
    let token;

    if (Device.isDevice) {
      try {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();

        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus !== "granted") {
          Alert.alert("Failed to get push token - permission denied");
          return undefined;
        }

        const projectId =
          Constants.expoConfig?.extra?.eas?.projectId ??
          Constants.easConfig?.projectId;

        if (!projectId) {
          console.error("❌ No project ID found!");
          Alert.alert("Error", "No project ID configured");
          return undefined;
        }

        token = await Notifications.getExpoPushTokenAsync({
          projectId: projectId,
        });

        if (Platform.OS === "android") {
          await Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
          });
        }
      } catch (error) {
        console.error("💥 Error in registerForPushNotificationsAsync:", error);
        if (error instanceof Error) {
          console.error("💥 Error stack:", error.stack);
          Alert.alert("Error getting push token", error.message);
        } else {
          Alert.alert("Error getting push token", "Unknown error");
        }
        return undefined;
      }
    } else {
      // Don't show alert in simulator/emulator as it's expected
      return undefined;
    }

    return token;
  };

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => {
        setExpoPushToken(token);
      })
      .catch((error) => {
        console.log(error);
      });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        handleNotificationResponse(response);
      });

    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (response) {
        // We wait a brief moment to ensure navigation container is ready
        setTimeout(() => handleNotificationResponse(response), 500);
      }
    });

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  // Debug the current state
  useEffect(() => {}, [expoPushToken]);

  return {
    expoPushToken,
    notification,
  };
};
