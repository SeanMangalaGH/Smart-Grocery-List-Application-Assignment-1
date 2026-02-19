import { useGrocery } from "@/contexts/GroceryContext";
import { Category } from "@/contexts/GroceryTypes";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Input from "../components/addItem/Input";
import ButtonField from "../components/common/ButtonField";
import ImagePickerField from "../components/common/ImagePickerField";

type EditCategoryProps = {
  category: Category | null;
  setIsEditing: (isEditing: boolean) => void;
};

const EditCategory = ({ category, setIsEditing }: EditCategoryProps) => {
  const { editCategory } = useGrocery();
  const [imageSource, setImageSource] = useState("");
  const [categoryName, setCategoryName] = useState(
    category ? category.name : "",
  );

  const handleEditCategory = () => {
    if (!category) return;
    const newCategory: Category = {
      id: category.id,
      name: categoryName,
      image: imageSource,
    };

    //Check if valid
    if (editCategory(newCategory)) {
      setIsEditing(false);

      //Reset values
      setImageSource("");
      setCategoryName("");
    }
  };

  return (
    <View>
      <Text style={styles.headerText}>Edit Category</Text>

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
          title="Save"
          onPress={() => {
            handleEditCategory();
          }}
        />

        <ButtonField
          title="Cancel"
          onPress={() => setIsEditing(false)}
          variant="outline"
        />
      </View>
    </View>
  );
};

export default EditCategory;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
