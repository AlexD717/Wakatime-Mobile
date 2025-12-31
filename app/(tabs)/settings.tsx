import { getWakatimeStats } from "@/utils/wakatimeService";
import { View } from "react-native";
import { deleteApiKey } from "../../utils/authStorage";

import { showAlert } from "@/utils/alert";
import { useRouter } from "expo-router";
import { Button } from "../../components";
import { styles } from "../../styles/darkTheme";

export default function SettingsScreen() {
  const router = useRouter();

  const handleRemoveApiKey = async () => {
    await deleteApiKey();
    router.replace("/login" as any);
  };

  const testWakatimeConnection = async () => {
    try {
      await getWakatimeStats("last_7_days");
      showAlert("Success", "Wakatime connection successful!");
    } catch {
      // Error handled in wakatime.ts
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Remove API Key" onPress={handleRemoveApiKey} />
      <Button
        title="Test Wakatime Connection"
        onPress={testWakatimeConnection}
      />
    </View>
  );
}
