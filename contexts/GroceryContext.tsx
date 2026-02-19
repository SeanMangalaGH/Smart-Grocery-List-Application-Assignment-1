import { createContext, ReactNode, useContext } from "react";
import { Alert } from "react-native";
import { Category, Item, Unit } from "./GroceryTypes";
import useGroceryState from "./useGroceryState";

// Grocery Context DB
// Use to store and edit Categories, Items, and Units data
// Author: Sean Mangala
// Date: 2026-02-15

interface GroceryContextType {
  categories: Category[];
  units: Unit[];
  items: Item[];
  createCategory: (newCategory: Category) => boolean;
  deleteCategory: (id: string) => void;
  editCategory: (updatedCategory: Category) => boolean;
  getUnitName: (id: string) => string;
  toggleItemCompleted: (id: string) => void;
  createItem: (newItem: Item) => boolean;
  deleteItem: (id: string) => void;
  editItem: (updatedItem: Item) => boolean;
}

const GroceryContext = createContext<GroceryContextType | undefined>(undefined);

export const useGrocery = () => {
  const context = useContext(GroceryContext);
  if (!context) {
    throw new Error("useGrocery must be within GroceryProvider");
  }
  return context;
};

export const GroveryProvider = ({ children }: { children: ReactNode }) => {
  const { categories, setCategories, units, setUnits, items, setItems } =
    useGroceryState();

  // Function returns unit name given unit id
  const getUnitName = (id: string) => {
    const itemUnit = units.find((unit) => unit.id === id);
    return itemUnit ? itemUnit.name : "";
  };

  // Function negates isCompleted boolean when called
  const toggleItemCompleted = (id: string) => {
    setItems((items) =>
      items.map((item) =>
        item.id == id ? { ...item, isCompleted: !item.isCompleted } : item,
      ),
    );
  };

  // Item functions for adding, deleting, and editing items in items state
  // Adds new item to items state
  const createItem = (newItem: Item) => {
    if (!newItem.description || !newItem.categoryId) {
      Alert.alert("Fill in all required fields.");
      return false;
    }

    setItems((items) => [...items, newItem]);
    return true;
  };

  // Deletes item from items state
  const deleteItem = (id: string) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  // Edits item in items state
  const editItem = (updatedItem: Item) => {
    if (!updatedItem.description || !updatedItem.categoryId) {
      Alert.alert("Fill in all required fields.");
      return false;
    }

    setItems((items) =>
      items.map((item) =>
        item.id === updatedItem.id ? { ...item, ...updatedItem } : item,
      ),
    );
    return true;
  };

  // Category functions for adding, deleting, and editing categories in categories state
  // Adds new category to categories state
  const createCategory = (newCategory: Category) => {
    if (!newCategory.name) {
      Alert.alert("Fill in category name.");
      return false;
    }
    setCategories((categories) => [...categories, newCategory]);
    return true;
  };

  // Deletes category from categories state
  const deleteCategory = (id: string) => {
    setCategories((categories) =>
      categories.filter((category) => category.id !== id),
    );
    // Cascade-delete items that belong to the removed category
    setItems((items) => items.filter((item) => item.categoryId !== id));
  };

  // Edits category in categories state
  const editCategory = (updatedCategory: Category) => {
    if (!updatedCategory.name) {
      Alert.alert("Fill in category name.");
      return false;
    }

    setCategories((categories) =>
      categories.map((category) =>
        category.id === updatedCategory.id
          ? { ...category, ...updatedCategory }
          : category,
      ),
    );
    return true;
  };

  return (
    <GroceryContext.Provider
      value={{
        categories,
        items,
        units,
        createCategory,
        deleteCategory,
        editCategory,
        getUnitName,
        toggleItemCompleted,
        createItem,
        deleteItem,
        editItem,
      }}
    >
      {children}
    </GroceryContext.Provider>
  );
};

export default GroceryContext;
