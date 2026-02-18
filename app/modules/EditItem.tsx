import { useGrocery } from "@/contexts/GroceryContext";
import { Item } from "@/contexts/GroceryTypes";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DropdownField from "../components/addItem/DropdownField";
import Input from "../components/addItem/Input";
import ButtonField from "../components/common/ButtonField";
import ImagePickerField from "../components/common/ImagePickerField";
import Modal from "../components/common/Modal";
import DeleteConfirm from "./DeleteConfirm";

type EditItemProps = {
  item: Item | null;
  setIsEditing: (isEditing: boolean) => void;
};

const EditItem = ({ item, setIsEditing }: EditItemProps) => {
  const { categories, units, editItem, deleteItem } = useGrocery();
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

  const handleEditItem = () => {
    const qty = parseInt(quantity) || 1;

    if (!item) return;
    const newItem: Item = {
      id: item.id,
      description: itemDescription,
      quantity: qty,
      categoryId: selectedCategoryId,
      unitId: selectedUnitId,
      image: imageSource,
      isCompleted: false,
    };

    editItem(newItem);

    //Alert.alert("Success", "Item added successfully!");

    //Reset values
    setItemDescription("");
    setQuantity("1");
    setSelectedCategoryId("");
    setSelectedUnitId("");
    setImageSource(undefined);

    setIsEditing(false);
  };

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
          <ButtonField
            title="Cancel"
            variant="outline"
            onPress={() => setIsEditing(false)}
          />
          <ButtonField
            title="Save"
            variant="primary"
            onPress={() => handleEditItem()}
          />
        </View>
      </View>

      {/* Delete confirm model */}
      <Modal
        isOpen={isDeleting}
        containerStyle={{ width: "85%" }}
        onPressClose={() => setIsDeleting(false)}
      >
        <DeleteConfirm
          header="Delete Item"
          message="Are you sure you want to delete this item?"
          onConfirm={() => {
            if (!item) return;
            deleteItem(item.id);
            setIsDeleting(false);
            setIsEditing(false);
          }}
          onCancel={() => setIsDeleting(false)}
        />
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
