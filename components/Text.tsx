import { Text as RNText, TextProps } from "react-native";

import { styles } from "../styles/darkTheme";

type AppTextProps = TextProps & {
  variant?: "title" | "body";
};

export function Text({ variant = "body", style, ...props }: AppTextProps) {
  let baseStyle = styles.text;

  switch (variant) {
    case "title":
      baseStyle = styles.title;
      break;
  }

  return <RNText style={[baseStyle, style]} {...props} />;
}
