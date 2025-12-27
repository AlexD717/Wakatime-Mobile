import { ActivityIndicator, View } from "react-native";

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
    setIsLoading(true);
    await saveApiKey(apiKey);
    router.replace("/(tabs)");
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
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
