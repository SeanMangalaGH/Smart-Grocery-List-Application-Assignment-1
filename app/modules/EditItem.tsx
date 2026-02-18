import { useGrocery } from "@/contexts/GroceryContext";
import { Item } from "@/contexts/GroceryTypes";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DropdownField from "../components/addItem/DropdownField";
import Input from "../components/addItem/Input";
import ButtonField from "../components/common/ButtonField";
import ImagePickerField from "../components/common/ImagePickerField";
import Modal from "../components/common/Modal";

type EditItemProps = {
  item: Item | null;
  onPress: () => void;
};

const EditItem = ({ item, onPress }: EditItemProps) => {
  const { categories, units, createItem } = useGrocery();
  const [isDeleting, setIsDeleting] = useState(false);

  const [itemDescription, setItemDescription] = useState(
    item?.description || "",
  );
  const [quantity, setQuantity] = useState(
    item ? item.quantity.toString() : "1",
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    item?.categoryId || "",
  );
  const [selectedUnitId, setSelectedUnitId] = useState(item?.unitId || "");
  const [imageSource, setImageSource] = useState<string | undefined>(
    item?.image,
  );

  return (
    <View>
      {/* Text header */}
      <Text style={styles.headerText}>Edit Item</Text>

      {/* Item image */}
      <ImagePickerField
        imageSource={imageSource}
        onImageSelected={setImageSource}
        containerStyle={{ height: 160, marginTop: 10 }}
      />

      {/* Item Description */}
      <Input
        label="Item Description"
        placeholder="Enter item description"
        value={itemDescription}
        onChangeText={setItemDescription}
        required
      />

      {/* Category */}
      <DropdownField
        label="Category"
        selectedValue={selectedCategoryId}
        onValueChange={setSelectedCategoryId}
        options={categories.map((category) => ({
          label: category.name,
          value: category.id,
        }))}
        required
      />

      {/* Quantity */}
      <View style={styles.quantityContainer}>
        {/* Quantity input */}
        <Input
          label="Qty."
          value={quantity}
          onChangeText={(text) => setQuantity(text.replace(/[^0-9]/g, ""))}
          containerStyle={{ flex: 1 }}
        />

        {/* Unit dropdown */}
        <DropdownField
          label="Unit"
          selectedValue={selectedUnitId}
          onValueChange={setSelectedUnitId}
          options={units.map((unit) => ({
            label: unit.name,
            value: unit.id,
          }))}
          containerStyle={{ flex: 1 }}
        />
      </View>

      {/* Action buttons */}
      <View style={styles.buttonRow}>
        <ButtonField
          title="Delete"
          variant="outline"
          textStyle={{ color: "#E7000B" }}
          onPress={() => setIsDeleting(true)}
          iconName="trash"
          iconColor="#E7000B"
          iconSize={20}
        />
        <View style={styles.rightButtons}>
          <ButtonField title="Cancel" variant="outline" onPress={onPress} />
          <ButtonField title="Save" variant="primary" onPress={onPress} />
        </View>
      </View>

      {/* Delete confirm model */}
      <Modal
        isOpen={isDeleting}
        containerStyle={{ width: "85%" }}
        onPressClose={() => setIsDeleting(false)}
      >
        <View style={{ gap: 10, width: "100%" }}>
          <Text
            style={{ textAlign: "center", fontSize: 18, fontWeight: "600" }}
          >
            Delete item?
          </Text>
          <Text style={{ textAlign: "center", color: "#6B7280" }}>
            Are you sure you want to delete this item? This action cannot be
            undone.
          </Text>
          <ButtonField
            title="Delete"
            variant="danger"
            onPress={() => setIsDeleting(false)}
          />
          <ButtonField
            title="Cancel"
            variant="outline"
            onPress={() => setIsDeleting(false)}
          />
        </View>
      </Modal>
    </View>
  );
};

export default EditItem;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },

  quantityContainer: {
    flexDirection: "row",
    gap: 12,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    marginTop: 20,
  },

  rightButtons: {
    flexDirection: "row",
    gap: 10,
  },
});
