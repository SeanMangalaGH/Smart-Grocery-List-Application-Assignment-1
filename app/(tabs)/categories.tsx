import { useGrocery } from "@/contexts/GroceryContext";
import { Category } from "@/contexts/GroceryTypes";
import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import AddCategoryCard from "../components/categories/AddCategoryCard";
import CategoryCard from "../components/categories/CategoryCard";
import Modal from "../components/common/Modal";
import DeleteConfirm from "../modules/DeleteConfirm";
import EditCategory from "../modules/EditCategory";

// Categories page
// Author: Sean Mangala
// Date: 2026-02-15

const categories = () => {
  const { categories, deleteCategory } = useGrocery();
  const categoryWithAdd = [{ id: "add", isAddButton: true }, ...categories];
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categoryWithAdd}
        keyExtractor={(category) => category.id}
        renderItem={({ item }) => {
          if ("isAddButton" in item) {
            return (
              <AddCategoryCard isAdding={isAdding} setIsAdding={setIsAdding} />
            );
          } else {
            return (
              <CategoryCard
                category={item}
                isModal={isAdding || isEditing}
                onEditPress={() => {
                  setIsEditing(true);
                  setSelectedCategory(item);
                }}
                onDeletePress={() => {
                  setIsDeleting(true);
                  setSelectedCategory(item);
                }}
              />
            );
          }
        }}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20 }}
      ></FlatList>

      {/* Edit category modal */}
      <Modal
        isOpen={isEditing}
        withInput
        closable
        onPressClose={() => setIsEditing(false)}
      >
        <EditCategory category={selectedCategory} setIsEditing={setIsEditing} />
      </Modal>

      {/* Delete category modal */}
      <Modal isOpen={isDeleting} onPressClose={() => setIsDeleting(false)}>
        <DeleteConfirm
          header="Delete category"
          message="Are you sure you want to delete this category? All items in this category will also be deleted. This action cannot be undone."
          onConfirm={() => {
            if (!selectedCategory) return;
            deleteCategory(selectedCategory.id);
            setIsDeleting(false);
          }}
          onCancel={() => setIsDeleting(false)}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default categories;
