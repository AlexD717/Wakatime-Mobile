import { Stack } from "expo-router";
import { useState } from "react";

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userKey, setUserKey] = useState<string | null>(null);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
