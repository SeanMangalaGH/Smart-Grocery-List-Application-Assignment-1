import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

type Option = {
  label: string;
  value: string;
};

type DropdownProps = {
  label: string;
  selectedValue: string;
  onValueChange: (value: string) => void;
  options: Option[];
  required?: boolean;
  placeholder?: string;
  containerStyle?: object;
};

const DropdownField = ({
  label,
  selectedValue,
  onValueChange,
  options,
  required,
  placeholder = "Select item",
  containerStyle,
}: DropdownProps) => {
  const [isFocus, setIsFocus] = React.useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={options}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholder : "..."}
        value={selectedValue}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item: Option) => {
          onValueChange(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default DropdownField;

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },

  dropdown: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "#ffffff",
  },

  placeholderStyle: {
    fontSize: 16,
    color: "#9CA3AF",
  },

  selectedTextStyle: {
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
