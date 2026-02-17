import { useGrocery } from "@/contexts/GroceryContext";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import CategoryHeader from "../components/cart/CategoryHeader";
import GroceryItem from "../components/cart/GroceryItem";

// Cart page
// Author: Sean Mangala
// Date: 2026-02-15

export default function Index() {
  const { categories, items, units, getUnitName, toggleItemCompleted } =
    useGrocery();

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(category) => category.id}
        renderItem={({ item: category }) => {
          const categoryItems = items.filter(
            (item) => item.categoryId == category.id,
          );

          return (
            <View style={styles.categoryWrapper}>
              {/* Category header */}
              <CategoryHeader category={category} />

              {/* Items */}
              {categoryItems.map((item) => (
                <GroceryItem
                  key={item.id}
                  item={item}
                  unit={getUnitName(item.unitId)}
                  onToggle={toggleItemCompleted}
                />
              ))}
            </View>
          );
        }}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20 }}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f3f5",
  },

  categoryWrapper: {
    marginBottom: 24,
  },
});
