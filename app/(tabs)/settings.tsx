import { View } from "react-native";
import { deleteApiKey } from "../../utils/authStorage";

import { useRouter } from "expo-router";
import { Button, Text } from "../../components";
import { styles } from "../../styles/darkTheme";

export default function SettingsScreen() {
  const router = useRouter();

  const handleRemoveApiKey = async () => {
    await deleteApiKey();
    router.replace("/login" as any);
  };

  return (
    <View style={styles.container}>
      <Text variant="title">Settings Screen</Text>
      <Button title="Remove API Key" onPress={handleRemoveApiKey} />
    </View>
  );
}
