import { Stock } from "@/models/stocks";

export const stocksMock: Stock[] = [
  {
    id: "1",
    name: "Smartphone",
    quantity: 50,
    category: "electronics",
    price: 699.99,
  },
  {
    id: "2",
    name: "Laptop",
    quantity: 20,
    category: "electronics",
    price: 1199.99,
  },
  {
    id: "3",
    name: "T-Shirt",
    quantity: 100,
    category: "clothing",
    price: 19.99,
  },
  { id: "4", name: "Jeans", quantity: 60, category: "clothing", price: 49.99 },
  { id: "5", name: "Bread", quantity: 200, category: "food", price: 2.49 },
  { id: "6", name: "Cheese", quantity: 80, category: "food", price: 5.99 },
];
