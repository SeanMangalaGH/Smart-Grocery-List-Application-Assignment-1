export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface Unit {
  id: string;
  name: string;
}

export interface Item {
  id: string;
  description: string;
  categoryId: string;
  quantity: number;
  unitId: string;
  image: string;
  isCompleted: boolean;
}

export default {} as never;
