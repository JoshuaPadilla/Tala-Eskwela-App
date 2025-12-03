import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Platform } from "react-native";
import { useAuthStore } from "../stores/auth.store";

export interface PushNotificationState {
  notification?: Notifications.Notification;
  expoPushToken?: Notifications.ExpoPushToken;
}

const HANDLED_NOTIFICATION_KEY = "lastHandledNotificationId";

export const usePushNotifications = (): PushNotificationState => {
  const { studentUser, parentUser } = useAuthStore();

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

  const handleNotificationResponse = async (
    response: Notifications.NotificationResponse
  ) => {
    const data = response.notification.request.content;
    const notificationId = response.notification.request.identifier;

    // Check if we've already handled this specific notification
    const lastHandledId = await AsyncStorage.getItem(HANDLED_NOTIFICATION_KEY);

    if (lastHandledId === notificationId) {
      console.log("🚫 Notification already handled:", notificationId);
      return;
    }

    // Mark this notification as handled
    await AsyncStorage.setItem(HANDLED_NOTIFICATION_KEY, notificationId);
    console.log("✅ Handling notification:", notificationId);
    console.log(data.data.user);

    if (data.data.user === "parent") {
      router.push({
        pathname: "/parent_view_notif",
        params: { attendanceId: String(data.data.attendanceId) },
      });
    }

    if (data.data.user === "student") {
      router.push({
        pathname: "/student_view_attendance",
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

    // Check for notification that opened the app
    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (response) {
        // Add a delay to ensure navigation is ready
        setTimeout(() => handleNotificationResponse(response), 500);
      }
    });

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  return {
    expoPushToken,
    notification,
  };
};
