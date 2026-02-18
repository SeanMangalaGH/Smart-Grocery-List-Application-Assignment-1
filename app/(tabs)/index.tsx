import { useGrocery } from "@/contexts/GroceryContext";
import { Item } from "@/contexts/GroceryTypes";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import CategoryHeader from "../components/cart/CategoryHeader";
import GroceryItem from "../components/cart/GroceryItem";
import ButtonField from "../components/common/ButtonField";
import Modal from "../components/common/Modal";

// Cart page
// Author: Sean Mangala
// Date: 2026-02-15

export default function Index() {
  const { categories, items, getUnitName, toggleItemCompleted } = useGrocery();
  const [isEditingItem, setIsEditingItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

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
                  onPress={() => {
                    setSelectedItem(item);
                    setIsEditingItem(true);
                  }}
                />
              ))}
            </View>
          );
        }}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20 }}
      ></FlatList>

      {/* Edit item modal */}
      <Modal isOpen={isEditingItem} containerStyle={{ width: "80%" }}>
        <Text>Edit Item Modal</Text>
        <Text>{selectedItem?.description}</Text>
        <ButtonField
          title="Cancel"
          variant="secondary"
          onPress={() => {
            setIsEditingItem(false);
          }}
        />
      </Modal>
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
