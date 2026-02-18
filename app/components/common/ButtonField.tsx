import { Ionicons } from "@expo/vector-icons";
import React, { ComponentProps } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

type Variant = "primary" | "secondary" | "danger" | "outline";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

type ButtonFieldProps = {
  title?: string;
  onPress: () => void;
  variant?: Variant;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;

  iconName?: IoniconName;
  iconSize?: number;
  iconColor?: string;
};

const ButtonField = ({
  title,
  onPress,
  variant = "primary",
  buttonStyle,
  textStyle,
  disabled = false,
  iconName,
  iconSize,
  iconColor,
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
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {iconName && (
          <Ionicons
            name={iconName}
            size={iconSize || 20}
            color={iconColor || "white"}
            style={title ? { marginRight: 8 } : undefined}
          />
        )}

        {title && (
          <Text
            style={[styles.buttonText, styles[`${variant}Text`], textStyle]}
          >
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ButtonField;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 18,
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
    color: "#ffffff",
  },

  outlineText: {
    color: "#383838",
  },
});
