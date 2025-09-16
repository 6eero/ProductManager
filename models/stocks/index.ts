export type Category = "electronics" | "clothing" | "food" | undefined;

export interface Stock {
  id: string;
  name: string;
  quantity: number;
  category: Category;
  price: number;
}
