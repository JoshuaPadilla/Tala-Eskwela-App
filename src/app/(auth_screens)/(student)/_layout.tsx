import { Stack } from "expo-router";

export default function StudentLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="student_home" options={{ headerShown: false }} />
    </Stack>
  );
}
