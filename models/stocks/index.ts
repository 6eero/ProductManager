export type Category = "electronics" | "clothing" | "food";

export interface Stock {
  id: string;
  name: string;
  quantity: number;
  category: Category;
  price: number;
}
