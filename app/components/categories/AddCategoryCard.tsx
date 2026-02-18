import AddCategory from "@/app/modules/AddCategory";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Modal from "../common/Modal";

type AddCategoryCardProps = {
  isAdding: boolean;
  setIsAdding: (isAdding: boolean) => void;
};

const AddCategoryCard = ({ isAdding, setIsAdding }: AddCategoryCardProps) => {
  return (
    <>
      <TouchableOpacity
        style={styles.addCard}
        onPress={() => setIsAdding(true)}
      >
        <Ionicons name="add" size={35} color="grey" />
        <Text style={styles.title}>Add category</Text>
      </TouchableOpacity>

      <Modal
        isOpen={isAdding}
        withInput
        closable
        onPressClose={() => setIsAdding(false)}
      >
        <AddCategory setIsAdding={setIsAdding} />
      </Modal>
    </>
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
