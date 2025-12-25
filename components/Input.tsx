import { TextInput, TextInputProps } from "react-native";

import { styles } from "../styles/darkTheme";

type AppInputProps = TextInputProps & {
  style?: object;
};

export function Input({ style, ...props }: AppInputProps) {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor={styles.input.color}
      {...props}
    />
  );
}
