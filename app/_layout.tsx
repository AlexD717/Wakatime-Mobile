import { styles } from "@/styles/darkTheme";
import {
  Stack,
  useRootNavigationState,
  useRouter,
  useSegments,
} from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { getApiKey } from "../utils/authStorage";

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userKey, setUserKey] = useState<string | null>(null);

  const router = useRouter();
  const segments = useSegments();

  const navigationState = useRootNavigationState();

  useEffect(() => {
    const checkAuthentication = async () => {
      const storedKey = await getApiKey();
      setUserKey(storedKey);
      setIsLoading(false);
    };

    checkAuthentication();
  }, []);

  useEffect(() => {
    if (isLoading || !navigationState?.key) {
      return;
    }

    const inAuthenticationGroup = segments[0] === "(tabs)";

    const recheckAuth = async () => {
      const storedKey = await getApiKey();
      if (storedKey !== userKey) {
        setUserKey(storedKey);
        return;
      }

      if (!userKey && inAuthenticationGroup) {
        router.replace("/login" as any);
      } else if (userKey && !inAuthenticationGroup) {
        router.replace("/(tabs)");
      }
    };

    recheckAuth();
  }, [userKey, isLoading, segments, router, navigationState?.key]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator
          size="large"
          color={styles.refreshControlStyle.color}
        />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="login" />
    </Stack>
  );
}
