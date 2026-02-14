import { createContext, ReactNode, useContext, useState } from "react";

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface Unit {
  id: string;
  name: string;
}

export interface GroceryItem {
  id: string;
  description: string;
  categoryId: string;
  quantity: number;
  unitId: string;
  image: string;
  isCompleted: boolean;
}

interface GroceryContextType {
  categories: Category[];
  units: Unit[];
  items: GroceryItem[];
  getUnitName: (id: string) => string;
  toggleItemCompleted: (id: string) => void;
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
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "1",
      name: "Produce",
      image: "",
    },
    {
      id: "2",
      name: "Meat",
      image: "",
    },
    {
      id: "3",
      name: "Dairy",
      image: "",
    },
    {
      id: "4",
      name: "Snacks",
      image: "",
    },
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

  return (
    <GroceryContext.Provider
      value={{ categories, items, units, getUnitName, toggleItemCompleted }}
    >
      {children}
    </GroceryContext.Provider>
  );
};

export default GroceryContext;
