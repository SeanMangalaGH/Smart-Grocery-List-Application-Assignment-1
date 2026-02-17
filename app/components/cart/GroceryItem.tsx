import { Item } from "@/contexts/GroceryTypes";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ItemProps = {
  item: Item;
  unit: string;
  onToggle: (id: string) => void;
};

const GroceryItem = ({ item, unit, onToggle }: ItemProps) => {
  return (
    <View style={styles.itemCard}>
      {/* Checkbox */}
      <Checkbox
        value={item.isCompleted}
        style={styles.checkbox}
        onValueChange={() => onToggle(item.id)}
      ></Checkbox>

      {/* Text */}
      <View style={styles.textContainer}>
        <Text
          style={[styles.itemText, item.isCompleted && styles.itemCompleted]}
        >
          {item.description}
        </Text>

        {/* Quantity + Unit */}
        <Text style={styles.quantity}>
          {item.quantity} {unit}
        </Text>
      </View>

      {/* Action buttons */}
      <TouchableOpacity
        onPress={() => Alert.alert("Edit item", "Feature coming soon :)")}
      >
        <Ionicons name="information-circle-outline" size={25} color="#059669" />
      </TouchableOpacity>
    </View>
  );
};

export default GroceryItem;

const styles = StyleSheet.create({
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
    fontSize: 13,
  },

  itemCompleted: {
    textDecorationLine: "line-through",
    color: "#8c8c8c",
  },

  quantity: {
    fontSize: 14,
    color: "#555",
  },

  textContainer: {
    flex: 1,
  },
});
