import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";

const AddCategoryCard = () => {
  return (
    <TouchableOpacity
      style={styles.addCard}
      onPress={() => Alert.alert("Add category", "Feature coming soon :)")}
    >
      <Ionicons name="add" size={35} color="grey" />
      <Text style={styles.title}>Add category</Text>
    </TouchableOpacity>
  );
};

export default AddCategoryCard;

const styles = StyleSheet.create({
  title: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
    color: "dimgrey",
  },

  addCard: {
    width: "48%",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#c6c6c6",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 16,
  },
});
