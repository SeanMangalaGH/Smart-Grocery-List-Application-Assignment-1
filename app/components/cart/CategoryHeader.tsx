import { Category } from "@/contexts/GroceryTypes";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CategoryProps = {
  category: Category;
  onPress?: () => void;
};

const CategoryHeader = ({ category, onPress }: CategoryProps) => {
  return (
    <View style={styles.categoryHeader}>
      <Text style={styles.categoryTitle}>{category.name}</Text>
      <TouchableOpacity
        onPress={() => {
          onPress?.();
        }}
      >
        <Ionicons name="add" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default CategoryHeader;

const styles = StyleSheet.create({
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
    fontSize: 22,
    fontWeight: "600",
    color: "#f5f5f5",
  },
});
