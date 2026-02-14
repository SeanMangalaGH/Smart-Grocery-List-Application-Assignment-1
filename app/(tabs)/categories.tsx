import { useGrocery } from "@/contexts/GroceryContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const categories = () => {
  const { categories } = useGrocery();

  const AddCategoryCard = () => (
    <TouchableOpacity style={styles.addCard}>
      <Ionicons name="add" size={35}></Ionicons>
      <Text style={styles.title}>Add category</Text>
    </TouchableOpacity>
  );

  const categoryWithAdd = [{ id: "add", isAddButton: true }, ...categories];

  return (
    <View style={styles.container}>
      <FlatList
        data={categoryWithAdd}
        keyExtractor={(category) => category.id}
        renderItem={({ item }) => {
          if ("isAddButton" in item) {
            return <AddCategoryCard></AddCategoryCard>;
          }

          return (
            <View style={styles.card}>
              <Text style={styles.title}>{item.name}</Text>
              <View style={styles.imageContainer}></View>
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.iconButtons}>
                  <Ionicons name="trash" size={24} color="red"></Ionicons>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButtons}>
                  <Ionicons name="pencil" size={24} color="blue"></Ionicons>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20 }}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    justifyContent: "center",
    marginTop: 12,
  },
  iconButtons: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 8,
    marginHorizontal: 6,
    backgroundColor: "#F9FAFB",
  },
});

export default categories;
