import { useGrocery } from "@/contexts/GroceryContext";
import { Category } from "@/contexts/GroceryTypes";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Input from "../components/addItem/Input";
import ButtonField from "../components/common/ButtonField";
import ImagePickerField from "../components/common/ImagePickerField";

type AddCategoryProps = {
  setIsAdding: (isAdding: boolean) => void;
};

const AddCategory = ({ setIsAdding }: AddCategoryProps) => {
  const { addCategory } = useGrocery();
  const [imageSource, setImageSource] = useState<string | undefined>(undefined);
  const [categoryName, setCategoryName] = useState("");

  const handleAddCategory = () => {
    const category: Category = {
      id: Date.now().toString(), // used timestamp for a temporary pk id
      name: categoryName,
    };
    addCategory(category);
  };

  return (
    <View>
      <Text style={styles.headerText}>Edit Item</Text>

      {/* Item image */}
      <ImagePickerField
        imageSource={imageSource}
        onImageSelected={setImageSource}
        containerStyle={{ height: 160, marginTop: 10 }}
      />

      {/* Category name */}
      <Input
        label="Category Name"
        placeholder="Enter category name"
        value={categoryName}
        onChangeText={setCategoryName}
        required
      />

      {/* Action buttons */}
      <View
        style={{
          marginTop: 20,
          gap: 8,
        }}
      >
        <ButtonField
          title="Add"
          onPress={() => {
            handleAddCategory();
            setIsAdding(false);
          }}
        />

        <ButtonField
          title="Cancel"
          onPress={() => setIsAdding(false)}
          variant="outline"
        />
      </View>
    </View>
  );
};

export default AddCategory;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
