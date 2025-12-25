import { Pressable, Text } from "react-native";

import { styles } from "../styles/darkTheme";

type ButtonProps = {
  title: string;
  secondary?: boolean;
  style?: object;
  minWidth?: number;
  minHeight?: number;
  onPress?: () => void;
};

export function Button({
  title,
  secondary = false,
  style,
  minWidth,
  minHeight,
  onPress,
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        secondary ? styles.secondaryButton : styles.button,
        style,
        { minWidth: minWidth ?? 160, minHeight: minHeight ?? 44 },
        pressed && { opacity: 0.8 },
      ]}
    >
      <Text style={secondary ? styles.secondaryButtonText : styles.buttonText}>
        {title}
      </Text>
    </Pressable>
  );
}
