import { useGrocery } from "@/contexts/GroceryContext";
import { Item } from "@/contexts/GroceryTypes";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import DropdownField from "../components/addItem/DropdownField";
import Input from "../components/addItem/Input";
import ButtonField from "../components/common/ButtonField";
import ImagePickerField from "../components/common/ImagePickerField";

// Add Item page
// Author: Sean Mangala
// Date: 2026-02-15

const addItem = () => {
  const { categories, units, createItem } = useGrocery();
  const { categoryId } = useLocalSearchParams();

  // States for inputs
  const [itemDescription, setItemDescription] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    (categoryId as string) || "",
  );
  const [selectedUnitId, setSelectedUnitId] = useState("");
  const [imageSource, setImageSource] = useState<string | undefined>(undefined);

  const handleAddItem = () => {
    if (!itemDescription || !selectedCategoryId || !selectedUnitId) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    const qty = parseInt(quantity) || 1;

    const newItem: Item = {
      id: Date.now().toString(), // used timestamp for a temporary pk id
      description: itemDescription,
      quantity: qty,
      categoryId: selectedCategoryId,
      unitId: selectedUnitId,
      image: imageSource,
      isCompleted: false,
    };

    createItem(newItem);

    Alert.alert("Success", "Item added successfully!");

    //Reset values
    setItemDescription("");
    setQuantity("1");
    setSelectedCategoryId("");
    setSelectedUnitId("");
    setImageSource(undefined);
  };

  useEffect(() => {
    if (categoryId) {
      setSelectedCategoryId(categoryId as string);
    }
  }, [categoryId]);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={100}
      >
        {/* Upload photo */}
        <ImagePickerField
          imageSource={imageSource}
          onImageSelected={setImageSource}
          label="Upload item photo"
          containerStyle={{ height: "40%" }}
        />

        {/* Item Description */}
        <Input
          label="Item Description"
          placeholder="Enter item description"
          value={itemDescription}
          onChangeText={setItemDescription}
          required
        />

        {/* Category dropdown */}
        <DropdownField
          label="Category"
          selectedValue={selectedCategoryId}
          onValueChange={setSelectedCategoryId}
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
            value={quantity}
            onChangeText={(text) => setQuantity(text.replace(/[^0-9]/g, ""))}
            containerStyle={{ flex: 1 }}
          />

          {/* Unit dropdown */}
          <DropdownField
            label="Unit"
            selectedValue={selectedUnitId}
            onValueChange={setSelectedUnitId}
            options={units.map((unit) => ({
              label: unit.name,
              value: unit.id,
            }))}
            containerStyle={{ flex: 1 }}
          />
        </View>

        {/* Add item button */}
        <ButtonField
          title="Add Item"
          onPress={handleAddItem}
          variant="primary"
          buttonStyle={{ marginTop: 20 }}
        />
      </KeyboardAvoidingView>
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
