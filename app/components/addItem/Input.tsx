import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

type InputProps = {
  label: string;
  placeholder?: string;
  value?: string | number;
  onChangeText?: (text: string) => void;
  required?: boolean;
  containerStyle?: object;
} & TextInputProps;

const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
  required,
  containerStyle,
  ...rest
}: InputProps) => {
  return (
    <View style={[styles.inputContainer, containerStyle]}>
      <Text style={styles.label}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      <TextInput
        style={styles.field}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        {...rest}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 12,
  },

  pickerContainer: {
    height: 50,
    justifyContent: "center",
    overflow: "hidden",
  },

  field: {
    height: 50,
    backgroundColor: "#ffffff",
    paddingHorizontal: 12,
    borderRadius: 8,
    fontSize: 16,
  },

  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 6,
    color: "#374151",
  },

  required: {
    color: "#ef4444",
  },
});
