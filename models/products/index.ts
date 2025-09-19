export type Category = "electronics" | "clothing" | "food";

export interface Product {
  id?: string;
  name: string;
  quantity: number;
  category: Category;
  price: number;
}
