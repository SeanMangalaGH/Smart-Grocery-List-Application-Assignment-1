import { Category } from "@/contexts/GroceryTypes";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ButtonField from "../common/ButtonField";
import ImagePickerField from "../common/ImagePickerField";

type CategoryCardProps = {
  category: Category;
  isModal: boolean;
  onDeletePress: () => void;
  onEditPress: () => void;
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
        <ButtonField
          onPress={onDeletePress}
          variant="outline"
          iconName="trash"
          iconSize={24}
          iconColor="red"
          buttonStyle={styles.iconButtons}
        ></ButtonField>

        <ButtonField
          onPress={onEditPress}
          variant="outline"
          iconName="pencil"
          iconSize={24}
          iconColor="black"
          buttonStyle={styles.iconButtons}
        ></ButtonField>
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
    paddingVertical: 8,
  },
});
