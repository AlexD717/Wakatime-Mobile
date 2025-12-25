import { router } from "expo-router";
import { View } from "react-native";

import { Button, Text } from "../../components";
import { styles } from "../../styles/darkTheme";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text variant="title">Home Screen</Text>

      <Button
        title="Go to Settings"
        onPress={() => router.push("/(tabs)/settings")}
      />
    </View>
  );
}
