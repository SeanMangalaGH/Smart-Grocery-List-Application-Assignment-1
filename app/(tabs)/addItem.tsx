import { useGrocery } from "@/contexts/GroceryContext";
import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import Dropdown from "../components/addItem/Dropdown";
import Input from "../components/addItem/Input";
import ButtonField from "../components/common/ButtonField";
import ImagePickerField from "../components/common/ImagePickerField";

// Add Item page
// Author: Sean Mangala
// Date: 2026-02-15

const addItem = () => {
  const { categories, units } = useGrocery();
  const [selectedCategory, setSelectedCategory] = useState("Select category");
  const [selectedUnit, setSelectedUnit] = useState("Select unit");
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined,
  );

  return (
    <View style={styles.container}>
      {/* Upload photo */}
      <ImagePickerField
        imageSource={selectedImage}
        onImageSelected={setSelectedImage}
        label="Upload item photo"
        containerStyle={{ height: "40%" }}
      />

      {/* Item Name */}
      <Input label="Item Name" placeholder="Enter item name" required />

      {/* Category dropdown */}
      <Dropdown
        label="Category"
        selectedValue={selectedCategory}
        onValueChange={setSelectedCategory}
        options={categories.map((category) => ({
          label: category.name,
          value: category.id,
        }))}
        required
      />

      {/* Quantity */}
      <View style={styles.quantityContainer}>
        {/* Quantity input */}
        <Input
          label="Qty."
          placeholder="1"
          required
          containerStyle={{ flex: 1 }}
        />

        {/* Unit dropdown */}
        <Dropdown
          label="Unit"
          selectedValue={selectedUnit}
          onValueChange={setSelectedUnit}
          options={units.map((unit) => ({
            label: unit.name,
            value: unit.id,
          }))}
          required
          containerStyle={{ flex: 1 }}
        />
      </View>

      {/* Add item button */}
      <ButtonField
        title="Add Item"
        onPress={() => Alert.alert("Add item", "Feature coming soon :)")}
        variant="primary"
        buttonStyle={{ marginTop: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  quantityContainer: {
    flexDirection: "row",
    gap: 12,
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
