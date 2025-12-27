import { Text as RNText, TextProps } from "react-native";

import { styles } from "../styles/darkTheme";

type AppTextProps = TextProps & {
  variant?: "title" | "body" | "cardTitle";
};

export function Text({ variant = "body", style, ...props }: AppTextProps) {
  let baseStyle = styles.text;

  switch (variant) {
    case "title":
      baseStyle = styles.title;
      break;
    case "cardTitle":
      baseStyle = styles.cardTitle;
      break;
  }

  return <RNText style={[baseStyle, style]} {...props} />;
}
