import { Roles } from "@/src/enums/role.enum";
import { useAuthStore } from "@/src/stores/auth.store";
import { router, Stack } from "expo-router";
import { useEffect } from "react";

export default function OnboardingLayout() {
  const { user } = useAuthStore();

  console.log(user);

  // ✅ Only run role-based redirect if no notification override
  useEffect(() => {
    if (user) {
      switch (user.role) {
        case Roles.PARENT:
          router.replace("/(auth_screens)/(parent)/parent_home");
          break;
        case Roles.TEACHER:
          router.replace("/(auth_screens)/(teacher)/teacher_home");
          break;
        case Roles.STUDENT:
          router.replace("/(auth_screens)/(student)/student_home");
          break;
        default:
          router.replace("/");
      }
    }
  }, [user]);

  return (
    <Stack>
      <Stack.Screen name="register" options={{ headerShown: false }} />
    </Stack>
  );
}
