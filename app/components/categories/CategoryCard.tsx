import { Category } from "@/contexts/GroceryTypes";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CategoryCardProps = {
  category: Category;
  isModal?: boolean;
};

const CategoryCard = ({ category, isModal }: CategoryCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{category.name}</Text>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() =>
          Alert.alert("Upload category image", "Feature coming soon :)")
        }
        disabled={isModal}
      >
        <Ionicons name="image" size={50} color="grey" />
      </TouchableOpacity>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.iconButtons}
          onPress={() =>
            Alert.alert("Delete category", "Feature coming soon :)")
          }
          disabled={isModal}
        >
          <Ionicons name="trash" size={24} color="red" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButtons}
          onPress={() => Alert.alert("Edit category", "Feature coming soon :)")}
          disabled={isModal}
        >
          <Ionicons name="pencil" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },

  imageContainer: {
    aspectRatio: 1,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
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

  addText: {
    marginTop: 8,
    color: "#6B7280",
  },

  actionButtons: {
    flexDirection: "row",
    marginTop: 12,
    gap: 8,
  },

  iconButtons: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
