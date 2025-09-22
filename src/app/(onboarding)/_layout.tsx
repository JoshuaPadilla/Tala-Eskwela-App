import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack>
      <Stack.Screen name="register" options={{ headerShown: false }} />
    </Stack>
  );
}
