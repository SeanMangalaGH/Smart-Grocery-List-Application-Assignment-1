import { useGrocery } from "@/contexts/GroceryContext";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Input from "../components/addItem/Input";

// Add Item page
// Author: Sean Mangala
// Date: 2026-02-15

const addItem = () => {
  const { categories, units } = useGrocery();
  const [selectedCategory, setSelectedCategory] = useState("Select category");
  const [selectedUnit, setSelectedUnit] = useState("Select unit");

  return (
    <View style={styles.container}>
      {/* Upload photo */}
      <TouchableOpacity
        style={styles.image}
        onPress={() =>
          Alert.alert("Upload item photo", "Feature coming soon :)")
        }
      >
        <Ionicons name="image" size={50} color={"#b1b1b1"}></Ionicons>
        <Text style={styles.upload}>Upload photo</Text>
      </TouchableOpacity>

      {/* Item Name */}
      <Input label="Item Name" placeholder="Enter item name" required />

      {/* Category dropdown */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Category *</Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            mode="dropdown"
            style={styles.field}
          >
            {categories.map((category) => (
              <Picker.Item
                key={category.id}
                label={category.name}
                value={category.id}
              />
            ))}
          </Picker>
        </View>
      </View>

      {/* Quantity */}
      <View style={styles.quantityContainer}>
        {/* Quantity input */}
        <Input label="Qty." placeholder="1" required style={styles.halfField} />

        {/* Unit dropdown */}
        <View style={[styles.inputContainer, styles.halfField]}>
          <Text style={styles.label}>Unit *</Text>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedUnit}
              onValueChange={(itemValue) => setSelectedUnit(itemValue)}
              mode="dropdown"
              style={styles.field}
            >
              {units.map((unit) => (
                <Picker.Item key={unit.id} label={unit.name} value={unit.id} />
              ))}
            </Picker>
          </View>
        </View>
      </View>

      {/* Add item button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => Alert.alert("Add item", "Feature coming soon :)")}
      >
        <Text style={styles.buttonText}>Add Item</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  image: {
    height: "40%",
    backgroundColor: "#dadada",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 8,
  },

  upload: {
    color: "#8f8f8f",
    fontSize: 18,
  },

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

  halfField: {
    flex: 1,
  },

  button: {
    marginTop: 20,
    backgroundColor: "#059669",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
});

export default addItem;
