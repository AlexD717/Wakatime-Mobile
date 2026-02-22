import { ActivityIndicator, View } from "react-native";

import { showAlert } from "@/utils/alert";
import { fetchUserData } from "@/utils/wakatime";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, Input, Text } from "../components";
import { styles } from "../styles/darkTheme";
import { saveApiKey } from "../utils/authStorage";

export default function Login() {
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    if (!apiKey) return;

    const trimmedKey = apiKey.trim();

    if (!trimmedKey.startsWith("waka_")) {
      showAlert(
        "Invalid API Key Format",
        "Invalid API Key. It should start with 'waka_'.",
      );
      return;
    }

    setIsLoading(true);

    try {
      await fetchUserData(trimmedKey, "today");
      await saveApiKey(trimmedKey);
      router.replace("/(tabs)");
    } catch (error) {
      // Error handled in fetchUserData (wakatime.ts)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={styles.activityIndicator.color}
        />
      ) : (
        <>
          <Text variant="title">Missing API Key</Text>
          <Input
            placeholder="API Key (Starts with waka_)"
            keyboardType="default"
            value={apiKey}
            onChangeText={setApiKey}
          />
          <Button title="Login" onPress={handleLogin} />
        </>
      )}
    </View>
  );
}
