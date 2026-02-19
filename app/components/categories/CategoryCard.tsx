import { Category } from "@/contexts/GroceryTypes";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ImagePickerField from "../common/ImagePickerField";

type CategoryCardProps = {
  category: Category;
  isModal: boolean;
  onDeletePress?: () => void;
  onEditPress?: () => void;
};

const CategoryCard = ({
  category,
  isModal,
  onDeletePress,
  onEditPress,
}: CategoryCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{category.name}</Text>

      <ImagePickerField
        imageSource={category.image}
        containerStyle={{ aspectRatio: 1, backgroundColor: "#e9e9e9" }}
        disabled
      />

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.iconButtons}
          onPress={onDeletePress}
          disabled={isModal}
        >
          <Ionicons name="trash" size={24} color="red" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButtons}
          onPress={onEditPress}
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
