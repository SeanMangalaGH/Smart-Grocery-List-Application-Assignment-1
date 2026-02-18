import { useGrocery } from "@/contexts/GroceryContext";
import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import AddCategoryCard from "../components/categories/AddCategoryCard";
import CategoryCard from "../components/categories/CategoryCard";

// Categories page
// Author: Sean Mangala
// Date: 2026-02-15

const categories = () => {
  const { categories } = useGrocery();
  const categoryWithAdd = [{ id: "add", isAddButton: true }, ...categories];
  const [isAdding, setIsAdding] = useState(false);

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
            return <CategoryCard category={item} isModal={isAdding} />;
          }
        }}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20 }}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default categories;
