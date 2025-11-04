import { router, Stack } from "expo-router";
import { useEffect } from "react";
import "./globals.css";

import { Roles } from "../enums/role.enum";
import { useAuthStore } from "../stores/auth.store";

export default function RootLayout() {
  const { checkAuth, user } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (user) {
      switch (user.role) {
        case Roles.PARENT:
          router.replace("/(auth_screens)/(parent)/parent_home");
          break;
        case Roles.TEACHER:
          router.replace("/(auth_screens)/(teacher)/(tabs)/teacher_home");
          break;
        case Roles.STUDENT:
          router.replace("/(auth_screens)/(student)/(tabs)/student_home");
          break;
        case Roles.ADMIN:
          router.replace("/(auth_screens)/(admin)/admin_home");
          break;
        default:
          router.replace("/");
      }
    }
  }, [user]); // 👈 Add `user` to the dependency array
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
