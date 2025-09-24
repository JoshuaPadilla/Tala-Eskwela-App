import { Stack } from "expo-router";

export default function TeacherLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen name="selected_student" options={{ headerShown: false }} />
      <Stack.Screen name="register_student" options={{ headerShown: false }} />
    </Stack>
  );
}
