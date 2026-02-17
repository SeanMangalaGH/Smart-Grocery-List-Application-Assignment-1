import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

type Variant = "primary" | "secondary" | "danger" | "outline";

type ButtonFieldProps = {
  title: string;
  onPress: () => void;
  variant?: Variant;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
};

const ButtonField = ({
  title,
  onPress,
  variant = "primary",
  buttonStyle,
  textStyle,
  disabled = false,
}: ButtonFieldProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        styles[variant],
        disabled && styles.disabled,
        buttonStyle,
      ]}
      activeOpacity={0.8}
    >
      <Text style={[styles.buttonText, styles[`${variant}Text`], textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonField;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  //Variants
  primary: {
    backgroundColor: "#059669",
  },

  secondary: {
    backgroundColor: "#6B7280",
  },

  danger: {
    backgroundColor: "#E7000B",
  },

  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#C4C4C4",
  },

  disabled: {
    opacity: 0.6,
  },

  //Text
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },

  primaryText: {
    color: "#ffffff",
  },

  secondaryText: {
    color: "#ffffff",
  },

  dangerText: {
    color: "#E7000B",
  },

  outlineText: {
    color: "#383838",
  },
});
