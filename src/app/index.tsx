import { router } from "expo-router";
import { useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Roles } from "../enums/role.enum";
import { useAuthStore } from "../stores/auth.store";
export default function Index() {
  const { user, logout } = useAuthStore();

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
          router.replace("/(onboarding)/login");
      }
    }
  }, [user]); // 👈 Add `user` to the dependency array

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white gap-10">
      <Text>Welcome !!!!</Text>

      <TouchableOpacity
        onPress={() => {
          router.replace("/(onboarding)/login");
        }}
      >
        <Text>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          router.replace("/(onboarding)/register");
        }}
      >
        <Text>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
