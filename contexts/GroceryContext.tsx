import { createContext, ReactNode, useContext } from "react";
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
  addCategory: (newCategory: Category) => void;
  deleteCategory: (id: string) => void;
  editCategory: (id: string, updatedCategory: Category) => void;
  getUnitName: (id: string) => string;
  toggleItemCompleted: (id: string) => void;
  createItem: (newItem: Item) => void;
  deleteItem: (id: string) => void;
  editItem: (id: string, updatedItem: Item) => void;
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
    setItems((items) => [...items, newItem]);
  };

  // Deletes item from items state
  const deleteItem = (id: string) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  // Edits item in items state
  const editItem = (id: string, updatedItem: Item) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, ...updatedItem } : item,
      ),
    );
  };

  // Category functions for adding, deleting, and editing categories in categories state
  // Adds new category to categories state
  const addCategory = (newCategory: Category) => {
    setCategories((categories) => [...categories, newCategory]);
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
  const editCategory = (id: string, updatedCategory: Category) => {
    setCategories((categories) =>
      categories.map((category) =>
        category.id === id ? { ...category, ...updatedCategory } : category,
      ),
    );
  };

  return (
    <GroceryContext.Provider
      value={{
        categories,
        items,
        units,
        addCategory,
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
