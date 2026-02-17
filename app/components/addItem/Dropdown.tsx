import { Picker } from "@react-native-picker/picker";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

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
  containerStyle?: object;
};

const Dropdown = ({
  label,
  selectedValue,
  onValueChange,
  options,
  required,
  containerStyle,
}: DropdownProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>

      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={styles.picker}
          mode="dropdown"
        >
          {options.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },

  pickerWrapper: {
    height: 50,
    justifyContent: "center",
  },

  picker: {
    height: 50,
    backgroundColor: "#ffffff",
    paddingHorizontal: 12,
    width: "100%",
  },

  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 6,
    color: "#374151",
  },

  quantityContainer: {
    flexDirection: "row",
    gap: 12,
  },

  required: {
    color: "#ef4444",
  },
});
