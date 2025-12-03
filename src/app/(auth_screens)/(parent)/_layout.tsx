import { Stack } from "expo-router";

export default function ParentLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="parent_home" options={{ headerShown: false }} />
      <Stack.Screen name="parent_view_notif" options={{ headerShown: false }} />
    </Stack>
  );
}
