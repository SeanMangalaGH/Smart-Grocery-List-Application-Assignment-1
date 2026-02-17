import { useState } from "react";
import { Category, GroceryItem, Unit } from "./GroceryTypes";

export const useGroceryState = () => {
  const [categories, setCategories] = useState<Category[]>([
    { id: "1", name: "Produce", image: "" },
    { id: "2", name: "Meat", image: "" },
    { id: "3", name: "Dairy", image: "" },
  ]);

  const [units, setUnits] = useState<Unit[]>([
    { id: "1", name: "pcs" },
    { id: "2", name: "pks" },
    { id: "3", name: "kgs" },
    { id: "4", name: "lbs" },
    { id: "5", name: "oz" },
    { id: "6", name: "g" },
    { id: "7", name: "ml" },
    { id: "8", name: "L" },
  ]);

  const [items, setItems] = useState<GroceryItem[]>([
    {
      id: "1",
      description: "Fuji Apple",
      categoryId: "1",
      quantity: 2,
      unitId: "2",
      image: "",
      isCompleted: false,
    },
    {
      id: "2",
      description: "Bokchoy",
      categoryId: "1",
      quantity: 1,
      unitId: "3",
      image: "",
      isCompleted: false,
    },
    {
      id: "3",
      description: "Long green beans",
      categoryId: "1",
      quantity: 1,
      unitId: "2",
      image: "",
      isCompleted: false,
    },
    {
      id: "4",
      description: "Neck bone pork",
      categoryId: "2",
      quantity: 4,
      unitId: "1",
      image: "",
      isCompleted: false,
    },
    {
      id: "5",
      description: "Pork belly - BBQ Slices",
      categoryId: "2",
      quantity: 1,
      unitId: "3",
      image: "",
      isCompleted: false,
    },
    {
      id: "6",
      description: "Chicken breast",
      categoryId: "2",
      quantity: 2,
      unitId: "3",
      image: "",
      isCompleted: false,
    },
    {
      id: "7",
      description: "Milk",
      categoryId: "3",
      quantity: 1,
      unitId: "1",
      image: "",
      isCompleted: false,
    },
    {
      id: "8",
      description: "Eggs",
      categoryId: "3",
      quantity: 1,
      unitId: "2",
      image: "",
      isCompleted: false,
    },
  ]);

  return { categories, setCategories, units, setUnits, items, setItems };
};

export default useGroceryState;
