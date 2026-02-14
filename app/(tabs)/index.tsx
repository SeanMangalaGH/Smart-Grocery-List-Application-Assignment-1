import { useGrocery } from "@/contexts/GroceryContext";
import { Checkbox } from "expo-checkbox";
import React, { useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const { categories, items, units, getUnitName, toggleItemCompleted } =
    useGrocery();

  useEffect(() => {});

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
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryTitle}>{category.name}</Text>
                <TouchableOpacity>
                  <Text style={styles.plus}>+</Text>
                </TouchableOpacity>
              </View>

              {/* Items */}
              {categoryItems.map((item) => (
                <View key={item.id} style={styles.itemCard}>
                  <Checkbox
                    value={item.isCompleted}
                    style={styles.checkbox}
                    onValueChange={() => toggleItemCompleted(item.id)}
                  ></Checkbox>

                  <Text
                    style={[
                      styles.itemText,
                      item.isCompleted && {
                        textDecorationLine: "line-through",
                        color: "#8c8c8c",
                      },
                    ]}
                  >
                    {item.description}
                  </Text>
                  <Text>
                    {item.quantity} {getUnitName(item.unitId)}
                  </Text>
                </View>
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

  categoryHeader: {
    backgroundColor: "#059669",
    borderRadius: 12,
    paddingVertical: 7,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  categoryTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#f5f5f5",
  },

  plus: {
    fontSize: 20,
    fontWeight: "600",
    color: "#f5f5f5",
  },

  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },

  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "#ccc",
    marginRight: 12,
  },

  itemText: {
    flex: 1,
    fontSize: 13,
  },

  quantity: {
    fontSize: 14,
    color: "#555",
  },
});
